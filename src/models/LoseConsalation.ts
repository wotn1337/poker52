import mongoose from "mongoose";

export type LoseConsalation = {
  _id: string;
  text: string;
};

const LoseConsalationSchema = new mongoose.Schema({
  text: { type: String, required: true },
});

const LoseConsalation =
  mongoose.models?.LoseConsalation ||
  mongoose.model("LoseConsalation", LoseConsalationSchema);

export default LoseConsalation;
