import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

const ExTagSpan = ({ colorTheme, tagText, tag, setTagTextHandler }) => {
  const [application, setAdditional] = useState(false);
  useEffect(() => {
    const regex = new RegExp(tag);
    if (tagText !== null && tagText.leght !== 0) {
      if (regex.test(tagText)) {
        setAdditional(true);
      }
    }
  }, [tagText, tag]);

  const ChoiceHandler = useCallback(() => {
    // Plus
    if (!application) {
      if (tagText) {
        setTagTextHandler(tagText + ` #${tag}`);
      }
      if (!tagText) {
        setTagTextHandler(`#${tag}`);
      }
      setAdditional(true);
    }

    // Minus
    if (application) {
      const regex = new RegExp(`#${tag}`, 'g');
      setTagTextHandler(tagText.replace(regex, ''));
      setAdditional(false);
    }
  }, [tag, application, setTagTextHandler, tagText]);

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
      ? '#EAEAEA'
      : props.colorTheme !== 'game' && props.application
      ? '#DBD2D1'
      : 'white'};
`;
