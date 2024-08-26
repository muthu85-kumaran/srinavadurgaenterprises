"use client";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { UploadCloud, UploadCloudIcon, UploadIcon } from "lucide-react";

const FileUpload = ({ productId }) => {
  const [selectedImages, setSelectedImages] = useState([]);

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        // Do whatever you want with the file contents
        const binaryStr = reader.result;
        if (binaryStr) {
          setSelectedImages((prevState) => [
            ...prevState,
            { file, status: "uploading ...." },
          ]);
          const presignedURL = new URL("/api/presigned", window.location.href);
          presignedURL.searchParams.set("fileName", file.name);
          presignedURL.searchParams.set("contentType", file.type);
          fetch(presignedURL.toString())
            .then((res) => res.json())
            .then((res) => {
              const body = new Blob([binaryStr], { type: binaryStr.type });
              fetch(res.signedUrl, {
                body,
                method: "PUT",
              })
                .then(() => {
                  //save to database
                  fetch("/api/product/imageupload", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      objectUrl: res.signedUrl.split("?")[0],
                      productId,
                    }),
                  })
                    .then((res) => res.json())
                    .then((res) => {
                      setSelectedImages((prevState) =>
                        prevState.map((img) =>
                          img.file === file
                            ? { ...img, status: "success" }
                            : img
                        )
                      );
                      console.log("successfully uploaded and saved ");
                    })
                    .catch((err) => {
                      setSelectedImages((prevState) =>
                        prevState.map((img) =>
                          img.file === file ? { ...img, status: "failed" } : img
                        )
                      );
                      console.log("error in saving to db");
                      throw err;
                    });
                })
                .catch((err) => {
                  setSelectedImages((prevState) =>
                    prevState.map((img) =>
                      img.file === file ? { ...img, status: "failed" } : img
                    )
                  );
                  console.log("error in getting signed url & uploading in aws");
                  throw err;
                });
            });
        }

        console.log(binaryStr);
      };
      reader.readAsArrayBuffer(file);
    });
  }, []);
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    maxFiles: 5,
    maxSize: 1024 * 1024 * 1024 * 5,
    accept: "image/*",
  });

  return (
    <div className="w-full ">
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <>
            <UploadCloudIcon size={42} className="text-green-900" />{" "}
            <p className="pl-3">Drop file(s) here ...</p>
          </>
        ) : (
          <>
            <UploadCloudIcon size={42} className="text-green-900" />
            <p className="pl-3">
              Drag and drop file(s) here, or click to select files
            </p>
          </>
        )}
      </div>
      <div className="flex  gap-3 flex-1 w-full ">
        {selectedImages.length > 0 &&
          selectedImages.map((image, index) => (
            <div className="flex flex-col justify-center items-center shadow-md border p-3">
              <Image
                src={`${URL.createObjectURL(image.file)}`}
                key={index}
                alt=""
                width="100"
                height="100"
              />
              {image.status === "success" ? (
                <p className="text-green-800 font-semibold">{image.status}</p>
              ) : (
                <p className="text-red-800 font-semibold">{image.status}</p>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default FileUpload;
