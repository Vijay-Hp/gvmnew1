import React, { useState, useEffect } from "react";
import { GoogleLogin } from "react-google-login";
import { SignFromStyle } from "./styles";
import Go from "../../icons/google.svg";
import { PATH } from "../Routes";
import { Route, NavLink, useNavigate } from "react-router-dom"; 
import axios from "axios";

const clientId =
  "126838586158-7bu4j5fqu3l170am4rb6s8utlnq4ohfa.apps.googleusercontent.com";

function Login() {
  const navigate = useNavigate();

  // fetch axios
  const [purchaseData, setPurchaseData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://vebbox.in/gvmbackend/controllers/api/get/viewUser.php"
      );
      console.log("Fetched data:", response.data);
      setPurchaseData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  const onSuccess = (res) => {
    console.log("loginSuccess", res.profileObj);
    console.log("Google ID:", res.profileObj.googleId);
    const googleId = res.profileObj.googleId;

     // Store Google Mail ID in local storage
     const email = res.profileObj.email;
     localStorage.setItem('googleEmail', email);
     console.log(email);

    if (googleId === "108594555055412116069") {
      navigate(PATH.DASHBOARD); // Navigate to the dashboard page for specific Google ID
    } else{
      navigate(PATH.USERDASHBOARD); // Navigate to the user dashboard for other Google IDs
    }
  };

  const onFailure = (res) => {
    console.log("failed", res);
  };  
  const buttonStyle = {
    backgroundColor: "#333",
    color: "#fff",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    width: "300px",
  };

  return (
    <SignFromStyle>
      <div id="signButton" className="sign" style={{ marginTop: "30px" }}>
        <GoogleLogin
          clientId={clientId}
          buttonText="Sign In"
          className="google"
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={"single_host_origin"}
          isSignedIn={true}
          render={(renderProps) => (
            <button
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
              style={buttonStyle}
            >
              <img
                src={Go}
                style={{ height: "25px", width: "25px", marginLeft: "-40px" }}
              />
              <span
                style={{
                  marginLeft: "20px",
                  fontSize: "15px",
                  fontWeight: "bold",
                }}
              >
                SIGN IN
              </span>
            </button>
          )}
        ></GoogleLogin>
        
      </div>
    </SignFromStyle>
  );
}
export default Login;
