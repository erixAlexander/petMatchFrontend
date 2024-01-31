import CustomSelect from "../../GlobalComponents/CustomInputs/CustomSelect/CustomSelect";
import years from "../../../utils/yearsArray";
import useAuth from "../../../hooks/useAuth";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useState } from "react";
import CustomCheckbox from "../../GlobalComponents/CustomInputs/CustomCheckbox/CustomCheckbox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import CustomAddressSearch from "../../GlobalComponents/CustomInputs/CustomAddressSearch/CustomAddressSearch";
import CustomSlider from "../../GlobalComponents/CustomInputs/CustomSlider/CustomSlider";
import OnboardingSubmitButton from "./OnboardingSubmitButton";
import "./OnboardingForm.css";

const OnboardingForm = () => {
  const { auth, setAuth } = useAuth();
  console.log("🚀 ~ OnboardingForm ~ auth:", auth);

  const [error, setError] = useState(null);
  const [year, setYear] = useState(auth?.user?.dob_year);
  const [type, setType] = useState(auth?.user?.type_of_pet);
  const [gender, setGender] = useState(auth?.user?.gender_identity);
  const [petName, setPetName] = useState(auth?.user?.pet_name);
  const [genderPref, setGenderPref] = useState(auth?.user?.gender_interest);
  const [looking_for, setLooking_for] = useState({
    adopt: auth?.user?.looking_for.adopt,
    friend: auth?.user?.looking_for.friend,
    give_for_adoption: auth?.user?.looking_for.give_for_adoption,
    mate: auth?.user?.looking_for.mate,
  });
  const [address, setAddress] = useState(auth?.user?.address_info);
  const [inputFiles, setInputFiles] = useState([]);
  const [distance, setDistance] = useState(auth?.user?.distance);

  const handleInputFileChange = (e) => {
    if (inputFiles) {
      setInputFiles([]);
    }
    setError(null);
    if (e?.target?.files.length > 3) {
      alert("You can only upload up to 3 images");
      setInputFiles([]);
      return;
    }
    if (Array.from(e?.target?.files).find((file) => file.size > 11e5)) {
      window.alert("Each individual file should be smaller than 1 MB");
    }
    const extensions = ["jpg", "png", "jpeg"];
    if (
      Array.from(e?.target?.files).find(
        (file) => !extensions.includes(file.name.split(".")[1].toLowerCase())
      )
    ) {
      setError(
        "You can only upload files with this extensions: .png .jpg .jpeg"
      );
      setTimeout(() => {
        setError(null);
      }, 4000);
    }

    const correctArray = Array.from(e?.target?.files).filter(
      (file) =>
        extensions.includes(file.name.split(".")[1].toLowerCase()) &&
        file.size < 11e5
    );

    Array.from(correctArray).forEach((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setInputFiles((prev) => [...prev, reader.result]);
      };
    });
  };

  return (
    <div className="onboarding-form-container">
      <div className="onboarding-form">
        <h1>Create your profile</h1>

        <div className="onboarding-section">
          <h3 className="section-title">My Pet's Name</h3>
          <input
            type="text"
            name="pet-name"
            id="pet-name"
            placeholder="Pet Name"
            value={petName}
            onChange={(e) => setPetName(e.target.value)}
          />
        </div>

        <div className="onboarding-section">
          <h3 className="section-title">Date of birth</h3>
          <CustomSelect selected={year} setSelected={setYear} array={years} />
        </div>

        <div className="onboarding-section">
          <h3 className="section-title">Type of Pet</h3>
          <CustomSelect
            selected={type}
            setSelected={setType}
            array={["dog", "cat"]}
          />
        </div>

        <div className="onboarding-section">
          <h3 className="section-title">Gender</h3>
          <CustomSelect
            selected={gender}
            setSelected={setGender}
            array={["male", "female"]}
          />
        </div>

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
              { value: "friend", label: "Meet friends" },
              { value: "give_for_adoption", label: "give for adoption" },
              { value: "mate", label: "find a mate" },
            ]}
            setvalues={setLooking_for}
          />
        </div>

        <div className="edit-section">
          <h3 className="section-title">Show your pet's cute face</h3>
          <label className="upload-btn">
            <FontAwesomeIcon icon={faCamera} style={{ fontSize: 14 }} />
            Upload your Images
            <input
              multiple
              type="file"
              name="files"
              id="files"
              style={{ display: "none" }}
              onChange={(e) => handleInputFileChange(e)}
            />
          </label>

          <div className="images-preview-container">
            {inputFiles?.map((file, index) => (
              <div className="image-preview" key={index}>
                <img src={file} alt="preview" />
              </div>
            ))}
          </div>
        </div>

        <div className="edit-section">
          <CustomAddressSearch
            address={address}
            setAddress={setAddress}
            isUpdate={false}
          />
        </div>

        <CustomSlider value={distance} setValue={setDistance} />

        {error && <p className="error">{error}</p>}
        <OnboardingSubmitButton
          pet_name={petName}
          user_id={auth?.user?.user_id}
          dob_year={year}
          gender_identity={gender}
          gender_interest={genderPref}
          type_of_pet={type}
          looking_for={looking_for}
          address_info={address}
          distance={distance}
          images={inputFiles}
          setAuth={setAuth}
        />
      </div>
    </div>
  );
};

export default OnboardingForm;
