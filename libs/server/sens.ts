import * as crypto from "crypto";

export function makeSignature() {
  const message = [];
  const hmac = crypto.createHmac("sha256", `${process.env.NAVER_SECRET_KEY}`);
  const timeStamp = Date.now().toString();
  const space = " ";
  const newLine = "\n";
  const method = "POST";

  message.push(method);
  message.push(space);
  message.push(`/sms/v2/services/${process.env.NAVER_SENS_SMS_ID}/messages`);
  message.push(newLine);
  message.push(timeStamp);
  message.push(newLine);
  message.push(`${process.env.NAVER_ACCESS_KEY_ID}`);

  // 시그니쳐 생성
  const signature = hmac.update(message.join("")).digest("base64");
  // string 으로 반환
  return signature.toString();
}
