import React from "react";
import { cn } from "@/lib/utils";

export interface TabItem {
	id: string;
	label: string;
	icon?: React.ReactNode;
	value?: number;
}

interface TabsProps {
	tabs: TabItem[];
	activeTab: string;
	onChange: (id: string) => void;
}

const Tabs: React.FC<TabsProps> = ({ tabs, activeTab, onChange }) => {
	return (
		<div className="flex flex-wrap items-center font-bold">
			{tabs.map((tab) => (
				<div
					key={tab.id}
					className={cn(
						"flex cursor-pointer items-center gap-1 border-b px-4 py-2 transition-colors lg:px-5",
						activeTab === tab.id && "border-sartorial-green",
						// : "border-[#D1D5DB]",
					)}
					onClick={() => onChange(tab.id)}
				>
					{/* {tab.icon &&
						React.cloneElement(
							tab.icon as React.ReactElement<any>,
							{
								color:
									activeTab === tab.id
										? "#5C068C"
										: "#D1D5DB",
							},
						)} */}
					<span
						className={`font-medium ${
							activeTab === tab.id
								? "text-sartorial-green"
								: "text-[#868686]"
						}`}
					>
						{tab.label}{" "}
						{tab.value !== undefined && `(${tab.value})`}
					</span>
				</div>
			))}
		</div>
	);
};

export default Tabs;
