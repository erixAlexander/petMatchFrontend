import useAxiosPrivate from "./useAxiosPrivate";

export default function useGetCardUsers() {
  const axiosPrivate = useAxiosPrivate();
  const cardUsers = async (user, activity) => {
    try {
      const response = await axiosPrivate.get(`gendered-users`, {
        params: {
          gender: user?.gender_interest,
          type: user?.type_of_pet,
          userId: user?.user_id,
          address: user?.address_info,
          user_matches: user?.user_matches,
          activity: activity,
        },
      });
      return response?.data;
    } catch (error) {
      console.log(error);
    }
  };
  return cardUsers;
}
