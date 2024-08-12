import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_KEY ?? "";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export const uploadFile = async (file: File) => {
  try {
    const filename = `${Date.now()}.png`;

    const { error } = await supabase.storage.from("flysha-image").upload(`public/airplane/${filename}`, file, {
      cacheControl: "3600",
      upsert: false,
    });

    if (error) {
      throw new Error(error.message);
    }

    return filename;
  } catch (error) {
    console.log("ERROR SUPABASE: ", error);

    return error;
  }
};

export const getUploadFile = (filename: string) => {
  const { data } = supabase.storage.from("flysha-image").getPublicUrl(`public/airplane/${filename}`);

  return data.publicUrl;
};

export const deleteFile = async (filename: string) => {
  try {
    const { data, error } = await supabase.storage.from("flysha-image").remove([`public/airplane/${filename}`]);

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    console.log("ERROR SUPABASE: ", error);

    return false;
  }
};
