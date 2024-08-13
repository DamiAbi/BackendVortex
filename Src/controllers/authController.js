const Admin = require('../models/Administracion');
const jwt = require('jsonwebtoken');

// Registro de administrador
exports.registerAdmin = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: 'El correo ya está registrado' });
    }

    const newAdmin = new Admin({ name, email, password });
    await newAdmin.save();

    res.status(201).json({ message: 'Administrador registrado con éxito' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Login de administrador
exports.loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: 'Correo o contraseña incorrectos' });
    }

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Correo o contraseña incorrectos' });
    }

    const token = jwt.sign({ id: admin._id, role: admin.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token, admin: { id: admin._id, name: admin.name, role: admin.role } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Listar administradores
exports.getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find().select('-password');
    res.json(admins);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
