export default function MoTa({ creater, createDate, state }) {
  return (
    <div className='flex gap-10'>
      <p className="text-sm">
        Người tạo: <b>{creater}</b>
      </p>
      <p className="text-sm">
        Ngày tạo: <b>{createDate}</b>
      </p>
      <p className="text-sm">
        Trạng thái: <b>{state}</b>
      </p>
    </div>
  );
}
