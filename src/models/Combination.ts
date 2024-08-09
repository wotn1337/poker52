import { CardKind, CardValue } from "@/types/card";
import mongoose from "mongoose";
import { CardType } from "./Card";

type CombinationKey =
  | "HighCard"
  | "OnePair"
  | "TwoPair"
  | "ThreeOfAKind"
  | "Straight"
  | "Flush"
  | "FullHouse"
  | "FourOfAKind"
  | "StraightFlush"
  | "RoyalFlush";

type CombinationCard = Omit<CardType, "_id" | "cardOfTheDay"> & {
  inCombination: boolean;
};

export type CombinationType = {
  _id: string;
  key: CombinationKey;
  name: string;
  combinationOfTheDay: boolean;
  example: CombinationCard[];
};

const CombinationSchema = new mongoose.Schema({
  key: { type: String, required: true },
  name: { type: String, required: true },
  combinationOfTheDay: { type: Boolean, default: false },
  example: {
    type: Array<CombinationCard>,
    required: true,
  },
});

const Combination =
  mongoose.models?.Combination ||
  mongoose.model("Combination", CombinationSchema);

export default Combination;
