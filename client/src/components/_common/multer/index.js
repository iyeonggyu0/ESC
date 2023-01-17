import React, { useContext } from 'react';
import axios from 'axios';
import { axiosInstance } from '../../../util/axios';
import { ThemeContext } from '../../../App';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

import { Div } from './style';

const FileUpload = (props) => {
  const userData = useContext(ThemeContext).userInfo.userData;

  const handleFileOnChange = (event) => {
    // 서버 api에 Post 요청
    const formData = new FormData();
    formData.append('profile_img', event.target.files[0]);
    axios
      .post(`${axiosInstance}user/upload/profile/img`, formData, {
        header: { 'content-type': 'multipart/form-data' },
      })
      .then((res) => {
        console.log(res);
        axios
          .put(`${axiosInstance}user/put/profile/img`, {
            email: userData.email,
            fileName: userData.profileImg,
            newFileName: res.data.fileName,
          })
          .then((res) => {
            console.log(res);
            window.location.replace('/mypage/main');
          })
          .catch((err) => {
            console.log(err);
          });
      });
  };

  const inputTag = document.getElementById('profileInput');
  const inputTagHandler = () => {
    inputTag.click();
  };

  return (
    <Div profileImg={props.profileImg} onClick={inputTagHandler}>
      <FontAwesomeIcon icon={solid('pen')} />
      <form encType="multipart/form-data" style={{ display: 'none' }}>
        <input
          id="profileInput"
          type="file"
          accept="image/jpg,image/png,image/jpeg,image/gif"
          name="profile_img"
          placeholder="업로드"
          onChange={handleFileOnChange}
        />
      </form>
    </Div>
  );
};
export default FileUpload;
