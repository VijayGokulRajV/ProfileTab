import { useContext } from "react";
import { TeamsFxContext } from "./Context";
import config from "./sample/lib/config";
import UserProfile from "./UserProfile/UserProfile";

const showFunction = Boolean(config.apiName);

export default function Tab() {
  const { themeString } = useContext(TeamsFxContext);
  return (
    <div
      className={themeString === "default" ? "light" : themeString === "dark" ? "dark" : "contrast"}
    >
      <UserProfile 
      // showFunction={showFunction} 
      />
    </div>
  );
}
