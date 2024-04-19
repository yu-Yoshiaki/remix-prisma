export const login = async (email: string) => {
  // DBからuserを取得する処理が入る(prismaなど)
  // const user = await prisma.user.findUnique({ where: { email: String(email) } })
  const user = {
    email: "test@example.com",
    password: "password",
  };
  if (email === user.email) {
    return user;
  }

  return null;
};
