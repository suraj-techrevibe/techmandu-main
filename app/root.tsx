import { cssBundleHref } from '@remix-run/css-bundle';
import {
  isRouteErrorResponse,
  Link,
  Links,
  LiveReload,
  Meta,
  MetaFunction,
  Outlet,
  Scripts,
  ScrollRestoration,
  ShouldRevalidateFunction,
  useLoaderData,
  useRouteError,
} from '@remix-run/react';
import {
  DataFunctionArgs,
  json,
  LinksFunction,
} from '@remix-run/server-runtime';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useChangeLanguage } from 'remix-i18next';
import { toast, Toaster } from 'sonner';
import 'sonner/dist/styles.css';
import { CartTray } from '~/components/cart/CartTray';
import { APP_META_DESCRIPTION, APP_META_TITLE } from '~/constants';
import { getI18NextServer } from '~/i18next.server';
import { activeChannel, getSocialLinks } from '~/providers/channel/channel';
import { getCollections } from '~/providers/collections/collections';
import { getActiveCustomer } from '~/providers/customer/customer';
import { useActiveOrder } from '~/utils/use-active-order';
import NewFooter from './components/footer/NewFooter';
import { Header } from './components/header/Header';
import NewsLetter from './components/NewsLetter/NewsLetter';
import { OrderDetailFragment, SortOrder } from './generated/graphql';
import { getStaticPages } from './providers/pages/pages';
import { getExchangeRate } from './providers/rates/rate';
import stylesheet from './tailwind.css';
import { CompareFloatingButton } from '~/components/compare/CompareFloatingButton';
import { getActiveOrder } from './providers/orders/order';
import { transitionOrderToState } from './providers/checkout/checkout';

export const meta: MetaFunction = () => {
  return [{ title: APP_META_TITLE }, { description: APP_META_DESCRIPTION }];
};

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: stylesheet },
  ...(cssBundleHref ? [{ rel: 'stylesheet', href: cssBundleHref }] : []),
];

// The root data does not change once loaded.
export const shouldRevalidate: ShouldRevalidateFunction = ({
  nextUrl,
  currentUrl,
  formAction,
}) => {
  if (currentUrl.pathname === '/sign-in') {
    // just logged in
    return true;
  }
  if (currentUrl.pathname === '/account' && nextUrl.pathname === '/') {
    // just logged out
    return true;
  }
  if (formAction === '/checkout/payment') {
    // submitted payment for order
    return true;
  }
  if (
    currentUrl.pathname.includes('/products/') &&
    nextUrl.pathname === '/checkout'
  ) {
    return true;
  }
  if (formAction == '/api/logout') {
    return true;
  }
  return false;
};

export type RootLoaderData = {
  activeCustomer: Awaited<ReturnType<typeof getActiveCustomer>>;
  activeChannel: Awaited<ReturnType<typeof activeChannel>>;
  topLevelCollections: Awaited<ReturnType<typeof getCollections>>;
  allCollections: Awaited<ReturnType<typeof getCollections>>;
  rates: Awaited<ReturnType<typeof getExchangeRate>>;
  staticPages: Awaited<ReturnType<typeof getStaticPages>>;
  socialLinks: Awaited<ReturnType<typeof getSocialLinks>>;
  locale: string;
};

export async function loader({ request }: DataFunctionArgs) {
  const collections = await getCollections(request, {
    take: 20,
    sort: {
      popularityScore: SortOrder.Desc,
    },
  });
  const navCollections = await getCollections(request, {
    filter: {
      showInNavBar: {
        eq: true,
      },
    },
  });

  // This section is to ensure that if user redeems techcoins and redirects to any other page from /checkout/payment, the order is set to AddingItems and User can still add / remove items.

  const url = new URL(request.url);
  const pathname = url.pathname;
  const activeOrder = await getActiveOrder({ request });
  if (
    activeOrder &&
    pathname !== '/checkout/payment' &&
    activeOrder.state !== 'AddingItems'
  ) {
    await transitionOrderToState('AddingItems', {
      request,
    });
  }
  const staticPages = await getStaticPages();
  const rates = await getExchangeRate({ request });
  const socialLinks = await getSocialLinks({ request });
  const topLevelCollections = navCollections.filter(
    (collection) => collection.parent?.name === '__root_collection__',
  );
  const activeCustomer = await getActiveCustomer({ request });
  const locale = await getI18NextServer().then((i18next) =>
    i18next.getLocale(request),
  );

  const loaderData: RootLoaderData = {
    activeCustomer,
    activeChannel: await activeChannel({ request }),
    topLevelCollections: topLevelCollections,
    rates: rates,
    staticPages: staticPages,
    socialLinks: socialLinks,
    locale,
    allCollections: collections,
  };

  return json(loaderData, { headers: activeCustomer._headers });
}

