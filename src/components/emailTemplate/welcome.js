export const WelcomeQuoteEmail = ({ email }) => {
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
        }}
      >
        <h2>Xin chào anh/chị</h2>

        <p>
          Cảm ơn bạn đã gửi yêu cầu <b>báo giá dịch vụ</b> tại hệ thống của
          chúng tôi.
        </p>

        <p>
          Đội ngũ <b>Evergreen</b> đã nhận được thông tin của bạn và sẽ liên hệ
          trong thời gian sớm nhất.
        </p>

        <div
          style={{
            background: "#f9f9f9",
            padding: "15px",
            borderRadius: "6px",
            marginTop: "20px",
          }}
        >
          <p>📌 Trạng thái yêu cầu: Đã tiếp nhận</p>
          <p>📞 Nhân viên sẽ liên hệ trong vòng 24h</p>
        </div>

        <p style={{ marginTop: "20px" }}>
          Trân trọng,
          <br />
          <b>Evergreen</b>
        </p>
      </div>
    </div>
  );
};
