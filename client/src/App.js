import React, { useRef } from 'react'
import axios from 'axios'
import  { blobToBase64 } from './Utils'

export default function App() {
  const Image = useRef('');
  // -----------------------------Type 1------------------------------------------------
  const downloadTy1API = async () => {
    try {
      // const filePath = `https://images.pexels.com/photos/1133957/pexels-photo-1133957.jpeg`;
      // or
      const filePath = `http://localhost:5000/type-1`;
      const response = await axios.get(filePath, { responseType: 'blob' });
      return response.data;
    } catch (e) {
      throw new Error('Error Deleting File');
    }
  };

  const downloadTy1 = async () => {
    try {
      const dataBytes = await downloadTy1API();
      if (dataBytes) {
        const url = window.URL.createObjectURL(dataBytes);

        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `MyImage`);
        document.body.appendChild(link);
        link.click();
        window.URL.revokeObjectURL(url);
        link.remove();

        alert('Report downloaded successfully!');
      }
    } catch (error) {
      alert('Something went wrong!');
      console.log(error);
    }

  }
//-------------------------------End Type 2---------------------------------------------

//-------------------------------Type 2-------------------------------------------------
  const downloadTy2API = async () => {
    try {
      const filePath = `http://localhost:5000/type-2`;
      const response = await axios.post(filePath, { id: 123 }, { responseType: 'blob' });
      let myBlob = response.data;
      return myBlob
    } catch (e) {
      console.log(e);
    }
  };

  const downloadTy2 = async () => {
    // try {
    let dataBytes = await downloadTy2API();
    // create file link in browser's memory
    const url = window.URL.createObjectURL(dataBytes);

    Image.current.src = await blobToBase64(dataBytes);

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `doop.jpg`);
    document.body.appendChild(link);
    link.click();
    window.URL.revokeObjectURL(url);
    link.remove();
  }
//--------------------------------End Type 2--------------------------------------------

  return (
    <div>
      <div style={{ display: 'flex', gap:'5px' }}>

        <div>
          <img src="http://localhost:5000/type-1" height="200" width="200" />
           <br/>
          <button onClick={downloadTy1}> Download type-1</button>
        </div>

        <div>
          <img ref={Image} height="200" width="200" />
          <br/>
          <button onClick={downloadTy2}> Download type-2</button>
        </div>
      </div>
      <br />
      <hr />
    </div>
  )
}
