import React, { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { axiosInstance } from '../../../util/axios';
import axios from 'axios';
import styled from 'styled-components';

// const [textData, setState] = useState('');

// const textDataFun = (text) => {
//   setState(`${text}`);
// };

// <TextEditor textDataFun={textDataFun} />
// 형식으로 사용하기

const MainStyle = styled.div`
  /* padding는 부모 컴포넌트에서 .ck-content에 설정 */

  & i {
    font-style: italic !important;
  }

  & strong {
    font-weight: bold !important;
  }

  & ol,
  & ul {
    list-style: disc;
    margin-left: 20px;
  }

  & li {
    list-style: disc;
  }

  & p {
    line-height: 160%;
  }
`;

// eslint-disable-next-line
const TextEditorInCommunity = ({ textData, textDataFun }) => {
  const customUploadAdapter = (loader) => {
    return alert('이미지 등록이 불가능합니다.');
    //   return {
    //     upload() {
    //       return new Promise((resolve, reject) => {
    //         const data = new FormData();
    //         loader.file.then((file) => {
    //           data.append('name', file.name);
    //           data.append('file', file);

    //           axios
    //             .post(`${axiosInstance}api/multer/community/upload`, data, {
    //               headers: { 'content-type': 'multipart/form-data' },
    //             })
    //             .then((res) => {
    //               resolve({
    //                 default: `${res.data.imagePathName}`,
    //               });
    //             })
    //             .catch((err) => reject(err));
    //         });
    //       });
    //     },
    //   };
  };

  function uploadPlugin(editor) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
      return customUploadAdapter(loader);
    };
  }

  return (
    <MainStyle>
      <CKEditor
        editor={ClassicEditor}
        config={{
          extraPlugins: [uploadPlugin],
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          textDataFun(data);
        }}
      />
    </MainStyle>
  );
};

export default TextEditorInCommunity;
