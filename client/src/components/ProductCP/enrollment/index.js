import { useContext, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../../../App';
import { useMedia } from '../../../hooks/useMedia';
import NotAdmin from '../../_common/notAdmin';
import NotLogin from '../../_common/notLogin';
import { useInput } from '@hooks/useInput';

import TextEditor from '../../_common/textEditor/index';

import { EnrollmentStyle, TextInputDiv, TextEditorDiv } from './style';

const ProductEnrollmentMain = () => {
  const media = useMedia();
  // eslint-disable-next-line
  const dispatch = useDispatch();
  // eslint-disable-next-line
  const navigate = useNavigate();
  const colorTheme = useContext(ThemeContext).colorTheme;
  const userData = useContext(ThemeContext).userInfo.userData;
  const login = useContext(ThemeContext).userInfo.login;

  const [name, onChangeName] = useInput('');
  const [type, setType] = useState('');
  const [price, onChangePrice] = useInput('');
  const [textData, setState] = useState('');

  const [error, setError] = useState(null);

  useEffect(() => {
    if (name.length > 0 && type.length > 0 && price.length > 0 && textData.length > 0) {
      setError(false);
      return;
    } else {
      setError(true);
    }
  }, [name, type, price, textData]);

  const textDataFun = (text) => {
    console.log(text);
    setState(`${text}`);
  };

  return (
    <>
      {login && (
        <>
          {userData.authority === 'admin' && (
            <EnrollmentStyle colorTheme={colorTheme} media={media} errorz={error}>
              <p>Add Product</p>
              <div>
                <TextInputDiv>
                  <p>NAME</p>
                  <input
                    type="text"
                    autoComplete="off"
                    value={name}
                    onChange={onChangeName}
                    autoFocus
                  />
                </TextInputDiv>
                <TextInputDiv>
                  <p>TYPE</p>
                  <div>
                    <span
                      onClick={() => setType('case')}
                      style={{
                        color:
                          colorTheme === 'game' && type === 'case'
                            ? 'black'
                            : colorTheme !== 'game' && type === 'case'
                            ? '#796763'
                            : '#AEAEAE',
                      }}
                    >
                      CASE
                    </span>
                    <span
                      onClick={() => setType('pcb')}
                      style={{
                        color:
                          colorTheme === 'game' && type === 'pcb'
                            ? 'black'
                            : colorTheme !== 'game' && type === 'pcb'
                            ? '#796763'
                            : '#AEAEAE',
                      }}
                    >
                      PCB
                    </span>
                    <span
                      onClick={() => setType('plate')}
                      style={{
                        color:
                          colorTheme === 'game' && type === 'plate'
                            ? 'black'
                            : colorTheme !== 'game' && type === 'plate'
                            ? '#796763'
                            : '#AEAEAE',
                      }}
                    >
                      PLATE
                    </span>
                    <span
                      onClick={() => setType('switches')}
                      style={{
                        color:
                          colorTheme === 'game' && type === 'switches'
                            ? 'black'
                            : colorTheme !== 'game' && type === 'switches'
                            ? '#796763'
                            : '#AEAEAE',
                      }}
                    >
                      SWITCHES
                    </span>
                    <span
                      onClick={() => setType('keycaps')}
                      style={{
                        color:
                          colorTheme === 'game' && type === 'keycaps'
                            ? 'black'
                            : colorTheme !== 'game' && type === 'keycaps'
                            ? '#796763'
                            : '#AEAEAE',
                      }}
                    >
                      KEYCAPS
                    </span>
                    <span
                      onClick={() => setType('etc')}
                      style={{
                        color:
                          colorTheme === 'game' && type === 'etc'
                            ? 'black'
                            : colorTheme !== 'game' && type === 'etc'
                            ? '#796763'
                            : '#AEAEAE',
                      }}
                    >
                      ETC
                    </span>
                  </div>
                </TextInputDiv>
                <TextInputDiv>
                  <p>PRICE</p>
                  <input
                    type="text"
                    autoComplete="off"
                    value={price.replace(/[^0-9]/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    onChange={onChangePrice}
                  />
                </TextInputDiv>
                <TextInputDiv>
                  <p>IMG</p>
                  <input type="file" />
                </TextInputDiv>
              </div>
              <TextEditorDiv>
                <p>Product Detailed Description</p>
                <TextEditor textDataFun={textDataFun} textData={textData} />
              </TextEditorDiv>
              <div>저장</div>
            </EnrollmentStyle>
          )}
        </>
      )}
      <NotAdmin />
      <NotLogin />
    </>
  );
};
export default ProductEnrollmentMain;
