import { PlayerControls } from "./PlayerControls"
import ReactPlayer from "react-player"
import { useSelector } from "react-redux"
import { utilService } from "../../services/util.service"
import { togglePlay } from "../../store/actions/player.action"
import { PlaySlider } from "./PlaySlider"
import { useRef, useState } from "react"

export function Playline() {
    const isPlaying = useSelector(storeState => storeState.playerModule.isPlaying)
    const isShuffle = useSelector(storeState => storeState.playerModule.isShuffle)
    const isRepeat = useSelector(storeState => storeState.playerModule.isRepeat)
    const currentSong = useSelector(storeState => storeState.playerModule.song)
    const currentQueue = useSelector(storeState => storeState.playerModule.queue)

    const storeState = useSelector(storeState => storeState.userModule)
    console.log(currentSong)

    const [songProggresionData, setSongProgresionData] = useState({ played: 0, playedSeconds: 0, songDuration: 0 })

    function onTogglePlay() {
        togglePlay(isPlaying)
    }

    function onNextSong() {

    }

    function onPreviousSong() {

    }

    function toggleShuffle() {

    }

    function toggleRepeat() {

    }


    function updateSlider(event) {
        let { playedSeconds, played } = event

        setSongProgresionData((prevSongProgression) => ({ ...prevSongProgression, playedSeconds, played }))
    }

    function setSongDuration(event) {
        const songDuration = event
        console.log(event)
        setSongProgresionData((prevSongProgression) => ({ ...prevSongProgression, songDuration }))

    }

    const playerRef = useRef()

    function handleSeek() {
        playerRef.onSeek(50, 'seconds')
    }

    return (

        <div className="playline">
            {/* <button onClick={handleSeek}>here</button> */}
            <div className="song-info">Song Info</div>

            <div className="player">
                <PlayerControls togglePlay={onTogglePlay} isPlaying={isPlaying} isShuffle={isShuffle} isRepeat={isRepeat} />
                <PlaySlider songProggresionData={songProggresionData} setSongProgresionData={setSongProgresionData} />
                <ReactPlayer ref={playerRef} onDuration={setSongDuration} onProgress={updateSlider} playing={isPlaying} played={songProggresionData.played} url={`https://www.youtube.com/watch?v=${currentSong.id}`} width="0" height="0" />
            </div>

            <div className="volume">Volume</div>

        </div>

    )
}