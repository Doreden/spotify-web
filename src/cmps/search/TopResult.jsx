import { useEffect, useState } from "react"
import { ToggleLikedSongButton } from "../ToggleLikedSongButton"
import { toggleLikedSong } from "../../store/actions/user.action"
import { useSelector } from "react-redux"
import { UserService } from "../../services/user.service"

export function TopResult({ song, onPlaySong }) {

    const loggedInUser = useSelector((storeState) => storeState.userModule.user)

    const [isLikedSong, setIsLikedSong] = useState(false)

    useEffect(() => {
        loadIsSongLiked()
    }, [])

    function loadIsSongLiked() {
        if (!loggedInUser) return
        setIsLikedSong(() => UserService.isSongLiked(loggedInUser, song))
    }

    function handleToggleLikedSongs() {
        toggleLikedSong(loggedInUser, song)
        setIsLikedSong((prevState) => !prevState)
    }

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
            <div className="top-result-like-btn">
                <ToggleLikedSongButton isLikedSong={isLikedSong} handleToggleLikedSongs={handleToggleLikedSongs} />
            </div>
        </div>
    )
}