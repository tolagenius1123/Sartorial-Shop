import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ListFilter, Check } from "lucide-react";
import { sortOptions } from "@/data";

type SortByDropdownProps = {
	selectedSort: string;
	setSelectedSort: (option: string) => void;
};

export function SortByDropdown({
	selectedSort,
	setSelectedSort,
}: SortByDropdownProps) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="outline"
					className="flex items-center gap-4 rounded-sm border-2 border-sartorial-green bg-[#F1F3F4] px-8 py-5 text-sm font-medium text-sartorial-green hover:bg-[#e8eaeb] hover:text-sartorial-green cursor-pointer"
				>
					<ListFilter className="h-8 w-8 stroke-[2.5px]" />
					<span>Sort by</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="start" className="mr-20 z-20">
				{sortOptions.map((option) => (
					<DropdownMenuItem
						key={option}
						onClick={() => setSelectedSort(option)}
						className="cursor-pointer py-3"
					>
						<span className="flex items-center justify-between w-full">
							{option}
							{selectedSort === option && (
								<Check className="h-4 w-4 ml-2" />
							)}
						</span>
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
