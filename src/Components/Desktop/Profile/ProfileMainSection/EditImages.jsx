import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCamera,
  faEdit,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import useAuth from "../../../../hooks/useAuth";
import {
  useAddImage,
  useUpdateImage,
  useDeleteImage,
} from "../../../../hooks/useImageHandler";
import Loading from "../../../Desktop/Loading/Loading";
import "./ProfileMainSection.css";

const EditImages = () => {
  const { auth, setAuth } = useAuth();
  const addImage = useAddImage();
  const updateImage = useUpdateImage();
  const deleteImage = useDeleteImage();
  const [edit, setEdit] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = async (e, type, id) => {
    setError(null);
    setLoading(true);
    const file = e.target.files[0];
    const extensions = ["jpg", "jpeg", "png"];
    const extension = file.type.split("/").pop();

    if (!extensions.includes(extension.toLowerCase())) {
      setError(
        "You can only upload files with these extensions: jpg, jpeg, png"
      );

      setTimeout(() => {
        setError(null);
      }, 4000);
      return;
    }

    const fileSizeInMB = file.size / (1024 * 1024);
    if (fileSizeInMB > 1) {
      setError("File size should not exceed 1MB");
      setTimeout(() => {
        setError(null);
      }, 4000);
      return;
    }

    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64 = reader.result;
        try {
          if (type === "add") {
            const response = await addImage(auth.user.user_id, base64);
            setAuth({
              ...auth,
              user: {
                ...auth.user,
                images: [...auth.user.images, response.image],
              },
            });
            setEdit(false);
            setLoading(false);
          } else {
            const response = await updateImage(auth.user.user_id, id, base64);
            setAuth({
              ...auth,
              user: {
                ...auth.user,
                images: auth.user.images.map((image) => {
                  if (image.id === id) {
                    return response.image;
                  } else {
                    return image;
                  }
                }),
              },
            });
            setEdit(false);
            setLoading(false);
          }
        } catch (error) {
          console.log("🚀 ~ handleFileChange ~ error:", error);
          setLoading(false);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await deleteImage(auth.user.user_id, id);
      setAuth({
        ...auth,
        user: {
          ...auth.user,
          images: auth.user.images.filter((image) => image.id !== id),
        },
      });
      setEdit(false);
      setLoading(false);
    } catch (error) {
      console.log("🚀 ~ handleDelete ~ error", error);
      setLoading(false);
    }
  };

  return (
    <div className="images-container">
      {loading && (
        <div className="loading-container">
          <Loading />
        </div>
      )}
      <h1
        style={{ alignSelf: "flex-start", marginTop: "20px" }}
        className="edit-lookigfor-title"
      >
        My Images
      </h1>
      <div className="profile-img-container">
        <div
          className="profile-img"
          onClick={() => {
            if (edit === "main") {
              setEdit(false);
            } else {
              setEdit("main");
            }
          }}
        >
          <img src={auth.user?.images[0].url} alt="profile-img" />
          {edit === "main" && auth.user?.images[0].url && (
            <div className="edit-container">
              <div className="edit">
                <label
                  className="file-input-label"
                  onClick={(e) => e.stopPropagation()}
                >
                  <FontAwesomeIcon className="img-button" icon={faEdit} />
                  <input
                    type="file"
                    onChange={(e) =>
                      handleFileChange(e, "update", auth.user?.images[0].id)
                    }
                    style={{ display: "none" }}
                  />
                </label>
              </div>
            </div>
          )}
          {edit === "main" && !auth.user?.images[0].url && (
            <div className="add-container">
              <div className="add">
                <label
                  className="file-input-label"
                  onClick={(e) => e.stopPropagation()}
                >
                  <FontAwesomeIcon className="img-button" icon={faCamera} />
                  <input
                    type="file"
                    onChange={(e) => handleFileChange(e, "add", null)}
                    style={{ display: "none" }}
                  />
                </label>
              </div>
            </div>
          )}
        </div>
        <h1>Profile Image</h1>
      </div>
      <div className="other-imgs-container">
        {Array(2)
          .fill()
          .map((_, i) => auth.user?.images.slice(1)[i])
          .map((image, index) => {
            return (
              <div
                onClick={() => {
                  if (edit === index) {
                    setEdit(false);
                  } else {
                    setEdit(index);
                  }
                }}
                key={index}
                className="other-img"
              >
                <img
                  src={image?.url || "https://via.placeholder.com/150"}
                  alt="other-img"
                />
                {edit === index && image?.url && (
                  <div className="edit-container">
                    <div className="edit">
                      <label
                        className="file-input-label"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <FontAwesomeIcon className="img-button" icon={faEdit} />
                        <input
                          type="file"
                          onChange={(e) =>
                            handleFileChange(e, "update", image?.id)
                          }
                          style={{ display: "none" }}
                        />
                      </label>
                    </div>
                    <div className="delete">
                      <FontAwesomeIcon
                        onClick={() => handleDelete(image?.id)}
                        className="img-button"
                        icon={faTrashCan}
                      />
                    </div>
                  </div>
                )}
                {edit === index && !image?.url && (
                  <div className="add-container">
                    <div className="add">
                      <label
                        className="file-input-label"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <FontAwesomeIcon
                          className="img-button"
                          icon={faCamera}
                        />
                        <input
                          type="file"
                          onChange={(e) => handleFileChange(e, "add", null)}
                          style={{ display: "none" }} // Hide the file input
                        />
                      </label>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
      </div>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default EditImages;
