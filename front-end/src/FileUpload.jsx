import React, { useState } from "react";

export default function FileUpload(){
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState("");

    const allowedExtensions = ["jpeg", "jpg", "gif"];
    const maxFileSize = 3 * 1024 * 1024; // 3MB in byte

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
        }
    };

    const validateAndUpload = async () => {
        if (!file) {
            setMessage("Please select a file to upload.");
            return;
        }

        const fileName = file.name;
        const fileSize = file.size;
        const fileExtension = fileName.split(".").pop().toLowerCase();

        let isGood = false;

        if (!allowedExtensions.includes(fileExtension)) {
            setMessage("File type is not allowed (Upload jpeg, jpg, gif).");
            isGood = true;
        }

        if (fileSize > maxFileSize) {
            setMessage("File is over 3MB in size.");
            isGood = true;
        }

        if (isGood) return;

        // Proceed to upload the file
        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await fetch("http://localhost:3000/apartments", {
                method: "POST",
                body: formData,
                credentials: "include" // Include cookies in the request
            });

            if (response.ok) {
                setMessage(`File ${fileName} was uploaded successfully!`);
            } else {
                setMessage("Upload failed. Please try again.");
            }
        } catch (error) {
            console.error("Error uploading file:", error);
            setMessage("An error occurred during the upload.");
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>File Uploader</h2>
            <input type="file" onChange={handleFileChange} />
            <button onClick={validateAndUpload} style={{ marginLeft: "10px" }}>
                Upload
            </button>
            <p>{message}</p>
        </div>
    );
};
