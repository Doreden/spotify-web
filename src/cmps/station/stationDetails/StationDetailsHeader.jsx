import { useEffect } from "react"
import { utilService } from "../../../services/util.service"
import { extractColors } from 'extract-colors'

export function StationDetailsHeader({ station, colors, setColors, is }) {

    useEffect(() => {
        getColorFromImg()
    }, [station])

    async function getColorFromImg() {
        const options = {
            crossOrigin: 'Anonymous'
        }
        const extractedColors = await extractColors(station.imgUrl, options)
        const chosenColor = extractedColors[0]
        if (!extractedColors) return
        setColors(() => ({ bgColor: darkenColor(chosenColor, 0), darkerColor: darkenColor(chosenColor, 20), mainSectionColor: darkenColor(chosenColor, 50) }))
    }

    function darkenColor(color, amout) {
        return `rgba(${colorReducer(color.red, amout)},${colorReducer(color.green, amout)},${colorReducer(color.blue, amout)},`
    }

    function colorReducer(RGB, amount) {
        if ((RGB - amount) < 0) {
            return 0
        } else {
            return RGB - amount
        }
    }

    return (
        <div className="station-details-header" style={{ background: `linear-gradient(${colors.bgColor}1) 40%, ${colors.darkerColor}1) 100%)` }}>
            <div className="content">
                <div className="img-box details-img-box">
                    {is === 'liked-songs' ?
                        <img src={'imgs/likedsongs.png'}></img>
                        :
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

