"use client";
import { ContactEmail, ContactPhone } from "@/assets";
import CustomInput from "@/components/form/CustomInput";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { contactUsSchema } from "@/lib/validation-schemas";
import { useFormik } from "formik";
import Image from "next/image";
import { toast } from "sonner";

const ContactUs = () => {
	const formik = useFormik({
		initialValues: {
			fullName: "",
			emailAddress: "",
			phoneNo: "",
			message: "",
		},
		validationSchema: contactUsSchema,
		onSubmit: async (values, { setSubmitting, resetForm }) => {
			try {
				const response = await fetch("/api/contact", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(values),
				});

				const data = await response.json();

				if (!response.ok) {
					throw new Error(data.error || "Failed to send message");
				}

				toast.success(
					"Message sent successfully! We'll get back to you soon.",
				);
				resetForm();
			} catch (error) {
				console.error("Error:", error);
				toast.error("Something went wrong. Please try again.");
			} finally {
				setSubmitting(false);
			}
		},
	});

	const labelStyle = "text-sm font-semibold text-sartorial-green";
	const inputStyle =
		"h-10 bg-[#F5F5F5] text-sartorial-green focus:ring-0 focus:border-sartorial-green rounded-2xl shadow-none";

	return (
		<div className="h-auto w-full bg-gray-50">
			<Header />
			<div className="flex flex-col md:flex-row w-full px-6 md:px-20 pt-20 md:pt-30 pb-20 gap-5 md:gap-8">
				<div className="w-full md:w-[30%] flex flex-col gap-8 bg-white p-6 rounded-md">
					{/* Contact Us Section */}
					<div className="flex flex-col gap-4">
						<div className="flex items-center gap-3 text-sartorial-green">
							<div className="bg-[#2D533E] p-2 rounded-full">
								<Image
									src={ContactPhone}
									alt="phone-icon"
									width={24}
									height={24}
								/>
							</div>
							<p className="text-lg font-bold">Contact Us</p>
						</div>

						<div className="space-y-4 text-sm md:text-base text-gray-700">
							<p className="leading-relaxed">
								We are available, Mon-Fri 9am-5pm.
								<br />
								Sat 9am-2pm
							</p>
							<div className="space-y-1">
								<p>
									<span className="font-medium">
										Phone no:
									</span>{" "}
									+2349169870900
								</p>
								<p>
									<span className="font-medium">
										Whatsapp:
									</span>{" "}
									+2349169871900
								</p>
							</div>
						</div>
					</div>

					<hr className="border-sartorial-green" />

					{/* Write To Us Section */}
					<div className="flex flex-col gap-4">
						<div className="flex items-center gap-3 text-sartorial-green">
							<div className="bg-[#2D533E] p-2 rounded-full">
								<Image
									src={ContactEmail}
									alt="email-icon"
									width={24}
									height={24}
								/>
							</div>
							<p className="text-lg font-bold">Write To US</p>
						</div>

						<div className="space-y-4 text-sm md:text-base text-gray-700">
							<p>
								Fill out our form and we will contact you within
								24 hours.
							</p>
							<p>
								<span className="font-medium">Emails:</span>{" "}
								info@sartorial.ng
							</p>
						</div>
					</div>
				</div>
				<div className="w-full md:w-[70%] bg-white py-10 px-5 md:px-10 rounded-md">
					<form
						onSubmit={formik.handleSubmit}
						className="md:mt-2 space-y-2"
					>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-3">
							<CustomInput
								id="fullName"
								type="text"
								placeholder="Your Name *"
								labelStyle={labelStyle}
								inputStyle={inputStyle}
								{...formik.getFieldProps("fullName")}
								error={formik.errors.fullName}
								touched={formik.touched.fullName}
							/>

							<CustomInput
								id="emailAddress"
								placeholder="Your Email *"
								type="email"
								labelStyle={labelStyle}
								inputStyle={inputStyle}
								{...formik.getFieldProps("emailAddress")}
								error={formik.errors.emailAddress}
								touched={formik.touched.emailAddress}
							/>

							<CustomInput
								id="phoneNo"
								placeholder="Your Phone *"
								type="text"
								labelStyle={labelStyle}
								inputStyle={inputStyle}
								{...formik.getFieldProps("phoneNo")}
								error={formik.errors.phoneNo}
								touched={formik.touched.phoneNo}
							/>
						</div>

						<div className="mt-5 w-full">
							<textarea
								id="message"
								placeholder="Your Message"
								rows={6}
								className="w-full p-6 bg-[#f5f5f5] border-none rounded-4xl focus:ring-1 focus:ring-sartorial-green outline-none resize-none placeholder:text-gray-400"
								{...formik.getFieldProps("message")}
							/>
							{formik.touched.message &&
								formik.errors.message && (
									<p className="text-red-500 text-xs mt-1 ml-4">
										{formik.errors.message}
									</p>
								)}
						</div>

						<div className="mt-5 flex justify-end">
							<Button
								type="submit"
								className="px-6 md:px-8 h-11 bg-sartorial-green hover:bg-sartorial-green/90 rounded-3xl cursor-pointer"
								disabled={formik.isSubmitting}
							>
								{formik.isSubmitting
									? "Sending..."
									: "Send Message"}
							</Button>
						</div>
					</form>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default ContactUs;
