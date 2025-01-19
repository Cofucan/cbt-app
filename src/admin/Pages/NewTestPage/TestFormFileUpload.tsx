import React, { useState } from "react";
import ImportImgs from "../../components/ImportImgs";
import useImageStore from "../../globalstate/useImageStore";
import { FaFileExcel } from "react-icons/fa";

const FileUpload = (props) => {

  const {
    setQuestion,
    question,
    setFile,
    file
  } = props

  const images = ImportImgs();
  // const [files, setFiles] = useState([]);
  const [dragging, setDragging] = useState(false);
  const [downloadFile, setDownloadFile] = useState(null); // State to store the file to download 


  const handleDragOverQuestion = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeaveQuestion = () => {
    setDragging(false);
  };

  const handleDropQuestion = (e) => {
    e.preventDefault();
    setDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    handleFileChange(droppedFiles);
  };

  const handleFileChangeQuestion = (selectedFiles) => {
    console.log(selectedFiles);
    // const validFiles = selectedFiles.filter((file) => {
    //   const fileType = file.type;
    //   return fileType === "text/csv" || fileType === "application/zip";
    // });
    setQuestion(selectedFiles)
    // }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    handleFileChange(droppedFiles);
  };

  const handleFileChange = (selectedFiles) => {
    console.log(selectedFiles);
    const validFiles = selectedFiles.filter((file) => {
      const fileType = file.type;
      return fileType === "text/csv" || fileType === "application/zip";
    });
    setQuestion(selectedFiles)
    // setFiles((prevFiles) => [...prevFiles, ...validFiles]);
    if (validFiles.length > 0) {
      setDownloadFile(validFiles[0]); // Set the first valid file for download
    }
  };

  const handleBrowseQuest = (e) => {
    const selected = e.target.files[0];
    setQuestion(selected)
  };

  const handleBrowse = (e) => {
    const selected = e.target.files[0];
    setFile(selected)
  };

  const handleRemoveFile = (index) => {
    // setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    setDownloadFile(null); // Reset download file if all files are removed
  };

  const handleDownload = () => {
    if (downloadFile) {
      const url = URL.createObjectURL(downloadFile); // Create object URL for the file
      const a = document.createElement("a");
      a.href = url;
      a.download = downloadFile.name; // Set the file name for download
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a); // Remove the download link
      URL.revokeObjectURL(url); // Revoke the object URL to free memory
    } else {
      alert("No file to download!");
    }
  };

  console.log(question);

  const handleImageChange = (e) => {

    const selected = e.target.files[0];
    // const TYPES = ["image/png", "image/jpg", "image/jpeg"];
    // if (selected && TYPES.includes(selected.type)) {
    //     const reader: any = new FileReader();
    //     reader.onloadend = () => {
    //         setImage(reader.result)
    //     }
    //     reader.readAsDataURL(selected)
    // }

    setQuestion(selected)

  }

  return (
    <div className="">
      {/* Upload Questions Section */}
      <div className="py-5">
        <label className="pb-4 text-[#1d2026]">Upload Questions</label>
        <label className="flex items-center gap-16">
          <div
            className={`border rounded px-4 py-8 w-[80%] mt-2 flex items-center ${dragging ? "border-orange-500" : "border-gray-300"
              }`}
            onDragOver={handleDragOverQuestion}
            onDragLeave={handleDragLeaveQuestion}
            onDrop={handleDropQuestion}
          >
            <input
              type="file"
              accept=".csv .xlsx"
              className="hidden"
              onChange={handleBrowseQuest}
            />
            {!question && (
              <div className="flex items-center">
                <span className="text-[#8c94a3] flex items-center">
                  <img
                    src={images.DownloadUp}
                    // onClick={() =>
                    //   document.querySelector('input[type="file"]').click()
                    // }
                    alt="uploadIcon"
                    className="p-1 rounded-full mr-2 cursor-pointer border bg-[#e9eaf0]"
                  />{" "}
                  {/* Upload icon */}
                  Drag and drop your files here or
                </span>
                <div
                  className="ml-2 text-orange-500 font-semibold"
                  // onClick={() =>
                  //   document.querySelector('input[type="file"]').click()
                  // }
                >
                  Browse{" "}
                  <span className="text-[#8c94a3] font-normal">
                    to upload CSV File
                  </span>
                </div>
              </div>
            )}
            {question && (
              <div className=" w-full flex gap-3 justify-center items-center " >
                <img
                  src={images.DownloadUp}
                  // onClick={() =>
                  //   document.querySelector('input[type="file"]').click()
                  // }
                  alt="uploadIcon"
                  className="p-1 rounded-full mr-2 cursor-pointer border bg-[#e9eaf0]"
                />{" "}
                <FaFileExcel size={"40px"} />
                <div>
                  <p>{question.name}</p>
                  <p>{(question?.size / 1024).toFixed(2)}kb</p>
                </div>
              </div>
            )}
          </div>
          <div className="flex flex-col items-center">
            <img
              src={images.DownloadDown}
              alt="downloadIcon"
              className="p-1 rounded-full cursor-pointer border bg-[#e9eaf0]"
              onClick={handleDownload} // Trigger download on click
            />
            <p className="text-center w-20 text-[#8c94a3]">Download File</p>
          </div>
        </label>
      </div>

      {/* Upload Question Images Section */}
      <div className="">
        <label className="pb-4 text-[#1d2026]">Upload Questions Images</label>
        <label role='button' 
          className={`border rounded-lg  px-4 py-8 mt-2 flex items-center ${dragging ? "border-orange-500" : "border-gray-300"
            }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            type="file"
            id="image"
            style={{ display: "none" }}
            onChange={handleBrowse}
          />

          {!file && (
            <div className="flex items-center"> 
              <span className="text-[#8c94a3] flex items-center">
                <img
                  src={images.DownloadUp}
                  // onClick={() =>
                  //   document.getElementById('file').click()
                  // }
                  alt="uploadIcon"
                  className="p-1 rounded-full mr-2 cursor-pointer border bg-[#e9eaf0]"
                />{" "}
                {/* Upload icon */}
                Drag and drop your files here or
              </span>
              <div
                className="ml-2 text-orange-500 font-semibold"
              // onClick={() =>
              //   document.getElementById('file').click()
              // }
              >
                Browse{" "}
                <span className="text-[#8c94a3] font-normal">
                  to upload Zip File
                </span>
              </div>
            </div>
          )}
          {file && (
            <div className=" w-full flex gap-3 justify-center items-center " >
              <img
                src={images.DownloadUp}
                // onClick={() =>
                //   document.getElementById('file').click()
                // }
                alt="uploadIcon"
                className="p-1 rounded-full mr-2 cursor-pointer border bg-[#e9eaf0]"
              />{" "}
              <FaFileExcel size={"40px"} />
              <div>
                <p>{file.name}</p>
                <p>{(file?.size / 1024).toFixed(2)}kb</p>
              </div>
            </div>
          )}
        </label>
      </div>

      {/* Selected Files List */}
      {/* <div className="mt-4">
        <h3 className="text-sm font-semibold mb-2">Selected Files:</h3>
        <ul className="list-disc pl-5">
          {files.map((file, index) => (
            <li key={index} className="flex justify-between items-center">
              <span className="text-gray-800">{file.name}</span>
              <button
                className="text-red-600 hover:underline"
                onClick={() => handleRemoveFile(index)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div> */}
    </div>
  );
};

export default FileUpload;
