import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcrypt";
import { CallbackError } from "mongoose";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  comparePassword: (candidatePassword: string) => Promise<boolean>;
}

const UserSchema: Schema = new Schema<IUser>(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

// Hash password before saving
UserSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) return next(); // Only hash if password is new or modified

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    console.error("❌ Password hashing error:", error);
    next(error as CallbackError); // Ensure error is passed properly
  }
});

// Compare passwords
UserSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    console.error("❌ Password comparison error:", error);
    return false;
  }
};

export default mongoose.model<IUser>("User", UserSchema);
