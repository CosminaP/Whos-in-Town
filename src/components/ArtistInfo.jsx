const ArtistInfo = ({ artist }) => {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title text-center">{artist.name}</h5>
        <p className="card-text"></p>
      </div>
      {artist.image_url ? (
        <img src={artist.image_url} alt={artist.name} className="card-img" />
      ) : (
        <p className="p-2">No image available</p>
      )}
    </div>
  );
};

export default ArtistInfo;
