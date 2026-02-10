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

import { usePaystackPayment } from "react-paystack";

export const usePaystackCheckout = ({
	email,
	amount,
	onSuccess,
	onClose,
	metadata,
}: {
	email: string;
	amount: number;
	onSuccess: (ref: any) => void;
	onClose: () => void;
	metadata?: Record<string, any>;
}) => {
	const config = {
		reference: `${new Date().getTime()}`,
		email,
		amount: Math.round(amount * 100), // Paystack expects Kobo/Cents
		publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!,
		metadata,
	};

	const initializePayment = usePaystackPayment(config);

	const handlePayment = () => {
		// FIX: Pass callbacks as named properties in an object
		initializePayment({ onSuccess, onClose });
	};

	return handlePayment;
};
