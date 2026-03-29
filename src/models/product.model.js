import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const schema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  code: { type: String, unique: true },
  stock: Number,
  category: String,
});

schema.plugin(mongoosePaginate);

export default mongoose.model("Product", schema);
