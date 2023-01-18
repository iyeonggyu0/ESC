import { useContext } from 'react';
import { ThemeContext } from '../App';

export const useProfile = () => {
  const colorTheme = useContext(ThemeContext).colorTheme;
  const userData = useContext(ThemeContext).userInfo.userData;
  let profileImg = '';

  if (userData !== null) {
    if (userData.profileImg === '/img/profileImg/basicProfileImg.png' && colorTheme === 'game') {
      profileImg = '/img/profileImg/gameProfileImg.png';
    } else {
      profileImg = `/img/profileImg/uploads/${userData.profileImg}`;
    }
  } else if (userData === null) {
    profileImg = '/img/profileImg/gameProfileImg.png';
  }
  return profileImg;
};
