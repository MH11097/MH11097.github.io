import Head from "next/head";
import { useRouter } from "next/router";
import { SITE_NAME, SITE_URL, TWITTER_USER } from "../utils/consts";

export type SEOProps = {
  title: string;
  description: string;
  ogImage?: string;
};

export const SEO = ({ title, description, ogImage }: SEOProps) => {
  const router = useRouter();
  const fullTitle = title === SITE_NAME ? title : `${title} | ${SITE_NAME}`;
  const socialImage = ogImage || `${SITE_URL}/social-image.png`;

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="robots" content="follow, index" />
      
      {/* Open Graph */}
      <meta property="og:url" content={`${SITE_URL}${router.asPath}`} />
      <meta property="og:type" content="article" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:description" content={description} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:image" content={socialImage} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={TWITTER_USER} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={socialImage} />
      
      <link rel="canonical" href={`${SITE_URL}${router.asPath}`} />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};