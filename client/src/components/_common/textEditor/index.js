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
const TextEditor = ({ textDataFun }) => {
  const parma = window.location.href;
  const [flag, setFlag] = useState(false);

  const customUploadAdapter = (loader) => {
    return {
      upload() {
        return new Promise((resolve, reject) => {
          const data = new FormData();
          loader.file.then((file) => {
            data.append('name', file.name);
            data.append('file', file);
            if (parma === process.env.LINK + '/product/enrollment') {
              axios
                .post(`${axiosInstance}/product/upload`, data)
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
        });
      },
    };
  };

  function uploadPlugin(editor) {
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
      onReady={(editor) => {
        // You can store the "editor" and use when it is needed.
        console.log('Editor is ready to use!', editor);
      }}
      onChange={(event, editor) => {
        const data = editor.getData();
        textDataFun(data);
      }}
      // eslint-disable-next-line
      onBlur={(event, editor) => {
        console.log('unFocus');
      }}
      // eslint-disable-next-line
      onFocus={(event, editor) => {
        console.log('Focus');
      }}
    />
  );
};

export default TextEditor;
