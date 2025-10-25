import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protectedRoute = async (req, res, next) => {
    try {
        // Get token from header
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        // Verify token
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decodedUser) => {
            if (err) {
                return res.status(403).json({ message: 'Forbidden' });
            }
        // Find user by ID from token
        const user = await User.findById(decodedUser.id).select('-hashedPassword');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Return user to request object
        req.user = user;
        next();
        });
    } catch (err) {
        console.error('Error during protected route:', err);
        return res.status(401).json({ message: 'Unauthorized' });
    }
}