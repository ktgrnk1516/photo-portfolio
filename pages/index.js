import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { Header, PostCard } from "../components";
import { getPosts } from "../services";

export default function Home({ posts }) {
  //ローカルのpostデータ=>graphCMSから持ってくるからコメントアウト
  // const posts = [
  //   {
  //     image: "https://drive.google.com/uc?id=1hHg5t7XvX-zvm4Bos-mPzF6e16n0-Orx",
  //     time: "12/02/2022",
  //     desc: "Osaka Night",
  //     place: "Osaka",
  //   },
  // ];

  return (
    <div className={styles.container}>
      <Head>
        <title>ktgrnk</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.body_root}>
        {/* <div className="header_wrapper">
          <Header />
        </div> */}
        <div className={styles.body_wrapper}>
          {posts.map((post) => (
            <PostCard post={post.node} key={post.node.time} />
          ))}
        </div>
      </div>
    </div>
  );
}

//graphCMSからfetchしてくる関数
export async function getStaticProps() {
  const posts = (await getPosts()) || [];

  return {
    props: { posts },
  };
}
