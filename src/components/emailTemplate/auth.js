export const OTPEmail = ({ otp }) => {
  return (
    <div
      style={{
        fontFamily: "Arial",
        padding: "20px",
        backgroundColor: "#f4f4f4",
      }}
    >
      <div
        style={{
          maxWidth: "600px",
          margin: "0 auto",
          background: "#ffffff",
          padding: "30px",
          borderRadius: "8px",
          textAlign: "center",
        }}
      >
        <h2>Xác thực tài khoản</h2>

        <p>Xin chào</p>

        <p>Mã OTP của bạn là:</p>

        <div
          style={{
            fontSize: "32px",
            fontWeight: "bold",
            letterSpacing: "6px",
            margin: "20px 0",
            color: "#0070f3",
          }}
        >
          {otp}
        </div>

        <p>Mã này sẽ hết hạn sau 5 phút.</p>

        <p style={{ fontSize: "12px", color: "#888" }}>
          Nếu bạn không yêu cầu mã này, vui lòng bỏ qua email.
        </p>
      </div>
    </div>
  );
};
