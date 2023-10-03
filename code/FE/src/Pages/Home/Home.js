import './Home.scss'
import React, { useState } from 'react';
import axios from 'axios';

function Home() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [folderName, setFolderName] = useState('');

  const handleFileChange = (e) => {
    setSelectedFiles(e.target.files);
  };

  const handleFolderNameChange = (e) => {
    setFolderName(e.target.value);
  };

  const handleUpload = async () => {
    if (!folderName && !selectedFiles) {
      alert('Vui lòng nhập tên thư mục.');
      return;
    }

    const formData = new FormData();
    formData.append('folderName', folderName);

    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append('files', selectedFiles[i]);
    }

    // Gui data cho BE
    try {
      const response = await axios.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Tải tệp lên</h1>

      <input type="file" onChange={handleFileChange} multiple />

      <input
        type="text"
        placeholder="Tên thư mục"
        value={folderName}
        onChange={handleFolderNameChange}
      />

      <button onClick={handleUpload}>Tải lên</button>

    </div>
  );
}

export default Home;