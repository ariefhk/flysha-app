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
};
