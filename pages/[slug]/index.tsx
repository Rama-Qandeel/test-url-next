import React from "react";
import { GetStaticPathsContext, GetStaticProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";


export async function getStaticPaths(context: GetStaticPathsContext) {
  try {
    let paths: any = [];

    const res = await fetch("https://content-v2.joacademy.com/api/v1/grades");
    const grades = await res.json();
console.log(grades.data)
    grades.data.forEach((grade: any) => {
      paths.push({
        params: { slug: grade.slug },
      });
    });
    return { paths, fallback: false };
  } catch (error) {
    return { paths: [], fallback: false };
  }
};

export const getStaticProps: GetStaticProps = async () => {
  try {
    const res = await fetch("https://content-v2.joacademy.com/api/v1/semesters");
    const semesters = await res.json();
    if (semesters?.data?.length === 0) {
      return {
        notFound: true,
      };
    }
    return {
      props: {
        semesters: semesters.data,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

const Semester = ({ semesters }: any) => {
  const router = useRouter();

  return (
    <>
      <div className="tw-mt-8 tw-grid tw-grid-cols-1 tw-gap-6 sm:tw-grid-cols-2">
        {semesters?.map(({ id, name, slug }: any) => (
          <Link href={`${router.query.slug}/${slug}`} key={id}>
            <div className="tw-flex tw-h-20 tw-w-full tw-items-center tw-rounded-xl tw-p-6 tw-text-xs tw-leading-normal tw-text-[#535962] tw-shadow-[0_0_6px_#00000029] hover:tw-bg-[#327bf9] hover:tw-text-white">
              <div className="tw-flex tw-w-full tw-items-center tw-justify-between tw-leading-normal">
                <h2 className={`tw-my-0 tw-font-[semiBold-ar] tw-text-4xl`}>
                  {name}
                </h2>
                <div className="tw-text-4xl tw-text-[#b4cffd]">{id}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Semester;
