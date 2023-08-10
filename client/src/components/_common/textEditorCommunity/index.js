import React, { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { axiosInstance } from '../../../util/axios';
import axios from 'axios';

import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import Heading from '@ckeditor/ckeditor5-heading/src/heading';

// import { Bold, Italic, Underline } from '@ckeditor/ckeditor5-basic-styles';

// const [textData, setState] = useState('');
// const textDataFun = (text) => {
//   setState(`${text}`);
// };

// <TextEditor textDataFun={textDataFun} />
// 형식으로 사용하기

// eslint-disable-next-line
const TextEditorInCommunity = ({ textData, textDataFun }) => {
  const [imageNum, setImageNum] = useState('none');

  const customUploadAdapter = (loader) => {
    return {
      upload() {
        return new Promise((resolve, reject) => {
          const data = new FormData();
          loader.file.then((file) => {
            data.append('name', file.name);
            data.append('file', file);

            axios
              .post(`${axiosInstance}api/multer/community/upload/${imageNum}`, data, {
                headers: { 'content-type': 'multipart/form-data' },
              })
              .then((res) => {
                setImageNum(res.data.randomSixDigitNumber);
                console.log(res.data);
                console.log(res.data.randomSixDigitNumber);
                resolve({
                  default: `${res.data.imagePathName}`,
                });
              })
              .catch((err) => reject(err));
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
      config={{
        extraPlugins: [uploadPlugin],
        plugins: [Bold, Italic],
        toolbar: ['bold', 'italic'],
      }}
      onChange={(event, editor) => {
        const data = editor.getData();
        textDataFun(data);
      }}
    />
    // <div>
    //   <h2>Using CKEditor&nbsp;5 build in React</h2>
    //   <CKEditor
    //     onChange={(event, editor) => console.log({ event, editor })}
    //     config={{
    //       plugins: [Essentials, Paragraph, Bold, Italic, Heading],
    //       toolbar: ['heading', '|', 'bold', 'italic', '|', 'undo', 'redo'],
    //     }}
    //     editor={ClassicEditor}
    //     data="<p>Hello from CKEditor 5!</p>"
    //   />
    // </div>
  );
};

export default TextEditorInCommunity;
