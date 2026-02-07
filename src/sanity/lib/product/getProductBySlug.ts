import { client } from "../client";
import { groq } from "next-sanity";

export const getProductBySlug = async (slug: string) => {
	const query = groq`
    *[_type == "product" && slug.current == $slug][0] {
      _id,
      name,
      "slug": slug.current,
      price,
      stock,
      description,
      isBestSeller,
      isNewArrival,
      images[]{
        alt,
        asset->{url},
        "color": color->{
          _id,
          title,
          hex
        }
      },
      colors[]->{
        _id,
        title,
        hex
      },
      categories[]->{
        _id,
        name
      }
    }
  `;

	return client.fetch(query, { slug });
};
