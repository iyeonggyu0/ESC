import ReactLoading from 'react-loading';
import { LoaderTamplate, LoaderWrapper } from './style';

const CommonLoadingPage = () => {
  return (
    <LoaderWrapper>
      <LoaderTamplate>
        <ReactLoading type="spin" width={64} height={64} color="#00c7ae" />
      </LoaderTamplate>
    </LoaderWrapper>
  );
};
export default CommonLoadingPage;
