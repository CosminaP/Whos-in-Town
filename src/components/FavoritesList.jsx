import { formatter } from "../utilities/utils";

const FavoritesList = ({ favorites, removeFromFavorites }) => {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Favorites</h5>
        {favorites.length > 0 ? (
          <ul className="list-group">
            {favorites.map((event) => (
              <li
                key={event.id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <div>
                  <span>⭐</span>
                  {event.lineup[0]} -
                  {formatter.format(new Date(event.datetime))}
                </div>
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => removeFromFavorites(event.id)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="card-text">No favorite events yet.</p>
        )}
      </div>
    </div>
  );
};

export default FavoritesList;
