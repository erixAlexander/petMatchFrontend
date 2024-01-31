import { useState } from "react";
import useAuth from "../../../../hooks/useAuth";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import CustomSelect from "../../../GlobalComponents/CustomInputs/CustomSelect/CustomSelect";
import Loading from "../../Loading/Loading";
import years from "../../../../utils/yearsArray";

const EditProfile = ({ setSection }) => {
  const { auth, setAuth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [year, setYear] = useState(auth?.user?.dob_year);
  const [type, setType] = useState(auth?.user?.type_of_pet);
  const [gender, setGender] = useState(auth?.user?.gender_identity);
  const [pedigree, setPedigree] = useState(auth?.user?.pedigree ? "yes" : "no");
  const [petName, setPetName] = useState(auth?.user?.pet_name);
  const [about, setAbout] = useState(auth?.user?.about);

  const handleSubmit = async (e) => {
    const formData = {
      user_id: auth.user.user_id,
      dob_year: year,
      gender_identity: gender,
      type_of_pet: type,
      about: about,
      pedigree: pedigree === "yes" ? true : false,
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

  return auth.user ? (
    <div className="edit-profile-container">
      <h1 className="edit-profile-title">Edit Profile</h1>
      <div className="edit-profile-user">
        <img src={auth.user?.images[0].url} alt="img" />
        <h3 onClick={() => setSection("editusername")}>{petName}</h3>
        <button
          onClick={() => setSection("editimages")}
          className="edit-profile-btn"
        >
          Edit Pictures
        </button>
      </div>

      <div className="edit-section">
        <h3 className="section-title">About my pet!</h3>
        <textarea
          className="about-textarea"
          placeholder="Tell us about your pet"
          value={about}
          onChange={(e) => setAbout(e.target.value)}
        ></textarea>
      </div>

      <div className="edit-section">
        <h3 className="section-title">Date of birth</h3>
        <CustomSelect selected={year} setSelected={setYear} array={years} />
      </div>

      <div className="edit-section">
        <h3 className="section-title">Type of Pet</h3>
        <CustomSelect
          selected={type}
          setSelected={setType}
          array={["dog", "cat"]}
        />
      </div>

      <div className="edit-section">
        <h3 className="section-title">Gender</h3>
        <CustomSelect
          selected={gender}
          setSelected={setGender}
          array={["male", "female"]}
        />
      </div>

      <div className="edit-section">
        <h3 className="section-title">Pedigree</h3>
        <CustomSelect
          selected={pedigree}
          setSelected={setPedigree}
          array={["yes", "no"]}
        />
      </div>

      {success && <p className="success">{success}</p>}
      {error && <p className="error">{error}</p>}

      <button onClick={() => handleSubmit()} className="submit-btn">
        Submit
      </button>
    </div>
  ) : (
    <Loading />
  );
};

export default EditProfile;
