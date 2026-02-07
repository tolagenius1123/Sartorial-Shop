import { defineType, defineField } from "sanity";

const colorType = defineType({
	name: "color",
	title: "Color",
	type: "document",
	fields: [
		defineField({
			name: "title",
			title: "Color Name",
			type: "string",
			validation: (Rule) => Rule.required(),
		}),
	],
});

export default colorType;
