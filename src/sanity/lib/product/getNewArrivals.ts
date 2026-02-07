import { client } from "../client";
import { groq } from "next-sanity";

export const getNewArrivals = async () => {
	const query = groq`
    *[_type == "product" && isNewArrival == true] | order(_createdAt desc) {
      _id,
      name,
      "slug": slug.current,
      price,
      stock,
      isBestSeller,
      isNewArrival,
      images[]{ asset->{url}, alt }
    }
  `;
	return client.fetch(query);
};
