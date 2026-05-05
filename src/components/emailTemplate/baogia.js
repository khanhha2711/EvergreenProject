export const BaoGiaEmail = ({ customer, items, summary }) => {
  const formatMoney = (n) => `${Number(n || 0).toLocaleString("vi-VN")} VNĐ`;

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
        <h2 style={{ textAlign: "center" }}>BÁO GIÁ DỊCH VỤ</h2>

        <p>
          Xin chào <b>{customer?.contactName}</b>,
        </p>

        <p>
          Cảm ơn Quý khách đã quan tâm đến dịch vụ của chúng tôi. Dưới đây là
          chi tiết báo giá:
        </p>

        <hr />

        {/* Thông tin khách hàng */}
        <h3>🔹 Thông tin khách hàng</h3>
        <ul>
          <li>
            <b>Công ty:</b> {customer?.companyName}
          </li>
          <li>
            <b>Email:</b> {customer?.customerEmail}
          </li>
          <li>
            <b>SĐT:</b> {customer?.contactPhone}
          </li>
        </ul>

        {/* Bảng dịch vụ */}
        <h3>🔹 Chi tiết dịch vụ</h3>

        <table
          width="100%"
          cellPadding="8"
          style={{
            borderCollapse: "collapse",
            fontSize: "14px",
          }}
          border="1"
        >
          <thead style={{ backgroundColor: "#f1f5f9" }}>
            <tr>
              <th align="left">Hạng mục</th>
              <th align="center">Số lượng</th>
              <th align="right">Đơn giá</th>
              <th align="right">Thành tiền</th>
            </tr>
          </thead>
          <tbody>
            {items?.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td align="center">{item.quantity}</td>
                <td align="right">{formatMoney(item.unitPrice)}</td>
                <td align="right">
                  <b>{formatMoney(item.total)}</b>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Tổng tiền */}
        <div style={{ marginTop: "16px", textAlign: "right" }}>
          <p>
            Tạm tính: <b>{formatMoney(summary?.subtotal)}</b>
          </p>
          <p>
            VAT ({summary?.vatPercent || 10}%):{" "}
            <b>{formatMoney(summary?.vatAmount)}</b>
          </p>
          <p style={{ fontSize: "16px" }}>
            <b>Tổng cộng: {formatMoney(summary?.totalAmount)}</b>
          </p>
        </div>

        <hr />

        <h3> Lưu ý quan trọng</h3>
        <ul>
          <li>
            Báo giá trên chưa bao gồm các chi phí phát sinh trong quá trình
            thông quan như: kiểm hóa, lưu kho, lưu bãi, phí nâng hạ, phí hãng
            tàu, hoặc các chi phí ngoài kiểm soát khác.
          </li>
          <li>
            Các chi phí phát sinh (nếu có) sẽ được thông báo và xác nhận với Quý
            khách trước khi thực hiện và sẽ được tính bổ sung vào hóa đơn chính
            thức.
          </li>
          <li>
            Thời gian và chi phí có thể thay đổi tùy thuộc vào quy định của cơ
            quan hải quan và tình hình thực tế.
          </li>
        </ul>

        <h3>Điều khoản</h3>
        <ul>
          <li>
            Báo giá có hiệu lực trong vòng <b>07 ngày</b>.
          </li>
          <li>Thanh toán theo thỏa thuận trong hợp đồng.</li>
        </ul>

        <hr />

        <p>
          Nếu Quý khách cần thêm thông tin hoặc muốn xác nhận báo giá, vui lòng
          phản hồi lại email này.
        </p>

        <p>Trân trọng,</p>
        <p>
          <b>Evergreen Logistics</b>
        </p>
      </div>
    </div>
  );
};
