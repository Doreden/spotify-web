export function TopResult({ song, onPlaySong }) {
    return (
        <div onDoubleClick={() => onPlaySong(song)} className="top-result">
            <div className="song-details">
                <img src={song.imgURL}></img>
                <div className="title-and-artist">
                    {song.title &&
                        <div className="title">
                            {song.title}
                        </div>
                    }
                    {song.artist &&
                        <div className="artist">
                            {song.artist}
                        </div>}
                </div>
            </div>
        </div>
    )
}