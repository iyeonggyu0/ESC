import EstimateMain from '../components/ProductFindCP/estimate';
import axios from 'axios';
import { axiosInstance } from '../util/axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NotFountPage from '../components/_common/error/404';
import EstimateResult from '../components/ProductFindCP/estimate/result';

const EstimatePage = () => {
  const [productData, setProductData] = useState([]);
  const [selectionList, setSelectionList] = useState([]);
  const param = useParams().pageNum;

  useEffect(() => {
    axios
      .get(`${axiosInstance}api/product/estimate/get`)
      .then((res) => {
        const CASE = res.data.data.filter((item) => item.type === 'CASE');
        const PCB = res.data.data.filter((item) => item.type === 'PCB');
        const PLATE = res.data.data.filter((item) => item.type === 'PLATE');
        const SWITCH = res.data.data.filter((item) => item.type === 'SWITCHES');
        const KEYCAPS = res.data.data.filter((item) => item.type === 'KEYCAPS');
        setProductData([CASE, PCB, PLATE, SWITCH, KEYCAPS]);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const saveSelectionList = (data) => {
    setSelectionList(data);
  };

  return (
    <div>
      {param == 6 && selectionList.length != 0 && (
        <EstimateResult productData={productData} selectionList={selectionList} />
      )}
      {(param == 0 || param > 6 || (param == 6 && selectionList.length == 0)) && <NotFountPage />}
      {param <= 5 && (
        <EstimateMain productData={productData} saveSelectionList={saveSelectionList} />
      )}
    </div>
  );
};
export default EstimatePage;
