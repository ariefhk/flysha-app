import prisma from "@/lib/prisma";

export const User = {
  async getAllCustomer() {
    try {
      const users = await prisma.user.findMany({
        where: {
          role: "CUSTOMER",
        },
      });

      return users;
    } catch (error) {
      console.error("Error fetching customers", error);

      return [];
    }
  },
};
