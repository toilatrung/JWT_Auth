import bcrypt from 'bcrypt';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import e from 'express';
import crypto from 'crypto';
import Session from '../models/Session.js';

const ACCESS_TOKEN_TTL = '30m'; // Access token time to live
const REFRESH_TOKEN_TTL = 14 * 24 * 60 * 60 * 1000; // Refresh token time to live

export const signUp = async (req, res) => {
    try {
        const { username, password, email, firstName, lastName } = req.body;

        if (!username || !password || !email) {
            return res
            .status(400)
            .json({ message: 'Missing required fields' });
        }
        //VERIFY IF USERNAME OR EMAIL ALREADY EXISTS
        const existingUser = await User.findOne({
            $or: [{ username }, { email }],
        });
        if (existingUser) {
            return res
                .status(409)
                .json({ message: 'Username or email already exists' });
        }
        //HASH PASSWORD
        const hardPassword = await bcrypt.hash(password, 10); //10 rounds of salting
        //CREATE NEW USER
        await User.create({
            username,
            hardPassword,
            email,
            displayName: `${firstName} ${lastName}`.trim(),
        });
        //RESPOND TO CLIENT
        res
            .status(201)
            .json({ message: 'User created successfully' });
    } catch (error) {
        console.error('Error during sign up:', error);
        res
            .status(500)
            .json({ message: 'Internal server error' });
    }
};

export const logIn = async (req, res) => {
    try {
        // Extract login credentials from request body
        const { email, password } = req.body;
         if (!email || !password) {
            return res
                .status(400)
                .json({ message: 'Missing email or password' });
        }
        //Compare with hashed password in DB to input password
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.hardPassword))) {
            return res
                .status(401)
                .json({ message: 'Invalid email or password' });
        }

        const passwordIsValid = await bcrypt.compare(password, user.hardPassword);
        if (!passwordIsValid) {
            return res
                .status(401)
                .json({ message: 'Invalid username or password' });
        }
        // If valid, generate JWT token and send to client
        const accessToken = jwt.sign(
            { userId: user._id },
            process.env.ACCESS_TOKEN_SECRET, 
            {expiresIn: ACCESS_TOKEN_TTL}, // Access token valid for 15 minutes
        );
        //Generate refresh token and send to client
        const refreshToken = crypto.randomBytes(64).toString('hex');
        //Generate new session and store in DB
        await Session.create({
            userId: user._id,
            refreshToken,
            expiresAt: new Date(Date.now() + REFRESH_TOKEN_TTL),
        });
        //Send refresh token as httpOnly cookie
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true, // Set to true if using HTTPS
            sameSite: 'none', //'strict' if both client and server are on same domain
            maxAge: REFRESH_TOKEN_TTL,
        });
        //Return access token in response body
        return res
            .status(200)
            .json({'message': 'Login successful', 'accessToken': accessToken });

    } catch (error) {
        console.error('Error during log in:', error);
        res
            .status(500)
            .json({ message: 'Internal server error' });
    }
}

export const logOut = async (req, res) => {
    try {
        //Extract refresh token from cookies
        const token = req.cookies?.refreshToken;

        if (!token) {
            return res
                .status(400)
                .json({ message: 'Refresh token not provided' });
        }
        //Clear refresh token from Session collection
        await Session.findOneAndDelete({ refreshToken: token });
        //Respond to client
        return res
            .status(204)
            .json({ message: 'Logged out successfully' });
    } catch (error) {
        console.error('Error during log out:', error);
        return res
            .status(500)
            .json({ message: 'Internal server error' });
    }
};