import { addStation } from '../../../store/actions/station.action'

import { ReactSVG } from "react-svg"
import Libary from '../../../assets/imgs/libary.svg'
import Plus from '../../../assets/imgs/plus.svg'

export function SidebarLibaryHeader(){


    function handleAddStation(){
        addStation()
    }

    return (
        <>
            <div className="sidebar-libary-header">
                <div className="your-libary">
                    <div className="libary-svg">
                        <ReactSVG src={Libary}/>
                    </div>
                    <div className="your-libary-txt">Your Libary</div>
                </div>

                <button onClick={handleAddStation} className="new-playlist">
                    <div className="plus-svg">
                        <ReactSVG src={Plus}/>
                    </div>
                </button>
            </div>
        </>
    )
}