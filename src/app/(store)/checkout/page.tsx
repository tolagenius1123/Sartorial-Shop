"use client";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { calculateShipping } from "@/lib/helper";
import { useFormik } from "formik";
import { useBasketStore } from "@/store/store";
import OrderSummary from "@/components/layout/OrderSummary";
import BillingForm from "@/components/form/BillingForm";
import { billingSchema } from "@/lib/validation-schemas";
import { usePaystackCheckout } from "@/lib/paystack";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

const CheckoutPage = () => {
	const router = useRouter();
	const { user } = useUser();
	const subtotal = useBasketStore((s) => s.getTotalPrice());

	const formik = useFormik({
		initialValues: {
			firstName: "",
			lastName: "",
			address: "",
			country: "",
			state: "",
			apartment: "",
			area: "",
			postalCode: "",
			phoneNo: "",
			emailAddress: "",
			saveInfo: false,
			shipToDifferentAddress: false,
			receiverFirstName: "",
			receiverLastName: "",
			shippingAddress: "",
			shippingCountry: "",
			shippingState: "",
			shippingArea: "",
			shippingApartment: "",
			shippingPostalCode: "",
			shippingPhoneNo: "",
			orderNote: "",
		},
		validationSchema: billingSchema,
		onSubmit: (values) => console.log("Form Data", values),
	});

	const getShippingAddress = () => ({
		country: formik.values.shipToDifferentAddress
			? formik.values.shippingCountry
			: formik.values.country,
		state: formik.values.shipToDifferentAddress
			? formik.values.shippingState
			: formik.values.state,
		area: formik.values.shipToDifferentAddress
			? formik.values.shippingArea
			: formik.values.area,
	});

	const shipping = calculateShipping(getShippingAddress());
	const total = subtotal + shipping;

	const createOrderInDatabase = async (
		paymentReference: string,
		paymentMethod: string,
	) => {
		try {
			const response = await fetch("/api/orders/create", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					...formik.values,
					clerkUserId: user?.id || null,
					clerkUserName:
						user?.fullName ||
						`${formik.values.firstName} ${formik.values.lastName}`,
					items: useBasketStore.getState().items.map((item) => ({
						_id: item.product._id,
						quantity: item.quantity,
						name: item.product.name,
						price: item.product.price,
						selectedColor: item.selectedColor
							? {
									colorId: item.selectedColor._id,
									colorTitle: item.selectedColor.title,
								}
							: undefined,
					})),
					paymentReference,
					paymentMethod,
					total,
					shipping,
					subtotal,
				}),
			});

			if (!response.ok) {
				throw new Error("Failed to create order");
			}

			const data = await response.json();
			return data;
		} catch (error) {
			console.error("Error creating order:", error);
			throw error;
		}
	};

	const handlePaystackPayment = usePaystackCheckout({
		email: formik.values.emailAddress,
		amount: total,
		formData: {
			...formik.values,
			clerkUserId: user?.id || null,
			clerkUserName:
				user?.fullName ||
				`${formik.values.firstName} ${formik.values.lastName}`,
		},
		items: useBasketStore.getState().items.map((item) => ({
			_id: item.product._id,
			quantity: item.quantity,
			name: item.product.name,
			price: item.product.price,
			selectedColor: item.selectedColor
				? {
						colorId: item.selectedColor._id,
						colorTitle: item.selectedColor.title,
					}
				: undefined,
		})),
		onSuccess: async (ref) => {
			const toastId = toast.loading("Processing your order...");

			try {
				await createOrderInDatabase(ref.reference, "paystack");

				toast.dismiss(toastId);
				toast.success("Payment successful!");

				useBasketStore.getState().clearBasket();
				router.push(`/order-pending?reference=${ref.reference}`);
			} catch (error) {
				toast.dismiss(toastId);
				console.error("Error creating order:", error);
				toast.error("Payment successful but order creation failed.");
			}
		},
		onClose: () => {
			toast.info("Payment cancelled");
		},
	});

	const handlePayPalSuccess = async (details: any) => {
		try {
			toast.loading("Processing your order...");

			await createOrderInDatabase(details.id, "paypal");

			toast.success("PayPal Payment Successful!");

			useBasketStore.getState().clearBasket();

			router.push(`/order-pending?reference=${details.id}`);
		} catch (error) {
			console.error("Error processing PayPal order:", error);
			toast.error("Failed to process order. Please contact support.");
		}
	};

	return (
		<div className="h-auto w-full bg-gray-50">
			<Header />
			<div className="flex flex-col md:flex-row w-full px-6 md:px-20 py-25 md:py-40 gap-8">
				<div className="w-full md:w-[60%] bg-[#2D5A43] rounded-sm p-5 md:p-12">
					<h1 className="text-3xl text-white font-semibold text-center tracking-wide mb-5 md:mb-10">
						Checkout
					</h1>
					<BillingForm
						formik={formik}
						onPaystack={handlePaystackPayment}
						onPayPal={handlePayPalSuccess}
						totalAmount={total}
					/>
				</div>

				<OrderSummary shipping={shipping} total={total} />
			</div>
			<Footer />
		</div>
	);
};

export default CheckoutPage;
