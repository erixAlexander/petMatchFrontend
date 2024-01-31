import React, { useState, useMemo, useRef, useEffect } from "react";
import TinderCard from "react-tinder-card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDog,
  faHeart,
  faLocationDot,
  faRotateBack,
  faTreeCity,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import useAuth from "../../../../hooks/useAuth";
import useGetCardUsers from "../../../../hooks/useGetCardUsers";
import Loading from "../../Loading/Loading";
import useAddMatchedUser from "../../../../hooks/useAddMatchedUser";

function Advanced({ activity }) {
  const [loading, setLoading] = useState(true);
  const { auth, setAuth } = useAuth();
  const cardUsers = useGetCardUsers();
  const addMatchedUser = useAddMatchedUser();
  const [profiles, setProfiles] = useState([]);

  const [currentIndex, setCurrentIndex] = useState(profiles.length - 1);
  const [lastDirection, setLastDirection] = useState();

  const currentIndexRef = useRef(currentIndex);

  const childRefs = useMemo(
    () =>
      Array(profiles.length)
        .fill(0)
        .map((i) => React.createRef()),
    [profiles]
  );

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  const canGoBack = currentIndex < profiles.length - 1;

  const canSwipe = currentIndex >= 0;

  // set last direction and decrease current index
  const swiped = async (direction, matchId, index) => {
    if (direction === "right") {
      const updatedUser = await addMatchedUser(auth.user.user_id, matchId);
      setAuth({ ...auth, user: updatedUser });
    }
    setLastDirection(direction);
    updateCurrentIndex(index - 1);
  };

  const swipe = async (dir) => {
    if (canSwipe && currentIndex < profiles.length) {
      await childRefs[currentIndex].current.swipe(dir); // Swipe the card!
    }
  };

  // increase current index and show card
  const goBack = async () => {
    if (!canGoBack) return;
    const newIndex = currentIndex + 1;
    updateCurrentIndex(newIndex);
    await childRefs[newIndex].current.restoreCard();
  };

  useEffect(() => {
    setLoading(true);
    auth?.user &&
      (async () => {
        let users = await cardUsers(auth?.user, activity);

        for (let i = users.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [users[i], users[j]] = [users[j], users[i]];
        }

        setProfiles(users);
        setCurrentIndex(users.length - 1);
        setLoading(false);
      })();
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <>
      <div className="card_container">
        {profiles.map((character, index) => (
          <TinderCard
            ref={childRefs[index]}
            className="swipe"
            key={character.user_id}
            onSwipe={(dir) => swiped(dir, character.user_id, index)}
          >
            <div
              style={{ backgroundImage: `url(${character.images[0].url})` }}
              className="card"
            >
              <div className="gender">
                <FontAwesomeIcon
                  icon={faDog}
                  color={
                    character.gender_identity === "male" ? "#0048B0" : "#EA00F5"
                  }
                />
              </div>
              <div className="country-container">
                <FontAwesomeIcon icon={faLocationDot} />
                <h4 className="address_country">
                  {character.address_info.country}
                </h4>
              </div>
              <div className="city-container">
                <FontAwesomeIcon icon={faTreeCity} />
                <h4 className="address_name">{character.address_info.name}</h4>
              </div>
              <h3 className="pet_name">{character.pet_name}</h3>
            </div>
            <div className="card-overlay"></div>
          </TinderCard>
        ))}
      </div>
      <div className="buttons">
        <FontAwesomeIcon
          style={{ backgroundColor: canSwipe ? "#002839" : "#c3c4d3" }}
          className="card-button"
          onClick={() => swipe("left")}
          icon={faX}
        />
        <FontAwesomeIcon
          className="card-button"
          style={{ backgroundColor: !canGoBack && "#c3c4d3" }}
          onClick={() => goBack()}
          icon={faRotateBack}
        />
        <FontAwesomeIcon
          style={{ backgroundColor: canSwipe ? "#fe3072" : "#c3c4d3" }}
          className="card-button"
          onClick={() => swipe("right")}
          icon={faHeart}
        />
      </div>
      {lastDirection ? (
        <h2 key={lastDirection} className="infoText">
          You swiped {lastDirection}
        </h2>
      ) : (
        <h2 className="infoText">
          Swipe a card or press a button to get Restore Card button visible!
        </h2>
      )}
    </>
  );
}

export default Advanced;
