
const FileDetails = ({ payload }: { payload: any }) => {
  const fileLink = payload?.file;

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
                href={fileLink}
                target="_blank"
                className={
                  "tw-bg-primary tw-flex tw-w-full tw-items-center tw-justify-center tw-gap-4 tw-rounded-lg tw-bg-[#034173] tw-p-3 tw-text-[18px] max-sm:tw-text-[14px] tw-font-bold tw-text-white "
                }
              >
                {payload?.file_type?.id !== 13 ? (
                  <div className="tw-flex tw-items-center tw-justify-center tw-gap-4">
                    <i className={`ri-download-2-line tw-text-[20px]`} />
                    <span className="bold">download_file</span>
                  </div>
                ) : (
                  <span className="bold">view</span>
                )}
              </a>
            </div>
          </div>
        ) : (
          <div className="tw-font-bold">there-is-no-file-data</div>
        )}
      </div>
    </>
  );
};

export default FileDetails;
