import { CardKind, CardValue } from "@/types/card";
import mongoose from "mongoose";

export type Card = {
  _id: string;
  kind: CardKind;
  value: CardValue;
  cardOfTheDay: boolean;
  image: string;
};

const CardSchema = new mongoose.Schema({
  kind: { type: String, required: true },
  value: { type: String, required: true },
  image: { type: String, required: true },
  cardOfTheDay: { type: Boolean, required: true },
});

const Card = mongoose.models?.Card || mongoose.model("Card", CardSchema);

export default Card;
