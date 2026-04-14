import { Button } from "../ui/button";

export default function ConfirmModal({
  title,
  content,
  onCancel,
  onConfirm,
  nameButton = "Hủy",
}) {
  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/50">
      <div className="bg-white w-full max-w-sm p-4 flex flex-col items-center space-y-2 rounded-2xl">
        <h3>{title || "Xác nhận hủy bỏ"}</h3>
        <p className="text-center">
          {content ||
            "Bạn có chắc chắn muốn hủy bỏ nội dung này? Tất cả thay đổi chưa lưu sẽ bị mất"}
        </p>
        <div className="space-x-2">
          <Button variant="secondary" onClick={onCancel}>
            Quay lại
          </Button>
          <Button onClick={onConfirm}>{nameButton}</Button>
        </div>
      </div>
    </div>
  );
}
