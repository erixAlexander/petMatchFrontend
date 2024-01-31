import useAxiosPrivate from "./useAxiosPrivate";

export default function useAddMatchedUser() {
  const axiosPrivate = useAxiosPrivate();

  const addMatch = async (userId, matchedUserId) => {
    try {
      const response = await axiosPrivate.put(`addmatch`, {
        userId,
        matchedUserId,
        timestamp: new Date().toISOString(),
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };
  return addMatch;
}
