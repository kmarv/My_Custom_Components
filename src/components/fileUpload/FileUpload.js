import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { LuTrash } from "react-icons/lu";
import { FiEye } from "react-icons/fi";
import { Modal, Button } from "react-bootstrap"; // Import Modal and Button from react-bootstrap

const dropzoneStyle = {
  border: "2px dashed #cccccc",
  borderRadius: "4px",
  textAlign: "center",
  padding: "20px",
  cursor: "pointer",
};

const tileListStyle = {
  display: "flex",
  flexWrap: "wrap",
  gap: "20px",
  justifyContent: "center",
};

const tileStyle = {
  border: "1px solid #ccc",
  borderRadius: "4px",
  padding: "10px",
  maxWidth: "200px",
  textAlign: "center",
  cursor: "pointer",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-between",
  height: "180px", // Set a fixed height for the tiles
};

const fileTitleStyle = {
  fontSize: "16px",
  fontWeight: "bold",
  margin: "10px 0",
  lineHeight: "1.2", // Allow for multiple lines
  maxHeight: "3.6em", // Limit to three lines
  overflow: "hidden",
  textOverflow: "ellipsis",
  display: "-webkit-box",
  WebkitLineClamp: "3",
  WebkitBoxOrient: "vertical",
};

const iconStyle = {
  cursor: "pointer",
};
const FileUpload = () => {
  const [files, setFiles] = useState([]);
  const [previewFile, setPreviewFile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  

  // Function to handle file uploads
  const onDrop = useCallback(
    (acceptedFiles) => {
      setFiles([...files, ...acceptedFiles]);
    },
    [files]
  );

  // Function to handle file deletion
  const deleteFile = (index) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
  };

  // Set up the Dropzone to accept multiple file types
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: ".pdf, .docx, .jpg, .jpeg, .png", // Specify accepted file types here
    multiple: true, // Allow multiple file uploads
  });
  // Function to toggle the preview of a file
  // Function to open the modal and set the preview file
  const openModal = (file) => {
    setPreviewFile(file);
    setIsModalOpen(true);
  };
  // Function to close the modal
  const closeModal = () => {
    setPreviewFile(null);
    setIsModalOpen(false);
  };

  const getFileDescription = (file) => {
    const fileSizeKB = Math.round(file.size / 1024);
    return `${file.type} | ${fileSizeKB} KB`;
  };

  return (
    <div>
      <div>
        <div {...getRootProps()} style={dropzoneStyle}>
          <input {...getInputProps()} />
          <p>
            Drag & drop PDF or DOCX files, or click to select multiple files
          </p>
        </div>
      </div>
      {files.length > 0 && (
        <div>
          <h2>Uploaded Files:</h2>
          <div style={tileListStyle}>
            {files.map((file, index) => (
              <div
                key={index}
                style={tileStyle}
                onClick={() => openModal(file)}
              >
                <p style={fileTitleStyle}>{file.name}</p>
                <p>{getFileDescription(file)}</p>
                <div style={{ display: "flex", justifyContent: "space-around", width: "100%" }}>
                  <FiEye
                    color="#2832C2"
                    size={24}
                    style={iconStyle}
                    onClick={() => openModal(file)}
                  />
                  <LuTrash
                    color="red"
                    size={24}
                    style={iconStyle}
                    onClick={() => deleteFile(index)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Modal for displaying the file preview */}
      <Modal show={isModalOpen} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>File Preview</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {previewFile && (
            <>
              {previewFile.type === "application/pdf" ? (
                <embed
                  src={URL.createObjectURL(previewFile)}
                  width="100%"
                  height="600"
                />
              ) : (
                <img
                  src={URL.createObjectURL(previewFile)}
                  alt="Preview"
                  style={{ maxWidth: "100%", maxHeight: "500px" }}
                />
              )}
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default FileUpload;
