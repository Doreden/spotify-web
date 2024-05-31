import { addMiniStationToUser } from '../../store/actions/user.action'

import { ReactSVG } from "react-svg"

import Libary from '../../assets/imgs/libary.svg'
import Plus from '../../assets/imgs/plus.svg'
import { stationService } from '../../services/station.service'
import { UserService } from '../../services/user.service'

export function SidebarLibaryHeader({ loggedInUser }) {


    async function handleAddStation() {
        // TOASK - Convert to Action?
        try {
            const { id, fullname, imgUrl } = loggedInUser
            const formattedUser = { id, fullname, imgUrl }
            // Creates new station in database
            const newStation = await stationService.createNewStation(formattedUser)
            const miniNewStation = stationService.convertToMiniStation(newStation)
            // Add new station to user in database
            UserService.addMiniStation(miniNewStation)
            // Add new station in store to re-render
            addMiniStationToUser(miniNewStation)
        } catch (err) {
            console.log(err)
        }

        // Add mini station to user
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