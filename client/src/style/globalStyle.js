import { createGlobalStyle } from 'styled-components';
import { reset } from 'styled-reset';

const GlobalStyle = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Nanum+Gothic:wght@400;700;800&family=Roboto:wght@100;300;400;500;700;900&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Ubuntu:wght@300;400;500;700&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Gothic+A1:wght@100;200;300;400;500;600;700;800;900&display=swap');


  ${reset}
  *,*::before, *::after{
	  margin: 0;
	  padding: 0;
	  border: 0;
    box-sizing: border-box;
    vertical-align: baseline;
  }
  article, aside, details, figcaption, figure, 
  footer, header, hgroup, menu, nav, section {
	  display: block;
  }
  body {
	  line-height: 1;
  }
  ol, ul {
	  list-style: none;
  }
  blockquote, q {
  	quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
	  content: '';
	  content: none;
  }
  table {
	  border-collapse: collapse;
	  border-spacing: 0;
  }
  a, a:link, a:visited, a:hover, a:active{
    color: black;
    text-decoration: none;
  }
  -ms-overflow-style: block; /* IE and Edge */
  scrollbar-width: block; /* Firefox */

  body::-webkit-scrollbar {
    display: block; /* Chrome, Safari, Opera */
    width: 8px;
  }
  body::-webkit-scrollbar-track{
    display: block;
    background: ${(props) =>
      props.colorTheme === 'game'
        ? ({ theme }) => theme.palette.gameBg
        : ({ theme }) => theme.palette.basicBg};
  }
  body::-webkit-scrollbar-thumb{
    display: block;
    border-radius:10px;
    background: ${(props) =>
      props.colorTheme === 'game'
        ? ({ theme }) => theme.palette.gameLightStroke
        : ({ theme }) => theme.palette.basicLightStroke};
  }
    // 가로의 중앙
    .flexWidthCenter {
    display: flex;
    justify-content: center;
  }

  // 세로의 중앙
  .flexHeightCenter {
    display: flex;
    align-items: center;
  }

  // 정중앙
  .flexCenter {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .paginationStyle{
    width: 100%;
    position: absolute;
    bottom: calc(-35px - 1vh);
  }

  .paginationStyle .pagination {
    display: flex;
    justify-content: center;
    font-family: Gothic A1;
  }
  .paginationStyle ul {
    list-style: none;
    padding: 0;
  }
  .paginationStyle ul.pagination li {
    display: inline-block;
    width: 35px;
    height: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
  .paginationStyle ul.pagination li:first-child,
  .paginationStyle ul.pagination li:last-child {
    width: 10px;
  }

  .paginationStyle ul.pagination li a {
    text-decoration: none;
    color: ${(props) =>
      props.colorTheme === 'game'
        ? ({ theme }) => theme.palette.gameStroke
        : ({ theme }) => theme.palette.basicStroke};
    font-size: 0.8rem;
    padding-top: 3px;
  }

  .paginationStyle ul.pagination li.active a {
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .paginationStyle ul.pagination li.active {
    background-color: ${(props) =>
      props.colorTheme === 'game'
        ? ({ theme }) => theme.palette.gameStroke
        : ({ theme }) => theme.palette.basicStroke};
    border-radius: 50%;
    width: 35px;
    height: 35px;
  }
`;

export default GlobalStyle;
