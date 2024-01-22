import { compare, hash } from "bcrypt";
import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
const userSchema = new Schema(
  {
    name: { type: "string", required: true },
    avatar: {url:{ type: "string", default: ''},public_id: { type: "string", default:''}},
    email: { type: "string", required: true },
    password: { type: "string", required: true },
    verified: { type: "boolean", default: false },
    verificationCode: { type: Number },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  console.log(this.isModified("password"));
  if (this.isModified("password")) {
    this.password = await hash(this.password, 10);
    return next();
  }
  return next();
});
userSchema.methods.generateToken = async function () {
  return await jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};
userSchema.methods.comparePassword = async function (password) {
  return await compare(password, this.password);
};

const userModel = mongoose.model("user", userSchema);
export default userModel;
