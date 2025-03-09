import bcrypt from "bcrypt";
import pool from "./dbConnect.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
//I have imported the dotenv here because their was some problem in importing the env variables in my machine

export const registerController = async (req, res) => {
    try {
        const { name, email, username, password, dob, gender } = req.body;
        if (!name || !email || !username || !password || !dob || !gender) {
            return res.status(400).json({
            success: false,
            message: "Invalid data",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const query = `
            INSERT INTO users (name, email, username, password, dob, gender)
            VALUES ($1, $2, $3, $4, $5, $6);
        `;
        const values = [name, email, username, hashedPassword, dob, gender];

        const result = await pool.query(query, values);
        res.status(201).json({
            success: true,
            message: "User Registered Successfully!",
            data: result.rows[0],
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error in registering user",
            error,
        });
    }
};

export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email ||!password ) {
            return res.status(400).json({
            success: false,
            message: "Please provide email and password",
            });
        }
        const user = await pool.query("SELECT * FROM users WHERE email = $1", [email, ]);
        if (user.rows.length === 0)
            return res.status(400).json({ message: "Invalid email or password" });

        const validPassword = await bcrypt.compare(password, user.rows[0].password);
        if (!validPassword)
            return res.status(400).json({ message: "Invalid email or password" });

        const token = jwt.sign({ userId: user.rows[0].id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });
        res.status(200).json({
            success: true,
            message: "User logged in Successfully!",
            token: token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error in log In",
            error,
        });
    }
};

export const fetchUserController = async (req, res) => {
    try {
        const user = await pool.query(
            "SELECT id, username, email, name, dob, gender FROM users WHERE id = $1",
            [req.user.userId]
        );
        if (user.rows.length === 0)
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        res.status(200).json({
            success: true,
            message: "User Details fetched successfully",
            user: user.rows[0],
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error in fetching user details",
            error,
        });
    }
};

export const updateDOBController = async (req, res) => {
    try {
        const { dob } = req.body;
        if (!dob ) {
            return res.status(400).json({
            success: false,
            message: "Please provide new date of birth",
            });
        }
        await pool.query("UPDATE users SET dob = $1 WHERE id = $2", [
            dob,
            req.user.userId,
        ]);

        res.status(200).json({
            success: true,
            message: "Date of birth updated successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error in updating date of birth",
        });
    }
};
