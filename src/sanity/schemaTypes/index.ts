import { type SchemaTypeDefinition } from "sanity";
import productType from "./product";
import categoryType from "./category";
import colorType from "./color";
import { blockContentType } from "./blockContent";
import orderType from "./order";

export const schema: { types: SchemaTypeDefinition[] } = {
	types: [productType, categoryType, colorType, blockContentType, orderType],
};
