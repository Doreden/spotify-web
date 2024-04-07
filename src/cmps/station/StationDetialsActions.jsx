import { ReactSVG } from "react-svg";
import Play from '/imgs/play.svg'

export function StationDetailsActions({station}){


    return(
        <>
            <div className="station-details-actions-container">
                <div className="station-details-actions">
                    <div className="station-play-button-container">
                        <button className="station-play-button">
                            <ReactSVG className='icon' src={Play} />
                            {console.log(Play)}
                        </button>
                    </div>

                    <button className="more-actions">•••</button>
                </div>
            </div>
        </>
    )
}