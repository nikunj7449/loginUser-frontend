import {useState} from "react"
import SpellList from "./SpellList"
import {useUser} from "../../contexts/UserContext"
import api from "../../api/axios";
import { useNavigate  } from "react-router-dom";

const UserDashboard = (user)=>{
    const [activeTab, setActiveTab] = useState('home')
    const { usernameContext, setUsernameContext } = useUser();
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
            await api.post("admin/logout");
            setUsernameContext(null);
            navigate("/login");
        } catch (err) {
            console.log("Logout failed");
        }
        };
            return (
                <>
                <div style={{ display: 'flex', height: '100vh', fontFamily: 'Arial, sans-serif' }}>
                
                <nav style={{ width: '250px', backgroundColor: '#2c3e50', padding: '20px', color: '#fff', boxShadow: '2px 0 10px rgba(0,0,0,0.1)' }}>
                    <h2 style={{ marginBottom: '30px', fontSize: '24px', fontWeight: 'bold' }}>User Dashboard</h2>
                    <button 
                    onClick={() => setActiveTab('home')}
                    style={{ 
                        display: 'block', 
                        width: '100%', 
                        padding: '12px', 
                        marginBottom: '10px',
                        backgroundColor: activeTab === 'home' ? '#3498db' : '#34495e',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                    }}
                    >
                    Home
                    </button>
                    <button 
                    onClick={() => setActiveTab('userdetail')}
                    style={{ 
                        display: 'block', 
                        width: '100%', 
                        padding: '12px',
                        marginBottom: '10px',
                        backgroundColor: activeTab === 'userdetail' ? '#3498db' : '#34495e',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                    }}
                    >
                    User Details
                    </button>
                    <button 
                    onClick={() => setActiveTab('spellList')}
                    style={{ 
                        display: 'block', 
                        width: '100%', 
                        padding: '12px',
                        marginBottom: '10px',
                        backgroundColor: activeTab === 'spellList' ? '#3498db' : '#34495e',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                    }}
                    >
                    View Spell
                    </button>
                    <button 
                    onClick={() => handleLogout()}
                    style={{ 
                        display: 'block', 
                        width: '100%', 
                        padding: '12px',
                        marginBottom: '10px',
                        backgroundColor: '#34495e',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                    }}
                    >
                    Log out
                    </button> 
                </nav>

                
                <div style={{ flex: 1, padding: '20px', backgroundColor: '#ecf0f1' }}>
                    {activeTab === 'home' && <div><h1 style={{ color: '#2c3e50'}}>{`Welcome ${usernameContext} this User Dashboard`}</h1></div>}
                    {activeTab === 'userdetail' && <div><h1 style={{ color: '#2c3e50' }}>{`hello,${usernameContext}`}</h1></div>}
                    {activeTab === 'spellList' && <SpellList />}
                </div>
                </div>
                </>
            );
}
export default UserDashboard;