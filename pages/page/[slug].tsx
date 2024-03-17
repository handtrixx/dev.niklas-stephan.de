// Import necessary modules from their respective packages
import { useContext } from "react";
import Head from "next/head";
import { useIntl } from "react-intl";
import TopNavigation from "../../components/top-navigation";
import FooterNavigation from "../../components/footer-navigation";
import StylesContext from "../../components/context-styles";
import { NextSeo } from "next-seo";
import he from "he";
import {
  frontendHost,
  frontendUrl,
  backendHost,
  backendUrl,
} from "../../utils/env.js";

// Page component
export default function Page({ title, content, slug }) {
  const gutenberg = useContext(StylesContext);
  // Use the internationalization hook from react-intl
  const intl = useIntl();

  // Helper function to translate text
  const translate = (id) => intl.formatMessage({ id });

  const decodedTitle = he.decode(title);
  const pagetitle = decodedTitle + " - " + frontendHost;
  const pagedescription = title + " auf " + frontendHost;
  const pageurl = frontendUrl + "page/" + slug;

  // Return the JSX to render
  return (
    <>
      <NextSeo
        title={pagetitle}
        description={pagedescription}
        openGraph={{
          url: pageurl,
          title: decodedTitle,
          description: decodedTitle,
          images: [
            {
              url: frontendUrl + "images/screenshot.jpg",
              alt: decodedTitle,
            },
          ],
        }}
      />
      <Head>
        <style>{gutenberg}</style>
      </Head>
      {/* Include the top navigation */}
      <TopNavigation />
      <div className="container-xl">
        <div className="mb-4">
          <div className="col-12">
            {/* Render the title */}
            <h1>{title}</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            {/* Render the content, which is assumed to be HTML */}
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </div>
        </div>
      </div>
      {/* Include the footer navigation */}
      <FooterNavigation />
    </>
  );
}

// Function to get the static paths for static generation
export async function getStaticPaths() {
  try {
    // Fetch the list of pages from the API
    const res = await fetch(backendUrl + "wp-json/wp/v2/pages", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const pages = await res.json();

    // Map the pages to paths for static generation
    const paths = pages.map((page) => ({
      params: { slug: page.slug },
    }));

    // Return the paths for static generation
    return { paths, fallback: false };
  } catch (error) {
    // Log any errors that occur during this process
    console.error("Failed to get static paths:", error);
    return { paths: [], fallback: false };
  }
}

// Function to get the static props for a page
export async function getStaticProps({ params }) {
  try {
    // Fetch the data for a page from the API
    const res = await fetch(
      backendUrl + `wp-json/wp/v2/pages?slug=${params.slug}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // If the response is not ok (status code is not in the range 200-299), throw an error
    if (!res.ok) {
      throw new Error(
        `HTTP error! status: ${res.status} for ` +
          backendUrl +
          `wp-json/wp/v2/pages?slug=${params.slug}`
      );
    }

    const [page] = await res.json();

    // Return the page data as props
    return {
      props: {
        title: page.title.rendered,
        content: page.content.rendered,
        slug: page.slug,
      },
    };
  } catch (error) {
    // Handle any errors that occurred while fetching the data
    console.error(error);
    return {
      props: {
        error: "There was an error fetching the page data.",
      },
    };
  }
}
