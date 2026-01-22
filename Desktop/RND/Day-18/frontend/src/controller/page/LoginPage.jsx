import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {validatePassword} from "../../validators/passwordvalidator"
import ShowPasswordModal from "../modals/ShowPasswordModal"
import {useUser} from "../../contexts/UserContext"
import api from "../../api/axios"
import { Link } from "react-router-dom";

const LoginPage = ()=>{
  const {setUsernameContext} = useUser();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [passwordModal , setPasswordModal] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState([]);
  const [loginError, setLoginError] = useState("");

  const navigate = useNavigate();

  const ClosePasswordModel = ()=> setPasswordModal((p)=>!p)

  const handleValidation = () => {
    const result = validatePassword(password);
      if (!result.valid) {
        setPasswordErrors(result.errors)
        setPasswordModal(true);           
        return false;                     
      }
      if(!role || !username){
        alert("username or Role require");
        return false;
      }
    return true;
  };
 
const handleLogin = async () => {
  const isValid = handleValidation();
  if (!isValid) return;

  try {
    const response = await api.post("/login", {
      username,
      password,
      role
    });
    if (response.data.message) {
      setUsernameContext(username)
     // localStorage.setItem("username", username);
      console.log(`/${role}dashboard`)
      navigate(`/${role}dashboard`);
    }
  } catch (error) {
    if (error.response) {
      setLoginError(error.response.data.message);
    } else {
      setLoginError("Server not reachable");
    }
  }
};


  return (
    <>
    {
        passwordModal ?
         (<ShowPasswordModal closeModal={ClosePasswordModel} error={passwordErrors}/>)
         :
          <div style={{
          padding: "40px",
          width: "350px",
          margin: "100px auto",
          borderRadius: "10px",
          background: "#f9f9f9",
          boxShadow: "0px 0px 15px rgba(0,0,0,0.1)",
          textAlign: "center"
        }}>
          
      
          <h2 style={{
            marginBottom: "25px",
            color: "#333"
          }}>
            Login
          </h2>

          <div style={{
            display: "flex",
            justifyContent: "center",
            gap: "30px",
            marginBottom: "20px"
          }}>
            <label style={{ fontSize: "16px", cursor: "pointer" }}>
              <input
                type="radio"
                value="user"
                checked={role === "user"}
                onChange={() => setRole("user")}
                style={{ marginRight: "8px" }}
              />
              User
            </label>

            <label style={{ fontSize: "16px", cursor: "pointer" }}>
              <input
                type="radio"
                value="admin"
                checked={role === "admin"}
                onChange={() => setRole("admin")}
                style={{ marginRight: "8px" }}
              />
              Admin
            </label>
          </div>

          <input
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "15px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              fontSize: "14px"
            }}
          />

          <input
            placeholder="Password"
            type="password"
            onChange={e => setPassword(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "20px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              fontSize: "14px"
            }}
          />

          <button
            onClick={handleLogin}
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: "#4f46e5",
              color: "#fff",
              marginBottom: "10px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "16px"
            }}
          >
            Login
          </button>
            Don't Have Account?{" "}
            <Link to="/registration" style={{ color: "#4f46e5" }}>Registration</Link>
          {loginError !== "" && (<p style={{color:"red"}}>{loginError}</p>)}

    </div>

    }
    </>

    


  );
}

export default LoginPage;
