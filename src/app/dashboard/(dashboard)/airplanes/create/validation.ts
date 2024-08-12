import { z } from "zod";

const ACCEPTED_FILE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

export const createAirplaneFormValidation = z.object({
  name: z.string({ required_error: "Nama pesawat tidak boleh kosong!" }).min(4, "Nama Pesawat minimal 4 karakter!"),
  code: z
    .string({ required_error: "Kode pesawat tidak boleh kosong!" })
    .regex(/^[A-Z]{3}-\d{3}$/, "Kode Pesawat harus berformat XXX-000"),
  image: z
    .any()
    .refine((file: File) => ACCEPTED_FILE_TYPES.includes(file.type), "Image harus berformat jpg/jpeg/png!")
    .refine((file: File) => file.size <= MAX_FILE_SIZE, "Ukuran file maksimal 2MB!"),
});
