import bcrypt from "bcryptjs";
import { prisma } from "../libs/db";

export const createUser = async (
  data: Record<"email" | "password", string>
) => {
  const { email, password } = data;

  if (!(email && password)) {
    throw new Error("Invalid input");
  }

  const existingUser = await prisma.user.findUnique({ where: { email } });

  if (existingUser) {
    return { error: { message: "メールアドレスは既に登録済みです" } };
  }

  const hashedPassword = await bcrypt.hash(data.password, 12);
  const newUser = await prisma.user.create({
    data: { email, password: hashedPassword },
  });

  return { id: newUser.id, email: newUser.email };
};
