// "use client";
// import {
// 	Dialog,
// 	DialogContent,
// 	DialogHeader,
// 	DialogTitle,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { Label } from "@/components/ui/label";
// import { useState } from "react";
// import Image from "next/image";
// import { MasterCard, PayPal, Verve, Visa } from "@/assets";
// import { PayPalButtons } from "@paypal/react-paypal-js";

// interface PaymentMethodModalProps {
// 	isOpen: boolean;
// 	onClose: () => void;
// 	onConfirm: (method: string) => void;
// 	totalAmount: number;
// }

// const PaymentMethodModal = ({
// 	isOpen,
// 	onClose,
// 	onConfirm,
// 	totalAmount,
// }: PaymentMethodModalProps) => {
// 	const [selectedMethod, setSelectedMethod] = useState("paystack");

// 	const handleProceed = () => {
// 		onConfirm(selectedMethod);
// 	};

// 	return (
// 		<Dialog open={isOpen} onOpenChange={onClose}>
// 			<DialogContent className="sm:max-w-150 p-8 bg-white">
// 				<DialogHeader>
// 					<DialogTitle className="text-xl font-semibold text-center text-gray-900">
// 						Choose Payment Method
// 					</DialogTitle>
// 				</DialogHeader>

// 				<div className="mt-6 space-y-4">
// 					<RadioGroup
// 						value={selectedMethod}
// 						onValueChange={setSelectedMethod}
// 						className="space-y-4"
// 					>
// 						<div
// 							className={`relative flex items-center space-x-4 rounded-lg border-2 p-6 cursor-pointer transition-all ${
// 								selectedMethod === "paystack"
// 									? "border-sartorial-green bg-green-50"
// 									: "border-gray-200 hover:border-gray-300"
// 							}`}
// 							onClick={() => setSelectedMethod("paystack")}
// 						>
// 							<RadioGroupItem
// 								value="paystack"
// 								id="paystack"
// 								className="h-5 w-5"
// 							/>
// 							<Label
// 								htmlFor="paystack"
// 								className="flex-1 cursor-pointer"
// 							>
// 								<div className="w-full flex items-center justify-between">
// 									<div>
// 										<p className="text-base font-semibold text-gray-900">
// 											Pay with Paystack
// 										</p>
// 										<p className="text-sm text-gray-600 mt-1">
// 											Cards, Bank Transfers, USSD...
// 										</p>
// 									</div>
// 									<div className="flex items-center gap-3">
// 										<div className="flex items-center gap-2">
// 											<Image
// 												src={Visa}
// 												alt="Visa"
// 												width={50}
// 												height={30}
// 												className="object-contain"
// 											/>
// 											<Image
// 												src={MasterCard}
// 												alt="Mastercard"
// 												width={40}
// 												height={30}
// 												className="object-contain"
// 											/>
// 											<Image
// 												src={Verve}
// 												alt="Verve"
// 												width={60}
// 												height={30}
// 												className="object-contain"
// 											/>
// 										</div>
// 									</div>
// 								</div>
// 							</Label>
// 						</div>

// 						<div
// 							className={`relative flex items-center space-x-4 rounded-lg border-2 p-6 cursor-pointer transition-all ${
// 								selectedMethod === "paypal"
// 									? "border-sartorial-green bg-green-50"
// 									: "border-gray-200 hover:border-gray-300"
// 							}`}
// 							onClick={() => setSelectedMethod("paypal")}
// 						>
// 							<RadioGroupItem
// 								value="paypal"
// 								id="paypal"
// 								className="h-5 w-5"
// 							/>
// 							<Label
// 								htmlFor="paypal"
// 								className="flex-1 cursor-pointer"
// 							>
// 								<div className="w-full flex items-center justify-between">
// 									<div>
// 										<p className="text-base font-semibold text-gray-900">
// 											Pay with PayPal
// 										</p>
// 										<p className="text-sm text-gray-600 mt-1">
// 											Pay via PayPal or Credit/Debit Card
// 										</p>
// 									</div>
// 									<Image
// 										src={PayPal}
// 										alt="PayPal"
// 										width={100}
// 										height={30}
// 										className="object-contain"
// 										unoptimized
// 									/>
// 								</div>
// 							</Label>
// 						</div>
// 					</RadioGroup>
// 				</div>

