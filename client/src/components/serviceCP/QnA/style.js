import styled from 'styled-components';

export const MainStyle = styled.div`
  width: ${(props) => (props.media.isPc ? '75vw' : '85%')};
  min-height: calc(78vh - 70px);
  margin: 10vh auto 12vh auto;
  position: relative;

  & > p:nth-child(1) {
    text-align: center;
    font-size: ${(props) => (props.media.isPc ? '2rem' : '1.6rem')};
    font-weight: 900;
    margin-bottom: 8vh;
  }

  & > p:nth-child(2) {
    width: 100%;
    text-align: end;
    padding-bottom: 2vh;
    color: ${({ theme }) => theme.palette.gameLightStroke};
    border-bottom: 1px solid ${({ theme }) => theme.palette.gameLightFont};
    transition: all 0.3s;
  }

  & > p:nth-child(2):hover {
    color: black;
  }

  & > p:nth-child(2) > span {
    cursor: pointer;
  }

  & > div:nth-child(3) > *:last-child {
    margin-bottom: 3vh;
  }
`;

export const PaginationBox = styled.div`
  width: 100%;
  position: absolute;
  bottom: calc(-35px - 1vh);

  .pagination {
    display: flex;
    justify-content: center;
    font-family: Gothic A1;
  }
  ul {
    list-style: none;
    padding: 0;
  }
  ul.pagination li {
    display: inline-block;
    width: 35px;
    height: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
  ul.pagination li:first-child,
  ul.pagination li:last-child {
    width: 10px;
  }

  ul.pagination li a {
    text-decoration: none;
    color: ${(props) =>
      props.colorTheme === 'game'
        ? ({ theme }) => theme.palette.gameStroke
        : ({ theme }) => theme.palette.basicStroke};
    font-size: 0.8rem;
    padding-top: 3px;
  }

  ul.pagination li.active a {
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  ul.pagination li.active {
    background-color: ${(props) =>
      props.colorTheme === 'game'
        ? ({ theme }) => theme.palette.gameStroke
        : ({ theme }) => theme.palette.basicStroke};
    border-radius: 50%;
    width: 35px;
    height: 35px;
  }
`;
