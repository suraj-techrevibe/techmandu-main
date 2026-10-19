import { useLoaderData } from '@remix-run/react';
import { DataFunctionArgs } from '@remix-run/server-runtime';
import Container from '~/components/Container';
import { getStaticPage } from '~/providers/pages/pages';

export async function loader({ params, request }: DataFunctionArgs) {
  const pageDetails = await getStaticPage(params.slug!);
  return {
    pageDetails,
  };
}

import { CustomBreadCrumb } from '~/components/CustomBreadCrumb';
import { RichText } from '~/components/RichText';

const StaticPages = () => {
  const { pageDetails } = useLoaderData<typeof loader>();

  return (
    <Container className="my-12">
      <CustomBreadCrumb
        items={[
          { name: pageDetails?.title!, href: `/static/${pageDetails?.slug}` },
        ]}
      />
      <div className="mb-8"></div>
      <RichText content={pageDetails?.content || ''} />
    </Container>
  );
};

export default StaticPages;
