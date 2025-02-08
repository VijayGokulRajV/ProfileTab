import React, { useContext, useEffect, useState } from "react";
import "./UserProfile.css";
import Label from "../CommonComponent/Label";
import { Employee } from "./userProfileDummy";


interface TabContentProps {
  id: string;
  isActive: boolean;
  children: React.ReactNode;
}

interface UserDataProps {
  userData: Employee | null;
}

const UserProfile: React.FC<UserDataProps> = ({ userData }) => {
  const [activeTab, setActiveTab] = useState("personal");
  const [userProfile, setUserProfile] = useState<Employee>();
 
useEffect(() => {
    if (userData) {
      setUserProfile(userData);
    }
  }, []);

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
  };

  const TabContent = ({ id, isActive, children }: TabContentProps) => (
    <div id={id} className={`tab-content ${isActive ? "active" : ""}`}>
      {children}
    </div>
  );

  // Define the sections dynamically
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

  return (
    <div className="container">
      <div className="card">
        <div className="card-header">
          <div className="header-content">
            <div className="profile-info">
              <div className="avatar">JD</div>
              <div className="profile-details">
                <h1>{userProfile?.employee_name}</h1>
                <p>{userProfile?.designation}</p>
                {}
              </div>
            </div>
            <div className="employee-code">
              <p>Employee Code</p>
              <p>{userProfile?.employee_code}</p>
            </div>
          </div>
        </div>
        <div className="card-content">
          <div className="tabs">
            <div className="tab-list">
              {["personal", "employment", "contact"].map((tab) => (
                <button
                  key={tab}
                  className={`tab-button ${activeTab === tab ? "active" : ""}`}
                  onClick={() => handleTabClick(tab)}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            {/* Generate Tab Content Dynamically */}
            {Object.entries(sections).map(([key, values]) => (
              <TabContent key={key} id={key} isActive={activeTab === key}>
                {values.map(({ label, value }) => (
                  <Label key={label} classNameProps="info-item" labelText={label} value={value || "N/A"} />
                ))}
              </TabContent>
            ))}


          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
