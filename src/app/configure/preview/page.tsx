import React from "react";
import DesignPreview from "./DesignPreview";
import { notFound } from "next/navigation";
import { db } from "~/server/db";

type DesignPreviewProp = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

const Page = async ({ searchParams }: DesignPreviewProp) => {
  const { id } = searchParams;

  if (!id || typeof id !== "string") {
    return notFound();
  }
  const configuration = await db.configuration.findUnique({
    where: { id },
  });
  if (!configuration) {
    return notFound();
  }

  return (
    <div className="h-full w-full">
      <DesignPreview configuration={configuration} />
    </div>
  );
};

export default Page;