export default function App() {
  const [open, setOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  const loaderData = useLoaderData<RootLoaderData>();
  const { topLevelCollections, allCollections, staticPages, socialLinks } =
    loaderData;
  const { locale } = useLoaderData<typeof loader>();
  const { i18n } = useTranslation();
  const {
    activeOrderFetcher,
    activeOrder,
    adjustOrderLine,
    removeItem,
    refresh,
  } = useActiveOrder();
  useChangeLanguage(locale);
  useEffect(() => {
    // When the loader has run, this implies we should refresh the contents
    // of the activeOrder as the user may have signed in or out.
    // We only refresh if the activeOrderFetcher is idle and doesn't have action data
    if (
      activeOrderFetcher.state === 'idle' &&
      !(activeOrderFetcher.data as any)?.success
    ) {
      refresh();
    }
  }, [loaderData]);

  // Toast notification when product is added to cart
  useEffect(() => {
    const data = activeOrderFetcher.data as any;
    const state = activeOrderFetcher.state;

    if (data && data.success) {
      const toastId = data.toastTriggered;

      if ((window as any)._lastToastId === toastId) return;
      (window as any)._lastToastId = toastId;

      const { addedProductInfo } = data;

      if (addedProductInfo) {
        toast.success(`${addedProductInfo.name} added to cart!`, {
          description: `Quantity: ${addedProductInfo.quantity}`,
          duration: 5000,
        });
      }
    }
  }, [activeOrderFetcher.state, activeOrderFetcher.data]);

  return (
    <html lang={locale} dir={i18n.dir()} id="app">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <link rel="icon" href="/favicon.ico" type="image/png"></link>
        <Meta />
        <Links />
      </head>
      <body>
        <Toaster position="top-left" richColors closeButton />
        {/* <CurrencyProvider> */}
        <Header
          onCartIconClick={() => setOpen(!open)}
          cartQuantity={activeOrder?.totalQuantity ?? 0}
        />
        <main className="">
          <Outlet
            context={{
              activeOrderFetcher,
              activeOrder,
              adjustOrderLine,
              removeItem,
            }}
          />
        </main>
        <CartTray
          open={open}
          onClose={setOpen}
          activeOrder={activeOrder as OrderDetailFragment}
          adjustOrderLine={adjustOrderLine}
          removeItem={removeItem}
        />
        <ScrollRestoration />
        <Scripts />
        <NewsLetter />
        <NewFooter staticPages={staticPages} socialLinks={socialLinks} />
        <LiveReload />
        <CompareFloatingButton />
        {/* </CurrencyProvider> */}
      </body>
    </html>
  );
}

type DefaultSparseErrorPageProps = {
  tagline: string;
  headline: string;
  description: string;
};

/**
 * You should replace this in your actual storefront to provide a better user experience.
 * You probably want to still show your footer and navigation. You will also need fallbacks
 * for your data dependant components in case your shop instance / CMS isnt responding.
 * See: https://remix.run/docs/en/main/route/error-boundary
 */
function DefaultSparseErrorPage({
  tagline,
  headline,
  description,
}: DefaultSparseErrorPageProps) {
  return (
    <html lang="en" id="app">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <link rel="icon" href="/favicon.ico" type="image/png"></link>
        <Meta />
        <Links />
      </head>
      <body>
        <main className="flex flex-col items-center px-4 py-16 sm:py-32 text-center">
          <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
            {tagline}
          </span>
          <h1 className="mt-2 font-bold text-gray-900 tracking-tight text-4xl sm:text-5xl">
            {headline}
          </h1>
          <p className="mt-4 text-base text-gray-500 max-w-full break-words">
            {description}
          </p>
          <div className="mt-6">
            <Link
              to="/"
              className="text-base font-medium text-primary-600 hover:text-primary-500 inline-flex gap-2"
            >
              Go back home
            </Link>
          </div>
        </main>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

/**
 * As mentioned in the jsdoc for `DefaultSparseErrorPage` you should replace this to suit your needs.
 */
export function ErrorBoundary() {
  let tagline = 'Oopsy daisy';
  let headline = 'Unexpected error';
  let description = "We couldn't handle your request. Please try again later.";

  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    tagline = `${error.status} error`;
    headline = error.statusText;
    description = error.data;
  }

  return (
    <DefaultSparseErrorPage
      tagline={tagline}
      headline={headline}
      description={description}
    />
  );
}

/**
 * In Remix v2 there will only be a `ErrorBoundary`
 * As mentioned in the jsdoc for `DefaultSparseErrorPage` you should replace this to suit your needs.
 * Relevant for the future: https://remix.run/docs/en/main/route/error-boundary-v2
 */
export function CatchBoundary() {
  return ErrorBoundary();
}
