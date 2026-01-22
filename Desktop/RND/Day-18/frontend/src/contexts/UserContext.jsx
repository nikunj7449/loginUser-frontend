import { createContext, useContext, useState } from "react";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [usernameContext, setUsernameContext] = useState("");
  console.log(usernameContext)

  return (
    <UserContext.Provider value={{ usernameContext, setUsernameContext }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
