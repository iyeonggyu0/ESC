import styled from 'styled-components';

export const MainStyle = styled.div`
  width: ${(props) => (props.media.isPc ? '75vw' : '95vw')};
  margin: 0 auto;
  font-family: Noto Sans Kr;
  color: ${({ theme }) => theme.palette.gameStroke};

  & > div {
    margin: 3vh 0;
  }

  & > div > p {
    padding: 3px 0;
    line-height: 150%;
    font-size: 0.9rem;
  }

  span {
    font-size: 0.8rem;
    padding-left: 5px;
  }

  & > div > p:nth-child(1) {
    padding: 20px 0;
    margin-bottom: 10px;
    color: ${({ theme }) => theme.palette.gameStroke};
    border-bottom: 1px solid ${({ theme }) => theme.palette.gameStroke};
    font-weight: 500;
  }
`;
