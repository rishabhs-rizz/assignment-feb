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
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    if (!userId) {
      return NextResponse.json({ error: "userId required" }, { status: 400 });
    }
    const deletedItem = await cartItem.findOneAndDelete({ _id: id, userId });
    if (!deletedItem) {
      return NextResponse.json(
        { error: "Cart item not found or unauthorized" },
        { status: 404 },
      );
    }
    return NextResponse.json({ message: "Item removed from cart" });
  } catch (error) {
    console.error("Cart DELETE error:", error);
    return NextResponse.json(
      { error: "Failed to delete item" },
      { status: 500 },
    );
  }
}
