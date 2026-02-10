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

const CheckoutPage = () => {
	const router = useRouter();
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

	const handlePaystackPayment = usePaystackCheckout({
		email: formik.values.emailAddress,
		amount: total,
		onSuccess: async (ref) => {
			const getGroupedItems = useBasketStore.getState().items;
			try {
				const res = await fetch("/api/paystack/verify", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						reference: ref.reference,
						formData: formik.values,
						items: getGroupedItems,
					}),
				});

				const result = await res.json();
				console.log(result);

				if (result?.status === "success") {
					toast.success("Order placed successfully!");
					useBasketStore.getState().clearBasket();
					router.push(
						`/success?orderNumber=${result.order.orderNumber}&reference=${ref.reference}`,
					);
				} else {
					toast.error("Payment verification failed");
				}
			} catch (error) {
				toast.error("There was an error saving your order.");
				console.error(error);
			}
		},
		onClose: () => {
			toast.info("Payment cancelled");
		},
		metadata: {
			custom_fields: [
				{
					display_name: "Customer Name",
					variable_name: "customer_name",
					value: `${formik.values.firstName} ${formik.values.lastName}`,
				},
				{
					display_name: "Phone Number",
					variable_name: "phone_number",
					value: formik.values.phoneNo,
				},
			],
		},
	});

	return (
		<div className="h-auto w-full bg-gray-50">
			<Header />
			<div className="flex flex-col-reverse md:flex-row w-full px-10 md:px-20 py-30 md:py-40 gap-8">
				<div className="w-full md:w-[60%] bg-[#2D5A43] rounded-sm p-8 md:p-12">
					<h1 className="text-3xl text-white font-semibold text-center tracking-wide mb-10">
						Checkout
					</h1>
					<BillingForm
						formik={formik}
						onPaystack={handlePaystackPayment}
					/>
				</div>

				<OrderSummary shipping={shipping} total={total} />
			</div>
			<Footer />
		</div>
	);
};

export default CheckoutPage;
