import placeholderImage from '~/assets/images/placeholder.png';

export const APP_META_TITLE = 'TechMandu';
export const APP_META_DESCRIPTION =
  'The best place to buy tech products online in Nepal';
// export const DEMO_API_URL = 'https://techmandu-admin.hyperce.io/shop-api';
export const DEMO_API_URL = 'https://techmandu-admin.hyperce.io/shop-api';
export let API_URL =
  typeof process !== 'undefined'
    ? process.env.VENDURE_API_URL ?? DEMO_API_URL
    : DEMO_API_URL;

const DEMO_GOOGLE_CLIENT_ID =
  '623486441336-iecr03ppcqkhp2j158vltp5jd0m5bdab.apps.googleusercontent.com';

export const GOOGLE_CLIENT_ID =
  typeof process !== 'undefined'
    ? process.env.GOOGLE_CLIENT_ID ?? DEMO_GOOGLE_CLIENT_ID
    : DEMO_GOOGLE_CLIENT_ID;

const urlWithoutShopApi = API_URL.replace('/shop-api', '');
export const KHALTI_CALLBACK_URL = `${urlWithoutShopApi}/payment/callback`;
export const QR_PAYMENT_UPLOAD_URL = `${urlWithoutShopApi}/qr-payment/upload`;
export const SELLER_REGISTRATION_ENDPOINT = `${urlWithoutShopApi}/seller-registration/register`;
export const PROFILE_PICTURE_UPLOAD_URL = `${urlWithoutShopApi}/dp/upload`;

export const DELIVERY_ADDRESSES_ENDPOINT =
  'http://docs.hyperce.io/hyperclicks/daraz_delivery_areas.json';

/**
 * This function is used when running in Cloudflare Pages in order to set the API URL
 * based on an environment variable. Env vars work differently in CF Pages and are not available
 * on the `process` object (which does not exist). Instead, it needs to be accessed from the loader
 * context, and if defined we use it here to set the API_URL var which will be used by the
 * GraphQL calls.
 *
 * See https://developers.cloudflare.com/workers/platform/environment-variables/#environmental-variables-with-module-workers
 */
export function setApiUrl(apiUrl: string) {
  API_URL = apiUrl;
}

export const COMPANY_EMAIL = 'admin@techmandu.com.np';
export const COMPANY_PHONE = '+977 9768520433';
export const COMPANY_ADDRESS = 'Kathmandu, Nepal';

export const PLACEHOLDER_IMAGE = placeholderImage;
