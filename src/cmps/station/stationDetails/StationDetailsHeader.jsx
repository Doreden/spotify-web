import { useEffect, useState } from "react"
import { utilService } from "../../../services/util.service"
import { extractColors } from 'extract-colors'

export function StationDetailsHeader({ station, is }) {

    const [imgHover, setImgHover] = useState(false)
    const [bgColor, setBgColor] = useState("#333333")

    useEffect(() => {
        getColorFromImg()
    }, [])

    async function getColorFromImg() {
        const options = {
            crossOrigin: 'Anonymous'
        }
        const colors = await extractColors(station.imgUrl, options)

        if (!colors) return
        setBgColor(() => colors[0].hex)
    }

    function handleHover(isHover) {
        setImgHover((prevState) => isHover)
    }
    // 
    return (
        <div className="station-details-header" style={{ backgroundColor: bgColor }}>
            <div className="content">
                <div className="img-box details-img-box">
                    {is === 'liked-songs' ?
                        <img src={'imgs/likedsongs.png'}></img>
                        :
                        // <img onMouseEnter={() => handleHover(true)} onMouseLeave={() => handleHover(false)} src={imgHover ? '/imgs/change-cover.png' : `${station.imgUrl}`}></img>
                        <img src={station.imgUrl}></img>

                    }
                </div>
                <div className="station-info">
                    <h1 className="station-name">{station.name}</h1>
                    <div className="additional-info-line">
                        <span className="created-by">{station.createdBy.username}</span>
                        <span className="devider">•</span>
                        {is !== 'liked-songs' &&
                            <span className="number-of-likes">{station.likedByUsers.length} Likes</span>
                        }
                        <span className="devider">•</span>
                        <span className="number-of-songs">{station.songs.length} Song{station.songs.length !== 1 ? 's' : ''}</span>
                        <span className="devider">•</span>
                        <span className="station-length">{utilService.formatStationLength(station.songs)}</span>
                    </div>
                </div>
            </div>
        </div>

    )
}

