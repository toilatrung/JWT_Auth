import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
        maxlength: 20,
        lowercase: true
    },
    hardPassword: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 100
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    displayName: {
        type: String,
        trim: true,
        maxlength: 50
    },
    avatarUrl: { //CDN
        type: String
    },
    avatarId: {
        type: String
    },
    bio: {
        type: String,
        maxlength: 500
    },
    phone: {
        type: String,
        match: [/^\d{10}$/, 'Invalid phone number format'],
        sparse: true,
        trim: true
    },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;
// Exporting the User model for use in other parts of the application