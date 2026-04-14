import { OTPEmail } from "@/components/emailTemplate/auth";
import { BaoGiaEmail } from "@/components/emailTemplate/baogia";
import { WelcomeQuoteEmail } from "@/components/emailTemplate/welcome";

export const getEmailTemplate = ({ type, data }) => {
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
    case "BAOGIA":
      return {
        subject: "Báo giá chi tiết từ evergreen",
        template: BaoGiaEmail({
          customer: data.customer,
          items: data.items,
          summary: data.summary,
        }),
      };
    default:
      throw new Error("Invalid email type");
  }
};
