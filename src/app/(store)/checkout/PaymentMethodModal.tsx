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

interface PaymentMethodModalProps {
	isOpen: boolean;
	onClose: () => void;
	onConfirm: (method: string) => void;
}

const PaymentMethodModal = ({
	isOpen,
	onClose,
	onConfirm,
}: PaymentMethodModalProps) => {
	const [selectedMethod, setSelectedMethod] = useState("paystack");

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

				<Button
					onClick={handleProceed}
					className="mt-6 h-12 w-full rounded-lg bg-sartorial-green text-white text-base font-semibold cursor-pointer"
				>
					Proceed to Payment
				</Button>
			</DialogContent>
		</Dialog>
	);
};

export default PaymentMethodModal;
