import { useNavigate } from 'react-router-dom';
import { useMedia } from '../../../hooks/useMedia';
import { MainStyle } from './style';
import { useContext, useState } from 'react';
import { ThemeContext } from '../../../App';
import Select from 'react-select';

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
    </MainStyle>
  );
};
export default CommunityMain;
