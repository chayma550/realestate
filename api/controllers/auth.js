import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });
        if (existingUser) {
            return res.status(409).json({ message: "Email already in use!" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword,
            },
        });

        // Generate JWT token
        const age = 1000 * 60 * 60 * 24 * 7; // Token valid for 7 days
        const token = jwt.sign(
            {
                id: newUser.id,
                isAdmin: false, // Change this based on actual role management
            },
            process.env.JWT_SECRET_KEY,
            { expiresIn: age }
        );

        const isProduction = process.env.NODE_ENV === 'production';

        // Set the token in the cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: isProduction,
            maxAge: age,
            sameSite: "Strict", // Adjust based on your needs
        });

        // Exclude password from user info
        const { password: _, ...userInfo } = newUser;
        res.status(201).json({
            message: "User created successfully!",
            accessToken: token,
            user: userInfo,
        });

    } catch (err) {
        console.error("Error creating user:", err);
        res.status(500).json({ message: "Failed to create user!" });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if user exists
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) return res.status(401).json({ message: "Invalid Credentials!" });

        // Check if password is correct
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(401).json({ message: "Invalid Credentials!" });

        // Exclude password from user info
        const { password: _, ...userInfo } = user;

        // Generate JWT token
        const age = 1000 * 60 * 60 * 24 * 7; // Token valid for 7 days
        const token = jwt.sign(
            {
                id: user.id,
                isAdmin: false, // Change this based on actual role management
            },
            process.env.JWT_SECRET_KEY,
            { expiresIn: age }
        );

        const isProduction = process.env.NODE_ENV === 'production';

        // Set the token in the cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: isProduction,
            maxAge: age,
            sameSite: "Strict", // Adjust based on your needs
        });

        // Return user information along with accessToken
        res.status(200).json({
            ...userInfo,
            accessToken: token,
        });

    } catch (err) {
        console.error("Error logging in:", err);
        res.status(500).json({ message: "Failed to login!" });
    }
};

export const logout = async (req, res) => {
    res.clearCookie("token").status(200).json({ message: "Logged out successfully!" });
};
