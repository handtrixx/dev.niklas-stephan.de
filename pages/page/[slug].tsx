// Import necessary modules from their respective packages
import { useContext } from "react";
import Head from "next/head";
import TopNavigation from "../../components/top-navigation";
import FooterNavigation from "../../components/footer-navigation";
import StylesContext from "../../components/context-styles";
import { NextSeo } from "next-seo";
import he from "he";
import env from '../../utils/env';

// Page component
export default function Page({ title, content, slug }) {
  const gutenberg = useContext(StylesContext);

  const decodedTitle = he.decode(title);
  const pagetitle = decodedTitle + " - " + env.frontendHost;
  const pagedescription = title + " auf " + env.frontendHost;
  const pageurl = env.frontendUrl + "page/" + slug;

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
              url: env.frontendUrl + "images/screenshot.jpg",
              alt: decodedTitle,
            },
          ],
        }}
      />
      <Head>
        <style>{gutenberg}</style>
      </Head>
      
      <TopNavigation />
      <div className="container-xl">
        <div className="mb-4">
          <div className="col-12">
          
            <h1>{title}</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
           
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </div>
        </div>
      </div>
     
      <FooterNavigation />
    </>
  );
    
}

// Function to get the static paths for static generation
export async function getStaticPaths() {
  try {
    // Fetch the list of pages from the API
    const res = await fetch(env.apiUrl + "/wp-json/babelnext/v1/pages", {
      headers: {
        "Content-Type": "application/json",
        "Api-Token": env.apiToken,
      },
    });

    if (!res.ok) {
      throw new Error(
        `HTTP error! status: ${res.status} for ` + env.apiUrl + `/wp-json/babelnext/v1/pages.`);
    }

    const pages = await res.json();

    // Map the pages to paths for static generation
    const paths = pages.map((page) => ({
      params: { 
        slug: page.slug,
      },
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
  const { slug } = params;
  
  try {
    // Fetch the page data from the API
    const res = await fetch(`${env.apiUrl}/wp-json/babelnext/v1/pages?slug=${slug}`, {
      headers: {
        "Content-Type": "application/json",
        "Api-Token": env.apiToken, 
      },
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch data for slug: ${slug} at ${env.apiUrl}/wp-json/babelnext/v1/pages`);
    }     
    const page = await res.json();

    return {
      props: {
        title: page.post_title,
        content: page.post_content,
        slug: page.post_name,
      },
    };
  } catch (error) {
    console.error("Failed to get static props:", error);
    return {
      notFound: true,
    };
  }
          
}
