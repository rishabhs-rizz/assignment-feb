import mongoose, { Schema, models, model } from "mongoose";

const CartItemSchema = new Schema({
  productId: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  userId: String,

  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
  image: String,
});

const cartItem = models.cartItem || model("cartItem", CartItemSchema);

export default cartItem;
