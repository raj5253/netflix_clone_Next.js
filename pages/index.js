import Head from "next/head";
const myfonts = require("./_fonts");
import styles from "@/styles/Home.module.css";
import Banner from "@/components/banner/banner";
import NavBar from "@/components/nav/navbar";
import SectionCard from "@/components/card/section-cards";

// import { disneyVideos } from "./videolist";
import { getVideos, getPopularVideos } from "@/lib/videos";
import { magic } from "../lib/magic-client";

export async function getServerSideProps(context) {
  const disneyVideos = await getVideos("disney%20trailer");
  const productivityVideos = await getVideos("productive videos");
  const travelVideos = await getVideos("travel%20blogs");
  const popularVideos = await getPopularVideos("popular%20blogs");

  return {
    props: { disneyVideos, productivityVideos, travelVideos, popularVideos }, // will be passed to the page component as props //this is ssr. data from API is handled by server and then presented to client.
  };
}

export default function Home({
  disneyVideos,
  productivityVideos,
  travelVideos,
  popularVideos,
}) {
  // console.log({ magic });

  return (
    <div className={myfonts.roboto + " " + styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavBar username={"raghav@email.com"} />
      <Banner
        title="The Guardians"
        subTitle="The protectors of galaxy"
        imgUrl="/static/theGuardians.jpg"
      />

      <div className={styles.sectionWrapper}>
        <SectionCard title="Disney" videos={disneyVideos} size="large" />
      </div>
      <div className={styles.sectionWrapper}>
        <SectionCard title="Travel" videos={travelVideos} size="small" />
      </div>
      <div className={styles.sectionWrapper}>
        <SectionCard
          title="Productivity"
          videos={productivityVideos}
          size="medium"
        />
      </div>
      <div className={styles.sectionWrapper}>
        <SectionCard title="Popular" videos={popularVideos} size="small" />
      </div>

      {/* <Card imgUrl="/static/theGuardians.jpg" size="large" /> */}
    </div>
  );
}

// imgUrl="/static/theGuardians.jpg , bc the public folder will be served statically.

//my youtube API key : AIzaSyCl4kfHL10llXPp0zFJXGTRmQc2MX4OsSc
