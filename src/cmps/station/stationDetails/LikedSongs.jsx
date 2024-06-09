import { useEffect, useState } from "react"
import { StationDetailsHeader } from "../stationDetails/StationDetailsHeader"
import { StationDetailsActions } from "../stationDetails/StationDetialsActions"
import { PlaylistSongList } from "../stationDetails/PlaylistSongList"
import { playStation } from "../../../store/actions/player.action"
import { useSelector } from "react-redux"

export function LikedSongs() {
    const [likedSongsStation, setLikedSongsStation] = useState(null)
    const loggedInUser = useSelector((storeState) => storeState.userModule.user)

    useEffect(() => {
        createLikedSongsStation()
    }, [])

    const likedSongs = loggedInUser.likedSongs

    function createLikedSongsStation() {
        const likedSongsObject = {
            id: "likedsongs",
            name: "Liked Songs",
            imgUrl: "imgs/likedsongs.png",
            songs: likedSongs,
            createdBy: loggedInUser
        }
        setLikedSongsStation((prevState) => likedSongsObject)
    }

    function onPlayStation(songIdx = 0) {
        playStation(likedSongsStation, songIdx)
    }

    if (!loggedInUser) return
    if (!likedSongsStation) return

    return (
        <section className="station-details page">
            <StationDetailsHeader station={likedSongsStation} is={'liked-songs'} />
            <StationDetailsActions station={likedSongsStation} onPlayStation={onPlayStation} />
            <PlaylistSongList station={likedSongsStation} onPlayStation={onPlayStation} />
        </section>
    )
}
