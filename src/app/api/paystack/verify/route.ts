import { adminClient } from "../../../../sanity/lib/sanity.admin";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	try {
		const { reference } = await req.json();

		const existingOrder = await adminClient.fetch(
			`*[_type == "order" && paystackReference == $ref][0]`,
			{ ref: reference },
		);

		if (existingOrder) {
			return NextResponse.json({
				status: "success",
				order: {
					orderNumber: existingOrder.orderNumber,
					_id: existingOrder._id,
				},
			});
		}

		return NextResponse.json({
			status: "pending",
			message: "Order is being processed",
		});
	} catch (error) {
		console.error("Verification error:", error);
		return NextResponse.json(
			{ status: "failed", message: "Server error during verification" },
			{ status: 500 },
		);
	}
}
