import { useState, useEffect } from "react";
import axios from "axios";
import "./CustomAddressSearch.css";

export default function CustomAddressSearch({ address, setAddress, isUpdate }) {
  const TOMTOM_URL = import.meta.env.VITE_APP_TOMTOM;
  const [update, setUpdate] = useState(isUpdate);
  const [location, setLocation] = useState({
    lat: null,
    long: null,
  });
  const [errorMsg, setErrorMsg] = useState(null);
  const [query, setQuery] = useState("");
  const [places, setPlaces] = useState([]);
  const [selected, setSelected] = useState(false);

  const changeQuery = (e) => {
    setSelected(false);
    setQuery(e.target.value);
  };

  const getNearbyPlaces = async (
    query,
    lat,
    long,
    API_KEY,
    limit = 100,
    radius = 60000
  ) => {
    try {
      const baseUrl = "https://api.tomtom.com/search/2/poiSearch";
      let queryString = `limit=${limit}&lat=${lat}&lon=${long}&radius=${radius}&key=${API_KEY}`;
      let response = await axios.get(`${baseUrl}/${query}.json?${queryString}`);
      setPlaces(response.data.results);
      console.log(response.data.results.length);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            long: position.coords.longitude,
          });
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
      setErrorMsg("Geolocation is not supported by this browser.");
    }
  }, []);

  useEffect(() => {
    if (query != "" && location?.lat != null && !selected) {
      getNearbyPlaces(query, location.lat, location.long, TOMTOM_URL);
    }
    if (query == "") {
      setPlaces([]);
      !update && setAddress("");
      update && setUpdate(false);
    }
  }, [query]);

  return (
    <div className="address-container">
      <p className="address-title">Choose your closest location: </p>
      {address?.full_name && address?.full_name != "" ? (
        <p>{address?.full_name}</p>
      ) : (
        <p>{"No location selected"}</p>
      )}

      {errorMsg && <p>{errorMsg}</p>}

      <input
        type="text"
        value={query}
        onChange={changeQuery}
        placeholder={"Select Closest Location"}
        name={null}
      />
      {places?.length > 0 && (
        <div className="items-container">
          {places?.slice(0, 10).map((place, i) => {
            const addressInfo = {
              country: place.address.country,
              name: place.address.localName,
              lat: place.position.lat,
              lon: place.position.lon,
              full_name: place.poi.name,
            };
            return (
              <div
                className="item"
                key={i}
                onClick={() => {
                  setSelected(true);
                  setQuery(place.poi.name + " " + place.address.localName);
                  setAddress(addressInfo);
                  setPlaces([]);
                }}
              >
                <p>{place.poi.name + " " + place.address.localName}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
