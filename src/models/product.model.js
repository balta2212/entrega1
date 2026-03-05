import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  code: { type: String, required: true, unique: true },
  stock: { type: Number, default: 0 },
  category: { type: String, required: true },
  thumbnails: [String],
});

productSchema.plugin(mongoosePaginate);

const Product = mongoose.model("products", productSchema);

export default Product;
