import mongoose from "mongoose";
import User from '../models/User.js';
import bcrypt from "bcryptjs";
import { createError } from "../error.js";
import jwt from "jsonwebtoken";

import Token from "../models/Emailtoken.js";
import crypto from "crypto-js";
export const signup = async(req, res, next) => {
    try {
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(req.body.password, salt);
        let newUser = await User({...req.body, password: hash });
        newUser = await newUser.save();

        const token = await new Token({
            userId: newUser._id,
            token: crypto.randomBytes(32).toString("hex"),
        }).save();
        const url = `${process.env.BASE_URL}auth/${newUser.id}/verify/${token.token}`;
        await sendEmail(newUser.email, "Email berify kar be", url);
        res.status(201).send({ message: "user ban gya hai and email aapke account pe send hua hai dekho" });


    } catch (err) {
        console.log(err);
        err.message.includes("username") ? err.message.includes("shorter") ? next(createError(404, "Username should be 3 char long")) : next(createError(404, "Username already exists")) : next(createError(404, "Email is taken"))
    }
}
export const signin = async(req, res, next) => {
    try {
        const user = await User.findOne(req.body.username ? { username: req.body.username } : { email: req.body.email });
        if (!user) return next(createError(404, "User doesn't found"));
        const isCorrect = await bcrypt.compare(req.body.password, user.password);
        if (!isCorrect) return next(createError(400, "Wrong information"));
        if (!user.verified) {
            let token = await Token.findOne({ userId: user._id });
            if (!token) {
                token = await new Token({
                    userId: user._id,
                    token: crypto.randomBytes(32).toString("hex"),
                }).save();
                const url = `${process.env.BASE_URL}auth/${user.id}/verify/${token.token}`;
                await sendEmail(user.email, "email verify karo", url);
            }

            return res
                .status(400)
                .send({ message: "email sent to your account verify plz" });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        const { password, ...userData } = user._doc;
        res.cookie("access_token", token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 7
        }).status(200).json(userData);
    } catch (err) {
        next(err);
    }
}
export const signout = async(req, res, next) => {
    try {
        res.clearCookie('access_token', { path: '/' });
        res.status(200).send("log out successfully");
    } catch (err) {
        next(err);
    }
}


export const googleAuth = async(req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            res
                .cookie("access_token", token, {
                    httpOnly: true,
                })
                .status(200)
                .json(user._doc);
        } else {
            const newUser = new User({
                ...req.body,
                fromGoogle: true,
            });
            const savedUser = await newUser.save();
            const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET);
            res
                .cookie("access_token", token, {
                    httpOnly: true,
                })
                .status(200)
                .json(savedUser._doc);
        }
    } catch (err) {
        next(err);
    }
};

export const verifytoken = async(req, res, next) => {
    try {
        const user = await User.findOne({ _id: req.params.id });
        if (!user) return res.status(400).send({ message: "User Not Found" });

        const token = await Token.findOne({
            userId: user._id,
            token: req.params.token,
        });
        if (!token) return res.status(400).send({ message: "galat link hai" });

        await User.findByIdAndUpdate(user._id, {
            verified: true
        }, { new: true, useFindAndModify: false })
        await token.remove();
        res.status(200).send({ message: "email successfully verified ho gya" });
    } catch (error) {
        res.status(500).send({ message: "internal server error (token error) " });
    }
};