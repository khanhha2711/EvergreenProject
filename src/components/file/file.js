"use client";

import { Button } from "@base-ui/react";
import { File, Trash, Trash2 } from "lucide-react";

const FileComponent = ({ fileName, setFile, disable }) => {
  return (
    <div className="bg-green-300/20 flex items-center gap-6 p-2 pl-4 pr-6 rounded-xl">
      <div className="bg-primary/60 p-2 rounded-sm">
        <File className="text-white" size={20} />
      </div>
      <div className="flex-1">
        <b>{fileName}</b>
      </div>
      {!disable && (
        <div>
          <Button
            onClick={() => setFile(null)}
            variant="secondary"
            className="cursor-pointer "
          >
            <Trash2 className="text-destructive" size={20} />
          </Button>
        </div>
      )}
    </div>
  );
};

export default FileComponent;
