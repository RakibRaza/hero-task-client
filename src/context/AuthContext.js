import React, { useState, useContext, useEffect } from "react";
import { auth } from "../firebase";

const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [currentUserInfo, setCurrentUserInfo] = useState();
  const [loading, setLoading] = useState(true);

  const signUp = (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password);
  };
  const logIn = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password);
  };
  const logOut = () => {
    return auth.signOut();
  };
  const updateName = (name) => {
    return auth.currentUser.updateProfile({ displayName: name });
  };

  useEffect(() => {
    const unSubscribe = auth.onAuthStateChanged((user) => {
      // if (user) {
      //   fetch(
      //     `https://fastpro-cleaning-services.herokuapp.com/isAdmin?email=${user.email}`
      //   )
      //     .then((res) => res.json())
      //     .then((data) => {
      //       if (data) {
      //         user.isAdmin = true;
      //       } else {
      //         user.isAdmin = false;
      //       }
      //     });
      // }
      setCurrentUserInfo(user);
      setLoading(false);
    });
    return unSubscribe;
  }, []);

  const value = {
    currentUserInfo,
    logOut,
    logIn, signUp, updateName
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
// make sure use
export const useAuthContext = () => {
  return useContext(AuthContext);
};

export { AuthProvider };
