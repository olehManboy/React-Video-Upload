import React from "react";
import "react-dropzone-uploader/dist/styles.css";
import Dropzone from "react-dropzone-uploader";
import { useState } from "react";
import './style.css';

const Uploader = () => {
  const [file, setFile] = useState();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const axios = require("axios").default;
  const endpoint:string = "https://pa3qluw7el.execute-api.us-east-1.amazonaws.com/default/uploadFile";

  const API_ENDPOINT:string = endpoint;
  const handleChangeStatus = ({ meta, remove }:any, status:any) => {
    console.log(status, meta);
    console.log(meta.name);
    setFile(meta.name);
  };

  const handleChangeTitle = (event:any) => {
    setTitle(event.target.value);
    console.log(event.target.value);
  }

  const handleChangeDescription = (event:any) => {
    setDescription(event.target.value);
  }

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
    <form onSubmit={handleSubmit} className="form bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <label className="flex justify-between flex-col block text-gray-500 font-bold mb-1 md:mb-0">
        title:
        <input type="text" onChange={handleChangeTitle} className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"/>
      </label>
      <label className="flex justify-between flex-col block text-gray-500 font-bold mb-1 md:mb-0">
        description:
        <textarea name="description" onChange={handleChangeDescription} className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"/>
      </label>
      <Dropzone
        onChangeStatus={handleChangeStatus}
        onSubmit={handleSubmit}
        maxFiles={1}
        multiple={false}
        canCancel={false}
        inputContent="Drop A File"
      />
      <input className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="submit" value="Submit" />
    </form>
  );
};

export default Uploader;