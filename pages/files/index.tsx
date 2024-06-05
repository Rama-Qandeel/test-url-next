// https://admin.joacademy.net/api/v1/files-filter?page=1&oldest=false&category=[692]&teachers=[]
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Files = () => {
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const res = await axios(
        "https://admin.joacademy.net/api/v1/files-filter?page=1&oldest=false&category=[692]&teachers=[]",
        {
          headers: {
            Program: 1,
          },
        }
      );
      setData(res.data.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      {data.map((file: any, index: any) => (
        <Link href={`/files/${file?.slug}`} key={index}>
          <div style={{ margin: "5px" }}>{file?.name}</div>
        </Link>
      ))}
    </div>
  );
};

export default Files;
