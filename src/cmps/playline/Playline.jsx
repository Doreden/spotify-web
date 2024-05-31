import { PlayerControls } from "./PlayerControls"
import ReactPlayer from "react-player"
import { useSelector } from "react-redux"
import { togglePlay, setPlay } from "../../store/actions/player.action"

export function Playline() {
    const isPlaying = useSelector(storeState => storeState.playerModule.isPlaying)
    const isShuffle = useSelector(storeState => storeState.playerModule.isShuffle)
    const isRepeat = useSelector(storeState => storeState.playerModule.isRepeat)
    const currentSong = useSelector(storeState => storeState.playerModule.song)
    const currentQueue = useSelector(storeState => storeState.playerModule.queue)

    const storeState = useSelector(storeState => storeState.userModule)

    console.log(storeState)

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

    console.log(currentSong)
    return (

        <div className="playline">

            <div>Song Info</div>

            <div>
                <PlayerControls togglePlay={onTogglePlay} isPlaying={isPlaying} isShuffle={isShuffle} isRepeat={isRepeat} />
                <ReactPlayer playing={isPlaying} url={`https://www.youtube.com/watch?v=${currentSong.id}`} width="200" height="200" />
                {/* <ReactPlayer {...state} width="0" height="0" /> */}
                {/* </div> */}
            </div>

            <div>Volume</div>

        </div>

    )
}