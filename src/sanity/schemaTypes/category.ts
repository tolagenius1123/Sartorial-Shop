import { Tag } from "lucide-react";
import { defineField, defineType } from "sanity";

const categoryType = defineType({
	name: "category",
	title: "Category",
	type: "document",
	icon: Tag,
	fields: [
		defineField({
			name: "title",
			title: "Title",
			type: "string",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "slug",
			title: "Slug",
			type: "slug",
			options: {
				source: "title",
			},
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "description",
			title: "Description",
			type: "text",
		}),
	],
	preview: {
		select: {
			title: "title",
			subtitle: "description",
		},
	},
});

export default categoryType;
