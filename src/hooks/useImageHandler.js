import useAxiosPrivate from "./useAxiosPrivate";

export function useAddImage() {
  const axiosPrivate = useAxiosPrivate();
  const addImage = async (userId, base64) => {
    try {
      const response = await axiosPrivate.put(`add-images`, {
        params: {
          user_id: userId,
          image: base64,
        },
      });
      return response.data;
    } catch (error) {
      console.log(error);
      return {
        result: error.message,
      };
    }
  };
  return addImage;
}

export function useUpdateImage() {
  const axiosPrivate = useAxiosPrivate();
  const updateImage = async (userId, id, base64) => {
    try {
      const response = await axiosPrivate.put(`update-images`, {
        params: {
          user_id: userId,
          image: base64,
          id,
        },
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };
  return updateImage;
}

export function useDeleteImage() {
  const axiosPrivate = useAxiosPrivate();
  const deleteImage = async (userId, id) => {
    try {
      const response = await axiosPrivate.put(`delete-images`, {
        params: {
          user_id: userId,
          id,
        },
      });
      return response.data.response.modifiedCount == 1;
    } catch (error) {
      console.log(error);
      return false;
    }
  };
  return deleteImage;
}
