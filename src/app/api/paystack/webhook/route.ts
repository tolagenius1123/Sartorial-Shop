import { adminClient } from "../../../../sanity/lib/sanity.admin";
import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: Request) {
	try {
		const body = await req.text();

		const hash = crypto
			.createHmac("sha512", process.env.PAYSTACK_SECRET_KEY!)
			.update(body)
			.digest("hex");

		const signature = req.headers.get("x-paystack-signature");

		if (hash !== signature) {
			console.error("Invalid webhook signature");
			return NextResponse.json(
				{ error: "Invalid signature" },
				{ status: 401 },
			);
		}

		const event = JSON.parse(body);
		console.log("Webhook event:", event.event);

		if (event.event === "charge.success") {
			const { reference, metadata, customer, amount, paid_at } =
				event.data;

			console.log("Processing payment:", reference);

			const existingOrder = await adminClient.fetch(
				`*[_type == "order" && paystackReference == $ref][0]`,
				{ ref: reference },
			);

			if (existingOrder) {
				console.log("Order already exists:", reference);
				return NextResponse.json({
					message: "Order already processed",
				});
			}

			const { formData, items } = metadata;

			if (!formData || !items) {
				console.error("Missing formData or items in metadata");
				return NextResponse.json(
					{ error: "Missing required metadata" },
					{ status: 400 },
				);
			}

			const sanityProducts = items.map((item: any, index: number) => ({
				_key: `${item._id}-${Date.now()}-${index}`,
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
				paystackCustomerId:
					customer.customer_code || String(customer.id),
				customerName: formData.clerkUserName,
				email: customer.email,
				clerkUserId: formData.clerkUserId || null,
				products: sanityProducts,
				totalPrice: amount / 100,
				currency: "NGN",
				status: "paid",
				orderDate: paid_at || new Date().toISOString(),
				shippingAddress: shipping,
			});

			console.log("Order created via webhook:", newOrder.orderNumber);

			return NextResponse.json({
				message: "Order created successfully",
				orderNumber: newOrder.orderNumber,
			});
		}

		return NextResponse.json({ message: "Event received" });
	} catch (error) {
		console.error("Webhook error:", error);
		return NextResponse.json(
			{ error: "Webhook processing failed" },
			{ status: 500 },
		);
	}
}
