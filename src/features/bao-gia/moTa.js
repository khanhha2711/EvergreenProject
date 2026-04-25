import { User } from "lucide-react";

export default function MoTa({ creater, createDate, id }) {
  return (
    <div className="flex gap-10">
      <p className="text-sm">
        Mã báo giá: <b>{id}</b>
      </p>
      <p className="text-sm">
        Người tạo: <b>{creater}</b>
      </p>
      <p className="text-sm">
        Ngày tạo: <b>{createDate}</b>
      </p>
    </div>
  );
}
