import dbConnect from "@/lib/dbConnect";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();

    let Products = await Product.find();

    if (Products.length === 0) {
      Products = await Product.insertMany([
        {
          name: "Running Shoes",
          price: 1999,
          image:
            "https://t4.ftcdn.net/jpg/02/11/11/15/360_F_211111574_VLtzH6ORhebXvnJXjlkAkaUuAftnvmJH.jpg",
        },
        {
          name: "T-Shirt",
          price: 799,
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsIgc38cZ3s9y-SERo2Qe3UWzfu_S2C4zKRoBAWR6NUUY0dwOy_cE2VSE&s",
        },
        {
          name: "Backpack",
          price: 1499,
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuhLhWrjiAB3Xjxj-e2hqiGAUorksCG_Zq-klW74iHeES7HRUPK4SAVFE&s",
        },
        {
          name: "Watch",
          price: 2499,
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXflC2LOmvugbyHrlUuyUwcUgsUzyo_X9rYQ&s",
        },
        {
          name: "Cap",
          price: 399,
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRD9pQCdAo6EZxBUizP36ZSVFxl0Z3RHWlcXg&s",
        },
      ]);
    }

    return NextResponse.json(Products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 },
    );
  }
}
