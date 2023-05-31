// import { useContext, useEffect, useState } from 'react';
// import { MainDiv, OrderText } from './style';
// import { ThemeContext } from 'styled-components';
// import { useMedia } from '../../../../../hooks/useMedia';

// const CancelOrderAdminFrom = ({ state, checkList, addCheckboxId, removeCheckboxId, axiosFun }) => {
//   const media = useMedia();
//   const colorTheme = useContext(ThemeContext).colorTheme;

//   console.log(state);
//   const dateObject = new Date(state.createdAt);

//   const [isChecked, setIsChecked] = useState(false);

//   useEffect(() => {
//     if (checkList) {
//       const isChecked22 = checkList.includes(state.id);
//       setIsChecked(isChecked22);
//     } else {
//       setIsChecked(false);
//     }
//     // eslint-disable-next-line
//   }, [checkList]);

//   const handleCheckboxChange = () => {
//     setIsChecked(!isChecked);
//     if (!isChecked) {
//       addCheckboxId(state.id);
//     } else {
//       removeCheckboxId(state.id);
//     }
//   };

//   const readyButton = () => {
//     if (state.deliveryStatus === '상품 준비 중') return alert('이미 해당 상태입니다.');

//     const data = {
//       status: '상품 준비 중',
//       paymentId: [state.id],
//     };
//     axiosFun(data);
//   };

//   const deliveryButton = () => {
//     if (state.deliveryStatus === '배송중') return alert('이미 해당 상태입니다.');

//     const data = {
//       status: '배송중',
//       paymentId: [state.id],
//     };
//     axiosFun(data);
//   };

//   return (
//     <MainDiv media={media} colorTheme={colorTheme} className="flexHeightCenter">
//       <div>
//         <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
//       </div>
//       <div>
//         {state.purchaseProductInformation.map((obj, key) => (
//           <OrderText media={media} key={key}>
//             <span>
//               상품 ID: <span>{obj.productId}</span>
//             </span>
//             <br />
//             <span>
//               수량: <span>{obj.quantity}</span>
//             </span>
//             <br />
//             {obj.options?.lenght > 0 && <span>옵션:</span>}
//             <ul>
//               {obj.options.map((option, key) => (
//                 <li key={key}>
//                   {option.optionName}: <span>{option.optionValue}</span>
//                 </li>
//               ))}
//             </ul>
//           </OrderText>
//         ))}
//       </div>
//       <div>
//         {dateObject.getMonth() + 1}월 {dateObject.getDate()}일<br />
//         {dateObject.getHours()}:{dateObject.getMinutes()}분
//       </div>
//       <div>{state.amountOfPayment.toLocaleString()}원</div>
//       <div>{state.deliveryStatus}</div>
//       <div className="flexWidthCenter">
//         <span onClick={readyButton}>상품 회수 중</span>
//         <span onClick={deliveryButton}>환불</span>
//       </div>
//     </MainDiv>
//   );
// };
// export default CancelOrderAdminFrom;
