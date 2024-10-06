import prisma from "../lib/prisma.js"; 
import CryptoJS from "crypto-js";
import Jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  const { username, email, password } = req.body;

  const hashedPassword = CryptoJS.AES.encrypt(password, process.env.PASS_SEC).toString();

  try {
    // Create new user using Prisma
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    const accessToken = Jwt.sign(
      { id: newUser.id }, // Use newUser's id
      process.env.JWT_SECRET_KEY,
      { expiresIn: "3d" }
    );

    // Set cookie with the access token
    res.cookie("accesstoken", accessToken, {
      httpOnly: true,
      secure: true, // Set to true in production
      sameSite: "None", // Allow cross-site cookies
    });

    res.status(201).json({  newUser, accessToken });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) return res.status(404).json({ message: "user not found!" });


    const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC);
    const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    if (originalPassword !== password) {
      return res.status(400).json({ message: "Invalid Credentials!" });
    }

    const accessToken = Jwt.sign(
      { id: user.id,        
      isAdmin: false    
      }, 
      process.env.JWT_SECRET_KEY,
      { expiresIn: "3d" }
    );

    const { password, ...others } = user; 

    res
      .cookie("accesstoken", accessToken, {
        httpOnly: true,
        secure: true, // Set to true in production
        sameSite: "None", // Allow cross-site cookies
      })
      .status(200)
      .json({ ...others, accessToken });
  } catch (err) {
    next(err);
  }
};

export const logout = async (req, res) => {
  res
    .clearCookie("accesstoken", {
      sameSite: "None", // Allow cross-site cookies
      secure: true, // Set to true in production
    })
    .status(200)
    .send("User has been logged out.");
};
