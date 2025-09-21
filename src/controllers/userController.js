import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

export const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, class: studentClass } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "User already exists" });

    const user = await User.create({ firstName, lastName, email, password, class: studentClass });

    res.status(201).json({
      _id: user._id,
      name: `${user.firstName} ${user.lastName}`,
      email: user.email,
      class: user.class,
      token: generateToken(user._id, "student"),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        class: user.class,
        token: generateToken(user._id, "student"),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
