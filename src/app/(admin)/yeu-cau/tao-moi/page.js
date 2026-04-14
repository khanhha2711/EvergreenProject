import Form from "@/features/bao-gia/form";

export default function Page() {
  return (
    <div className="space-y-2">
      <h3 className="ml-4 mt-4">Tạo yêu cầu báo giá</h3>
      <Form idEdit={false} />
    </div>
  );
}
