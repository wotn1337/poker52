import mongoose from "mongoose";

export type Quote = {
  _id: string;
  author: string;
  quote: string;
};

const QuoteSchema = new mongoose.Schema({
  author: { type: String, required: true },
  quote: { type: String, required: true },
});

const Quote = mongoose.models?.Quote || mongoose.model("Quote", QuoteSchema);

export default Quote;
