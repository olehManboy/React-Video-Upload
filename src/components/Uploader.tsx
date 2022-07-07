import React from "react";
import "react-dropzone-uploader/dist/styles.css";
import Dropzone from "react-dropzone-uploader";
import { useState } from "react";

const Uploader = () => {
  const [file, setFile] = useState();
  const axios = require("axios").default;
  const endpoint:string = "https://pa3qluw7el.execute-api.us-east-1.amazonaws.com/default/uploadFile";

  const API_ENDPOINT:string = endpoint;
  const handleChangeStatus = ({ meta, remove }:any, status:any) => {
    console.log(status, meta);
    console.log(meta.name);
    setFile(meta.name);
  };

  const handleSubmit = async (files:any) => {
    const f = files[0];

    // GET request: presigned URL
    const response = await axios({
      method: "GET",
      url: API_ENDPOINT,
    });

    // PUT request: upload file to S3
    const result = await fetch(response.data.uploadURL, {
      method: "PUT",
      body: f["file"],
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        title:
        <input type="text"/>
      </label>
      <label>
        description:
        <input type="text"/>
      </label>
      <Dropzone
        onChangeStatus={handleChangeStatus}
        onSubmit={handleSubmit}
        maxFiles={1}
        multiple={false}
        canCancel={false}
        inputContent="Drop A File"
      />
    </form>
  );
};

export default Uploader;