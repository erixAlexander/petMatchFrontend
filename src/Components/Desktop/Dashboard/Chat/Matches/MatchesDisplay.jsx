import { useEffect, useState } from "react";
import useAuth from "../../../../../hooks/useAuth";
import useAxiosPrivate from "../../../../../hooks/useAxiosPrivate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDog } from "@fortawesome/free-solid-svg-icons";
import Loading from "../../../Loading/Loading";
import "./MatchesDisplay.css";

const MatchesDisplay = ({ setShow, matches, setMatches }) => {
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const [loading, setLoading] = useState(true);

  const getMatches = async () => {
    const likedUserIds = auth.user.user_matches.map((match) => match.user_id);
    try {
      const response = await axiosPrivate.get(`users`, {
        params: {
          userIds: JSON.stringify(likedUserIds),
          userId: auth.user.user_id,
        },
      });
      setMatches(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getMatches();
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <div className="matches-container">
      {matches.map((match) => {
        return (
          <div
            className="match"
            key={match.user_id}
            onClick={() => setShow(match)}
          >
            <div className="match-name">
              <img
                className="match-image"
                src={match.images[0].url}
                alt="match"
              />
              <div className="match-name">{match.pet_name}</div>
            </div>
            <div className="match-name">
              <FontAwesomeIcon
                icon={faDog}
                color={match.gender_identity === "male" ? "#0048B0" : "#EA00F5"}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MatchesDisplay;