// 				{/* <Button
// 					onClick={handleProceed}
// 					className="mt-6 h-12 w-full rounded-lg bg-sartorial-green text-white text-base font-semibold cursor-pointer"
// 				>
// 					Proceed to Payment
// 				</Button> */}

// 				{selectedMethod === "paypal" ? (
// 					<div className="mt-6">
// 						<PayPalButtons
// 							style={{ layout: "horizontal" }}
// 							createOrder={async () => {
// 								const res = await fetch(
// 									"/api/paypal/create-order",
// 									{
// 										method: "POST",
// 										headers: {
// 											"Content-Type": "application/json",
// 										},
// 										body: JSON.stringify({
// 											amount: totalAmount,
// 										}),
// 									},
// 								);

// 								const data = await res.json();
// 								return data.id;
// 							}}
// 							onApprove={async (data) => {
// 								const res = await fetch(
// 									"/api/paypal/capture-order",
// 									{
// 										method: "POST",
// 										headers: {
// 											"Content-Type": "application/json",
// 										},
// 										body: JSON.stringify({
// 											orderID: data.orderID,
// 										}),
// 									},
// 								);

// 								const details = await res.json();
// 								onConfirm(details);
// 							}}
// 						/>
// 					</div>
// 				) : (
// 					<Button onClick={handleProceed}>Proceed to Payment</Button>
// 				)}
// 			</DialogContent>
// 		</Dialog>
// 	);
// };

// export default PaymentMethodModal;

"use client";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import Image from "next/image";
import { MasterCard, PayPal, Verve, Visa } from "@/assets";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { toast } from "sonner";
import { convertNGNtoUSD } from "@/lib/currency";

interface PaymentMethodModalProps {
	isOpen: boolean;
	onClose: () => void;
	onConfirm: (method: string) => void;
	onPayPalSuccess: (details: any) => void;
	onPayPalError?: (error: any) => void;
	totalAmount: number;
}

