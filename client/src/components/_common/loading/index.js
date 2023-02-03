import ReactLoading from 'react-loading';
import { LoaderWrapperMain } from './style';

const CommonLoading = () => {
  return (
    <LoaderWrapperMain>
      <ReactLoading type="spin" width={64} height={64} color="#00c7ae" />
    </LoaderWrapperMain>
  );
};
export default CommonLoading;
