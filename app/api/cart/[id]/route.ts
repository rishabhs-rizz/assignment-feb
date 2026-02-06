import dbConnect from "@/lib/dbConnect";
import cartItem from "@/models/CartItems";
import { NextResponse } from "next/server";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    await dbConnect();
    const { id } = await params;
    const deletedItem = await cartItem.findByIdAndDelete(id);
    if (!deletedItem) {
      return NextResponse.json(
        { error: "Cart item not found" },
        { status: 404 },
      );
    }
    const items = await cartItem.find();
    const totalSum = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
    return NextResponse.json({
      message: "Cart item deleted",
      items,
      total: totalSum,
    });
  } catch (error) {
    console.error("Cart DELETE error:", error);
    return NextResponse.json(
      { error: "Failed to delete item" },
      { status: 500 },
    );
  }
}