const PaymentMethodModal = ({
	isOpen,
	onClose,
	onConfirm,
	onPayPalSuccess,
	onPayPalError,
	totalAmount,
}: PaymentMethodModalProps) => {
	const [selectedMethod, setSelectedMethod] = useState("paystack");
	const [isProcessing, setIsProcessing] = useState(false);

	const totalInUSD = convertNGNtoUSD(totalAmount);

	const handleProceed = () => {
		onConfirm(selectedMethod);
	};

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="sm:max-w-150 p-8 bg-white">
				<DialogHeader>
					<DialogTitle className="text-xl font-semibold text-center text-gray-900">
						Choose Payment Method
					</DialogTitle>
				</DialogHeader>

				<div className="mt-6 space-y-4">
					<RadioGroup
						value={selectedMethod}
						onValueChange={setSelectedMethod}
						className="space-y-4"
					>
						<div
							className={`relative flex items-center space-x-4 rounded-lg border-2 p-6 cursor-pointer transition-all ${
								selectedMethod === "paystack"
									? "border-sartorial-green bg-green-50"
									: "border-gray-200 hover:border-gray-300"
							}`}
							onClick={() => setSelectedMethod("paystack")}
						>
							<RadioGroupItem
								value="paystack"
								id="paystack"
								className="h-5 w-5"
							/>
							<Label
								htmlFor="paystack"
								className="flex-1 cursor-pointer"
							>
								<div className="w-full flex items-center justify-between">
									<div>
										<p className="text-base font-semibold text-gray-900">
											Pay with Paystack
										</p>
										<p className="text-sm text-gray-600 mt-1">
											Cards, Bank Transfers, USSD...
										</p>
									</div>
									<div className="flex items-center gap-3">
										<div className="flex items-center gap-2">
											<Image
												src={Visa}
												alt="Visa"
												width={50}
												height={30}
												className="object-contain"
											/>
											<Image
												src={MasterCard}
												alt="Mastercard"
												width={40}
												height={30}
												className="object-contain"
											/>
											<Image
												src={Verve}
												alt="Verve"
												width={60}
												height={30}
												className="object-contain"
											/>
										</div>
									</div>
								</div>
							</Label>
						</div>

						<div
							className={`relative flex items-center space-x-4 rounded-lg border-2 p-6 cursor-pointer transition-all ${
								selectedMethod === "paypal"
									? "border-sartorial-green bg-green-50"
									: "border-gray-200 hover:border-gray-300"
							}`}
							onClick={() => setSelectedMethod("paypal")}
						>
							<RadioGroupItem
								value="paypal"
								id="paypal"
								className="h-5 w-5"
							/>
							<Label
								htmlFor="paypal"
								className="flex-1 cursor-pointer"
							>
								<div className="w-full flex items-center justify-between">
									<div>
										<p className="text-base font-semibold text-gray-900">
											Pay with PayPal
										</p>
										<p className="text-sm text-gray-600 mt-1">
											Pay via PayPal or Credit/Debit Card
										</p>
									</div>
									<Image
										src={PayPal}
										alt="PayPal"
										width={100}
										height={30}
										className="object-contain"
										unoptimized
									/>
								</div>
							</Label>
						</div>
					</RadioGroup>
				</div>

				{selectedMethod === "paypal" ? (
					<div className="mt-6">
						<PayPalButtons
							style={{ layout: "horizontal" }}
							disabled={isProcessing}
							createOrder={async () => {
								setIsProcessing(true);
								try {
									console.log("Creating PayPal order for:", {
										ngn: totalAmount,
										usd: totalInUSD,
									});

									const res = await fetch(
										"/api/paypal/create-order",
										{
											method: "POST",
											headers: {
												"Content-Type":
													"application/json",
											},
											body: JSON.stringify({
												amount: totalInUSD,
											}),
										},
									);

									const data = await res.json();

									if (!res.ok) {
										console.error(
											"PayPal order creation failed:",
											data,
										);
										throw new Error(
											data.error ||
												"Failed to create order",
										);
									}

									console.log(
										"PayPal order created:",
										data.id,
									);
									return data.id;
								} catch (error: any) {
									console.error(
										"Error creating order:",
										error,
									);
									setIsProcessing(false);
									toast.error(
										error.message ||
											"Failed to create PayPal order. Please try again.",
									);
									if (onPayPalError) {
										onPayPalError(error);
									}
									throw error;
								}
							}}
							onApprove={async (data) => {
								try {
									console.log(
										"Capturing PayPal order:",
										data.orderID,
									);

									const res = await fetch(
										"/api/paypal/capture-order",
										{
											method: "POST",
											headers: {
												"Content-Type":
													"application/json",
											},
											body: JSON.stringify({
												orderID: data.orderID,
											}),
										},
									);

									const details = await res.json();

									if (!res.ok) {
										console.error(
											"PayPal order capture failed:",
											details,
										);
										throw new Error(
											details.error ||
												"Failed to capture order",
										);
									}

									console.log(
										"PayPal order captured:",
										details,
									);
									setIsProcessing(false);
									onPayPalSuccess(details);
								} catch (error: any) {
									console.error(
										"Error capturing order:",
										error,
									);
									setIsProcessing(false);
									toast.error(
										error.message ||
											"Failed to process payment. Please contact support.",
									);
									if (onPayPalError) {
										onPayPalError(error);
									}
								}
							}}
							onCancel={() => {
								setIsProcessing(false);
								console.log("Payment cancelled by user");
								toast.info("Payment cancelled");
							}}
							onError={(err) => {
								setIsProcessing(false);
								console.error("PayPal Button Error:", err);

								let errorMessage =
									"Payment failed. Please try again.";

								// Handle specific PayPal errors
								if (
									err.message?.includes("INSTRUMENT_DECLINED")
								) {
									errorMessage =
										"Your payment method was declined. Please try another card.";
								} else if (
									err.message?.includes("INSUFFICIENT_FUNDS")
								) {
									errorMessage =
										"Insufficient funds. Please use a different payment method.";
								}

								toast.error(errorMessage);

								if (onPayPalError) {
									onPayPalError(err);
								}
							}}
						/>
					</div>
				) : (
					<Button
						onClick={handleProceed}
						className="mt-6 h-12 w-full rounded-lg bg-sartorial-green text-white text-base font-semibold hover:bg-sartorial-green/90 cursor-pointer"
					>
						Proceed to Payment
					</Button>
				)}
			</DialogContent>
		</Dialog>
	);
};

export default PaymentMethodModal;
