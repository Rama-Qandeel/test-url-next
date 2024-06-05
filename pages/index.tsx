import { GetStaticProps } from "next";
import { Inter } from "next/font/google";
import Image from "next/image";
import useTranslation from "next-translate/useTranslation";

import Link from "next/link";
import Files from "./files";

const inter = Inter({ subsets: ["latin"] });

const posts = [
  {
    name:"post-one",
    slug:"بوست-الاول",
  },
  {
    name:"post-Tow",
    slug:"بوست-التاني",
  },
  {
    name:"post-three",
    slug:"three",
  }
]

export default function Home({grades}:any) {
  const { t } = useTranslation("home-page");

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      {grades?.map((item:any,index: any) => (
        <Link href={`/test/test/${item.slug}`} key={index}>
        <div key={index}>{item.name}</div>
        </Link>
      ))}
    </main>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const res = await fetch("https://content-v2.joacademy.com/api/v1/grades");
    const grades = await res.json()
    return {
      props: {
        grades:grades.data,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};