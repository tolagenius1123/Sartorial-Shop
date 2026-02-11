import { NextResponse } from "next/server";
import { createOrder } from "@/lib/paypal";

export async function POST(req: Request) {
	try {
		const body = await req.json();
		const { amount } = body;

		// Validate amount
		if (!amount || typeof amount !== "number" || amount <= 0) {
			return NextResponse.json(
				{ error: "Invalid amount provided" },
				{ status: 400 },
			);
		}

		console.log("Creating PayPal order for amount:", amount);

		const order = await createOrder(amount);

		console.log("PayPal order created successfully:", order.id);

		return NextResponse.json(order);
	} catch (error: any) {
		console.error("Error in create-order API:", error);

		// Return detailed error message
		return NextResponse.json(
			{
				error: error.message || "Failed to create order",
				details: error.toString(),
			},
			{ status: 500 },
		);
	}
}
