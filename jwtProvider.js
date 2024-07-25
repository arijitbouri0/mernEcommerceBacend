const jwt = require('jsonwebtoken');

const SECRET_KEY = "jsdknkdskakndankdnkndsjdamanbcjcn";

const generateToken = (userId) => {
    const token = jwt.sign({ userId }, SECRET_KEY, { expiresIn: "48h" });
    return token;
};

const getUserIdFromToken = (token) => {
    try {
        const decodedToken = jwt.verify(token, SECRET_KEY);
        // console.log("jwtProvider",decodedToken.userId);
        return decodedToken.userId;
    } catch (error) {
        // console.error('Error decoding token:', error.message);
        throw new Error('Invalid or expired token');
    }
};

module.exports = { generateToken, getUserIdFromToken };
