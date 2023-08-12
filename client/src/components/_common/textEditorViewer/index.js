import ReactHtmlParser from 'react-html-parser';
import styled from 'styled-components';

const MainStlye = styled.div`
  & i {
    font-style: italic !important;
  }

  & strong {
    font-weight: bold !important;
  }

  & ol,
  & ul {
    list-style: disc;
    margin-left: 20px;
  }

  & li {
    list-style: disc;
  }

  & p {
    line-height: 160%;
  }

  & h2,
  & h3,
  & h4 {
    font-weight: bold;
    margin-bottom: 0.5em;
  }

  /* h2 스타일 */
  & h2 {
    font-size: 24px;
  }

  /* h3 스타일 */
  & h3 {
    font-size: 20px;
  }

  /* h4 스타일 */
  & h4 {
    font-size: 18px;
  }
`;

const TextEditorViewer = ({ contents }) => {
  return <MainStlye>{ReactHtmlParser(contents)}</MainStlye>;
};
export default TextEditorViewer;
