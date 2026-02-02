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
import { Heart } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Cart from "./Cart";

const Header = () => {
	const pathname = usePathname();

	return (
		<header className="w-full fixed z-50 bg-white">
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
			<div className="flex items-center bg-sartorial-offWhite px-10 py-2 border-b border-gray-200 justify-between">
				<Link href="/">
					<Sartorial />
				</Link>
				<div className="hidden md:flex items-center gap-20 mr-10">
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
									pathname === href && "after:scale-x-100",
								)}
							>
								{label}
							</Link>
						))}
					</div>
				</div>
				<div className="flex items-center gap-2">
					<SearchIcon className="h-5 w-5 text-sartorial-green cursor-pointer" />
					<Cart />
					<Heart
						className={`w-5 h-5 transition-colors cursor-pointer fill-none text-sartorial-green`}
					/>
					<UserIcon className="h-5 w-5 text-sartorial-green cursor-pointer" />
				</div>
			</div>
		</header>
	);
};

export default Header;
