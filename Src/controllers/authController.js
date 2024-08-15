const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

// Iniciar sesión
exports.login = async (req, res) => {
  const { email, contraseña } = req.body;

  try {
    const usuario = await Usuario.findOne({ email });

    if (!usuario || !bcrypt.compareSync(contraseña, usuario.contraseña)) {
      return res.status(400).json({ message: 'Credenciales inválidas' });
    }

    const token = jwt.sign({ id: usuario._id, rol: usuario.rol }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Error al iniciar sesión' });
  }
};

// Olvidar contraseña
exports.olvidarContraseña = async (req, res) => {
  const { email } = req.body;

  try {
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, { expiresIn: '15m' });

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Recuperación de Contraseña',
      text: `Para recuperar tu contraseña, haz clic en el siguiente enlace: ${process.env.FRONTEND_URL}/recuperar-contraseña/${token}`,
    };

    await transporter.sendMail(mailOptions);
    res.json({ message: 'Correo de recuperación enviado' });
  } catch (error) {
    res.status(500).json({ message: 'Error al enviar correo de recuperación' });
  }
};

// Recuperar contraseña
exports.recuperarContraseña = async (req, res) => {
  const { token } = req.params;
  const { nuevaContraseña } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const usuario = await Usuario.findById(decoded.id);

    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    usuario.contraseña = bcrypt.hashSync(nuevaContraseña, 10);
    await usuario.save();
    res.json({ message: 'Contraseña actualizada' });
  } catch (error) {
    res.status(500).json({ message: 'Error al recuperar contraseña' });
  }
};
