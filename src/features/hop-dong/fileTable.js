"use client";

import { Button } from "@/components/ui/button";

export default function FileTable({ attachment }) {
  const handleOpenFile = () => {
    window.open(`/api/file?path=${attachment.downloadURL}`, "_blank");
  };

  return (
    <div onClick={handleOpenFile} className="font-bold cursor-pointer">
      {attachment?.fileName?.split("_")[1] || attachment?.downloadURL}
    </div>
  );
}
