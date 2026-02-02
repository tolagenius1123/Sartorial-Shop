import { ReactNode } from "react";

type FAQProps = {
	id: number;
	question: string;
	answer: ReactNode;
	active?: number | undefined;
};

const faqList: FAQProps[] = [
	{
		id: 1,
		question: "Do Sartorial offer nationwide delivery?",
		answer: (
			<>
				Yes, we offer nationwide delivery across Nigeria. Orders are
				delivered to all major cities and towns through our trusted
				logistics partners.
			</>
		),
	},
	{
		id: 2,
		question: "How long does delivery take?",
		answer: (
			<>
				Delivery typically takes between 2–5 business days, depending on
				your location. Orders within major cities may arrive sooner,
				while remote areas may take slightly longer.
			</>
		),
	},
	{
		id: 3,
		question: "Can I pay on delivery?",
		answer: (
			<>
				Yes, we offer Pay on Delivery for selected locations.
				Availability may vary depending on your delivery address and
				order size.
			</>
		),
	},
	{
		id: 4,
		question: "Can I return or exchange a bag?",
		answer: (
			<>
				Yes, we offer Pay on Delivery for selected locations.
				Availability may vary depending on your delivery address and
				order size.
			</>
		),
	},
	{
		id: 5,
		question: "What materials are Sartorial bags made from?",
		answer: (
			<>
				Yes, we offer Pay on Delivery for selected locations.
				Availability may vary depending on your delivery address and
				order size.
			</>
		),
	},
	{
		id: 6,
		question: "Are sartorial bags original?",
		answer: (
			<>
				Yes, we offer Pay on Delivery for selected locations.
				Availability may vary depending on your delivery address and
				order size.
			</>
		),
	},
	{
		id: 7,
		question: "Do Sartorial offer wholesale or bulk purchases?",
		answer: (
			<>
				Yes, we offer Pay on Delivery for selected locations.
				Availability may vary depending on your delivery address and
				order size.
			</>
		),
	},
	{
		id: 8,
		question: "Do you offer refunds?",
		answer: (
			<>
				Yes, we offer Pay on Delivery for selected locations.
				Availability may vary depending on your delivery address and
				order size.
			</>
		),
	},
	{
		id: 9,
		question: "How can I contact customer support?",
		answer: (
			<>
				Yes, we offer Pay on Delivery for selected locations.
				Availability may vary depending on your delivery address and
				order size.
			</>
		),
	},
	{
		id: 10,
		question: "Are the products photo accurate?",
		answer: (
			<>
				Yes, we offer Pay on Delivery for selected locations.
				Availability may vary depending on your delivery address and
				order size.
			</>
		),
	},
	{
		id: 11,
		question: "Do you offer custom or personalized bags?",
		answer: (
			<>
				Yes, we offer Pay on Delivery for selected locations.
				Availability may vary depending on your delivery address and
				order size.
			</>
		),
	},
];

export default faqList;
