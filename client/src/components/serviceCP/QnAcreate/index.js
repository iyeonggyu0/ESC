import { useContext } from 'react';
import { ThemeContext } from '../../../App';
import { useMedia } from '../../../hooks/useMedia';
import { MainStyle } from './style';
import { useState } from 'react';
import Select from 'react-select';
import TextEditor from '../../_common/textEditor';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { regular, solid } from '@fortawesome/fontawesome-svg-core/import.macro';
// import { useNavigate } from 'react-router-dom';

const ServiceQnACreateMain = () => {
  const media = useMedia();
  const colorTheme = useContext(ThemeContext).colorTheme;
  // const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [typeOption, setTypeOption] = useState('선택');
  const [contents, setContents] = useState('');

  const onTitleHandler = (event) => {
    if (event.target.value.length > 35) {
      return;
    }
    setTitle(event.target.value);
  };

  const typeOptions = [
    { value: '제품', label: '제품' },
    { value: '반품/환불', label: '반품/환불' },
    { value: '교환', label: '교환' },
    { value: '배송', label: '배송' },
    { value: '가이드', label: '가이드' },
  ];

  const contentsInput = (text) => {
    console.log(text);
    setContents(`${text}`);
  };

  // <TextEditor textDataFun={textDataFun} />

  return (
    <MainStyle media={media} colorTheme={colorTheme}>
      <p>Q. 질문 / 문의 사항을 남겨 주세요!</p>
      <div>
        <p>제목{media.isMobile && <span className="isMobile">{title.length}/35</span>}</p>
        <div>
          <input type="text" value={title} onChange={onTitleHandler} />
          {media.isPc && <span className="isPc">{title.length}/35</span>}
        </div>
      </div>
      <div>
        <p>문의 타입</p>
        <Select defaultValue={typeOption} onChange={setTypeOption} options={typeOptions} />
      </div>
      <div>
        <p>문의 내용</p>
        <TextEditor textDataFun={contentsInput} />
      </div>
    </MainStyle>
  );
};
export default ServiceQnACreateMain;
