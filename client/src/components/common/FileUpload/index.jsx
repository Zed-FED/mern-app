import { Button } from "@mui/material";
import React from "react";

const AppFileUpload = ({ fileUploadChange, fileUploadName, ...props }) => {
  return (
    <>
      <input
        accept="image/*"
        type="file"
        id="profilePic"
        className="app-file-upload"
        onChange={fileUploadChange}
        name={fileUploadName}
        {...props}
      />
      <Button variant="contained" component="label" htmlFor="profilePic">
        Upload
      </Button>
    </>
  );
};

export default AppFileUpload;
