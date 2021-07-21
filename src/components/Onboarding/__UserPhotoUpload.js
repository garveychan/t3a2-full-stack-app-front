import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

export default function UserPhotoUpload({ formData, handleFormData }) {
  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      const fileArray = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );
      setFiles(fileArray);
      handleFormData({ target: { name: "profilePhoto", value: fileArray[0] } });
    },
    multiple: false,
  });

  // revoke data uris to avoid memory leaks
  useEffect(
    () => () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  return (
    <section className="container cursor-pointer">
      <div
        {...getRootProps({
          className:
            "dropzone mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 hover:border-green-300 active:border-green-300 border-dashed rounded-md",
        })}
      >
        <input {...getInputProps()} />

        {formData.profilePhoto ? (
          <div key={formData.profilePhoto.name} className="h-1/2 w-1/2">
            <img src={formData.profilePhoto.preview} alt="Upload Preview" />
          </div>
        ) : (
          <div className="space-y-1 text-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="flex text-sm text-gray-600">
              <label
                htmlFor="file-upload"
                className="relative cursor-pointer bg-gray-100 rounded-md font-medium text-green-600 hover:text-green-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-green-500"
              >
                <span>Upload a file</span>
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
          </div>
        )}
      </div>
    </section>
  );
}
