import dbConnect from "@/lib/dbConnect";
import cartItem from "@/models/CartItems";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    await dbConnect();
    const { productId, qty } = await request.json();
    if (!productId || !qty) {
      return NextResponse.json(
        { error: "productId and qty required" },
        { status: 400 },
      );
    }

    const product = await Product.findById(productId);

    if (!product) {
      return new Response("Product not found", { status: 404 });
    }

    //if it's already in cart, update qty
    const existingItem = await cartItem.findOne({ productId });

    if (existingItem) {
      existingItem.quantity += qty;
      await existingItem.save();
      return NextResponse.json(existingItem);
    }

    const newCartItem = await cartItem.create({
      productId: product._id,
      name: product.name,
      price: product.price,
      quantity: qty,
      image: product.image,
    });
    return NextResponse.json(newCartItem);
  } catch (error) {
    console.error("Cart POST error:", error);
    return NextResponse.json(
      { error: "Failed to add to cart" },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    await dbConnect();
    const items = await cartItem.find();
    const totalSum = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
    return NextResponse.json({ items, total: totalSum });
  } catch (error) {
    console.error("Cart GET error:", error);
    return NextResponse.json(
      { error: "Failed to fetch cart items" },
      { status: 500 },
    );
  }
}
