import React from 'react';
import axios from 'axios';
import { axiosInstance } from '../../../util/axios';

//  <FileUploadInput type={1} name={2} fun={set함수명} />
//                   저장경로: ..1/2  / 함수 = 저장성공시 경로/파일명
// eslint-disable-next-line
const FileUploadInput = ({ type, name, fun, textFun }) => {
  const handleFileOnChange = (event) => {
    // 서버 api에 Post 요청

    const formData = new FormData();
    for (let i = 0; i < event.target.files.length; i++) {
      formData.append(type, event.target.files[i]);
    }

    axios
      .post(
        `${axiosInstance}api/multer/upload/${type}/${name.replace(/[^\w\s]/gi, '')}`,
        formData,
        {
          header: { 'content-type': 'multipart/form-data' },
        },
      )
      .then((res) => {
        if (res.status === 400) {
          return;
        }
        console.log(res);
        const regexType = new RegExp(`/img/${type}/`, 'g');
        const route = res.data.imagePath.replace(regexType, '');

        const routeLoc = localStorage.getItem('route');
        if (routeLoc === 'null') {
          localStorage.setItem('route', route);
        }

        if (!textFun) {
          fun(`${res.data.imgs.map((img) => img.fileName).join(',')}`);
        }

        if (textFun) {
          console.log(res.data.imgs.map((img) => img.fileName).join(','));
          return textFun(`${res.data.imgs.map((img) => img.fileName).join(',')}`, fun);
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
        multiple
      />
    </form>
  );
};
export default FileUploadInput;
