import { useState } from "react";
import useAuth from "../../../../hooks/useAuth";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import useLogout from "../../../../hooks/useLogout";
import useRegexValidation from "../../../../hooks/useRegexValidation";
import "./ProfileSecuritySection.css";

const ChangeEmail = () => {
  const { auth, setAuth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const { email, setEmail, validEmail } = useRegexValidation();
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const logout = useLogout();

  const handleSubmit = async (e) => {
    if (!email) {
      setError("Please fill all the fields");
      setTimeout(() => {
        setError(null);
      }, 4000);
      return;
    }

    if (!validEmail) {
      setError("Please enter a valid email");
      setTimeout(() => {
        setError(null);
      }, 4000);
      return;
    }

    const formData = {
      user_id: auth.user.user_id,
      email: email,
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
        logout();
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
    <div className="email-container">
      <h1 className="edit-profile-title">Change Email</h1>
      <h3>Email: </h3> <p>{auth.user.email}</p>
      <div className="edit-section">
        <h3 className="section-title">Write your new Email</h3>
        <input
          type="email"
          placeholder="New Email"
          className="email-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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

export default ChangeEmail;
