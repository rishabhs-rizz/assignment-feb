import mongoose, { Schema, models, model } from "mongoose";

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: String, // optional
});

const Product = models.Product || model("Product", ProductSchema);

export default Product;
