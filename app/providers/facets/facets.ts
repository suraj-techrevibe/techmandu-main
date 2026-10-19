import gql from 'graphql-tag';
import { FacetListOptions } from '~/generated/graphql';
import { QueryOptions, sdk } from '~/graphqlWrapper';

export async function getFacets(options: FacetListOptions, opt: QueryOptions) {
  return sdk.facets({ options }, opt);
}

gql`
  query facets($options: FacetListOptions) {
    facets(options: $options) {
      items {
        id
        name
        code
        values {
          id
          name
          code
        }
      }
    }
  }
`;
