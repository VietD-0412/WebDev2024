import {useContext, useEffect, useState} from "react";
import {Navigate, useParams} from "react-router-dom";
import { ToastContext} from "../../contexts/toast-context";
import AuthService from "../../services/auth-service";
import axios from "axios";

const VerifyEmail = () => {
  const {token} = useParams();
  const {addToast, error} = useContext(ToastContext);
  const [children, setChildren] = useState(<>Loading...</>);

  const verifyEmail = async () => {
    if (token === undefined) {
      error("This token is invalid.");
      setChildren(<Navigate to="/login" />);
      return;
    }
    console.log(token);
    try {
      await AuthService.verifyEmail(token);
      addToast({
        title: "Successfully verified your email!",
        body: "You may now login.",
        color: "success",
      });
    } catch (err) {
      if (axios.isAxiosError(err)) {
        error("An unknown error has occurred. Please try again");
      } 
      else {
        error("An unknown error has occurred. Please try again");
      }
    } 
    finally {
      setChildren(<Navigate to="/login" />);
      return;
    }
  };

  useEffect(() => {
    verifyEmail();
  }, []);

  return children;
};

export default VerifyEmail;