export const useDate = (dateData) => {
  const date = new Date(dateData);
  const year = date.getUTCFullYear().toString().slice(-2); // 뒤에서 2자리만 추출
  const month = (date.getUTCMonth() + 1).toString().padStart(2, '0'); // 월은 0부터 시작하므로 +1을 해줌
  const day = date.getUTCDate().toString().padStart(2, '0');
  return `${year}/${month}/${day}`;
};
