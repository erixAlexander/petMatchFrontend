import { useState } from "react";
import useAuth from "../../../../hooks/useAuth";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import useRegexValidation from "../../../../hooks/useRegexValidation";
import "./ProfileSecuritySection.css";

const ChangePassword = () => {
  const { auth, setAuth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const {
    password,
    setPassword,
    validPassword,
    confirmedPassword,
    setConfirmedPassword,
    validMatch,
  } = useRegexValidation();
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    if (!password || !confirmedPassword) {
      setError("Please fill all the fields");
      setTimeout(() => {
        setError(null);
      }, 4000);
      return;
    }

    if (!validPassword) {
      setError(
        "Password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character"
      );
      setTimeout(() => {
        setError(null);
      }, 4000);
      return;
    }

    if (!validMatch) {
      setError("Passwords do not match");
      setTimeout(() => {
        setError(null);
      }, 4000);
      return;
    }

    const formData = {
      user_id: auth.user.user_id,
      password: password,
      confirmedPassword: confirmedPassword,
    };

    try {
      const response = await axiosPrivate.put(`profile`, {
        formData,
      });

      if (response.status === 200) {
        setAuth({ ...auth, user: response.data });
        setSuccess("Profile updated successfully");
        setTimeout(() => {
          setSuccess(null);
        }, 4000);
      }
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
      setTimeout(() => {
        setError(null);
      }, 4000);
    }
  };

  return (
    <div className="password-container">
      <h1 className="edit-profile-title">Change Password</h1>
      <div className="edit-section">
        <h3 className="section-title">Write your new password</h3>
        <input
          type="password"
          placeholder="New Password"
          className="password-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="edit-section">
        <h3 className="section-title">Confirm your new password</h3>
        <input
          type="password"
          placeholder="Confirm Password"
          className="password-input"
          value={confirmedPassword}
          onChange={(e) => setConfirmedPassword(e.target.value)}
        />
      </div>

      {success && <p className="success">{success}</p>}
      {error && <p className="error">{error}</p>}

      <button onClick={() => handleSubmit()} className="submit-btn">
        Submit
      </button>
    </div>
  );
};

export default ChangePassword;
