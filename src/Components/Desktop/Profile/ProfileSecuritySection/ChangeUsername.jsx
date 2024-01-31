import { useState } from "react";
import useAuth from "../../../../hooks/useAuth";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import "./ProfileSecuritySection.css";

const Changeusername = () => {
  const { auth, setAuth } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [username, setUsername] = useState(null);

  const handleSubmit = async (e) => {
    if (!username) {
      setError("Please fill all the fields");
      setTimeout(() => {
        setError(null);
      }, 4000);
      return;
    }

    const formData = {
      user_id: auth.user.user_id,
      pet_name: username,
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
    <div className="username-container">
      <h1 className="edit-profile-title">Change Username</h1>
      <h3>Username: </h3> <p>{auth.user.pet_name}</p>
      <div className="edit-section">
        <h3 className="section-title">Write your new Username</h3>
        <input
          type="text"
          placeholder="New Username"
          className="username-input"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
      </div>
      {success && <h4 className="success">{success}</h4>}
      {error && <h4 className="error">{error}</h4>}
      <button onClick={() => handleSubmit()} className="submit-btn">
        Submit
      </button>
    </div>
  );
};

export default Changeusername;
