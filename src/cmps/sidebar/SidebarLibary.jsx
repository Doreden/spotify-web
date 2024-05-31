import { SidebarLibaryHeader } from "./SidebarLibaryHeader.jsx"
import { useSelector } from "react-redux"
import { StationPreview } from "./StationPreview.jsx"

export function SidebarLibary() {
  // User is initiated to NULL - if there is a user, it should have likeStations
  const loggedInUser = useSelector((storeState) => storeState.userModule.user)
  console.log(loggedInUser)
  if (!loggedInUser) return "Log in to create and share playlists"

  const miniStations = loggedInUser.likedStations
  console.log(miniStations)
  if (!miniStations) return
  return (
    <>
      <div className="sidebar-libary">
        <SidebarLibaryHeader loggedInUser={loggedInUser} />

        <div className="libary-station-list">
          {miniStations.map((station) => (
            <div key={station.id} className="preview-item">
              <StationPreview station={station} />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
