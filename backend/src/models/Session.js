import mongqoose from 'mongoose';

const sessionSchema = new mongqoose.Schema({
    userId: {
        type: mongqoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    refreshToken: {
        type: String,
        required: true,
        unique: true
    },
    expiresAt: {
        type: Date,
        required: true
    },
}, { timestamps: true });

//Automatically remove expired sessions
sessionSchema.index({ "expiresAt": 1 }, { expireAfterSeconds: 0 });

export default mongqoose.model('Session', sessionSchema);
// Exporting the Session model for use in other parts of the application