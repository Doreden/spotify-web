import { createNewStationByUser } from '../../store/actions/user.action'

import { ReactSVG } from "react-svg"
import Libary from '../../assets/imgs/libary.svg'
import Plus from '../../assets/imgs/plus.svg'

export function SidebarLibaryHeader({ loggedInUser }) {

    async function handleAddStation() {
        await createNewStationByUser(loggedInUser)
    }

    return (
        <>
            <div className="sidebar-libary-header">
                <div className="your-libary">
                    <div className="libary-svg">
                        <ReactSVG src={Libary} />
                    </div>
                    <div className="your-libary-txt">Your Libary</div>
                </div>
                {loggedInUser &&
                    <button onClick={async () => await handleAddStation()} className="new-playlist">
                        <div className="plus-svg">
                            <ReactSVG src={Plus} />
                        </div>
                    </button>
                }
            </div>
        </>
    )
}