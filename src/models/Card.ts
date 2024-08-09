import { CardKind, CardValue } from "@/types/card";
import mongoose from "mongoose";

export type CardType = {
  _id: string;
  kind: CardKind;
  value: CardValue;
  instanceOfTheDay: boolean;
};

const CardSchema = new mongoose.Schema({
  kind: { type: String, required: true },
  value: { type: String, required: true },
  instanceOfTheDay: { type: Boolean, required: true },
});

const Card = mongoose.models?.Card || mongoose.model("Card", CardSchema);

export default Card;
