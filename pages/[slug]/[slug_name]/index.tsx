import React, { useState } from "react";
import { GetStaticPathsContext, GetStaticProps } from "next";

const Subject = ({ slug, slug_name }: any) => {
  return (
    <>
      <h1>
        {slug} {slug_name}
      </h1>
    </>
  );
};

export default Subject;

export async function getStaticPaths(context: GetStaticPathsContext) {
  try {
    let paths: any = [];

    const resSem = await fetch(
      "https://content-v2.joacademy.com/api/v1/semesters"
    );
    const semesters = await resSem.json();

    const res = await fetch("https://content-v2.joacademy.com/api/v1/grades");
    const grades = await res.json();

    semesters.data.forEach((semester: any) => {
      grades.data.forEach((grade: any) => {
        paths.push({
          params: {
            slug: decodeURI(grade.slug),
            slug_name: decodeURI(semester.slug),
          },
        });
      });
    });
    return { paths, fallback: false };
  } catch (error) {
    return { paths: [], fallback: false };
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context;

  try {
    return {
      props: {
        slug: params?.slug,
        slug_name: params?.slug_name,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};
