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
            "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_t.png",
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
        {
          name: "Chain Bracelet",
          price: 590,
          image:
            "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_t.png",
        },
        {
          name: "Backpack",
          price: 1499,
          image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png",
        },
        {
          name: "Hard drive",
          price: 4999,
          image: "https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_t.png",
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
