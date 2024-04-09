
import { ReactSVG } from "react-svg";
import Play from '../../../assets/imgs/play2.svg'
import { BsThreeDots } from "react-icons/bs";


export function StationDetailsActions({station}){


    return(
        <>
            <div className="station-details-actions-container">
                <div className="station-details-actions">
                        <button className="station-play-button">
                            <div className="play-svg-container">
                                <ReactSVG src={Play} />
                            </div>
                        </button>

                        <button className="more-actions">
                            <div className="more-actions-svg-container">
                                <BsThreeDots style={{color:'white'}} />
                            </div>
                        </button>
                </div>
            </div>
        </>
    )
}