import { useMediaQuery } from 'react-responsive';

export const useMedia = () => {
  const isPc = useMediaQuery({
    query: '(min-width:768px)',
  });
  const isMobile = useMediaQuery({
    query: '(max-width:767px)',
  });

  return { isPc, isMobile };
};

//  const media = useMedia();
//  media.isPc
//  media.isTablet
//  media.isMobile
