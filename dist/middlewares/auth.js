"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protect = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const userModel_1 = __importDefault(require("../model/userModel"));
const protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")) {
        try {
            // get the token from the header
            token = req.headers.authorization.split(" ")[1];
            //   verify the token
            const decoded = (0, jsonwebtoken_1.verify)(token, process.env.JWT_SECRET);
            //   this allows the user to be extracted from the token
            req.user = await userModel_1.default.findById(decoded.id).select("-password");
            next();
        }
        catch (error) {
            console.log(error);
            res.status(401).json({
                message: "Not authorized",
            });
        }
    }
    if (!token) {
        res.status(401).json({
            message: "Not authorized, no token!",
        });
    }
};
exports.protect = protect;
//# sourceMappingURL=auth.js.map