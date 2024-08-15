const Usuario = require('../models/usuario');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');

exports.login = async (req, res, next) => {
  const { email, contraseña } = req.body;

  try {
    const usuario = await Usuario.findOne({ email });
    if (!usuario || !(await usuario.compararContraseña(contraseña))) {
      res.status(401);
      throw new Error('Credenciales incorrectas');
    }

    const token = jwt.sign({ id: usuario._id, rol: usuario.rol }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};

exports.olvidarContraseña = async (req, res, next) => {
  const { email } = req.body;

  try {
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      res.status(404);
      throw new Error('Usuario no encontrado');
    }

    const resetToken = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, { expiresIn: '15m' });

    // Configurar Nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: usuario.email,
      subject: 'Recuperación de Contraseña',
      text: `Has solicitado una recuperación de contraseña. Utiliza este token: ${resetToken}`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Correo de recuperación enviado' });
  } catch (error) {
    next(error);
  }
};

exports.recuperarContraseña = async (req, res, next) => {
  const { token } = req.params;
  const { nuevaContraseña } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const usuario = await Usuario.findById(decoded.id);

    if (!usuario) {
      res.status(404);
      throw new Error('Usuario no encontrado');
    }

    usuario.contraseña = nuevaContraseña;
    await usuario.save();

    res.status(200).json({ message: 'Contraseña actualizada' });
  } catch (error) {
    next(error);
  }
};
