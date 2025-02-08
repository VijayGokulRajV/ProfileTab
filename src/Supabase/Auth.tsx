import { useContext, useState } from 'react'
import { supabase } from './supabaseClient'
import { TeamsFxContext } from '../components/Context';
import { useData } from '@microsoft/teamsfx-react';

interface UserData {
    displayName: string;
    objectId: string;
    tenantId: string;
    preferredUserName: string;
  }

export default function Auth() {
  const [loadingScreen, setloadingScreen] = useState(false)
  const [userData, setUserData] = useState<UserData>({
    preferredUserName: "",
    displayName: "",
    objectId: "",
    tenantId: ""
  });
    const { teamsUserCredential } = useContext(TeamsFxContext);


   const { loading, data, error  } = useData(async () => {
      if (teamsUserCredential) {
        const userInfo = await teamsUserCredential.getUserInfo();
        setUserData((prevUserData : UserData) => ({
            ...prevUserData,
            preferredUserName: userInfo.preferredUserName
          }));
          
        return userInfo;
      }
    });
    
  const handleLogin = async (event:any) => {
    event.preventDefault()

    setloadingScreen(true)
    const { error } = await supabase.auth.signInWithOtp({ email: userData.preferredUserName })

    if (error) {
      alert(error.message)
    } else {
      alert('Check your email for the login link!')
    }
    setloadingScreen(false)
  }

  return (
    <div className="row flex flex-center">
      <div className="col-6 form-widget">
        <h1 className="header">Welcome {userData?.preferredUserName}</h1>
        <p className="description">Sign in via magic link with your email below</p>
        <form className="form-widget" onSubmit={handleLogin}>
          <div>
            <input
              className="inputField"
              type="email"
              placeholder="Your email"
              value={userData?.preferredUserName}
              required={true}
              onChange={(e) => setUserData((prevUserData) => ({
                ...prevUserData,
                preferredUserName: e.target.value // Update only preferredUserName
              }))}
              
            />
          </div>
          <div>
            <button className={'button block'} disabled={loadingScreen}>
              {loadingScreen ? <span>loadingScreen</span> : <span>Send magic link</span>}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}