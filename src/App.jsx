import { useEffect, useState } from "react";

import ArtistInfo from "./components/ArtistInfo";
import EventList from "./components/EventList";
import FavoritesList from "./components/FavoritesList";
import axios from "axios";
import url from "./utilities/utils.js";

const App = () => {
  const [artist, setArtist] = useState(null);
  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // get the list of favorites saved in localStorage
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavorites);
  }, []);

  const searchArtist = async () => {
    try {
      // Fetch artist info
      const artistResponse = await axios.get(
        `${url}${encodeURIComponent(searchQuery)}?app_id=123`
      );
      // Log the artist response
      setArtist(artistResponse.data);
      console.log("Artist Response:", artistResponse.data);

      // Fetch events for the artist
      const eventsResponse = await axios.get(
        `${url}${encodeURIComponent(searchQuery)}/events?app_id=123`
      );
      console.log("Events Response:", eventsResponse.data); // Log the events response
      setEvents(eventsResponse.data);
    } catch (error) {
      console.error("Error fetching artist data:", error);
    }
  };

  const addToFavorites = (event) => {
    // Check if the event is already in favorites
    const isAlreadyFavorite = favorites.some((fav) => fav.id === event.id);
    if (!isAlreadyFavorite) {
      const updatedFavorites = [...favorites, event];
      setFavorites(updatedFavorites);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    } else {
      console.log("Event is already in favorites.");
    }
  };

  const removeFromFavorites = (eventId) => {
    const updatedFavorites = favorites.filter((event) => event.id !== eventId);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <div className="container py-4">
      <div className="row">
        <h1 className="col-md-12 p-4">Who's in Town</h1>
      </div>
      <div className="row">
        <div className="col-md-4">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search for an artist"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="input-group-append">
              <button className="btn btn-primary" onClick={searchArtist}>
                Search
              </button>
            </div>
          </div>
          {artist && <ArtistInfo artist={artist} />}
        </div>
        <div className="col-md-4">
          {events && (
            <EventList
              events={events}
              addToFavorites={addToFavorites}
              favorites={favorites}
            />
          )}
        </div>
        <div className="col-md-4 mt-4">
          <FavoritesList
            favorites={favorites}
            removeFromFavorites={removeFromFavorites}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
