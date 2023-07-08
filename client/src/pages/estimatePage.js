import EstimateMain from '../components/ProductFindCP/estimate';
import axios from 'axios';
import { axiosInstance } from '../util/axios';
import { useState } from 'react';
import { useEffect } from 'react';

const EstimatePage = () => {
  const [productData, setProductData] = useState([]);
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

  return <EstimateMain productData={productData} />;
};
export default EstimatePage;
