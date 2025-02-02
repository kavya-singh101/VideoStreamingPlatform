import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config({
    path: "./.env"
});

const UserSchema = new Schema({
    username: {
        type: String,
        required: [true, "Username is required."],
        unique: true,
        trim: true,
        minlength: 3,
        index: true
    },
    fullname: {
        type: String,
        required: [true, "Fullname is required."],
        trim: true,
        minlength: 3,
    },
    password: {
        type: String,
        required: [true, "Password is required."],
        minlength: 6,
    },
    avatar: {
        type: String, //cloudinary image url
        default: "https://res.cloudinary.com/dz3gbu49x/image/upload/v1620133983/avatar/avatar-1_cwv0vz.png",
    },
    coverImage: {
        type: String, //cloudinary image url
        default: "https://res.cloudinary.com/dz3gbu49x/image/upload/v1620133983/avatar/avatar-1_cwv0vz.png",
    },
    email: {
        type: String,
        required: [true, "Email is required."],
        unique: true,
        trim: true,
    },
    watchHistory: [
        {
            type: Schema.Types.ObjectId,
            ref: "Video"
        }
    ],
    refreshToken: {
        type: String,
        default: "",
    },

}, { timestamps: true });


// the below code is used to hash the password before saving it to the database and the use of isModified method is used to check if the password is modified or not

UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 8);
    next();
});

UserSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
};

UserSchema.methods.generateAccessToken = async function () {
    return jwt.sign({
        _id: this._id,
        email: this.email,
        username: this.username,
        fullname: this.fullname,
    },
        `${process.env.ACCESS_TOKEN_SECRET}`,
        {
            expiresIn: `${process.env.ACCESS_TOKEN_EXPIRES}`
        }
    )
}

UserSchema.methods.generateRefreshToken = function () {
    return jwt.sign({
        _id: this._id,
    },
        `${process.env.REFRESH_TOKEN_SECRET}`,
        {
            expiresIn: `${process.env.REFRESH_TOKEN_EXPIRES}`
        }
    )
}

export const User = mongoose.model("User", UserSchema);