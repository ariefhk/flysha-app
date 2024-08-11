import { createBcrypt } from "@/lib/bcrypt";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const adminSeed = await prisma.user.create({
    data: {
      name: "Admin",
      email: "admin@gmail.com",
      role: "ADMIN",
      password: await createBcrypt("rahasia"),
    },
  });

  console.log(adminSeed);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
