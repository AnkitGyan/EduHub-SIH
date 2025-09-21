import Teacher from "../models/teacherModel.js";
import generateToken from "../utils/generateToken.js";

export const registerTeacher =  async (req, res) => {
  const { firstName, lastName, email, password, assignedClasses } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const teacher = await Teacher.create({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    assignedClasses, 
  });

  res.status(201).json({ message: "Teacher created successfully", teacher });
};


export const loginTeacher = async (req, res) => {
  try {
    const { email, password } = req.body;
    const teacher = await Teacher.findOne({ email });

    if (teacher && (await teacher.matchPassword(password))) {
      res.json({
        _id: teacher._id,
        name: `${teacher.firstName} ${teacher.lastName}`,
        email: teacher.email,
        token: generateToken(teacher._id, "teacher"),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const addClassesToTeacher = async (req, res) => {
  const { newClasses } = req.body;
  const teacher = req.teacher;    

  newClasses.forEach(c => {
    if (!teacher.assignedClasses.includes(c)) {
      teacher.assignedClasses.push(c);
    }
  });

  await teacher.save();

  res.json({
    message: "Classes updated successfully",
    assignedClasses: teacher.assignedClasses,
  });
};
