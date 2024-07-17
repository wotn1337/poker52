import mongoose from "mongoose";

export type BaseUser = {
  _id: string;
  name: string;
  score: number;
  isAdmin: boolean;
};

export type CreateUserParams = Omit<BaseUser, "_id" | "score">;
export type UpdateUserParams = Partial<BaseUser>;
export type UpdatedUser = UpdateUserParams & { _id: string };
export type UpdateScore = Omit<BaseUser, "name" | "isAdmin"> & {
  isWin: boolean;
};

export type CreateUserResponse = BaseUser & {
  password: string;
};

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  score: { type: Number, default: 0 },
  isAdmin: { type: Boolean, default: false },
});

const User = mongoose.models?.User || mongoose.model("User", UserSchema);

export default User;
