import { adminClient } from "../../../../sanity/lib/sanity.admin";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	console.log("\n" + "=".repeat(80));
	console.log("🔔 /api/orders/create CALLED");
	console.log("Timestamp:", new Date().toISOString());
	console.log("=".repeat(80));

	try {
		const body = await req.json();

		console.log("📦 Full request body received");
		console.log("Items in body:", JSON.stringify(body.items, null, 2));

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

		console.log("\n📋 Extracted items:", JSON.stringify(items, null, 2));
		console.log(
			"Items with color:",
			items.filter((i: any) => i.selectedColor),
		);

		// Validate required fields
		if (!items || !paymentReference || !paymentMethod) {
			console.error("❌ Missing required fields");
			return NextResponse.json(
				{ error: "Missing required fields" },
				{ status: 400 },
			);
		}

		// Check if order already exists
		const existingOrder = await adminClient.fetch(
			`*[_type == "order" && 
			  (paystackReference == $ref || paypalOrderId == $ref)][0]`,
			{ ref: paymentReference },
		);

		if (existingOrder) {
			console.log("⚠️ Order already exists:", existingOrder.orderNumber);
			return NextResponse.json({
				success: true,
				order: {
					orderNumber: existingOrder.orderNumber,
					_id: existingOrder._id,
				},
				message: "Order already exists",
			});
		}

		// Map items to Sanity format with color information
		console.log("\n🔄 Mapping items to Sanity format...");
		const sanityProducts = items.map((item: any, index: number) => {
			console.log(`\n🔍 Processing item ${index}:`);
			console.log(`  - ID: ${item._id}`);
			console.log(`  - Name: ${item.name}`);
			console.log(`  - Has selectedColor? ${!!item.selectedColor}`);
			console.log(`  - selectedColor value:`, item.selectedColor);

			const productData: any = {
				_key: `${item._id}-${Date.now()}-${index}`,
				product: {
					_type: "reference",
					_ref: item._id,
				},
				quantity: item.quantity,
			};

			// Add selected color if present
			if (item.selectedColor) {
				console.log(`  ✅ Adding color:`, {
					colorId: item.selectedColor.colorId,
					colorTitle: item.selectedColor.colorTitle,
				});
				productData.selectedColor = {
					colorId: item.selectedColor.colorId,
					colorTitle: item.selectedColor.colorTitle,
				};
			} else {
				console.log(`  ⚠️ No selectedColor found`);
			}

			console.log(`  📦 Final product data:`, productData);
			return productData;
		});

		console.log(
			"\n🎯 All Sanity products:",
			JSON.stringify(sanityProducts, null, 2),
		);

		// Prepare shipping address
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

		// Create order document
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

		// Add payment method specific fields
		if (paymentMethod === "paypal") {
			orderData.paypalOrderId = paymentReference;
			orderData.paymentMethod = "paypal";
		} else if (paymentMethod === "paystack") {
			orderData.paystackReference = paymentReference;
			orderData.paymentMethod = "paystack";
		}

		console.log(
			"\n💾 Creating order in Sanity with data:",
			JSON.stringify(orderData, null, 2),
		);

		// Create the order in Sanity
		const newOrder = await adminClient.create(orderData);

		console.log("\n✅ Order created successfully:", newOrder.orderNumber);
		console.log("📄 Created order:", JSON.stringify(newOrder, null, 2));
		console.log("=".repeat(80) + "\n");

		return NextResponse.json({
			success: true,
			order: {
				orderNumber: newOrder.orderNumber,
				_id: newOrder._id,
			},
		});
	} catch (error) {
		console.error("\n💥 Error creating order:", error);
		console.error(
			"Stack:",
			error instanceof Error ? error.stack : "No stack",
		);
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
