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


export const getDistinctManagerData = async (): Promise<string[]> => {
  const { data, error } = await supabase
    .from("employee_data")
    .select("manager_email") // Select only the manager_email column
    .neq("manager_email", null); // Exclude null values

  if (error) {
    console.error("Error fetching manager emails:", error);
    return [];
  }

  // Use a Set to filter out duplicates since Supabase doesn't support `distinct`
  const uniqueEmails = [...new Set(data.map(item => item.manager_email))];

 return uniqueEmails;
};
