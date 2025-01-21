import React, { ChangeEvent, useState } from "react";
import ImportImgs from "../../components/ImportImgs";
import { FaFileExcel } from "react-icons/fa";

const FileUpload = (props) => {
  const { setQuestion, question, setFile, file } = props;

  const images = ImportImgs();
  // const [files, setFiles] = useState([]);
  const [dragging, setDragging] = useState(false);
  const [downloadFile, setDownloadFile] = useState<File | null>(null); // State to store the file to download

  const handleDragOverQuestion = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeaveQuestion = () => {
    setDragging(false);
  };

  const handleDropQuestion = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    handleFileChange(droppedFiles);
  };


  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (e:  React.DragEvent<HTMLLabelElement> ) => {
    e.preventDefault();
    setDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    handleFileChange(droppedFiles);
  };

  const handleFileChange = (selectedFiles: File[]) => {
    console.log(selectedFiles);
    const validFiles = selectedFiles.filter((file: File) => {
      const fileType = file.type;
      return fileType === "text/csv" || fileType === "application/zip";
    });
    setQuestion(selectedFiles);
    // setFiles((prevFiles) => [...prevFiles, ...validFiles]);
    if (validFiles.length > 0) {
      setDownloadFile(validFiles[0]); // Set the first valid file for download
    }
  };

  const handleBrowseQuest = (e: ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    setQuestion(selected);
  };

  const handleBrowse = (e: ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    setFile(selected);
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


  return (
    <div className="">
      {/* Upload Questions Section */}
      <div className="py-5">
        <label className="pb-4 text-[#1d2026]">Upload Questions</label>
        <label className="flex items-center gap-16">
          <div
            className={`mt-2 flex w-[80%] items-center rounded border px-4 py-8 ${
              dragging ? "border-orange-500" : "border-gray-300"
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
                <span className="flex items-center text-[#8c94a3]">
                  <img
                    src={images.DownloadUp}
                    // onClick={() =>
                    //   document.querySelector('input[type="file"]').click()
                    // }
                    alt="uploadIcon"
                    className="mr-2 cursor-pointer rounded-full border bg-[#e9eaf0] p-1"
                  />{" "}
                  {/* Upload icon */}
                  Drag and drop your files here or
                </span>
                <div
                  className="ml-2 font-semibold text-orange-500"
                  // onClick={() =>
                  //   document.querySelector('input[type="file"]').click()
                  // }
                >
                  Browse{" "}
                  <span className="font-normal text-[#8c94a3]">
                    to upload CSV File
                  </span>
                </div>
              </div>
            )}
            {question && (
              <div className="flex w-full items-center justify-center gap-3">
                <img
                  src={images.DownloadUp}
                  // onClick={() =>
                  //   document.querySelector('input[type="file"]').click()
                  // }
                  alt="uploadIcon"
                  className="mr-2 cursor-pointer rounded-full border bg-[#e9eaf0] p-1"
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
              className="cursor-pointer rounded-full border bg-[#e9eaf0] p-1"
              onClick={handleDownload} // Trigger download on click
            />
            <p className="w-20 text-center text-[#8c94a3]">Download File</p>
          </div>
        </label>
      </div>

      {/* Upload Question Images Section */}
      <div className="">
        <label className="pb-4 text-[#1d2026]">Upload Questions Images</label>
        <label
          role="button"
          className={`mt-2 flex items-center rounded-lg border px-4 py-8 ${
            dragging ? "border-orange-500" : "border-gray-300"
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
              <span className="flex items-center text-[#8c94a3]">
                <img
                  src={images.DownloadUp}
                  // onClick={() =>
                  //   document.getElementById('file').click()
                  // }
                  alt="uploadIcon"
                  className="mr-2 cursor-pointer rounded-full border bg-[#e9eaf0] p-1"
                />{" "}
                {/* Upload icon */}
                Drag and drop your files here or
              </span>
              <div
                className="ml-2 font-semibold text-orange-500"
                // onClick={() =>
                //   document.getElementById('file').click()
                // }
              >
                Browse{" "}
                <span className="font-normal text-[#8c94a3]">
                  to upload Zip File
                </span>
              </div>
            </div>
          )}
          {file && (
            <div className="flex w-full items-center justify-center gap-3">
              <img
                src={images.DownloadUp}
                // onClick={() =>
                //   document.getElementById('file').click()
                // }
                alt="uploadIcon"
                className="mr-2 cursor-pointer rounded-full border bg-[#e9eaf0] p-1"
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
