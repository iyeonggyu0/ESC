import React from 'react';
import axios from 'axios';
import { axiosInstance } from '../../../util/axios';

//  <FileUploadInput type={1} name={2} fun={set함수명} />
//                   저장경로: ..1/2  / 함수 = 저장성공시 경로/파일명
// eslint-disable-next-line
const FileUploadInput = ({ type, name, fun, textFun, page }) => {
  const handleFileOnChange = (event) => {
    // 서버 api에 Post 요청
    const formData = new FormData();
    formData.append(type, event.target.files[0]);
    axios
      .post(`${axiosInstance}api/multer/upload/${type}/${name}`, formData, {
        header: { 'content-type': 'multipart/form-data' },
      })
      .then((res) => {
        localStorage.setItem('img', `${res.data.imagePath}`);
        if (page === 'modify') {
          return textFun(`${res.data.fileName}`, res.data.imagePath, res.data.fileName);
        }
        if (page === 'enrollment_detailed') {
          return textFun(`${res.data.fileName}`);
        }
        if (page === 'enrollment_main') {
          return textFun(`${res.data.fileName}`);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <form encType="multipart/form-data">
      <input
        id="profileInput"
        type="file"
        accept="image/jpg,image/png,image/jpeg,image/gif"
        name={type}
        placeholder="업로드"
        onChange={handleFileOnChange}
      />
    </form>
  );
};
export default FileUploadInput;
