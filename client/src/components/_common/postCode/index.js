import { useContext } from 'react';
import DaumPostcode from 'react-daum-postcode';
import { useMedia } from '../../../hooks/useMedia';

import { StyleMain } from './style';

import { ModalIsOpen } from '../../../pages/myPage';

const PostCode = () => {
  const media = useMedia();
  const setAddress = useContext(ModalIsOpen).setAddress;
  const onToggleModal = useContext(ModalIsOpen).setModalIsOpen;

  const handlePostCode = (data) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }
    setAddress(fullAddress);
    onToggleModal(false);
  };

  return (
    <StyleMain media={media} onClick={() => onToggleModal(false)}>
      <div>
        <DaumPostcode
          style={{ width: '100%', height: '444px', borderRadius: '10px' }}
          onComplete={handlePostCode}
        />
      </div>
    </StyleMain>
  );
};
export default PostCode;
