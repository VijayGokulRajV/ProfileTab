import React, { useContext, useEffect, useState } from "react";
import { Employee } from "./UserProfileDummy";
import { getDistinctManagerData, getUsersData } from "../../Supabase/APICalls";
import { useData } from "@microsoft/teamsfx-react";
import { TeamsFxContext } from "../Context";

interface TabContentProps {
  id: string;
  isActive: boolean;
  children: React.ReactNode;
}

const UserProfile: React.FC = () => {
  const { teamsUserCredential } = useContext(TeamsFxContext);
  const [activeTab, setActiveTab] = useState("personal");
  const [userProfile, setUserProfile] = useState<Employee | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { data: userInfo } = useData(async () => {
    if (teamsUserCredential) {
      const userInfo = await teamsUserCredential.getUserInfo();
      return userInfo;
    }
  });

  const fetchUserData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      if (userInfo?.preferredUserName) {
        const singleUserData = await getUsersData(userInfo.preferredUserName);
        setUserProfile(singleUserData[0] || null);
      }
    } catch (err) {
      setError('Failed to fetch user data');
      console.error('Error fetching user data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchManagers = async () => {
    try {
      const managers = await getDistinctManagerData();
      console.log("Distinct Manager Emails:", managers);
    } catch (error) {
      console.error("Error fetching distinct manager emails:", error);
    }
  };

  useEffect(() => {
    if (userInfo?.preferredUserName) {
      fetchUserData();
      fetchManagers();
    }
  }, [userInfo]);

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
  };

  const TabContent = ({ id, isActive, children }: TabContentProps) => (
    <div id={id} className={`${isActive ? "grid grid-cols-2 gap-4 md:gap-6" : "hidden"}`}>
      {children}
    </div>
  );

  const sections = {
    personal: [
      { label: "Date of Birth", value: userProfile?.date_of_birth },
      { label: "Marital Status", value: userProfile?.marital_status },
      { label: "Blood Group", value: userProfile?.blood_group },
      { label: "Father's Name", value: userProfile?.fathers_name },
      { label: "Marriage Anniversary", value: userProfile?.marriage_anniversary },
    ],
    employment: [
      { label: "Department", value: userProfile?.department },
      { label: "Job Description", value: userProfile?.job_description },
      { label: "Office Location", value: userProfile?.office_location },
      { label: "Base Location", value: userProfile?.base_location },
      { label: "Date of Joining", value: userProfile?.date_of_joining },
      { label: "Employment Type", value: userProfile?.employment_type },
      { label: "Employment Status", value: userProfile?.employment_status },
      { label: "Manager Name", value: userProfile?.manager_name },
      { label: "Manager Email", value: userProfile?.manager_email },
    ],
    contact: [
      { label: "Email", value: userProfile?.email },
      { label: "Alternate Email", value: userProfile?.alternate_email },
      { label: "Mobile", value: userProfile?.mobile },
      { label: "Office Phone", value: userProfile?.office_phone },
      { label: "Emergency Contact Name", value: userProfile?.emergency_contact_name },
      { label: "Emergency Contact No", value: userProfile?.emergency_contact_no },
      { label: "Permanent Address", value: userProfile?.permanent_address },
      { label: "Present Address", value: userProfile?.present_address },
    ],
  };

  if (isLoading) {
    return <div className="p-4">Loading...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-600">Error: {error}</div>;
  }

  return (
    <div className="flex gap-4 p-4">
    {/* Left Section */}
    <div className="w-2/3">
      <div className="bg-white rounded-lg shadow-sm">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-2xl font-bold text-gray-600">
                {userProfile?.employee_name?.split(' ').map(n => n[0]).join('') || 'N/A'}
              </div>
              <div>
                <h1 className="text-2xl text-gray-900 mb-1">{userProfile?.employee_name || 'N/A'}</h1>
                <p className="text-gray-500">{userProfile?.designation || 'N/A'}</p>
              </div>
            </div>
            <div className="mt-4 md:mt-0">
              <p className="text-sm text-gray-500">Employee Code</p>
              <p className="text-lg font-semibold text-gray-900">{userProfile?.employee_code || 'N/A'}</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div>
            {/* Tabs */}
            <div className="grid grid-cols-3 gap-2 bg-gray-100 p-1 rounded-lg mb-6">
              {["personal", "employment", "contact"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => handleTabClick(tab)}
                  className={`p-2 text-sm rounded-md transition-colors
                    ${activeTab === tab 
                      ? "bg-white text-gray-900 shadow-sm" 
                      : "text-gray-600 hover:bg-gray-50"
                    }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            {/* Tab Contents */}
            {Object.entries(sections).map(([key, values]) => (
              <TabContent key={key} id={key} isActive={activeTab === key}>
                {values.map(({ label, value }) => (
                  <div key={label} className="mb-4">
                    <label className="block text-sm text-gray-500 mb-1">{label}</label>
                    <p className="text-sm text-gray-900">{value || "N/A"}</p>
                  </div>
                ))}
              </TabContent>
            ))}
          </div>
        </div>
      </div>
    </div>

    {/* Right Section */}
    <div className="w-1/3">
      <div className="bg-white rounded-lg shadow-sm h-full">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Additional Information</h2>
          {/* Add your new content here */}
          <div className="space-y-4">
            {/* Example placeholder content */}
            <p className="text-gray-600">Add your additional content here</p>
          </div>
        </div>
      </div>
    </div>
  </div>
    
  );
};

export default UserProfile;