const mailTemplate = (data, to) => {
  return `
      <!DOCTYPE html>
        <html style="margin: 0; padding: 0; box-sizing: border-box;">
          <head>
            <title>ESC: EMAIL_인증번호</title>
          </head>
          <body>
          <div>
            <div style=" margin-top: 3vh; padding-left: 5rem;">
              <p style="font-size: 3rem; font-weight: 900;" >ESC_KEY</p>
              <p style="font-size: 1.5rem; font-weight: 600;" >Everything Styles' Custom Keyboard</p>
              <div style="width: 70%; height: 1px; background-color: #cdcdcd; margin: 5vh auto 3vh 0;"></div>
              <p>안녕하세요 ${to}님,</p>
              <p style="margin-bottom: 2rem;" >요청하신 인증번호 보내드립니다.</p>
              <p style="font-size: 1.5rem; padding-left: 3rem; font-weight: 500; margin-bottom: 7vh;">${data}</p>
            </div>
          </div>
        </body>
        </html>
  `;
};

module.exports = { mailTemplate };

// <!DOCTYPE html>
// <html style="margin: 0; padding: 0;">
//     <head>
//         <title>이메일 인증하기</title>
//     </head>
//     <body style="margin: 0; padding: 0; font-size:15px;">
//         <div>인증번호는 ${data} 입니다.</div>
//     </body>
// </html>
