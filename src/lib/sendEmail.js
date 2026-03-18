import { OTPEmail } from "@/components/email/auth";
import { WelcomeQuoteEmail } from "@/components/email/welcome";

export const getEmailTemplate = ({type, data}) => {
  switch (type) {
    case "WELCOME":
      return {
        subject: "Chúng tôi đã nhận yêu cầu báo giá của bạn",
        template: WelcomeQuoteEmail(data),
      };

    case "OTP":
      return {
        subject: "Mã OTP xác thực tài khoản",
        template: OTPEmail({ otp: data.otp }),
      };

    default:
      throw Error;
  }
};
