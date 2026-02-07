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
		defineField({
			name: "hex",
			title: "Hex Code",
			type: "string",
			description: "Color hex code, e.g., #FF0000",
			validation: (Rule) =>
				Rule.required().regex(/^#([0-9A-Fa-f]{6})$/, {
					name: "hex",
				}),
		}),
	],
});

export default colorType;
