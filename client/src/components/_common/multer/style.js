import styled from 'styled-components';

export const Div = styled.div`
  // 프로필이미지
  width: 100%;
  height: 10vw;
  border-radius: 50%;
  background-image: url(${(props) => props.profileImg});
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;

  display: flex;
  justify-content: center;
  align-items: center;
  color: rgba(255, 255, 255, 0);
  background-blend-mode: multiply;
  font-size: 20px;
  transition: all 0.3s;

  &:first-child:hover {
    color: rgba(255, 255, 255, 1);
    background-color: rgb(121, 121, 121);
  }
`;
