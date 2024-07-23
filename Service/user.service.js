const bcrypt = require("bcrypt");
const User = require("../Models/user.model");
const jwtProvider = require("../jwtProvider");

const createUser = async (userData) => {
    try {
        let { firstname, lastname, email, password } = userData;

        const isUserExist = await User.findOne({ email });

        if (isUserExist) {
            throw new Error(`user already exist with email: ${email}`);
        }

        password = await bcrypt.hash(password, 10);

        const user = await User.create({ firstname, lastname, email, password });

        return user;
    }
    catch (error) {
        throw new Error(error.message);
    }
};

const findUserByID = async (userId) => {
    // console.log(userId);
    try {
        const user = await User.findById(userId);
        // console.log('userService',user);
        if (!user) {
            throw new Error(`User not found with id: ${userId}`);
        }
        // console.log("User found:", user);
        return user;
    } catch (error) {
        // console.error("Error in findUserByID:", error.message);
        throw new Error(error.message);
    }
};


const findUserByEmail = async (email) => {
    try {
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error(`user not found with email: ${email}`);
        }
        return user;
    } catch (error) {
        throw new Error(error.message);
    }
};

const getUserProfileByToken = async (token) => {
    try {
        const userId = jwtProvider.getUserIdFromToken(token);
        const user = (await findUserByID(userId));
        console.log("User found:", user);
        if (!user) {
            throw new Error(`user not found: ${userId}`);
        }
        return user.populate("address");
    } catch (error) {
        throw new Error(error.message);
    }
};

const getAllUsers = async () => {
    try {
        const users = await User.find();
        return users;
    }
    catch (error) {
        throw new Error(error.message);
    }
};

module.exports = { createUser, findUserByID, findUserByEmail, getUserProfileByToken, getAllUsers };
