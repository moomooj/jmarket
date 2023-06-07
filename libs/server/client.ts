import { PrismaClient } from "@prisma/client";

export type ResponseBody = { ok: boolean; [key: string]: any };

export const client = new PrismaClient();
