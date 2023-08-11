import { useCallback, useContext } from 'react';
import { ThemeContext } from '../../../App';
import { useMedia } from '../../../hooks/useMedia';
import { MainStyle } from './style';
import { useState } from 'react';
import Select from 'react-select';
// import TextEditor from '../../_common/textEditor';
import TextEditorInCommunity from '../../_common/textEditorCommunity';
import { axiosInstance } from '../../../util/axios';
import axios from 'axios';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { regular, solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { useNavigate } from 'react-router-dom';

const ServiceQnACreateMain = () => {
  const media = useMedia();
  const colorTheme = useContext(ThemeContext).colorTheme;
  const userData = useContext(ThemeContext).userInfo.userData;
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [typeOption, setTypeOption] = useState(null);
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
    setContents(`${text}`);
  };

  const qnaSaveHandler = useCallback(
    (secret) => {
      if (title.replace(/ /g, '').length === 0) {
        return alert('제목을 입력하세요');
      }

      if (!typeOption) {
        return alert('TYPE을 선택하세요');
      }

      if (contents.replace(/ /g, '').length < 15) {
        return alert('내용은 15글자 이상이어야 합니다');
      }

      const data = {
        email: userData.email,
        title: title,
        inquiryType: typeOption,
        contents: contents,
        secret: secret,
      };

      axios
        .post(`${axiosInstance}api/service/inquiry/post`, data)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => console.error(err));

      console.log(data);
    },
    [title, typeOption, contents, userData],
  );

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
        <TextEditorInCommunity textDataFun={contentsInput} />
      </div>
      <div>
        <div className="flexCenter" onClick={() => qnaSaveHandler(true)}>
          비공개 저장
        </div>
        <div className="flexCenter" onClick={() => qnaSaveHandler(false)}>
          공개 저장
        </div>
      </div>
    </MainStyle>
  );
};
export default ServiceQnACreateMain;
