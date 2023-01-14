import { useContext } from 'react';
import { ThemeContext } from '../App';

export const useProfile = () => {
  const colorTheme = useContext(ThemeContext).colorTheme;
  const userData = useContext(ThemeContext).userInfo.userData;
  let profileImg = '';
  console.log(profileImg);

  if (userData !== null) {
    if (userData.profileImg === '/img/profileImg/basicProfileImg.png' && colorTheme === 'game') {
      profileImg = '/img/profileImg/gameProfileImg.png';
    } else {
      profileImg = userData.profileImg;
    }
  }
  console.log(profileImg);
  return profileImg;
};
