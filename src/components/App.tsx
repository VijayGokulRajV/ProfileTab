// https://fluentsite.z22.web.core.windows.net/quick-start
import {
  FluentProvider,
  teamsLightTheme,
  teamsDarkTheme,
  teamsHighContrastTheme,
  Spinner,
  tokens,
} from "@fluentui/react-components";
import { HashRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import { useData, useTeamsUserCredential } from "@microsoft/teamsfx-react";
import Privacy from "./Privacy";
import TermsOfUse from "./TermsOfUse";
import Tab from "./Tab";
import { TeamsFxContext } from "./Context";
import config from "./sample/lib/config";
import UserProfile from "./UserProfile/UserProfile";
import { useContext, useEffect, useState } from "react";
import { getUsersData } from "../Supabase/APICalls";
import { Employee } from "./UserProfile/userProfileDummy";

/**
 * The main app which handles the initialization and routing
 * of the app.
 */
export default function App() {
  const { TeamsUserCredential } = useContext(TeamsFxContext);  
  const [userData, setUserData] = useState<Employee | null>(null);
  


  const {  data } = useData(async () => {
    if (teamsUserCredential) {
      const userInfo = await teamsUserCredential.getUserInfo();
      return userInfo;
    }
  });

  useEffect(() => {
    const fetchUserData = async () => {
      if (data) {
        try {
          const singleUserData = await getUsersData(data.preferredUserName);
          console.log("singleUserDate", singleUserData);

          setUserData(singleUserData[0] || null); 
        } catch (error) {
          console.error('Error fetching user data:', error);
          setUserData(null);
        }
      }
    };

    fetchUserData();
  }, []);

  const { loading, theme, themeString, teamsUserCredential } = useTeamsUserCredential({
    initiateLoginEndpoint: config.initiateLoginEndpoint!,
    clientId: config.clientId!,
  });
  return (
    <TeamsFxContext.Provider value={{ theme, themeString, teamsUserCredential  }}>
      <FluentProvider
        theme={
          themeString === "dark"
            ? teamsDarkTheme
            : themeString === "contrast"
            ? teamsHighContrastTheme
            : {
                ...teamsLightTheme,
                colorNeutralBackground3: "#eeeeee",
              }
        }
        style={{ background: tokens.colorNeutralBackground3 }}
      >
        <Router>
          {loading ? (
            <Spinner style={{ margin: 100 }} />
          ) : (
            <Routes>
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/termsofuse" element={<TermsOfUse />} />
              <Route 
                path="/tab" 
                element={<UserProfile userData={userData} />} 
              />
               <Route path="*" element={<Navigate to={"/tab"} />}></Route>
            </Routes>
          )}
        </Router>
      </FluentProvider>
    </TeamsFxContext.Provider>
  );
}
