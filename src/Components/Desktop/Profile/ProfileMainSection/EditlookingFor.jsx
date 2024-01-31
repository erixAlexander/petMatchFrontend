import { useState } from "react";
import useAuth from "../../../../hooks/useAuth";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import CustomSelect from "../../../GlobalComponents/CustomInputs/CustomSelect/CustomSelect";
import CustomCheckbox from "../../../GlobalComponents/CustomInputs/CustomCheckbox/CustomCheckbox";

const EditlookingFor = () => {
  const { auth, setAuth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const [genderPref, setGenderPref] = useState(auth?.user?.gender_interest);
  const [looking_for, setLooking_for] = useState({
    adopt: auth?.user?.looking_for.adopt,
    friend: auth?.user?.looking_for.friend,
    give_for_adoption: auth?.user?.looking_for.give_for_adoption,
    mate: auth?.user?.looking_for.mate,
  });

  const handleSubmit = async (e) => {
    const formData = {
      user_id: auth.user.user_id,
      looking_for: looking_for,
      gender_interest: genderPref,
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
    <div className="edit-profile-container">
      <h1 className="edit-lookigfor-title">What we are looking for</h1>
      <div className="edit-section">
        <h3 className="section-title">We are looking to meet</h3>
        <CustomSelect
          selected={genderPref}
          setSelected={setGenderPref}
          array={["male", "female", "any"]}
        />
      </div>

      <div className="edit-section">
        <h3 className="section-title">We are also looking to</h3>
        <CustomCheckbox
          values={looking_for}
          options={[
            { value: "adopt", label: "adopt" },
            { value: "friend", label: "friend" },
            { value: "give_for_adoption", label: "give for adoption" },
            { value: "mate", label: "mate" },
          ]}
          setvalues={setLooking_for}
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

export default EditlookingFor;
