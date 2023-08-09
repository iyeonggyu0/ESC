import React, { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { axiosInstance } from '../../../util/axios';
import axios from 'axios';

// const [textData, setState] = useState('');
// const textDataFun = (text) => {
//   setState(`${text}`);
// };

// <TextEditor textDataFun={textDataFun} />
// 형식으로 사용하기

// eslint-disable-next-line
const TextEditorInCommunity = ({ textData, textDataFun }) => {
  const parma = window.location.href;
  const [flag, setFlag] = useState(false);
  console.log(parma);

  const customUploadAdapter = (loader) => {
    return {
      upload() {
        return new Promise((resolve, reject) => {
          const data = new FormData();
          loader.file.then((file) => {
            data.append('name', file.name);
            data.append('file', file);
          });
          if (parma === process.env.LINK + '/product/enrollment') {
            data.append('file', loader.target.files[0]);
            axios
              .post(`${axiosInstance}/multer/upload/productEnrollment`, data, {
                headers: { 'content-type': 'multipart/form-data' },
              })
              .then((res) => {
                if (!flag) {
                  setFlag(true);
                }
                resolve({
                  default: `${axiosInstance}/${res.data.filename}`,
                });
              })
              .catch((err) => reject(err));
          }
        });
      },
    };
  };

  function uploadPlugin(editor) {
    console.log('실행');
    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
      return customUploadAdapter(loader);
    };
  }

  return (
    <CKEditor
      editor={ClassicEditor}
      data="<p></p>"
      config={{
        extraPlugins: [uploadPlugin],
      }}
      onChange={(event, editor) => {
        const data = editor.getData();
        textDataFun(data);
      }}
    />
  );
};

export default TextEditorInCommunity;
