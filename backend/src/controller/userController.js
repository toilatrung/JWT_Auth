export const authMe = async (req, res) => {
    return res.status(200).json({ message: 'Authenticated user profile', user: req.user });
};