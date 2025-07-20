import { useEffect, useState } from "react";

const EventDetails = ({ event, addToFavorites, favorites }) => {
  // Check if the event is in the favorites list
  const [isFavorite, setIsFavorite] = useState(false);

  // Update isFavorite state when the event or favorites list changes
  useEffect(() => {
    const isEventInFavorites = favorites.some((fav) => fav.id === event.id);
    setIsFavorite(isEventInFavorites);
  }, [event, favorites]);

  const toggleFavorite = () => {
    addToFavorites(event);
  };

  return (
    <>
      <div className="row">
        <div className="col-md-12 p-4">
          <div className="card mt-3">
            <div className="card-body">
              <h4 className="card-title">{event.name}</h4>
              <p className="card-text">
                Date: {new Date(event.datetime).toLocaleDateString()}
              </p>
              <p className="card-text">Venue: {event.venue.name}</p>
              <p className="card-text">
                Location: {event.venue.city}, {event.venue.country}
              </p>
              {/* Only show the button if the event is NOT in favorites */}
              {!isFavorite && (
                <button className="btn btn-primary" onClick={toggleFavorite}>
                  Add to Favorites
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventDetails;
