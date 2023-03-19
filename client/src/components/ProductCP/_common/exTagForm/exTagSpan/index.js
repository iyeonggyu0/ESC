import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

const ExTagSpan = ({ colorTheme, tagText, tag, setTagTextHandler }) => {
  const [application, setAdditional] = useState(false);

  useEffect(() => {
    // const testStr = '#청축 #테스트';
    // const regex = new RegExp('청축');
    const regex = new RegExp(tag);
    if (tagText !== null && tagText.leght !== 0) {
      if (regex.test(tagText)) {
        setAdditional(true);
        console.log('인식' + tag);
      }
    }
  }, [tagText, tag]);

  const ChoiceHandler = useCallback(() => {
    // Plus
    if (!application) {
      setTagTextHandler(tagText + ` #${tag}`);
      setAdditional(true);
    }

    if (application) {
      console.log('실행');
      const regex = new RegExp(tag, 'g');
      setTagTextHandler(tagText.replace(regex, ''));
      setAdditional(false);
    }

    // Minus
    // eslint-disable-next-line
  }, [tag]);

  // FIXME:
  return (
    <Span onClick={ChoiceHandler} colorTheme={colorTheme} application={application}>
      #{tag}
    </Span>
  );
};
export default ExTagSpan;

const Span = styled.span`
  cursor: pointer;
  font-size: 0.8rem;
  padding: 5px 5px;
  border-radius: 3px;
  color: black;
  background-color: ${(props) =>
    props.colorTheme === 'game' && props.application
      ? '#D0D7DE'
      : props.colorTheme !== 'game' && props.application
      ? '#DBD2D1'
      : 'white'};
`;
