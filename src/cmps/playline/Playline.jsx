import { PlayerControls } from "./PlayerControls"
import ReactPlayer from "react-player"
import { useSelector } from "react-redux"
import { utilService } from "../../services/util.service"
import { togglePlay, toggleShuffle, toggleRepeat } from "../../store/actions/player.action"
import { PlaySlider } from "./PlaySlider"
import { useRef, useState } from "react"
import { PlayingSongInfo } from "./PlayingSongInfo"
import { VolumeSlider } from "./VolumeSlider"

export function Playline() {
    const isPlaying = useSelector(storeState => storeState.playerModule.isPlaying)
    const isShuffle = useSelector(storeState => storeState.playerModule.isShuffle)
    const isRepeat = useSelector(storeState => storeState.playerModule.isRepeat)
    const currentSong = useSelector(storeState => storeState.playerModule.song)
    const currentQueue = useSelector(storeState => storeState.playerModule.queue)

    const storeState = useSelector(storeState => storeState.playerModule)
    console.log(storeState)

    const [songProggresionData, setSongProgresionData] = useState({ played: 0, playedSeconds: 0, songDuration: 0 })
    const [volume, setVolume] = useState(1)

    function onTogglePlay() {
        togglePlay(isPlaying)
    }

    function onNextSong() {

    }

    function onPreviousSong() {

    }

    function updateSlider(event) {
        let { playedSeconds, played } = event
        setSongProgresionData((prevSongProgression) => ({ ...prevSongProgression, playedSeconds, played }))
    }

    function setSongDuration(event) {
        const songDuration = event
        setSongProgresionData((prevSongProgression) => ({ ...prevSongProgression, songDuration }))
    }

    const playerRef = useRef()

    function handleSeek() {
        playerRef.onSeek(50, 'seconds')
    }

    return (

        <div className="playline">
            <div className="song-info">
                <PlayingSongInfo song={currentSong} />
            </div>

            <div className="player">
                <PlayerControls togglePlay={onTogglePlay} isPlaying={isPlaying} isShuffle={isShuffle} isRepeat={isRepeat} />
                <PlaySlider songProggresionData={songProggresionData} setSongProgresionData={setSongProgresionData} />
                <ReactPlayer
                    ref={playerRef}
                    onDuration={setSongDuration}
                    onProgress={updateSlider}
                    playing={isPlaying}
                    played={songProggresionData.played}
                    volume={volume}
                    url={`https://www.youtube.com/watch?v=${currentSong.id}`}
                    width="0" height="0" />
            </div>

            <div className="volume">
                <VolumeSlider setVolume={setVolume} />
            </div>

        </div>

    )
}