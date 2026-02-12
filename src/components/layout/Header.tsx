"use client";
import {
	FacebookIcon,
	IgIcon,
	Sartorial,
	SearchIcon,
	TikTokIcon,
	UserIcon,
	WhatsappIcon,
} from "@/assets";
import { headerLinks } from "@/data";
import { cn } from "@/lib/utils";
import { Heart, Package, Star } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { useWishlistStore } from "@/store/useWishlistStore";
import { ClerkLoaded, SignInButton, UserButton, useUser } from "@clerk/nextjs";
import MobileHeaderLinks from "./MobileHeaderLinks";
import { Button } from "../ui/button";
import { toast } from "sonner";

const Cart = dynamic(() => import("./Cart"), { ssr: false });

const Header = () => {
	const { user, isSignedIn } = useUser();
	const router = useRouter();
	const pathname = usePathname();
	const wishlistCount = useWishlistStore((state) => state.items.length);

	const handleWishlist = () => {
		if (!isSignedIn) {
			toast.error("Please sign in to manage your wishlist", {
				description: "You need an account to save items for later.",
			});
			return;
		}

		router.push("/wishlist");
	};

	return (
		<header className="w-full fixed z-50 bg-white">
			{pathname === "/" && (
				<div className="bg-sartorial-green text-white py-2 px-4 md:px-10 lg:px-20">
					<div className="relative flex items-center justify-between md:justify-center">
						<p className="text-sm font-medium">
							Welcome to Sartorial Store!
						</p>

						<div className="absolute right-0 flex items-center gap-3">
							<Link
								href="/"
								className="hover:opacity-80 transition-opacity"
							>
								<IgIcon />
							</Link>
							<Link
								href="/"
								className="hover:opacity-80 transition-opacity"
							>
								<FacebookIcon />
							</Link>
							<Link
								href="/"
								className="hover:opacity-80 transition-opacity"
							>
								<TikTokIcon />
							</Link>
							<Link
								href="/"
								className="hover:opacity-80 transition-opacity"
							>
								<WhatsappIcon />
							</Link>
						</div>
					</div>
				</div>
			)}
			<div className="flex items-center bg-sartorial-offWhite px-5 md:px-10 py-2 border-b border-gray-200 justify-between">
				<div className="flex items-center gap-40">
					<div className="flex items-center">
						<MobileHeaderLinks />
						<Link href="/">
							<Sartorial />
						</Link>
					</div>
					<div className="hidden md:flex items-center gap-20">
						<div className="flex items-center gap-10">
							{headerLinks.map(({ href, label }) => (
								<Link
									key={href}
									href={href}
									className={cn(
										"relative font-semibold text-sartorial-green transition-colors duration-300",
										"after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-full",
										"after:origin-left after:scale-x-0 after:bg-sartorial-green after:transition-transform after:duration-300",
										"hover:text-sartorial-green hover:after:scale-x-100",
										pathname === href &&
											"after:scale-x-100",
									)}
								>
									{label}
								</Link>
							))}
						</div>
					</div>
				</div>
				<div className="flex items-center gap-2">
					<Link
						href="/search"
						className="hover:bg-gray-100 cursor-pointer p-2 rounded-sm"
					>
						<SearchIcon className="h-5 w-5 text-sartorial-green cursor-pointer" />
					</Link>
					<Cart />
					<Button
						className="relative border-none shadow-none cursor-pointer"
						variant="outline"
						onClick={handleWishlist}
					>
						<Heart className="w-5 h-5 cursor-pointer text-sartorial-green" />

						{wishlistCount > 0 && (
							<span className="absolute -top-2 -right-2 bg-white text-green-900 text-xs px-1 rounded-full">
								{wishlistCount}
							</span>
						)}
					</Button>
					{/* <UserIcon className="h-5 w-5 text-sartorial-green cursor-pointer" /> */}
					<ClerkLoaded>
						{user ? (
							<div className="flex items-center space-x-2">
								<UserButton>
									<UserButton.MenuItems>
										<UserButton.Link
											label="My Orders"
											href="/account/orders"
											labelIcon={
												<Package className="h-4 w-4" />
											}
										/>
										<UserButton.Link
											label="My Reviews"
											href="/account/reviews"
											labelIcon={
												<Star className="h-4 w-4" />
											}
										/>
									</UserButton.MenuItems>
								</UserButton>

								<div className="hidden sm:block text-xs">
									<p className="text-sartorial-green">
										Welcome Back
									</p>
									<p className="font-bold">
										{user.fullName}!
									</p>
								</div>
							</div>
						) : (
							<SignInButton mode="modal">
								<div className="flex items-center gap-2 cursor-pointer group">
									<UserIcon className="h-5 w-5 text-sartorial-green group-hover:scale-110 transition-transform" />
									{/* <span className="text-xs font-bold uppercase tracking-tighter">
										Login
									</span> */}
								</div>
							</SignInButton>
						)}
					</ClerkLoaded>
				</div>
			</div>
		</header>
	);
};

export default Header;
