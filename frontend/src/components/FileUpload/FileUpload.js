import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import "./FileUpload.css";
import { FileUploader } from "react-drag-drop-files";
import { useDropzone } from "react-dropzone";

import axios from "axios";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [isDZDragActive, setIsDZDragActive] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);

  const [images, setImages] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(null);

  const fileTypes = ["JPEG", "PNG", "GIF"];
  const handleChange = (file) => {
    console.log(file);
    setFile(file);
  };
  const handleChangeinput = (e) => {
    //setFile(file);
    setFile(e.target.files[0]);
    console.log(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(images);
    console.log(file);
    const formData = new FormData();
    formData.append("file", file);
    console.log(formData);

    try {
      const res = await axios.post("http://localhost:5000/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          setUploadProgress(
            parseInt(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            )
          );
        },
      });
      console.log(res.data);
      const { fileName, filePath } = res.data;
      setUploadedFile({ fileName, filePath });
      alert("File Uploaded");
    } catch (err) {
      if (err.response.status === 500) {
        console.log("There was a problem with the server");
      } else {
        console.log(err.response.data.msg);
      }
    }
  };

  //Handles Dropzone
  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles);

    setFile(acceptedFiles[0]);
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        // Do whatever you want with the file contents
        const binaryStr = reader.result;
        console.log(binaryStr);
      };
      reader.readAsArrayBuffer(file);
    });
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
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

          <div className="input-group mb-3">
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              {isDragActive ? (
                <div>
                  <p className="uplaoder2">
                    Drop the files here <i class="fas fa-upload"></i>...
                  </p>
                </div>
              ) : (
                <p className="uplaoder2">
                  Drag 'n' drop some files here, or click to select files
                </p>
              )}
            </div>
          </div>
          <div class="progress">
            <div
              class="progress-bar progress-bar-striped bg-success"
              role="progressbar"
              style={{ width: `${uploadProgress}%` }}
              aria-valuenow="75"
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>
          <button type="submit" className="btn btn-primary btn-block mt-4">
            Submit
          </button>
        </form>
        {uploadedFile ? <p>{uploadedFile.name}</p> : <p>none</p>}
        {uploadedFile ? <p>{uploadedFile.fileName}</p> : <p>none</p>}
        {uploadedFile && <img src={`uploads/${uploadedFile.fileName}`}></img>}
      </div>
    </div>
  );
};

FileUpload.propTypes = {};

FileUpload.defaultProps = {};

export default FileUpload;
