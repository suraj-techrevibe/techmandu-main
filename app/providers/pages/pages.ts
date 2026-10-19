import gql from 'graphql-tag';
import { sdk } from '~/graphqlWrapper';

export function getStaticPages() {
  return sdk.getStaticPages().then(({ pages }) => pages);
}

export function getStaticPage(slug: string) {
  return sdk.getStaticPage({ slug }).then(({ page }) => page);
}

gql`
  query getStaticPages {
    pages {
      items {
        id
        title
        slug
        group {
          name
          slug
        }
      }
    }
  }
`;

gql`
  query getStaticPage($slug: String!) {
    page(slug: $slug) {
      id
      title
      content
      slug
    }
  }
`;
