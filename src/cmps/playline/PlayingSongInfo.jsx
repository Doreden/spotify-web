export function PlayingSongInfo({ song }) {

    return (
        <div className="playing-song-info">
            {song.imgURL &&
                <img className="playing-song-img" alt="" src={song.imgURL}></img>
            }
            <div className="title-and-artist">
                <div className="song-title">{song.title}</div>
                <div className="song-artist">{song.artist}</div>
            </div>
        </div>
    )
}