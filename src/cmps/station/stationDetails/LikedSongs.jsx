import { useEffect, useState } from "react"
import { StationDetailsHeader } from "../stationDetails/StationDetailsHeader"
import { StationDetailsActions } from "../stationDetails/StationDetialsActions"
import { PlaylistSongList } from "../stationDetails/PlaylistSongList"
import { playStation } from "../../../store/actions/player.action"
import { useSelector } from "react-redux"
import { login } from "../../../store/actions/user.action"

export function LikedSongs() {
    const [likedSongsStation, setLikedSongsStation] = useState(null)
    const loggedInUser = useSelector((storeState) => storeState.userModule.user)
    const likedSongs = loggedInUser?.likedSongs


    useEffect(() => {
        loadUser()
    }, [])

    useEffect(() => {
        createLikedSongsStation()
    }, [loggedInUser])

    async function loadUser() {
        await login()
    }

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
            <StationDetailsActions station={likedSongsStation} onPlayStation={onPlayStation} is={'liked-songs'} />
            <PlaylistSongList station={likedSongsStation} onPlayStation={onPlayStation} />
        </section>
    )
}
