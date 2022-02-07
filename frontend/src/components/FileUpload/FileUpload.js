import React, { useState } from "react";
import PropTypes from "prop-types";
import "./FileUpload.css";
import { FileUploader } from "react-drag-drop-files";
import axios from "axios";
const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);

  const [images, setImages] = useState(null);

  const fileTypes = ["JPEG", "PNG", "GIF"];
  const handleChange = (file) => {
    console.log(file);
    setFile(file);
  };
  const handleChangeinput = (e) => {
    //setFile(file);
    setImages(e.target.files[0]);
    console.log(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(images);
    console.log(file);
    const formData = new FormData();
    formData.append("file", file);
    console.log(formData);
    alert();
    try {
      const res = await axios.post("http://localhost:5000/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const { fileName, filePath } = res.data;
      setUploadedFile({ fileName, filePath });
    } catch (err) {
      if (err.response.status === 500) {
        console.log("There was a problem with the server");
      } else {
        console.log(err.response.data.msg);
      }
    }
  };
  return (
    <div className="FileUpload" data-testid="FileUpload">
      <div className="">
        <form onSubmit={handleSubmit}>
          <div className="input-group mb-3">
            <input
              type="file"
              onChange={handleChangeinput}
              className="form-control"
              id="inputGroupFile02"
            />
            <label className="input-group-text" htmlFor="inputGroupFile02">
              Upload
            </label>
          </div>

          <div className="input-group mb-3">
            <div>
              <h1>Hello To Drag & Drop Files</h1>
              <FileUploader
                handleChange={handleChange}
                name="file"
                types={fileTypes}
              />
              <p>
                {file ? `File name: ${file.name}` : "no files uploaded yet"}
              </p>
            </div>
          </div>

          <button type="submit" className="btn btn-primary btn-block mt-4">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

FileUpload.propTypes = {};

FileUpload.defaultProps = {};

export default FileUpload;
