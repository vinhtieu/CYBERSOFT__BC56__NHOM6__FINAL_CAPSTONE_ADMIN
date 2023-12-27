import React from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Upload, Button } from "antd";

export default function ImageUploader({ setName }) {
  const props = {
    name: "file",
    multiple: false,
    action: "https://64da260ee947d30a260ad89a.mockapi.io/image-upload-response",
    method: "get",
    onChange(info) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataURL = e.target.result;
        sessionStorage.setItem("imgFile", dataURL);
      };

      reader.readAsDataURL(info.file.originFileObj);
      setName(info.file.name);
    },
  };
  return (
    <>
      <Upload {...props} listType="picture" maxCount={1}>
        <Button icon={<UploadOutlined />}>Upload</Button>
      </Upload>
    </>
  );
}
