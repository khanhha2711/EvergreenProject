import Form from "@/features/bao-gia/form";

export default function Page() {
  return (
    <div className="space-y-2">
      <div className="space-y-2 mx-6 my-4">
        <h1>Tạo yêu cầu báo giá</h1>
        <p className="text-muted-foreground">
          Vui lòng nhập thông tin chi tiết để thực hiện báo giá
        </p>
      </div>
      <Form idEdit={false} />
    </div>
  );
}
