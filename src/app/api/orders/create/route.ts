import { adminClient } from "../../../../sanity/lib/sanity.admin";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	try {
		const body = await req.json();

		const {
			firstName,
			lastName,
			address,
			country,
			state,
			area,
			postalCode,
			phoneNo,
			emailAddress,
			shipToDifferentAddress,
			shippingAddress,
			shippingCountry,
			shippingState,
			shippingArea,
			shippingPostalCode,
			shippingPhoneNo,
			clerkUserId,
			clerkUserName,
			items,
			paymentReference,
			paymentMethod,
			total,
			shipping: shippingCost,
			subtotal,
		} = body;

		if (!items || !paymentReference || !paymentMethod) {
			return NextResponse.json(
				{ error: "Missing required fields" },
				{ status: 400 },
			);
		}

		const existingOrder = await adminClient.fetch(
			`*[_type == "order" && 
			  (paystackReference == $ref || paypalOrderId == $ref)][0]`,
			{ ref: paymentReference },
		);

		if (existingOrder) {
			return NextResponse.json({
				success: true,
				order: {
					orderNumber: existingOrder.orderNumber,
					_id: existingOrder._id,
				},
				message: "Order already exists",
			});
		}

		const sanityProducts = items.map((item: any, index: number) => {
			const productData: any = {
				_key: `${item._id}-${Date.now()}-${index}`,
				product: {
					_type: "reference",
					_ref: item._id,
				},
				quantity: item.quantity,
			};

			if (item.selectedColor) {
				productData.selectedColor = {
					colorId: item.selectedColor.colorId,
					colorTitle: item.selectedColor.colorTitle,
				};
			} else {
				console.log(`⚠️ No selectedColor found`);
			}

			return productData;
		});

		const shippingAddressData = {
			address: shipToDifferentAddress ? shippingAddress : address,
			city: shipToDifferentAddress ? shippingArea : area,
			state: shipToDifferentAddress ? shippingState : state,
			country: shipToDifferentAddress ? shippingCountry : country,
			postalCode: shipToDifferentAddress
				? shippingPostalCode
				: postalCode,
			phone: shipToDifferentAddress ? shippingPhoneNo : phoneNo,
		};

		const orderData: any = {
			_type: "order",
			orderNumber: `ORD-${Date.now()}`,
			customerName: clerkUserName || `${firstName} ${lastName}`,
			email: emailAddress,
			clerkUserId: clerkUserId || null,
			products: sanityProducts,
			totalPrice: total,
			shippingCost: shippingCost,
			subtotal: subtotal,
			currency: paymentMethod === "paypal" ? "USD" : "NGN",
			status: "paid",
			orderDate: new Date().toISOString(),
			shippingAddress: shippingAddressData,
		};

		if (paymentMethod === "paypal") {
			orderData.paypalOrderId = paymentReference;
			orderData.paymentMethod = "paypal";
		} else if (paymentMethod === "paystack") {
			orderData.paystackReference = paymentReference;
			orderData.paymentMethod = "paystack";
		}

		const newOrder = await adminClient.create(orderData);

		return NextResponse.json({
			success: true,
			order: {
				orderNumber: newOrder.orderNumber,
				_id: newOrder._id,
			},
		});
	} catch (error) {
		return NextResponse.json(
			{
				error: "Failed to create order",
				details:
					error instanceof Error ? error.message : "Unknown error",
			},
			{ status: 500 },
		);
	}
}
