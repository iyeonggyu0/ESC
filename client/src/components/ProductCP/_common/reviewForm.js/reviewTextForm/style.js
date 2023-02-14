import styled from 'styled-components';

export const ButtonForm = styled.div``;
export const ModifyButtonForm = styled.div``;

export const ListDiv = styled.div`
  width: 98%;
  display: ${(props) => (props.media.isPc ? 'flex' : 'block')};
  margin: 0 auto 15px auto;
  background-color: #f7f7f9;
  border-radius: 10px;

  & > div:first-child {
    width: 10%;
    height: 100%;
    position: relative;
  }

  & > div:first-child > div {
    width: 60px;
    height: 60px;
    margin: 20px auto;
    max-height: 200px;
    border-radius: 50%;
    background: url(${(props) => props.profileImg}) no-repeat center center / contain;
  }

  & > div:nth-child(2) {
    padding: 0 12px;
    margin: 12px auto;
    border-left: ${(props) => (props.media.isPc ? '1px' : '0px')} solid
      ${(props) =>
        props.colorTheme === 'game'
          ? ({ theme }) => theme.palette.gameLightStroke
          : ({ theme }) => theme.palette.basicSubFont};
    width: 90%;
  }

  & > div:nth-child(2) > div:nth-child(1) {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
  }

  & > div:nth-child(2) > div:nth-child(1) > p {
    padding: 8px;
    cursor: pointer;
  }

  & > div:nth-child(2) > div:nth-child(2) {
    width: 100%;
    position: relative;
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
    margin: 0px auto 8px auto;
    border-top: 1px solid
      ${(props) =>
        props.colorTheme === 'game'
          ? ({ theme }) => theme.palette.gameLightStroke
          : ({ theme }) => theme.palette.basicSubFont};
  }

  & textarea {
    width: ${(props) => (props.media.isPc && props.modify ? '87%' : '100%')};
    /* margin: 0 ${(props) => (props.media.isPc && props.modify ? '0' : 'auto')}; */
    padding: 12px;
    resize: none;
    pointer-events: ${(props) => (props.modify ? 'all' : 'none')};
    background-color: #f7f7f9;
  }

  & textarea:focus {
    outline: none;
  }

  & ${ButtonForm} {
    width: ${(props) => (props.media.isPc ? '13%' : '100%')};
    height: ${(props) => (props.media.isPc ? '' : '40px')};
    margin-top: ${(props) => (props.media.isPc ? '0' : '20px')};
    background-color: ${(props) =>
      props.colorTheme === 'game'
        ? ({ theme }) => theme.palette.gameLightStroke
        : ({ theme }) => theme.palette.basicFont};
    color: ${(props) =>
      props.colorTheme === 'game'
        ? ({ theme }) => theme.palette.white
        : ({ theme }) => theme.palette.basicFont};
    margin-top: 12px;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }

  & > div:nth-child(2) > div:nth-child(3),
  ${ModifyButtonForm} {
    display: flex;
    justify-content: end;
    align-items: center;
    flex-wrap: wrap;
    gap: 0px 15px;
  }

  & > div:nth-child(2) > div:nth-child(3) > *,
  ${ModifyButtonForm} {
    cursor: pointer;
  }

  & > div:nth-child(2) > div:nth-child(3) > p {
    cursor: text;
  }
`;
