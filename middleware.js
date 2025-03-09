import jwt from "jsonwebtoken";

export const authenticate = (req, res, next) => {
    const authHeader = req.header('Authorization');
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).json({success: false ,message: 'Access Denied' });
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({success: false, message: 'Authentication Failed' });
        req.user = user
        next();
    });
};