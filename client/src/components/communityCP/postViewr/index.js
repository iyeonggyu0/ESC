import { useNavigate } from 'react-router-dom';
import { useMedia } from '../../../hooks/useMedia';
import { MainStyle } from './style';
import { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../../../App';
import axios from 'axios';
import { axiosInstance } from '../../../util/axios';

const PostViewr = () => {
  const media = useMedia();
  // eslint-disable-next-line
  const navigate = useNavigate();
  const colorTheme = useContext(ThemeContext).colorTheme;
  const userData = useContext(ThemeContext).userInfo.userData;

  const [postData, setPostData] = useState([]);

  useEffect(() => {
    // axios
    //   .get(`${axiosInstance}api/community/all/${sortOption.value}`)
    //   .then((res) => {
    //     if (res.status == 200) {
    //       setPostData(res.data);
    //     } else {
    //       alert('Error');
    //     }
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //   });
    // eslint-disable-next-line
  }, []);

  return (
    <MainStyle colorTheme={colorTheme} media={media}>
      asd
    </MainStyle>
  );
};
export default PostViewr;
