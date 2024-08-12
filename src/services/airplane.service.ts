import prisma from "@/lib/prisma";

export const Airplanes = {
  async findAllAirplanes() {
    try {
      const aiplanes = await prisma.airplane.findMany();
      return aiplanes;
    } catch (error) {
      console.error("Database Error: ", error);
      return [];
    }
  },

  async findById(id: string) {
    try {
      const aiplane = await prisma.airplane.findUnique({
        where: {
          id,
        },
      });
      return aiplane;
    } catch (error) {
      console.error("Database Error: ", error);
      return null;
    }
  },
};
