import EventDetails from "./EventDetails";
import { formatter } from "../utilities/utils";
import { useState } from "react";

const EventList = ({ events, addToFavorites, favorites }) => {
  const [selectedEvent, setSelectedEvent] = useState(null);

  return (
    <>
      <div className="row">
        <div className="col-md-12 p-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Events</h5>
              {events.length > 0 ? (
                <ul className="list-group">
                  {events.map((event, i) => (
                    <li
                      key={event.id}
                      favorites={favorites}
                      className="list-group-item list-group-item-action "
                      onClick={() => setSelectedEvent(event)}
                      style={{ cursor: "pointer" }}
                    >
                      {`Event ${events.length > 0 ? i + 1 : i++}`} -
                      {formatter.format(new Date(event.datetime))}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="card-text">No upcoming events for this artist.</p>
              )}
              {selectedEvent && events.length > 0 && (
                <EventDetails
                  event={selectedEvent}
                  addToFavorites={addToFavorites}
                  favorites={favorites}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventList;
