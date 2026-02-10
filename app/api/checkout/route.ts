import dbConnect from "@/lib/dbConnect";
import cartItem from "@/models/CartItems";
import { time, timeStamp } from "console";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    await dbConnect();
    const userId = await request.json();
    const items = await cartItem.find(userId);

    if (items.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }
    const total = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );

    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

    const receipt = {
      total,
      TotalItems: totalItems,
      timeStamp: new Date().toISOString(),
    };
    return NextResponse.json(receipt);
  } catch (error) {
    console.error("Checkout POST error:", error);
    return NextResponse.json(
      { error: "Failed to process checkout" },
      { status: 500 },
    );
  }
}
