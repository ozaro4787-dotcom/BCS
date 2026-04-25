const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Middleware for JWT verification
function verifyToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) return res.sendStatus(403);

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

// Middleware for checking user roles
function checkRole(role) {
    return (req, res, next) => {
        if (req.user && req.user.role === role) {
            next();
        } else {
            return res.sendStatus(403);
        }
    };
}

// Password hashing utility
function hashPassword(password) {
    return bcrypt.hashSync(password, 8);
}

// Token generation utility
function generateToken(user) {
    return jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
}

// Authentication middleware for protected routes
function authenticate(req, res, next) {
    verifyToken(req, res, next);
}

module.exports = {
    verifyToken,
    checkRole,
    hashPassword,
    generateToken,
    authenticate
};