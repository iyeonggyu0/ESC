import { MainStyle } from './style';

const ExchangeReturn = ({ media }) => {
  return (
    <MainStyle media={media}>
      <div>
        <p>교환/반품 정보</p>
        <p>
          반품배송비(편도) : <span>편도 5,000원 (최초 배송비 미결제시 10,000원 부과)</span>
        </p>
        <p>
          교환배송비(왕복) :<span>10,000원</span>
        </p>
        <p>
          보내실 곳 :{' '}
          <span>
            (04355) 서울특별시 용산구 새창로 101 (티앤티빌딩) 2층 티앤티정보 온라인팀
            <br />
            단, 교환/반품 비용은 상품 및 교환/반품 사유에 따라 변경될 수 있으므로 교환/반품 신청
            화면 확인 부탁드립니다.
          </span>
        </p>
      </div>
      <div>
        <p>교환/반품 사유에 따른 요청 가능 기간</p>
        <p>
          구매자 단순 변심 : <span>상품 수령 후 7일 이내(구매자 반품 배송비 부담)</span>
        </p>
        <p>
          표시/광고와 상이, 계약 내용과 다르게 이행된 경우 :<br />
          <span>
            상품 수령 후 3개월 이내 혹은 표시/광고와 다른 사실을 안 날로부터 30일 이내(판매자 반품
            배송비 부담)
          </span>
        </p>
      </div>
      <div>
        <p>교환/반품 불가한 경우</p>
        <p>1. 교환/반품 요청이 기간이 지난 경우</p>
        <p>
          2. 소비자의 책임 있는 사유로 상품 등이 분실/파손/훼손된 경우 (단, 확인을 위한 포장 훼손
          제외)
        </p>
        <p>
          3. 소비자의 사용/소비에 의해 상품 등의 가치가 현저히 감소한 경우 (예 : 식품, 화장품, 향수,
          음반)
        </p>
        <p>4. 제품을 설치 또는 장착하였거나 개통한 경우 (예 : 전자제품, 컴퓨터, 휴대폰 등)</p>
        <p>
          5. 시간의 경과에 의해 재판매가 곤란할 정도로 상품 등의 가치가 현저히 감소한 경우
          (신선식품과 같이 유통기한이 정해져 있는 상품)
        </p>
        <p>6. 복제가 가능한 상품 등의 포장을 훼손한 경우 (CD/DVD/GAME/BOOK의 경우 포장 개봉 시)</p>
        <p>7. 주문제작 상품 중 상품제작에 들어간 경우 (주문접수 후 개별생산, 맞춤 제작 등)</p>
      </div>
      <div>
        <p>판매자 정보</p>
      </div>
    </MainStyle>
  );
};
export default ExchangeReturn;
