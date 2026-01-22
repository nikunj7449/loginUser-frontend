import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useSelector, useDispatch } from "react-redux";
import { saveAllUser, deleteUser, editUser } from "../../features/userSlice";
import api from "../../api/axios"

const UserList = ()=>{
  const userStucture = {
    _id:"",
    username:"",
    email:"",
    phone:""
  };
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user);
  const [editMode, setEditMode] = useState(false)
  const [editedUser, setEditedUser] = useState(userStucture);

  useEffect(() => {
    api.get("/admin/users")
      .then(res => dispatch(saveAllUser(res.data)))
      .catch(err => console.log(err))
      
  }, []);
  
  const handleDelete = (userId) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
      deleteUserAPI(userId);
      }
    });
  };

  const deleteUserAPI = (Id)=>{
    api.delete(`/admin/users/${Id}`)
      .then(res => {
        dispatch(deleteUser(Id))
      } )
      .catch(err => console.log(err))
  }



  const handleEdit = (user) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, save changes!",
    }).then((result) => {
      if (result.isConfirmed) {
        editUserAPI(user);
        setEditMode(false);
        setEditedUser(userStucture);
      }
    });
  };
 
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
 
  const editUserAPI = (u)=>{
    api.patch(`/admin/users/${u._id}`,u)
      .then(res => dispatch(editUser(u)))
      .catch(err => console.log(err))
  }  

  return (
    <div style={{
      padding: "30px",
      backgroundColor: "#f5f5f5",
      minHeight: "100vh"
    }}>
      <h2 style={{
        marginBottom: "30px",
        color: "#2c3e50",
        textAlign: "center",
        fontSize: "28px",
        fontWeight: "600"
      }}>
        All Users
      </h2>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        gap: "20px"
      }}>
        {users.map((user) => (
          <div
            key={user._id}
            style={{
              padding: "20px",
              backgroundColor: "#ffffff",
              borderRadius: "10px",
              boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
              transition: "transform 0.2s, boxShadow 0.2s",
              cursor: "pointer"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-5px)";
              e.currentTarget.style.boxShadow = "0px 8px 20px rgba(0,0,0,0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0px 4px 12px rgba(0,0,0,0.1)";
            }}
          >
            <p style={{ margin: "0 0 10px 0", color: "#7f8c8d", fontSize: "12px", textTransform: "uppercase" }}>Username</p>
            {editedUser._id === user._id ? (<input name="username" type="text" onChange={editMode ? handleInputChange : undefined}  value={editMode ? editedUser.username || "" : user.username}  style={{ margin: "0 0 15px 0", color: "#2c3e50e6", fontSize: "18px", fontWeight: "600" }}></input>) 
             :(<p style={{ margin: "0 0 15px 0", color: "#2c3e50", fontSize: "18px", fontWeight: "600" }}>{user.username}</p>)}
           
            <p style={{ margin: "0 0 10px 0", color: "#7f8c8d", fontSize: "12px", textTransform: "uppercase" }}>Email</p>
            {editedUser._id === user._id ? (<input name="email" type="text"  onChange={editMode ? handleInputChange : undefined} value={editMode ? editedUser.email || "" : user.email} style={{ margin: "0 0 15px 0", color: "#2c3e50e6", fontSize: "18px", fontWeight: "600" }}></input>)
             : (<p style={{ margin: "0", color: "#2c3e50", fontSize: "14px" }}>{user.email}</p>)}
            <br/>           
            <p style={{ margin: "0 0 10px 0", color: "#7f8c8d", fontSize: "12px"}}>Phone</p>
            {editedUser._id === user._id ? (<input name="phone" type="text" onChange={editMode ? handleInputChange : undefined}  value={editMode ? editedUser.phone || "" : user.phone} style={{ margin: "0 0 15px 0", color: "#2c3e50e6", fontSize: "18px", fontWeight: "600" }}></input>)          
             : (<p style={{ margin: "0 0 15px 0", color: "#2c3e50", fontSize: "14px", fontWeight: "600" }}>{user.phone}</p>)}
            
            <button 
            onClick={() => {
              if (!(editedUser._id === user._id)) {
                setEditMode(true);
                setEditedUser(user);
              } else {
                handleEdit(editedUser);
              }
            }}
            style={{
            padding: "10px 20px",
            backgroundColor: "#46e561",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "14px",
            marginRight : "80px",
            marginLeft : "50px"
            }} >
              {!(editedUser._id === user._id) ? "Edit" : "Submit"}
            </button> 
            <button 
            onClick={() => {
              if (!editMode) {
                handleDelete(user._id);
              } else {
                setEditMode(false);
               setEditedUser(userStucture);
              }
            }}
            style={{
            padding: "10px 20px",
            backgroundColor: "rgba(255, 0, 0, 0.93)",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "14px"
            }} 
            >
               {!(editedUser._id === user._id) ? "Delete" : "Close"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserList;
