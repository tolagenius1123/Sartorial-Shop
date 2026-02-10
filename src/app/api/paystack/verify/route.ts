// import { NextResponse } from "next/server";

// export async function POST(req: Request) {
// 	const { reference } = await req.json();

// 	const res = await fetch(
// 		`https://api.paystack.co/transaction/verify/${reference}`,
// 		{
// 			headers: {
// 				Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
// 			},
// 		},
// 	);

// 	const data = await res.json();

// 	return NextResponse.json(data);
// }

import { adminClient } from "../../../../sanity/lib/sanity.admin";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	const { reference, formData, items } = await req.json();

	const res = await fetch(
		`https://api.paystack.co/transaction/verify/${reference}`,
		{
			headers: {
				Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
			},
		},
	);

	const paystackData = await res.json();

	if (paystackData.data?.status === "success") {
		try {
			const sanityProducts = items.map((item: any) => ({
				_key: item._id,
				product: {
					_type: "reference",
					_ref: item._id,
				},
				quantity: item.quantity,
			}));

			const shipping = {
				address: formData.shipToDifferentAddress
					? formData.shippingAddress
					: formData.address,
				city: formData.shipToDifferentAddress
					? formData.shippingArea
					: formData.area,
				state: formData.shipToDifferentAddress
					? formData.shippingState
					: formData.state,
				country: formData.shipToDifferentAddress
					? formData.shippingCountry
					: formData.country,
				postalCode: formData.shipToDifferentAddress
					? formData.shippingPostalCode
					: formData.postalCode,
				phone: formData.shipToDifferentAddress
					? formData.shippingPhoneNo
					: formData.phoneNo,
			};

			const newOrder = await adminClient.create({
				_type: "order",
				orderNumber: `ORD-${Date.now()}`,
				paystackReference: reference,
				customerName: `${formData.firstName} ${formData.lastName}`,
				email: formData.emailAddress,
				clerkUserId: formData.clerkUserId || null,
				products: sanityProducts,
				totalPrice: paystackData.data.amount / 100,
				currency: "NGN",
				status: "paid",
				orderDate: new Date().toISOString(),
				shippingAddress: shipping,
			});

			return NextResponse.json({ success: true, order: newOrder });
		} catch (err) {
			console.error("Sanity Error:", err);
			return NextResponse.json(
				{ error: "Failed to create order" },
				{ status: 500 },
			);
		}
	}

	return NextResponse.json(
		{ error: "Payment verification failed" },
		{ status: 400 },
	);
}
