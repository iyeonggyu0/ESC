import styled from 'styled-components';

export const MainStyle = styled.div`
  width: 100%;
  height: ${(props) => (props.media.isPc ? '280px' : 'auto')};
  border-radius: 15px;
  position: relative;
  padding: 40px;

  display: flex;
  flex-wrap: ${(props) => (props.media.isPc ? 'nowrap' : 'wrap')};

  color: ${(props) =>
    props.colorTheme === 'game'
      ? ({ theme }) => theme.palette.white
      : ({ theme }) => theme.palette.basicFont};

  background-color: ${(props) =>
    props.colorTheme === 'game' ? ({ theme }) => theme.palette.gameStroke : '#F8F3ED'};

  border: ${(props) => (props.colorTheme === 'game' ? '0px' : '1px')} solid
    ${({ theme }) => theme.palette.basicFont};

  & > img:nth-child(1) {
    width: ${(props) => (props.media.isPc ? '250px' : '100%')};
    height: 200px;
    border-radius: 5px;
    object-fit: cover;
    object-position: center center;
  }

  & > div:nth-child(2) {
    height: 200px;
    margin-left: ${(props) => (props.media.isPc ? '40px' : '0px')};
    margin-top: ${(props) => (props.media.isPc ? '0px' : '40px')};
  }

  & > div:nth-child(2) > p:nth-child(1) {
    font-size: ${(props) => (props.media.isPc ? '1.5rem' : '1.2rem')};
    font-weight: 700;
  }
`;
