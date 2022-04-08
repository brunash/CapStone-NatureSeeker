import { useContext } from "react";
import GoogleLogin from "react-google-login";
import actions from "../Utils/Utils";
import TheContext from "../TheContext/TheContext";
import "./Auth.scss";

function Auth(props) {
  console.log("auth");
  let { getTheUser } = useContext(TheContext);
  let { user, setUser } = useContext(TheContext);
  console.log(user);
  const responseGoogle = async (response) => {
    console.log(response);
    await actions.authenticate(response.profileObj);
    await getTheUser();
  };

  return (
    <div className="login">
      <div style={{ paddingTop: "200px" }}>
        {(!user._id && (
          <GoogleLogin
            className="login__button"
            clientId={process.env.REACT_APP_GOOGLEID}
            buttonText="Login"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={"single_host_origin"}
          />
        )) ||
          props.history.push("/")}
      </div>
    </div>
  );
}

export default Auth;
