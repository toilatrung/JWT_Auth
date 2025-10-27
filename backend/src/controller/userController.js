export const authMe = async (req, res) => {
    try {
        const user = req.user;

        return res.status(200).json({ user });
    } catch (error) {
        console.error('Error in authMe:', error);
        res.status(500).json({ message: 'Failed to authenticate user' });
    }
};