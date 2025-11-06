import { createContext } from "react";
import propTypes from "prop-types";
import { useState } from "react";
import { Cookie } from "lucide-react";
import Cookies from "js-cookie";
import axios from "axios";
import { useEffect } from "react";
const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: null,
    role: null,
    token: null,
  });
  const [isSigned, setIsSigned] = useState(false);
  const [loadingData, setLoadingData] = useState(null);

  async function validateTokenUser() {
    const tokenUser = Cookies.get("auth_token_user");
    if (tokenUser) {
      setLoadingData(true);
      try {
        const response = (await axios.post(
          "https://api-sites-en.vercel.app/validar-token",
          {},
          { headers: { Authorization: `Bearer ${tokenUser}` } }
        )).data;
        setIsSigned(true);
        setUser({...response.user, name: response.username})
      } catch {
        setIsSigned(false);
      } finally {
        setLoadingData(false);
      }
    }
    else{
      setLoadingData(false)
      setIsSigned(false)
    }
  }

  useEffect(() => {
    validateTokenUser();
  }, []);

  return (
    <UserContext.Provider
      value={{ isSigned, setIsSigned, user, setUser, loadingData, validateTokenUser }}
    >
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: propTypes.element,
};

export { UserContext, UserProvider };
