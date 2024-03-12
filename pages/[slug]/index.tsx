import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import React from 'react'

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

const Post = ({slug}:any) => {
  return (
    <main
    >
      {posts?.map(({ name,slug,slug_name }: any) => (
        <Link href={`/${slug}/${slug_name}`}>
        <div>{name} this from slug {slug}</div>
        </Link>
      ))}
    </main>
  );
}

export default Post


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
   
    const paths = posts.map((post:any) => ({
      params: { slug: post.slug },
    }))

   console.log(paths,'paths')
    return { paths, fallback: false }
  };
  
  export const getStaticProps: GetStaticProps = async ({params:{slug}}:any) => {
    return {
        props: {
            slug,
        },
      };
  };