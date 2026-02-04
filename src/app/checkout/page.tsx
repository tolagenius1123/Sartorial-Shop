"use client";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { useFormik } from "formik";
import { Checkbox } from "@/components/ui/checkbox";
import { billingSchema } from "@/lib/validation-schemas";
import CustomInput from "@/components/form/CustomInput";
import Image from "next/image";
import { CheckoutImage } from "@/assets";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useBasketStore } from "@/store/store";
import { EXCHANGE_RATE } from "@/data";

const CheckoutPage = () => {
	const groupedItems = useBasketStore((s) => s.getGroupedItems());
	const subtotal = useBasketStore((s) => s.getTotalPrice());

	const shipping = 0;
	const total = subtotal + shipping;

	const formik = useFormik({
		initialValues: {
			firstName: "",
			lastName: "",
			address: "",
			apartment: "",
			townCity: "",
			postalCode: "",
			phoneNo: "",
			emailAddress: "",
			saveInfo: false,
			shipToDifferentAddress: false,
			receiverFirstName: "",
			receiverLastName: "",
			shippingAddress: "",
			shippingApartment: "",
			shippingTownCity: "",
			shippingPostalCode: "",
			shippingPhoneNo: "",
			orderNote: "",
		},
		validationSchema: billingSchema,
		onSubmit: (values) => {
			console.log("Form Data", values);
		},
	});

	const labelStyle = "text-gray-400 font-normal text-sm";
	const inputStyle = "bg-gray-100 border-none h-10 text-black";

	return (
		<div className="h-auto w-full bg-gray-50">
			<Header />
			<div className="flex flex-col-reverse md:flex-row w-full px-10 md:px-20 py-30 md:py-40 gap-8">
				<div className="w-full md:w-[60%] bg-[#2D5A43] rounded-sm p-8 md:p-12">
					<h1 className="text-3xl text-white font-semibold text-center tracking-wide mb-10">
						Checkout
					</h1>

					<form onSubmit={formik.handleSubmit} className="space-y-6">
						<h2 className="text-xl text-white font-medium mb-6">
							Billing Details
						</h2>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<CustomInput
								id="firstName"
								label="First Name*"
								type="text"
								labelStyle={labelStyle}
								inputStyle={inputStyle}
								{...formik.getFieldProps("firstName")}
								error={formik.errors.firstName}
								touched={formik.touched.firstName}
							/>
							<CustomInput
								id="lastName"
								label="Last Name*"
								type="text"
								labelStyle={labelStyle}
								inputStyle={inputStyle}
								{...formik.getFieldProps("lastName")}
								error={formik.errors.lastName}
								touched={formik.touched.lastName}
							/>
						</div>

						<CustomInput
							id="address"
							label="Address*"
							type="text"
							labelStyle={labelStyle}
							inputStyle={inputStyle}
							{...formik.getFieldProps("address")}
							error={formik.errors.address}
							touched={formik.touched.address}
						/>

						<CustomInput
							id="apartment"
							label="Apartment, floor, etc. (optional)"
							type="text"
							labelStyle={labelStyle}
							inputStyle={inputStyle}
							{...formik.getFieldProps("apartment")}
						/>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<CustomInput
								id="townCity"
								label="Town/City*"
								type="text"
								labelStyle={labelStyle}
								inputStyle={inputStyle}
								{...formik.getFieldProps("townCity")}
								error={formik.errors.townCity}
								touched={formik.touched.townCity}
							/>
							<CustomInput
								id="postalCode"
								label="Postal Code (Optional)"
								type="text"
								labelStyle={labelStyle}
								inputStyle={inputStyle}
								{...formik.getFieldProps("postalCode")}
							/>
						</div>

						<CustomInput
							id="phoneNo"
							label="Phone No.*"
							type="tel"
							labelStyle={labelStyle}
							inputStyle={inputStyle}
							{...formik.getFieldProps("phoneNo")}
							error={formik.errors.phoneNo}
							touched={formik.touched.phoneNo}
						/>

						<CustomInput
							id="emailAddress"
							label="Email Address*"
							type="email"
							labelStyle={labelStyle}
							inputStyle={inputStyle}
							{...formik.getFieldProps("emailAddress")}
							error={formik.errors.emailAddress}
							touched={formik.touched.emailAddress}
						/>

						<div className="flex items-center space-x-2 pt-4">
							<Checkbox
								id="saveInfo"
								className="border-white data-[state=checked]:bg-white data-[state=checked]:text-[#2D5A43]"
								checked={formik.values.saveInfo}
								onCheckedChange={(checked) =>
									formik.setFieldValue("saveInfo", checked)
								}
							/>
							<label
								htmlFor="saveInfo"
								className="text-sm font-medium leading-none text-gray-200 cursor-pointer"
							>
								Save this information for faster check-out next
								time
							</label>
						</div>

						<div className="flex items-center space-x-2 pt-6 pb-2">
							<Checkbox
								id="shipToDifferentAddress"
								className="border-white data-[state=checked]:bg-white data-[state=checked]:text-[#2D5A43]"
								checked={formik.values.shipToDifferentAddress}
								onCheckedChange={(checked) =>
									formik.setFieldValue(
										"shipToDifferentAddress",
										checked,
									)
								}
							/>
							<label
								htmlFor="shipToDifferentAddress"
								className="text-lg font-medium leading-none text-white cursor-pointer"
							>
								Ship to a different address
							</label>
						</div>

						{formik.values.shipToDifferentAddress && (
							<div className="space-y-6 pt-4 animate-in fade-in slide-in-from-top-2 duration-300">
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<CustomInput
										id="receiverFirstName"
										label="Receiver's First Name*"
										type="text"
										labelStyle={labelStyle}
										inputStyle={inputStyle}
										{...formik.getFieldProps(
											"receiverFirstName",
										)}
										error={formik.errors.receiverFirstName}
										touched={
											formik.touched.receiverFirstName
										}
									/>
									<CustomInput
										id="receiverLastName"
										label="Receiver's Last Name*"
										type="text"
										labelStyle={labelStyle}
										inputStyle={inputStyle}
										{...formik.getFieldProps(
											"receiverLastName",
										)}
										error={formik.errors.receiverLastName}
										touched={
											formik.touched.receiverLastName
										}
									/>
								</div>

								<CustomInput
									id="shippingAddress"
									label="Address*"
									type="text"
									labelStyle={labelStyle}
									inputStyle={inputStyle}
									{...formik.getFieldProps("shippingAddress")}
									error={formik.errors.shippingAddress}
									touched={formik.touched.shippingAddress}
								/>

								<CustomInput
									id="shippingApartment"
									label="Apartment, floor, etc. (optional)"
									type="text"
									labelStyle={labelStyle}
									inputStyle={inputStyle}
									{...formik.getFieldProps(
										"shippingApartment",
									)}
								/>

								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<CustomInput
										id="shippingTownCity"
										label="Town/City*"
										type="text"
										labelStyle={labelStyle}
										inputStyle={inputStyle}
										{...formik.getFieldProps(
											"shippingTownCity",
										)}
										error={formik.errors.shippingTownCity}
										touched={
											formik.touched.shippingTownCity
										}
									/>
									<CustomInput
										id="shippingPostalCode"
										label="Postal Code (Optional)"
										type="text"
										labelStyle={labelStyle}
										inputStyle={inputStyle}
										{...formik.getFieldProps(
											"shippingPostalCode",
										)}
									/>
								</div>

								<CustomInput
									id="shippingPhoneNo"
									label="Phone No.*"
									type="tel"
									labelStyle={labelStyle}
									inputStyle={inputStyle}
									{...formik.getFieldProps("shippingPhoneNo")}
									error={formik.errors.shippingPhoneNo}
									touched={formik.touched.shippingPhoneNo}
								/>

								<CustomInput
									id="orderNote"
									label="Order Note (Optional)"
									type="text"
									labelStyle={labelStyle}
									inputStyle={inputStyle}
									{...formik.getFieldProps("orderNote")}
								/>
							</div>
						)}

						<div className="mt-5 text-white space-y-2">
							<p className="font-semibold text-2xl">
								Payment Method
							</p>
							<p className="">
								Bank transfer and card payment are secure and
								encrypted.
							</p>
							<div className="mt-5">
								<Image
									src={CheckoutImage}
									alt="Checkout Image"
									className="w-full"
								/>
							</div>

							<Button
								className="mt-2 h-12 w-full rounded-full bg-white text-green-900 hover:bg-white/90 cursor-pointer"
								type="submit"
							>
								Checkout
							</Button>
							<div className="mt-3 text-white flex justify-center items-center gap-4 underline text-xs">
								<Link href="/terms-and-condition">
									Terms & Condition
								</Link>
								<Link href="/privacy-policy">
									Privacy Policy
								</Link>
								<Link href="/refund-and-returns">
									Refund Policy
								</Link>
								<Link href="/shipping-details">
									Shipping Details
								</Link>
							</div>
						</div>
					</form>
				</div>

				<div className="w-full md:w-[40%] bg-white p-8 rounded-sm shadow-sm h-fit">
					<h2 className="text-xl font-bold mb-6">Order Summary</h2>

					<div className="space-y-6">
						{groupedItems.map((item) => {
							const nairaTotal =
								(item.product.originalPrice || 0) *
								item.quantity;
							const dollarTotal = nairaTotal * EXCHANGE_RATE;

							return (
								<div
									key={item.product._id}
									className="flex items-center justify-between"
								>
									<div className="flex items-center gap-3">
										<Image
											src={item.product.image}
											alt={item.product.name}
											width={40}
											height={40}
											className="rounded-md object-cover"
										/>
										<p className="font-medium">
											{item.product.name}
										</p>
									</div>

									<div className="text-right text-sm">
										<p>₦{nairaTotal.toLocaleString()}</p>
										<p className="text-gray-500">
											$
											{dollarTotal.toLocaleString(
												undefined,
												{
													minimumFractionDigits: 2,
													maximumFractionDigits: 2,
												},
											)}
										</p>
									</div>
								</div>
							);
						})}
					</div>

					<div className="my-4 border-t" />

					<div className="flex justify-between mb-4">
						<span className="font-medium">Subtotal:</span>
						<div className="text-right">
							<p>₦{subtotal.toLocaleString()}</p>
							<p className="text-gray-500 text-sm">
								$
								{(subtotal * EXCHANGE_RATE).toLocaleString(
									undefined,
									{
										minimumFractionDigits: 2,
										maximumFractionDigits: 2,
									},
								)}
							</p>
						</div>
					</div>

					<div className="my-4 border-t" />

					<div className="flex justify-between mb-4">
						<span className="font-medium">Shipping:</span>
						<div className="text-right">
							<p>₦{shipping.toLocaleString()}</p>
							<p className="text-gray-500 text-sm">$0.00</p>
						</div>
					</div>

					<div className="my-4 border-t" />

					<div className="flex justify-between mb-6 font-bold">
						<span>Total:</span>
						<div className="text-right">
							<p>₦{total.toLocaleString()}</p>
							<p className="text-sm text-gray-600">
								$
								{(total * EXCHANGE_RATE).toLocaleString(
									undefined,
									{
										minimumFractionDigits: 2,
										maximumFractionDigits: 2,
									},
								)}
							</p>
						</div>
					</div>

					<div className="flex gap-3">
						<input
							type="text"
							placeholder="Coupon Code"
							className="w-full border rounded-full px-4 h-11 outline-none focus:ring-2 focus:ring-green-700"
						/>
						<Button className="rounded-full bg-sartorial-green text-white hover:bg-green-800 h-11 cursor-pointer">
							Apply Coupon
						</Button>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default CheckoutPage;
