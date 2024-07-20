import mongoose from "mongoose";

export type BaseUser = {
  _id: string;
  name: string;
  totalScore: number;
  isAdmin: boolean;
};

export type ScoreHistoryItem = {
  _id: string;
  changeScoreValue: number;
  totalScoreAfterValue: number;
  date: Date;
};

export type FullUser = BaseUser & {
  scoreHistory: ScoreHistoryItem[];
};

export type CreateUserParams = Omit<BaseUser, "_id" | "totalScore">;
export type UpdateUserParams = Partial<
  Omit<BaseUser, "totalScore"> & { score: number }
>;
export type UpdatedUser = UpdateUserParams & { _id: string };
export type UpdateScore = Omit<BaseUser, "name" | "isAdmin" | "totalScore"> & {
  isWin: boolean;
  score: number;
};

export type CreateUserResponse = BaseUser & {
  password: string;
};

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  totalScore: { type: Number, default: 0 },
  isAdmin: { type: Boolean, default: false },
  scoreHistory: [
    {
      changeScoreValue: { type: Number, default: 0 },
      totalScoreAfterValue: { type: Number, default: 0 },
      date: { type: Date, default: Date.now },
    },
  ],
});

const User = mongoose.models?.User || mongoose.model("User", UserSchema);

export default User;
