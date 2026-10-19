import gql from 'graphql-tag';
import { CreateContactInput } from '~/generated/graphql';
import { UnsubscribeFromNewsletterInput } from '~/generated/graphql';
import { QueryOptions, sdk } from '~/graphqlWrapper';

export function activeChannel(options: QueryOptions) {
  return sdk
    .activeChannel(undefined, options)
    .then(({ activeChannel }) => activeChannel);
}

export function getBanner(options: QueryOptions) {
  return sdk
    .getBanner(undefined, options)
    .then(({ heroSectionBanners }) => heroSectionBanners);
}

export function subscribeToNewsLetter(
  input: { email: string },
  options: QueryOptions,
) {
  return sdk
    .Newsletter({ input }, options)
    .then(({ subscribeToNewsletter }) => subscribeToNewsletter);
}

export function unSubscribeNewsLetter(
  input: UnsubscribeFromNewsletterInput,
  options: QueryOptions,
) {
  return sdk
    .unSubscribeNewsLetter({ input }, options)
    .then(({ unsubscribeFromNewsletter }) => unsubscribeFromNewsletter);
}

export function getSocialLinks(options: QueryOptions) {
  return sdk
    .GetSocialLinks(undefined, options)
    .then(({ activeChannel }) => activeChannel.customFields?.socialLinks);
}

export function createContact(input: CreateContactInput, options: QueryOptions) {
  return sdk
    .Contact({ input }, options)
    .then(({ createContact }) => createContact);
}

gql`
  query activeChannel {
    activeChannel {
      id
      currencyCode
      customFields {
        heroSection {
          buttonLabel
          buttonUrl
          heading
          imageUrl
          subtext
          tagline
        }
      }
    }
  }
`;

gql`
  query getBanner {
    heroSectionBanners {
      id
      title
      description
      ctaLink
      ctaText
      image {
        mimeType
        preview
        source
      }
    }
  }
`;
gql`
  mutation Newsletter($input: SubscribeToNewsletterInput!) {
    subscribeToNewsletter(input: $input) {
      created
      success
      __typename
    }
  }
`;

gql`
  mutation unSubscribeNewsLetter($input: UnsubscribeFromNewsletterInput!) {
    unsubscribeFromNewsletter(input: $input) {
      success
      removed
    }
  }
`;

gql`
  query GetSocialLinks {
    activeChannel {
      id
      customFields {
        socialLinks {
          facebook
          instagram
          linkedin
          tiktok
          twitter
          whatsapp
          youtube
        }
      }
    }
  }
`

gql`
mutation Contact($input: CreateContactInput!){
  createContact(input: $input) {
    name
    phone
    emailAddress
    subject
    message
  }
}
`
