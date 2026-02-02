import { ChevronRight } from "lucide-react";
import { ReactNode } from "react";

type AccordionProps = {
	id: number;
	question: string;
	answer: ReactNode;
	isActive: boolean;
	onToggle: () => void;
};

const Accordion = ({
	id,
	question,
	answer,
	isActive,
	onToggle,
}: AccordionProps) => {
	return (
		<div
			className={`bg-white rounded-sm w-full p-5 border border-sartorial-green/40 duration-300 group ${
				isActive ? "is-active" : ""
			}`}
		>
			<div className="flex flex-col gap-4">
				<div className="flex items-center gap-3">
					<p className="w-full text-xl font-semibold group-[.is-active]:font-bold duration-300">
						{id}. {question}
					</p>

					<div
						className="text-xl rotate-90 group-[.is-active]:rotate-270 duration-300 cursor-pointer"
						onClick={onToggle}
					>
						<ChevronRight />
					</div>
				</div>

				<div className="overflow-hidden max-h-0 group-[.is-active]:max-h-96 transition-all duration-300">
					{answer}
				</div>
			</div>
		</div>
	);
};

export default Accordion;
