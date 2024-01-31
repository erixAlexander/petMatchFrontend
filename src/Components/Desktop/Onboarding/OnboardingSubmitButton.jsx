import { useState } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useNavigate } from "react-router-dom";

const OnboardingSubmitButton = ({
  user_id,
  pet_name,
  dob_year,
  gender_identity,
  type_of_pet,
  gender_interest,
  looking_for,
  images,
  address_info,
  distance,
  setAuth,
}) => {
  const axiosPrivate = useAxiosPrivate();
  const [error, setError] = useState(false);
  const [locationError, setLocationError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    setLocationError(false);

    const formData = {
      user_id: user_id,
      pet_name: pet_name,
      dob_year: dob_year,
      gender_identity: gender_identity,
      type_of_pet: type_of_pet,
      gender_interest: gender_interest,
      about: "",
      looking_for: looking_for,
      user_matches: [],
      images: images,
      pedigree: false,
      address_info: address_info,
      distance: distance,
      activity: "",
    };
    console.log("🚀 ~ handleSubmit ~ formData:", formData);

    try {
      if (!formData.address_info.country) {
        setLocationError(
          "You need to select your nearest Location before Submitting"
        );
        return;
      }

      if (!formData.user_id) {
        setError("You need to be logged in to submit your profile");
        return;
      }

      if (
        !formData.pet_name ||
        !formData.dob_year ||
        !formData.gender_identity
      ) {
        setError("You need to fill all the fields");
        return;
      }

      if (formData.images.length < 1) {
        setError("You need to upload at least one image");
        return;
      }

      const response = await axiosPrivate.put(`user`, {
        formData,
      });

      if (response.status == 200) {
        navigate("/dashboard");
        setAuth((prev) => ({
          ...prev,
          user: response.data,
        }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {locationError && <p className="error">{locationError}</p>}
      <button onClick={(e) => handleSubmit(e)} className="submit-btn">
        Submit
      </button>
    </>
  );
};

export default OnboardingSubmitButton;
