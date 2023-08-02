import styled from 'styled-components';
import { useMedia } from '../../../../hooks/useMedia';

const PreparingPage = () => {
  const media = useMedia();
  return (
    <MainStyle media={media}>
      <div></div>
    </MainStyle>
  );
};
export default PreparingPage;

export const MainStyle = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;

  & > div {
    width: ${(props) => (props.media.isPc ? '45%' : '95%')};
    min-height: ${(props) => (props.media.isPc ? '70%' : '30%')};
    background-size: cover;
    background-position: center center;
    background-image: url('/img/preparingImg.webp');
  }
`;
