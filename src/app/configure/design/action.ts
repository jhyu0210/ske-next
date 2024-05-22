"use server";

import {
  CaseColor,
  CaseFinish,
  CaseMaterial,
  PhoneModel,
} from "@prisma/client";
import { db } from "~/server/db";

export type SaveConfigArgs = {
  model: PhoneModel;
  finish: CaseFinish;
  material: CaseMaterial;
  color: CaseColor;
  configId: string;
};

export async function saveConfig({
  color,
  finish,
  material,
  model,
  configId,
}: SaveConfigArgs) {
  console.log("saving data....", color, finish, material, configId);
  await db.configuration.update({
    where: { id: configId },
    data: { color, finish, model, material },
  });
}
