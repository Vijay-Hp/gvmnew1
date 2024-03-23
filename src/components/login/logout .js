import { GoogleLogout } from "react-google-login";
import { GoogleLogin } from "react-google-login";
import { SignFromStyle } from "./styles";
import Go from "../../icons/google.svg";
import { PATH } from "../Routes";
import { Route, NavLink, useNavigate } from "react-router-dom";
const clientId =
  "126838586158-7bu4j5fqu3l170am4rb6s8utlnq4ohfa.apps.googleusercontent.com";

function Logout1() {
  const navigate = useNavigate();

  const onSuccess = () => {
    console.log("logoutSuccess");
    navigate(PATH.HOME);
  };
  const buttonStyle = {
    backgroundColor: "green",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    width: "240px",
  };

  return (
    <div id="signOutButton">
      <GoogleLogout
        clientId={clientId}
        buttonText={"Logout"}
        onLogoutSuccess={onSuccess}
        render={(renderProps) => (
          <button
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
            style={buttonStyle}
          >
            <span
              style={{
                fontSize: "20px",
              }}
            >
              Yes
            </span>
          </button>
        )}
      ></GoogleLogout>
    </div>
  );
}
export default Logout1;
