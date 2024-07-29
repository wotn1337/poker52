import mongoose from "mongoose";

export type WinCongratulation = {
  _id: string;
  text: string;
};

const WinCongratulationSchema = new mongoose.Schema({
  text: { type: String, required: true },
});

const WinCongratulation =
  mongoose.models?.WinCongratulation ||
  mongoose.model("WinCongratulation", WinCongratulationSchema);

export default WinCongratulation;
