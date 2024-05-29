
import shuffle from '../../assets/imgs/shuffle.svg'
import previous_song from '../../assets/imgs/previous_song.svg'
import play from '../../assets/imgs/play.svg'
import next_song from '../../assets/imgs/next_song.svg'
import rewind from '../../assets/imgs/rewind.svg'
import { ReactSVG } from "react-svg"

export function PlayerControls({ togglePlay }) {



    return (
        <div className="player-controls">
            <button className="btn-player-control btn-toggle-shuffle">
                <ReactSVG src={shuffle} />
            </button>
            <button className="btn-player-control btn-previous-song">
                <ReactSVG src={previous_song} />
            </button>
            <button onClick={togglePlay} className="btn-player-control btn-toggle-play">
                <ReactSVG src={play} />
            </button>
            <button className="btn-player-control btn-next-song">
                <ReactSVG src={next_song} />
            </button>
            <button className="btn-player-control btn-repeat-toggle">
                <ReactSVG src={rewind} />
            </button>
        </div>
    )
}