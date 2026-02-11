import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import PayPalProvider from "@/components/layout/PayPalProvider";

const inter = Inter({
	subsets: ["latin"],
	variable: "--font-inter",
	display: "swap",
});

export const metadata: Metadata = {
	title: "Sartorial",
	description: "Something for Everyone.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ClerkProvider dynamic>
			<html lang="en" className="scroll-smooth">
				<body className={`${inter.variable} antialiased`}>
					<PayPalProvider>{children}</PayPalProvider>
					<Toaster position="top-right" richColors />
				</body>
			</html>
		</ClerkProvider>
	);
}
