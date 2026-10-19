import gql from "graphql-tag";
import { QueryOptions, sdk } from "~/graphqlWrapper";

export function addItemToWishList(productVariantId: string, options: QueryOptions,) {
  return sdk
    .AddToWishlist({ productVariantId }, options)
    .then(({ addToWishlist }) => addToWishlist);
}

export function removeItemFromWishList(productVariantId: string, options: QueryOptions,) {
  return sdk
    .RemoveFromWishlist({ productVariantId }, options)
    .then(({ removeFromWishlist }) => removeFromWishlist);
}

export function getWishlists(options: QueryOptions) {
  return sdk
    .GetWishlists({}, options)
    .then(({ wishlists }) => wishlists);
}

gql`
mutation AddToWishlist($productVariantId: ID!) {
   addToWishlist(productVariantId: $productVariantId) {
    id
     __typename
    productVariant {
      id
      name
    }
   }
}
`

gql`
mutation RemoveFromWishlist($productVariantId: ID!) {
    removeFromWishlist (productVariantId: $productVariantId)  
    {
      message
      result
    } 
}
`

gql`
query GetWishlists {
   wishlists{
    totalItems
    items{
      id
      productVariant{
        id
        name
				       product{
                 featuredAsset{
                  preview
                  id
                }
                collections{
                  id
                  name
                }
              }
        prices{
          currencyCode
          price
          discountPrice
        }
        priceWithTax
        stockLevel
      }
    }
  }
}
`