// "use client";
// import { usePaystackPayment } from "react-paystack";

// export const usePaystackCheckout = ({
// 	email,
// 	amount,
// 	onSuccess,
// 	onClose,
// 	metadata,
// }: {
// 	email: string;
// 	amount: number;
// 	onSuccess: (ref: any) => void;
// 	onClose: () => void;
// 	metadata?: Record<string, any>;
// }) => {
// 	const config = {
// 		reference: `${new Date().getTime()}`,
// 		email,
// 		amount: Math.round(amount * 100),
// 		publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!,
// 		metadata,
// 	};

// 	const initializePayment = usePaystackPayment(config);

// 	const handlePayment = () => {
// 		initializePayment(onSuccess, onClose);
// 	};

// 	return handlePayment;
// };

// import { usePaystackPayment } from "react-paystack";

// export const usePaystackCheckout = ({
// 	email,
// 	amount,
// 	onSuccess,
// 	onClose,
// 	metadata,
// }: {
// 	email: string;
// 	amount: number;
// 	onSuccess: (ref: any) => void;
// 	onClose: () => void;
// 	metadata?: Record<string, any>;
// }) => {
// 	const config = {
// 		reference: `${new Date().getTime()}`,
// 		email,
// 		amount: Math.round(amount * 100),
// 		publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!,
// 		metadata,
// 	};

// 	const initializePayment = usePaystackPayment(config);

// 	const handlePayment = () => {
// 		initializePayment({ onSuccess, onClose });
// 	};

// 	return handlePayment;
// };

"use client";
import { usePaystackPayment } from "react-paystack";

export const usePaystackCheckout = ({
	email,
	amount,
	formData,
	items,
	onSuccess,
	onClose,
}: {
	email: string;
	amount: number;
	formData: any;
	items: any[];
	onSuccess: (ref: any) => void;
	onClose: () => void;
}) => {
	const config = {
		reference: `${new Date().getTime()}`,
		email,
		amount: Math.round(amount * 100),
		publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!,
		metadata: {
			formData,
			items,
			custom_fields: [
				{
					display_name: "Customer Name",
					variable_name: "customer_name",
					value: `${formData.firstName} ${formData.lastName}`,
				},
				{
					display_name: "Phone Number",
					variable_name: "phone_number",
					value: formData.phoneNo,
				},
			],
		},
	};

	const initializePayment = usePaystackPayment(config);

	const handlePayment = () => {
		initializePayment({ onSuccess, onClose });
	};

	return handlePayment;
};
