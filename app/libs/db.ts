import { PrismaClient } from "@prisma/client";
import { PrismaClient as edge } from "@prisma/client/edge";

export const prisma = new PrismaClient();
export const prismaEdge = new edge();
