"use client";
import type { ChangeEvent, FocusEvent, ReactNode } from "react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";

type CustomInputProps = {
	containerStyle?: string;
	label?: string;
	labelStyle?: string;
	inputStyle?: string;
	id: string;
	type: string;
	placeholder?: string;
	iconLeft?: ReactNode;
	iconRight?: ReactNode;
	// formik props
	value: string;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
	onBlur: (e: FocusEvent<HTMLInputElement>) => void;
	error?: string;
	touched?: boolean;
};

const CustomInput = ({
	containerStyle,
	label,
	labelStyle,
	inputStyle,
	id,
	type,
	placeholder,
	iconLeft,
	iconRight,
	value,
	onChange,
	onBlur,
	error,
	touched,
}: CustomInputProps) => {
	const [showPassword, setShowPassword] = useState(false);

	const handleTogglePassword = () => {
		setShowPassword(!showPassword);
	};

	const inputType = type === "password" && showPassword ? "text" : type;
	const hasError = touched && error;

	return (
		<div className={`grid w-full items-center gap-2 ${containerStyle}`}>
			{label && (
				<Label htmlFor={id} className={labelStyle}>
					{label}
				</Label>
			)}
			<div className="relative flex items-center">
				{iconLeft && (
					<div className="absolute top-1/2 left-3 z-10 -translate-y-1/2 text-gray-400">
						{iconLeft}
					</div>
				)}
				<Input
					type={inputType}
					id={id}
					placeholder={placeholder}
					className={`${inputStyle} ${iconLeft ? "pl-10" : "pl-4"} ${
						iconRight ? "pr-10" : "pr-4"
					} ${
						hasError
							? "border-destructive focus-visible:ring-destructive"
							: ""
					}`}
					value={value}
					onChange={onChange}
					onBlur={onBlur}
				/>
				{type === "password" ? (
					<div
						className="absolute top-1/2 right-3 z-10 -translate-y-1/2 cursor-pointer text-gray-400"
						onClick={handleTogglePassword}
					>
						{showPassword ? (
							<EyeOff className="h-4 w-4" />
						) : (
							<Eye className="h-4 w-4" />
						)}
					</div>
				) : (
					iconRight && (
						<div className="absolute top-1/2 right-3 z-10 -translate-y-1/2 text-gray-400">
							{iconRight}
						</div>
					)
				)}
			</div>
			<p className="text-destructive text-sm">{error ? error : ""}</p>
			{/* {hasError && <p className="text-destructive text-sm">{error}</p>} */}
		</div>
	);
};

export default CustomInput;
