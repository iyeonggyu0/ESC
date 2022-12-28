import { useMedia } from "../../../hooks/useMedia";

const LayOutHeader = () => {
  const media = useMedia();

  return (
    <>
      {media.isPc && <div>Pc 헤더</div>}
      {(media.isMobile || media.isTablet) && <div>Tablet, Mobile 헤더</div>}
    </>
  );
};
export default LayOutHeader;
