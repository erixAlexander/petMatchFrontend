import { useState, useEffect } from "react";

const useCustomHook = () => {
  const USER_REGEX = /.+@.+\.[A-Za-z]{1,23}$/;
  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%.]).{8,24}$/;

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);

  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [validMatch, setValidMatch] = useState(false);

  const [error, setError] = useState(null);

  useEffect(() => {
    setError(null);
    setValidEmail(USER_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setError(null);
    setValidPassword(PWD_REGEX.test(password));
    password && setValidMatch(password === confirmedPassword);
  }, [password, confirmedPassword]);

  return {
    email,
    setEmail,
    validEmail,
    password,
    setPassword,
    validPassword,
    confirmedPassword,
    setConfirmedPassword,
    validMatch,
    error,
    setError,
  };
};

export default useCustomHook;
