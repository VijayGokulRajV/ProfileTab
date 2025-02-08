



export interface Employee {
  created_at: string;
  employee_name: string;
  employee_code: string;
  designation: string;
  department: string;
  office_location: string;
  base_location: string;
  job_description: string;
  email: string;
  manager_name: string;
  manager_email: string;
  country_code: string;
  mobile: string;
  date_of_entry: string;
  date_of_confirmation: string;
  date_of_joining: string;
  date_of_birth: string;
  gender: "Male" | "Female" | "Other";
  marital_status: "Single" | "Married" | "Divorced" | "Widowed";
  resignation_submission_date: string;
  last_working_day: string;
  type_of_seperation: "Resignation" | "Termination" | "Retirement" | string;
  notice_period_days: number;
  reason: string;
  rehire_eligibilty: "Yes" | "No";
  type_of_loss: string;
  office_phone: string | null;
  office_extension: string | null;
  residence_phone: string | null;
  fathers_name: string;
  alternate_email: string;
  marriage_anniversary: string | null;
  permanent_address: string;
  present_address: string;
  employment_type: "Regular" | "Contract" | "Internship" | string;
  contract_end_date: string | null;
  employment_status: "Active" | "Resigned" | "Terminated" | "Retired";
  blood_group: string;
  emergency_contact_name: string | null;
  emergency_contact_no: string;
}
