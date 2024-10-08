import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma.js";

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // HASH THE PASSWORD
    const hashedPassword = await bcrypt.hash(password, 10);

    // CREATE A NEW USER AND SAVE TO DB
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    // GENERATE ACCESS TOKEN
    const savedUser = await newUser.save();
    const accessToken = jwt.sign(
      { id: savedUser._id , isAdmin: false },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '3d' } // Set token expiry time
    );


    // Set the token in a cookie (optional)
    res.cookie("accessToken", accessToken, {
      httpOnly: true, // Prevents JavaScript access
      secure: true, // Set to true if using HTTPS
      sameSite: "None", // Allow cross-site cookies
    });

    // Return the access token along with user info
    res.status(201).json({ accessToken, savedUser });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to create user!" });
  }
};



export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // CHECK IF THE USER EXISTS
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) return res.status(400).json({ message: "Invalid Credentials!" });

    // CHECK IF THE PASSWORD IS CORRECT
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(400).json({ message: "Invalid Credentials!" });

    // GENERATE ACCESS TOKEN
    const accessToken = jwt.sign(
      { id: user.id, isAdmin: false },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '3d' } // Set token expiry time
    );

    const { password: userPassword, ...others } = user;

    // Set the token in a cookie (optional)
    res.cookie("accessToken", accessToken, {
      httpOnly: true, // Prevents JavaScript access
      secure: true, // Set to true if using HTTPS
      sameSite: "None", // Allow cross-site cookies
    });

    // Return the access token along with user info
    res.status(200).json({ ...others,accessToken });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to login!" });
  }
};



export const logout = (req, res) => {
  res.clearCookie("token").status(200).json({ message: "Logout Successful" });
};