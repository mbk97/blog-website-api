import { Response } from "express";
import { compare, genSalt, hash } from "bcryptjs";
import { IGetUserAuthInfoRequest } from "../interfaces/interface";
import User from "../model/userModel";
import { sign } from "jsonwebtoken";

const registerUser = async (req: IGetUserAuthInfoRequest, res: Response) => {
  const { name, email, password } = req.body;

  if (!email || !name || !password) {
    res.status(400).json({
      message: "Please add all fields",
    });
    return;
  }

  try {
    // check if the mail exists
    const mailExists = await User.findOne({ email });
    if (mailExists) {
      res.status(400).json({
        message: "User already exist",
      });
    }

    // hash the passwords
    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);

    const user = await User.create({
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
  } catch (error) {
    res.status(400).json({
      message: error,
    });
  }
};

const loginUser = async (req: IGetUserAuthInfoRequest, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({
      message: "Please add all fields",
    });
    return;
  }

  try {
    const user = await User.findOne({ email });

    if (user && (await compare(password, user.password))) {
      res.status(200).json({
        message: "Login successful",
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          token: generateToken(user._id),
        },
      });
    } else {
      res.status(400).json({
        message: "Invalid credentials",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const getUserDetail = async (req: IGetUserAuthInfoRequest, res: Response) => {
  try {
    const user = await User.findById(req.user.id);

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
  } catch (error) {
    res.status(400).json({
      message: "No detail found",
    });
  }
};

const generateToken = (id: string) => {
  return sign(
    {
      id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );
};

export { loginUser, getUserDetail, registerUser };
