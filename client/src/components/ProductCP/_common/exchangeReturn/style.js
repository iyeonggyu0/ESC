import styled from 'styled-components';

export const MainStyle = styled.div`
  width: ${(props) => (props.media.isPc ? '75vw' : '95vw')};
  margin: 10vh auto;
  font-family: Noto Sans Kr;
  color: ${({ theme }) => theme.palette.gameStroke};

  & > div {
    margin: 5vh 0;
  }

  & > div > p {
    padding: 3px 0;
    line-height: 150%;
    font-size: 0.9rem;
    font-weight: 500;
  }

  span {
    font-size: 0.8rem;
    padding-left: 5px;
    font-weight: 400;
  }

  & > div > p:nth-child(1) {
    padding: 20px 0;
    margin-bottom: 10px;
    color: ${({ theme }) => theme.palette.gameStroke};
    border-bottom: 1px solid ${({ theme }) => theme.palette.gameStroke};
    font-weight: 600;
  }
`;
