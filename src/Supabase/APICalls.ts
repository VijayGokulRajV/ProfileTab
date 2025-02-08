import { supabase } from "./supabaseClient";

export const getUsersData = async (email: string) => {
  const { data, error } = await supabase
    .from("employee_data")
    .select("*")
    .eq("email", email); 

  if (error) {
    console.error("Error fetching data:", error);
    return [];
  }

  return data || [];
};
