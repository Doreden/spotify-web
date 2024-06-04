

export function PlayingSongInfo({ song }) {

    console.log(song)
    return (
        <div className="playing-song-info">
            <img className="playing-song-img" src={song.imgURL}></img>
            <div className="title-and-artist">
                <div className="song-title">{song.title}</div>
                <div className="song-artist">{song.artist}</div>
            </div>
        </div>
    )
}