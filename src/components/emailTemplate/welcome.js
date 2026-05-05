export const WelcomeQuoteEmail = ({ email }) => {
  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        padding: "30px 0",
        backgroundColor: "#f4f6f8",
      }}
    >
      <div
        style={{
          maxWidth: "600px",
          margin: "0 auto",
          background: "#ffffff",
          borderRadius: "10px",
          overflow: "hidden",
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        }}
      >
        {/* HEADER */}
        <div
          style={{
            backgroundColor: "#16a34a",
            color: "#ffffff",
            padding: "20px",
            textAlign: "center",
          }}
        >
          <h2 style={{ margin: 0 }}>Evergreen Logistics</h2>
          <p style={{ margin: 0, fontSize: "13px", opacity: 0.9 }}>
            Giải pháp vận chuyển & chuỗi cung ứng
          </p>
        </div>

        {/* BODY */}
        <div style={{ padding: "30px" }}>
          <h3 style={{ marginTop: 0 }}>Xin chào Quý khách,</h3>

          <p style={{ color: "#444", lineHeight: "1.6" }}>
            Cảm ơn Quý khách đã gửi yêu cầu <b>báo giá dịch vụ</b> đến hệ thống
            của chúng tôi.
          </p>

          <p style={{ color: "#444", lineHeight: "1.6" }}>
            Chúng tôi xác nhận đã tiếp nhận thông tin và đang tiến hành xử lý
            yêu cầu. Đội ngũ <b>Evergreen</b> sẽ sớm liên hệ để tư vấn và cung
            cấp báo giá phù hợp.
          </p>

          {/* STATUS BOX */}
          <div
            style={{
              background: "#f0fdf4",
              border: "1px solid #bbf7d0",
              padding: "16px",
              borderRadius: "8px",
              marginTop: "20px",
            }}
          >
            <p style={{ margin: "0 0 8px 0" }}>
              📌 <b>Trạng thái:</b> Đã tiếp nhận
            </p>
            <p style={{ margin: 0 }}>
              ⏱️ <b>Thời gian phản hồi:</b> Trong vòng 24 giờ
            </p>
          </div>

          {/* CTA */}

          <p style={{ marginTop: "30px", color: "#555" }}>
            Trân trọng,
            <br />
            <b>Evergreen Logistics</b>
          </p>
        </div>

        {/* FOOTER */}
        <div
          style={{
            background: "#f9fafb",
            padding: "15px",
            textAlign: "center",
            fontSize: "12px",
            color: "#888",
          }}
        >
          © {new Date().getFullYear()} Evergreen Logistics. All rights reserved.
        </div>
      </div>
    </div>
  );
};
