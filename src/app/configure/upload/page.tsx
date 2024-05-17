"use client";
import { useState, useTransition } from "react";
import DropZone, { FileRejection } from "react-dropzone";
import { Image, Loader2, MousePointerSquareDashed } from "lucide-react";
import { Progress } from "~/components/ui/progress";
import { cn } from "~/lib/utils";
import { useUploadThing } from "~/lib/uploadthing";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const Page = () => {
  const router = useRouter();
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();

  const onDropRejected = (rejectedFiles: FileRejection[]) => {
    const [file] = rejectedFiles;

    setIsDragOver(false);

    toast.error(`${file.file.type} type is not supported.`);
  };
  const onDropAccepted = (acceptedFiles: File[]) => {
    startUpload(acceptedFiles, { configId: undefined });

    setIsDragOver(false);
  };

  // const isUploading = false;
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const { isUploading, startUpload } = useUploadThing("imageUploader", {
    onClientUploadComplete: ([data]) => {
      const configId = data.serverData.configId;

      startTransition(() => {
        router.push(`/configure/design?id=${configId}`);
      });
    },
    onUploadProgress(p) {
      setUploadProgress(p);
    },
  });

  return (
    <div
      className={cn(
        "relative my-16 flex  h-full w-full flex-1 flex-col items-center justify-center rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:rounded-2xl",
        { "bg-blue-900/10 ring-blue-900/25": isDragOver },
      )}
    >
      <div className="relative flex flex-1 flex-col  items-center justify-center  ">
        <DropZone
          onDropAccepted={onDropAccepted}
          onDropRejected={onDropRejected}
          accept={{
            "image/png": [".png"],
            "image/jpg": [".jpg"],
            "image/jpeg": [".jpeg"],
          }}
          onDragEnter={() => setIsDragOver(true)}
          onDragLeave={() => setIsDragOver(false)}
        >
          {({ getRootProps, getInputProps }) => (
            <div
              className="flex h-full w-full flex-1 flex-col items-center justify-center"
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              {isDragOver ? (
                <MousePointerSquareDashed className="mb-2 h-6 w-6 text-zinc-500" />
              ) : isPending || isUploading ? (
                <Loader2 className="mb-2 h-6 w-6 animate-spin text-zinc-500" />
              ) : (
                <Image className="mb-2 h-6 w-6 text-zinc-500" />
              )}
              <div className="felx mb-2 flex-col justify-center text-sm text-zinc-700">
                {isUploading ? (
                  <div className="felx felx-col items-center">
                    <p>Uploading...</p>
                    <Progress
                      value={uploadProgress}
                      className="mt-2 h-2 w-40 bg-gray-300"
                      indicatorClassName="bg-green-600" //customised color
                    />
                  </div>
                ) : isPending ? (
                  <div>
                    <p>Redirecting</p>
                  </div>
                ) : isDragOver ? (
                  <p>
                    <span className="font-semibold">Drop file</span> to upload
                  </p>
                ) : (
                  <p>
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                )}
              </div>
            </div>
          )}
        </DropZone>
      </div>
    </div>
  );
};

export default Page;
