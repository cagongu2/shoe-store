import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.config";
import {
  useAddUserMutation,
  useFetchUserByEmailQuery,
} from "../redux/features/users/userApi";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const googleProvider = new GoogleAuthProvider();

export const AuthProvide = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [addUser] = useAddUserMutation();
  const { data: userChecked } = useFetchUserByEmailQuery(currentUser?.email, {
    skip: !currentUser?.email,
  });

  const registerUser = async (email, password) => {
    try {
      const res = await addUser({ email, password }).unwrap();
      console.log("User created successfully:", res);
    } catch (error) {
      console.error("Error creating user:", error);
    }

    return await createUserWithEmailAndPassword(auth, email, password);
  };

  const loginUser = async (email, password) => {
    return await signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = async () => {
    return await signInWithPopup(auth, googleProvider);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return signOut(auth);
  };

  useEffect(() => {
    if (!auth) return;

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      setLoading(false);

      if (user) {
        const { email, displayName, photoURL } = user;
        const userData = {
          email,
          username: displayName,
          photo: photoURL,
        };

        if (email) {
          if (!userChecked) {
            try {
              const res = await addUser({ email }).unwrap();
              console.log("User created successfully:", res);
            } catch (error) {
              console.error("Error creating user:", error);
            }
          }
        }
      }
    });

    return () => unsubscribe();
  }, [addUser, userChecked]);

  const value = {
    currentUser,
    registerUser,
    loginUser,
    signInWithGoogle,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
