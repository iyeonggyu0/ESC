import { useNavigate } from 'react-router-dom';
import { useMedia } from '../../../hooks/useMedia';
import { MainStyle } from './style';
import { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../../../App';
import Select from 'react-select';
import axios from 'axios';
import { axiosInstance } from '../../../util/axios';
import Pagination from 'react-js-pagination';
import theme from '../../../style/theme';

const CommunityMain = () => {
  const media = useMedia();
  // eslint-disable-next-line
  const navigate = useNavigate();
  const colorTheme = useContext(ThemeContext).colorTheme;
  const userData = useContext(ThemeContext).userInfo.userData;

  const [activePage, setActivePage] = useState(1);
  const [items, setItems] = useState(theme.paginationItem.communityMain);

  // 정렬 type
  const sortOptions = [
    { value: '최신순', label: '최신순' },
    { value: '추천순', label: '추천순' },
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
          setPostData(res.data);
        } else {
          alert('Error');
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    const communitySort = localStorage.getItem('communitySort');
    if (communitySort == '최신순') setSortOption(sortOptions[0]);
    else setSortOption(sortOptions[1]);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    localStorage.setItem('communitySort', sortOption.value);
    reloadPostData();
    // eslint-disable-next-line
  }, [sortOption]);

  const onActivePageHandler = (page) => {
    setActivePage(page);
  };

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
              <span>LIKE</span>
              <span>NICK</span>
              {media.isPc && <span>DATE</span>}
            </li>
            {postData
              .slice(items * (activePage - 1), items * (activePage - 1) + items)
              .map((state, idx) => (
                <li className="flexHeightCenter" key={idx}>
                  <span>{state.id}</span>
                  <span onClick={() => navigate(`/community/${state.id}`)}>
                    {state.title}
                    {state.CommunityComments.length > 0 && (
                      <span style={{ color: '#FEAA7B', paddingLeft: '1rem' }}>
                        {state.CommunityComments.length}
                      </span>
                    )}
                  </span>
                  <span>{state.CommunityPostLikes.length}</span>
                  <span
                    style={{
                      fontWeight:
                        userData && userData.nickName === state.User.nickName ? '900' : '400',
                    }}
                  >
                    {state.User.nickName}
                  </span>
                  {media.isPc && <span>{state.createdAt.replace(/-/g, '/').split('T')[0]}</span>}
                </li>
              ))}
          </ul>
        )}
        {postData !== null && postData.length > 0 && (
          <div className="paginationStyle" colorTheme={colorTheme}>
            <Pagination
              activePage={activePage}
              itemsCountPerPage={items}
              totalItemsCount={parseInt(postData.length / 1) + 1}
              prevPageText={'‹'}
              nextPageText={'›'}
              onChange={onActivePageHandler}
            />
          </div>
        )}
      </div>
    </MainStyle>
  );
};
export default CommunityMain;
