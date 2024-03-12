import { Inter } from "next/font/google";
import Link from "next/link";

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

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      {posts?.map(({ name,slug }: any) => (
        <Link href={slug}>
        <div>{name}</div>
        </Link>
      ))}
    </main>
  );
}

