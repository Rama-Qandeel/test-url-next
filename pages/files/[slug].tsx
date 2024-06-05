import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";

import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import FileDetails from "@/components/file-details";
import axios from "axios";
import { useEffect } from "react";

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  try {
    const { locale, query } = context;

    const filesresponse = await axios.get(
      "https://admin.joacademy.net/api/v1/get-files-by-needle",
      {
        // @ts-ignore
        params: { needle: decodeURI(query?.slug).replace(/\+/g, '%2B') },
        headers: {
          lang: locale ?? "en",
        },
      }
    );

    console.log(
      filesresponse.data.data[0],
      "++++++++++++++++++++++++++++++++++++++++++++"
    );
    return {
      props: {
        payload: filesresponse.data.data[0] ?? null,
      },
    };
  } catch (error) {
    return { props: { files: null }, notFound: true };
  }
};

type TFile = InferGetServerSidePropsType<typeof getServerSideProps>;

const File = ({ payload }: any) => {
  const router = useRouter();

  console.log(payload, "payload");
  console.log(router, "router");
          // @ts-ignore
console.log(decodeURI(router?.query?.slug).replace(/\+/g, '%2B'))

  return (
    <>
      <div
        className={"tw-rounded-lg tw-p-10 "}
        style={{
          boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.137)",
        }}
      >
        {payload ? (
          <div className="tw-flex tw-w-full tw-flex-col tw-justify-between tw-gap-20 sm:tw-gap-4 md:tw-flex-row">
            <div>
              <div className="tw-flex tw-flex-col tw-items-center tw-gap-4 md:tw-flex-row">
                <div style={{ color: payload?.file_color }}>
                  <i className={`ri-${payload?.file_icon}`} />
                </div>
                <h2 className={`tw-my-0 tw-font-normal`}>{payload?.name}</h2>
              </div>
              <div dangerouslySetInnerHTML={{ __html: payload?.description }} />
              <div className={"tw-flex"}>
                {payload?.subject?.name && (
                  <div key={payload?.subject?.id}>
                    <span> {payload?.subject?.name} </span>
                  </div>
                )}
                {payload?.teacher?.name ? (
                  <div key={payload?.teacher?.id}>
                    <span> {payload?.teacher?.name} </span>
                  </div>
                ) : null}
              </div>
            </div>
            <div className="tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-4 tw-px-14 max-sm:tw-px-4">
              <a
                target="_blank"
                className={
                  "tw-bg-primary tw-flex tw-w-full tw-items-center tw-justify-center tw-gap-4 tw-rounded-lg tw-bg-[#034173] tw-p-3 tw-text-[18px] max-sm:tw-text-[14px] tw-font-bold tw-text-white "
                }
              >
                {payload?.file_type?.id !== 13 ? (
                  <div className="tw-flex tw-items-center tw-justify-center tw-gap-4">
                    <i className={`ri-download-2-line tw-text-[20px]`} />
                  </div>
                ) : (
                  <span className="bold">view</span>
                )}
              </a>
              ;
              {payload?.file_type?.id !== 13 && (
                <div className="text-[14px] tw-flex tw-items-center tw-justify-center tw-gap-4 tw-whitespace-nowrap tw-text-gray-400 md:tw-text-[18px]">
                  <p>download_times</p>
                  <p>{payload?.downloads}</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="tw-font-bold">there-is-no-file-data</div>
        )}
      </div>
    </>
  );
};

export default File;
