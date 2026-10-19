import gql from 'graphql-tag';
import { QueryOptions, sdk } from '../../graphqlWrapper';
import { ProductListOptions, SearchQueryVariables } from '~/generated/graphql';

export function search(variables: SearchQueryVariables, options: QueryOptions) {
  return sdk.search(variables, options);
}

export function searchFacetValues(
  variables: SearchQueryVariables,
  options: QueryOptions,
) {
  return sdk.searchFacetValues(variables, options);
}

export function getProductBySlug(slug: string, options: QueryOptions) {
  return sdk.product({ slug }, options);
}

export function getProducts(
  productOptions: ProductListOptions,
  options: QueryOptions,
) {
  return sdk.Products({ options: productOptions }, options);
}

export function getCustomProducts(
  productOptions: ProductListOptions,
  options: QueryOptions,
) {
  return sdk.CustomProduct({ options: productOptions }, options);
}

export function getRelatedProducts(productSlug: string, options: QueryOptions) {
  return sdk.RelatedProducts({ productSlug }, options);
}

export const detailedProductFragment = gql`
  fragment DetailedProduct on Product {
    id
    name
    slug
    description
    collections {
      id
      slug
      name
      breadcrumbs {
        id
        name
        slug
      }
    }
    facetValues {
      facet {
        id
        code
        name
      }
      id
      code
      name
    }
    featuredAsset {
      id
      preview
    }
    assets {
      id
      preview
    }
    optionGroups {
      id
      code
      name
      options {
        id
        code
        name
      }
    }
    variants {
      id
      name
      isInWishlist
      priceWithTax
      currencyCode
      sku
      stockLevel
      featuredAsset {
        id
        preview
      }
      assets {
        id
        preview
      }
      customFields {
        audPrice
        nprPrice
        usdPrice
        specification {
          isPinned
          key
          value
        }
        return
      }
      prices {
        customFields {
          discountPrice
          discountPercentage
        }
      }
      options {
        id
        code
        name
        groupId
        group {
          id
          code
          name
        }
      }
    }
    customFields {
      additionalInfo
      youtubeVideoLink
    }
  }
`;
// additionalInformation removed from customFields above
gql`
  query product($slug: String, $id: ID) {
    product(slug: $slug, id: $id) {
      ...DetailedProduct
    }
  }
`;

export const listedProductFragment = gql`
  fragment ListedProduct on SearchResult {
    productId
    productVariantId
    productName
    slug
    productAsset {
      id
      preview
    }
    prices {
      customFields {
        discountPercentage
        discountPrice
      }
    }
    currencyCode
    priceWithTax {
      __typename
      ... on PriceRange {
        min
        max
      }
      ... on SinglePrice {
        value
      }
    }
  }
`;

gql`
  query search($input: SearchInput!) {
    search(input: $input) {
      totalItems
      items {
        ...ListedProduct
      }
    }
  }
  ${listedProductFragment}
`;

gql`
  query searchFacetValues($input: SearchInput!) {
    search(input: $input) {
      totalItems
      facetValues {
        count
        facetValue {
          id
          name
          facet {
            id
            name
          }
        }
      }
    }
  }
  ${listedProductFragment}
`;

gql`
  query Products($options: ProductListOptions) {
    products(options: $options) {
      items {
        id
        name
        slug
        variants {
          id
          isInWishlist
          productId
          price
          priceWithTax
          currencyCode
          stockLevel
          customFields {
            audPrice
            nprPrice
            usdPrice
          }
          prices {
            price
            discountPrice
            currencyCode
            customFields {
              discountPrice
              discountPercentage
            }
          }
        }
        featuredAsset {
          preview
        }
      }
      totalItems
    }
  }
`;

gql`
  query CustomProduct($options: ProductListOptions) {
    products(options: $options) {
      items {
        id
        name
        slug
        description
        assets {
          source
          preview
        }
        customFields {
          additionalInfo
        }
      }
    }
  }
`;

gql`
  query RelatedProducts($productSlug: String!) {
    relatedProducts(productSlug: $productSlug) {
      id
      slug
      name
      variants {
        id
        priceWithTax
        isInWishlist
        productId
        price
        currencyCode
        stockLevel
        prices {
          price
          discountPrice
          currencyCode
          customFields {
            discountPrice
            discountPercentage
          }
        }
      }
      featuredAsset {
        preview
      }
    }
  }
`;
