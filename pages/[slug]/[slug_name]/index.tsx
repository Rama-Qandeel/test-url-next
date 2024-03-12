import { GetStaticPaths, GetStaticProps } from "next";
import React from "react";

const PostDetails = ({ slug,slug_name }: any) => {
  return <div>Post {slug} {slug_name}</div>;
};

export default PostDetails;

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = [
    {
      name: "post-one",
      slug: "بوست-الاول",
      slug_name: "الاول",
    },
    {
      name: "post-Tow",
      slug: "بوست-التاني",
      slug_name: "التاني",
    },
    {
      name: "post-three",
      slug: "three",
      slug_name: "three",
    },
  ];

  const paths = posts.map((post: any) => ({
    params: { slug: post.slug, slug_name: post.slug_name },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({
  params: { slug,slug_name },
}: any) => {
  return {
    props: {
      slug,
      slug_name,
    },
  };
};
