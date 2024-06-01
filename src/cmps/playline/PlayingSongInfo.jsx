

export function PlayingSongInfo({ song }) {


    return (
        <div className="playing-song-info">
            <img className="playing-song-img" src={song.imgUrl}></img>
            <div className="title-and-artist">
                <div className="song-title">{song.title}</div>
                <div className="song-artist">{song.artist}</div>
            </div>
        </div>
    )
}