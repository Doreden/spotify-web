import { ReactSVG } from "react-svg";
import Play from '../../assets/imgs/play2.svg'

export function StationDetailsActions({station}){


    return(
        <>
            <div className="station-details-actions-container">
                <div className="station-details-actions">
                    <div className="station-play-button-container">
                        <button className="station-play-button">
                            <div className="play-svg-container">
                                <ReactSVG src={Play} />
                            </div>
                        </button>
                    </div>

                    <button className="more-actions">•••</button>
                </div>
            </div>
        </>
    )
}