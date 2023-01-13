import { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { ThemeContext } from '../../App';
import { useMedia } from '../../hooks/useMedia';

import MyPageMain from './main';

import { MyPageMainPageStyle, BG } from './style';

const MyPageMainPage = () => {
  //hook
  const page = useParams('').page;
  const media = useMedia();
  // eslint-disable-next-line
  const dispatch = useDispatch();
  // eslint-disable-next-line
  const navigate = useNavigate();
  const colorTheme = useContext(ThemeContext).colorTheme;
  const userData = useContext(ThemeContext).userInfo.userData;
  console.log(userData);
  console.log(page);

  return (
    <MyPageMainPageStyle colorTheme={colorTheme} media={media}>
      <div>
        <div>
          {/* 사이드 바 */}
          <div>
            {/* 프로필 */}
            <div>{/* 프로필 이미지 */}</div>
            <p>
              {/* 닉네임 */}
              {userData.userName}
              <br />
              {/* 회원 등급 */}
              {userData.authority === 'user' ? '일반회원' : '관리자'}
            </p>
          </div>
          <div>
            {/* 메뉴 */}
            <p>쇼핑</p>
            <ul>
              <li>주문목록/배송조회</li>
              <li>취소/반품/교환 내역</li>
              <li>장바구니</li>
              <li>찜</li>
            </ul>

            <p>활동</p>
            <ul>
              <li>문의내역</li>
              <li>리뷰</li>
              <li>상품QnA내역</li>
            </ul>

            <p>커뮤니티</p>
            <ul>
              <li>작성한 글</li>
              <li>작성한 제품추천</li>
              <li>작성한 조합추천</li>
            </ul>
          </div>
        </div>

        <div>
          {/* 메인 세션 */}
          {page === 'main' && <MyPageMain />}
        </div>
      </div>
      <BG>BG</BG>
    </MyPageMainPageStyle>
  );
};
export default MyPageMainPage;
