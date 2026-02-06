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
    return NextResponse.json({ message: "Cart item deleted" });
  } catch (error) {
    console.error("Cart DELETE error:", error);
    return NextResponse.json(
      { error: "Failed to delete item" },
      { status: 500 },
    );
  }
}
