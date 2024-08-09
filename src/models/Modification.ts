import mongoose from "mongoose";

export type ModificationType = {
  _id: string;
  text: string;
  modificationOfTheDay: boolean;
};

const ModificationSchema = new mongoose.Schema({
  key: { type: String, required: true },
  text: { type: String, required: true },
  modificationOfTheDay: { type: Boolean, default: false },
});

const Modification =
  mongoose.models?.Modification ||
  mongoose.model("Modification", ModificationSchema);

export default Modification;
