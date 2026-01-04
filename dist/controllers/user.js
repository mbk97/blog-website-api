"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.forgotPassword = exports.registerUser = exports.getUserDetail = exports.loginUser = void 0;
const bcryptjs_1 = require("bcryptjs");
const userModel_1 = __importDefault(require("../model/userModel"));
const jsonwebtoken_1 = require("jsonwebtoken");
const nodemailer_1 = __importDefault(require("nodemailer"));
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    if (!email || !name || !password) {
        res.status(400).json({
            message: "Please add all fields",
        });
        return;
    }
    try {
        // check if the mail exists
        const mailExists = await userModel_1.default.findOne({ email });
        if (mailExists) {
            res.status(400).json({
                message: "User already exist",
            });
            return;
        }
        // hash the passwords
        const salt = await (0, bcryptjs_1.genSalt)(10);
        const hashedPassword = await (0, bcryptjs_1.hash)(password, salt);
        const user = await userModel_1.default.create({
            name,
            email,
            password: hashedPassword,
        });
        if (user) {
            res.status(201).json({
                message: "Registration successful",
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    token: generateToken(user._id),
                },
            });
        }
    }
    catch (error) {
        res.status(400).json({
            message: error,
        });
    }
};
exports.registerUser = registerUser;
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({
            message: "Please add all fields",
        });
        return;
    }
    try {
        const user = await userModel_1.default.findOne({ email });
        if (!user) {
            res.status(403).json({
                message: "User is not registered",
            });
        }
        if (user && (await (0, bcryptjs_1.compare)(password, user.password))) {
            res.status(200).json({
                message: "Login successful",
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    token: generateToken(user._id),
                },
            });
        }
        else {
            res.status(400).json({
                message: "Invalid credentials",
            });
        }
    }
    catch (error) {
        console.log(error);
    }
};
exports.loginUser = loginUser;
const getUserDetail = async (req, res) => {
    try {
        const user = await userModel_1.default.findById(req.user.id);
        if (user) {
            res.status(200).json({
                message: "User details",
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                },
            });
        }
    }
    catch (error) {
        res.status(400).json({
            message: "No detail found",
        });
    }
};
exports.getUserDetail = getUserDetail;
const forgotPassword = async (req, res) => {
    const { email } = req.body;
    const user = await userModel_1.default.findOne({ email });
    if (!user) {
        res.status(400).json({
            message: "Email not found",
        });
        return;
    }
    if (user) {
        const token = (0, jsonwebtoken_1.sign)({
            id: user._id,
        }, process.env.RESET_PASS_KEY, {
            expiresIn: "20m",
        });
        const transporter = nodemailer_1.default.createTransport({
            port: 465,
            host: "smtp.gmail.com",
            auth: {
                user: "oyindamola850@gmail.com",
                pass: "myhkavuwpmxqrihp",
            },
            secure: true,
        });
        const msg = {
            from: "oyindamola850@gmail.com",
            to: email,
            subject: "Reset password link",
            html: `
         <h1>Blog website password reset</h1>
         <h5>Please click on the link below to reset your password</h5>
         <a href=${process.env.CLIENT_URL}/resetPassword?token=${token}>Reset password</a>
        `,
        };
        try {
            const newData = await userModel_1.default.updateOne({ resetPasswordToken: token });
            if (!newData) {
                res.status(400).json({
                    message: "Reset password link error",
                });
                return;
            }
            else {
                transporter.sendMail(msg, function (err) {
                    if (err) {
                        res.status(400).json({
                            message: "Something went wrong, try again",
                        });
                    }
                    else {
                        res.status(200).json({
                            message: "Kindly check your mail",
                        });
                    }
                });
            }
        }
        catch (error) {
            res.status(400).json({
                message: error,
            });
        }
    }
};
exports.forgotPassword = forgotPassword;
// const resetPassword = async (req: IGetUserAuthInfoRequest, res: Response) => {
//   const { resetPasswordToken, newPass } = req.body;
//   try {
//     const verifyResetToken = verify(
//       resetPasswordToken,
//       process.env.RESET_PASS_KEy
//     );
//     if (!verifyResetToken) {
//       res.status(400).json({
//         message: "Incorrect or expired token",
//       });
//       return;
//     }
//     const user = await User.findOne({ resetPasswordToken });
//     if (!user) {
//       res.status(400).json({
//         message: "User with this token does not exist",
//       });
//       return;
//     }
//     const salt = await genSalt(10);
//     const hashedPassword = await hash(newPass, salt);
//     const obj = {
//       id: user._id,
//       password: hashedPassword,
//       resetPasswordToken: "",
//       new: true,
//     };
//     const updateUser = await User.updateOne(obj);
//     if (!updateUser) {
//       res.status(400).json({
//         message: "Reset password error",
//       });
//     } else {
//       res.status(200).json({
//         message: "Your password has been updated",
//       });
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };
//
const generateToken = (id) => {
    return (0, jsonwebtoken_1.sign)({
        id,
    }, process.env.JWT_SECRET, {
        expiresIn: "1d",
    });
};
//# sourceMappingURL=user.js.map