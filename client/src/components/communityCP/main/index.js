import { useNavigate } from 'react-router-dom';
import { useMedia } from '../../../hooks/useMedia';
import { MainStyle } from './style';
import { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../../../App';
import Select from 'react-select';
import axios from 'axios';
import { axiosInstance } from '../../../util/axios';

const CommunityMain = () => {
  const media = useMedia();
  // eslint-disable-next-line
  const navigate = useNavigate();
  const colorTheme = useContext(ThemeContext).colorTheme;
  const userData = useContext(ThemeContext).userInfo.userData;

  // 정렬 type
  const sortOptions = [
    { value: '최신순', label: '최신순' },
    { value: '추천순', label: '추천순' },
    { value: '조회순', label: '조회순' },
  ];

  // 글쓰기
  const onCreateButtonHandler = () => {
    if (!userData) {
      return alert('로그인이 필요합니다.');
    }

    navigate('/community/post');
  };

  const [sortOption, setSortOption] = useState(sortOptions[0]);
  const [postData, setPostData] = useState([]);

  const reloadPostData = () => {
    axios
      .get(`${axiosInstance}api/community/all/${sortOption.value}`)
      .then((res) => {
        if (res.status == 200) {
          setPostData(res.data.reverse());
        } else {
          alert('Error');
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // useEffect(() => {
  //   reloadPostData();
  //   console.log(postData);
  //   // eslint-disable-next-line
  // }, []);

  useEffect(() => {
    reloadPostData();
    console.log(postData);
    // eslint-disable-next-line
  }, [sortOption]);

  return (
    <MainStyle colorTheme={colorTheme} media={media}>
      <p>Community</p>
      <div className="flexHeightCenter">
        <div>
          <Select defaultValue={sortOption} onChange={setSortOption} options={sortOptions} />
        </div>
        <div className="flexCenter" onClick={onCreateButtonHandler}>
          글쓰기
        </div>
      </div>
      <div>
        {postData != null && postData.length == 0 && (
          <div className="flexCenter notPost">작성된 글이 없습니다</div>
        )}
        {postData != null && postData.length > 0 && (
          <ul>
            <li className="flexHeightCenter">
              <span>ID</span>
              <span>TITLE</span>
              <span>NICK</span>
              <span>DATE</span>
            </li>
            {postData.map((state, idx) => (
              <li className="flexHeightCenter" key={idx}>
                <span>{state.id}</span>
                <span>{state.title}</span>
                <span>{state.User.nickName}</span>
                <span>{state.createdAt.replace(/-/g, '/').split('T')[0]}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </MainStyle>
  );
};
export default CommunityMain;
