import mongoose from "mongoose";

export type BaseUser = {
  _id: string;
  name: string;
  totalScore: number;
  isAdmin: boolean;
  createdAt: Date;
  currentWinStreak: number;
  maxWinStreak: number;
  currentLoseStreak: number;
  maxLoseStreak: number;
  maxWin: number;
  maxLose: number;
  avatar: string | null;
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

export type CreateUserParams = Omit<
  BaseUser,
  "_id" | "totalScore" | "createdAt"
>;
export type UpdateUserParams = Partial<Omit<BaseUser, "createdAt">>;
export type UpdatedUser = UpdateUserParams & { _id: string };
export type UpdateScore = Omit<BaseUser, "name" | "isAdmin" | "totalScore"> & {
  isWin: boolean;
  score: number;
};
export type UpdateScoreMutationType = {
  _id: string;
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
  createdAt: { type: Date, default: Date.now },
  scoreHistory: [
    {
      changeScoreValue: { type: Number, default: 0 },
      totalScoreAfterValue: { type: Number, default: 0 },
      date: { type: Date, default: Date.now },
    },
  ],
  currentWinStreak: { type: Number, default: 0 },
  maxWinStreak: { type: Number, default: 0 },
  currentLoseStreak: { type: Number, default: 0 },
  maxLoseStreak: { type: Number, default: 0 },
  maxWin: { type: Number, default: 0 },
  maxLose: { type: Number, default: 0 },
  avatar: { type: String, default: null },
});

const User = mongoose.models?.User || mongoose.model("User", UserSchema);

export default User;
