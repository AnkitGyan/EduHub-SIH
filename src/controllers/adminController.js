import Admin from "../models/adminModel.js";
import generateToken from "../utils/generateToken.js";

export const registerAdmin = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const adminExists = await Admin.findOne({ email });
    if (adminExists) return res.status(400).json({ message: "Admin already exists" });

    const admin = await Admin.create({ firstName, lastName, email, password });

    res.status(201).json({
      _id: admin._id,
      name: `${admin.firstName} ${admin.lastName}`,
      email: admin.email,
      token: generateToken(admin._id, "admin"),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });

    if (admin && (await admin.matchPassword(password))) {
      res.json({
        _id: admin._id,
        name: `${admin.firstName} ${admin.lastName}`,
        email: admin.email,
        token: generateToken(admin._id, "admin"),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
