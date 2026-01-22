import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {validatePassword} from "../../validators/passwordvalidator"
import ShowPasswordModal from "../modals/ShowPasswordModal"
import api from "../../api/axios"


const RegistrationPage = () => {
    const [step, setStep] = useState(1);
    const [RegistrationError,setRegistrationError] = useState("")
    const [passwordModal , setPasswordModal] = useState(false);
    const [passwordErrors, setPasswordErrors] = useState([]);
    const navigate = useNavigate();


    const [formData, setFormData] = useState({
        role: "",
        username: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: ""
    });

    const [error, setError] = useState(null);

    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
            setError(null);   // or "" depending on your state
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [error]);


    const handleChange = (e) => {
        setFormData({
        ...formData,
        [e.target.name]: e.target.value
        });
    };

    const nextStep = () => {
        if (!validateStep()) return;
        setError("");
        setStep(step + 1);
    };

    const prevStep = () => {
        setError("");
        setStep(step - 1);
    };

    const ClosePasswordModel = ()=> setPasswordModal((p)=>!p)

    const handlePasswordValidation = () => {
        const result = validatePassword(formData.password);
          if (!result.valid) {
            setPasswordErrors(result.errors)
            setPasswordModal(true);           
            return false;                     
          }
        return true;
      };

    const validateStep = () => {
        if (step === 1) {
            
        if (!formData.username || !formData.email) {
            setError("All fields are required");
            return false;
        }
        if (!formData.phone) {
            setError("Phone number is required");
            return false;
        }
        if (!formData.role) {
            setError("Role not selected");
            return false;
        }        
        }

        if (step === 2) {
            
        if (!formData.password || !formData.confirmPassword) {
            setError("All fields are required");
            return false;
        }
        
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return false;
        }
         return handlePasswordValidation()
        }

        return true;
    };


    const handRegistration = async () => {
        try {
            await api.post("/registration", formData);
            navigate("/login");
            alert("User Registered Successfully!");
            }
        catch (error) {
            if (error.response) {
            setRegistrationError(error.response.data.message);
            } else {
            setRegistrationError("Server not reachable");
            }
        }
        };


    return (
    <>
    {passwordModal ?
         (<ShowPasswordModal closeModal={ClosePasswordModel} error={passwordErrors}/>)
        :
        <div style={styles.container}>
        <h2>User Registration </h2>

        {error && <p style={styles.error}>{error}</p>}

        {step === 1 && (
            <>
            <div style={{
                display: "flex",
                justifyContent: "center",
                gap: "30px",
                marginBottom: "20px"
            }}>
                <label style={{ fontSize: "16px", cursor: "pointer" }}>
                <input
                    name="role"
                    type="radio"
                    value="user"
                    checked={formData.role === "user"}
                    onChange={handleChange}
                    style={{ marginRight: "8px" }}
                />
                User
                </label>

                <label style={{ fontSize: "16px", cursor: "pointer" }}>
                <input
                    name="role"
                    type="radio"
                    value="admin"
                    checked={formData.role === "admin"}
                    onChange={handleChange}
                    style={{ marginRight: "8px" }}
                />
                Admin
                </label>
            </div>
            <label htmlFor="username">Username</label>
            <input
                id="username"
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                style={styles.input}
            />
            <label htmlFor="email">Email</label>
            <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                style={styles.input}
            />
            <label htmlFor="phone">Phone</label>
            <input
                id="phone"
                type="text"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
                style={styles.input}
            />
            </>
        )}

        {step === 2 && (
            <>
            <label htmlFor="password">Password</label>
            <input
                id="password"
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                style={styles.input}
            />
            <label htmlFor="ConfPassword">Confirm Password</label>
            <input
                id="ConfPassword"
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                style={styles.input}
            />
            </>
        )}

        {step === 3 && (
            <>
            <p><b>Username:</b> {formData.username}</p>
            <p><b>Email:</b> {formData.email}</p>
            <p><b>Phone:</b> {formData.phone}</p>
            </>
        )}

        <div style={styles.buttons}>
            {step > 1 && <button style={styles.backButton} onClick={prevStep}>Back</button>}
            {step < 3 && <button style={styles.button} onClick={nextStep}>Next</button>}
            {step === 3 && <button style={styles.button} onClick={handRegistration}>Submit</button>}
        </div>
        Already have Account? {" "}<Link to="/login" style={{ color: "#4f46e5" }}>Login</Link>
        { RegistrationError !== "" && (<p style={{color:"red"}}>{RegistrationError}</p>)}
        </div>
        }
    </>
        
    );
    };

    const styles = {
        container: {
            width: "350px",
            margin: "100px auto",
            padding: "40px",
            borderRadius: "10px",
            background: "#f9f9f9",
            boxShadow: "0px 0px 15px rgba(0,0,0,0.1)",
            textAlign: "center"
        },

        input: {
            width: "100%",
            padding: "10px",
            marginBottom: "15px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            fontSize: "14px"
        },

        buttons: {
            display: "flex",
            justifyContent: "space-between",
            marginTop: "20px",
            marginBottom:"10px"
        },

        button: {
            padding: "10px 20px",
            backgroundColor: "#4f46e5",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "14px"
        },
        

        backButton: {
            padding: "10px 20px",
            backgroundColor: "#6b7280",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "14px"
        },

        error: {
            color: "red",
            fontSize: "13px",
            marginBottom: "10px"
        }
        };


export default RegistrationPage;