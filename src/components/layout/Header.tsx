"use client";
import { CartIcon, Sartorial, SearchIcon, UserIcon } from "@/assets";
import { headerLinks } from "@/lib/data";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = () => {
	const pathname = usePathname();

	return (
		<header className="w-full">
			<div className="bg-sartorial-green text-white flex justify-center items-center py-2">
				<p className="text-white">Welcome to Sartorial Store!</p>
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
									pathname === href && "after:scale-x-100"
								)}
							>
								{label}
							</Link>
						))}
					</div>
				</div>
				<div className="flex items-center gap-2">
					<SearchIcon className="h-5 w-5 text-sartorial-green cursor-pointer" />
					<CartIcon className="h-7 w-7 text-sartorial-green cursor-pointer" />
					<UserIcon className="h-5 w-5 text-sartorial-green cursor-pointer" />
				</div>
			</div>
		</header>
	);
};

export default Header;
