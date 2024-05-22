import { storageService } from "./async-storage.service.js"
import { utilService } from "./util.service.js"

const STORAGE_KEY = "stations"

console.log(import.meta.env.VITE_API_KEY)

export const stationService = {
  removeSongFromStation,
  query,
  getById,
  removeById,
  createNewStation,
  createStations,
  getSongBySearch,
}

async function removeSongFromStation(stationId, songId) {
  let station = await getById(stationId)
  console.log(station)
  station = {
    ...station,
    songs: station.songs.filter((song) => song.id !== songId),
  }
  console.log(station)
  save(station)
}

async function query() {
  let stations = await storageService.query(STORAGE_KEY)
  return stations
}

async function getById(id) {
  try {
    var station = await storageService.get(STORAGE_KEY, id)
    return station
  } catch (err) {
    console.log(`error: ${err}`)
  }
}

async function removeById(id) {
  try {
    var idx = await storageService.remove(STORAGE_KEY, id)
    return idx
  } catch (err) {
    console.log(`error: ${err}`)
  }
}

// TODO : change to get user from store
async function createNewStation(user = {}) {
  const emptyStation = _makeEmptyStation(user)
  return save(emptyStation)
}

function save(stationToSave) {
  if (stationToSave.id) {
    return storageService.put(STORAGE_KEY, stationToSave)
  } else {
    return storageService.post(STORAGE_KEY, stationToSave)
  }
}

function _makeEmptyStation(user) {
  return {
    name: "New Playlist",
    albumCoverUrl: null,
    createdBy: user,
    likedByUsers: [],
    createdAt: Date.now(),
    songs: [],
  }
}

async function getSongBySearch(searchInput) {
  const API_KEY = "AIzaSyCho4TT_0wURSDbQ0zGNEmtyHLte3-M0Mg"
  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&q=${searchInput}&part=snippet&type=video`
  )
  const results = await response.json()
  // localStorage.setItem("search", JSON.stringify(results))
  console.log(results.items)
  
  return results.items

}

// Two regular Albums, one Single and one user generated Playlist (differs by CreatedBy)
function createStations() {
  let stations = utilService.loadFromStorage(STORAGE_KEY)
  if (!stations) {
    stations = [
      // TODO - convert to Date.Now()
      {
        id: "0BFzNaeaNv4mahOzwZFGHK",
        name: "Royal Blood",
        albumCoverUrl:
          "https://upload.wikimedia.org/wikipedia/en/b/b0/Royal_Blood_-_Royal_Blood_%28Artwork%29.jpg",
        createdBy: {
          id: "ak491k",
          username: "Or Doga",
          imgUrl: 'http://some-photo/"',
        },
        likedByUsers: ["{minimal-user}", "{minimal-user}"],
        createdAt: 162521762362,
        songs: [
          {
            id: "s1003",
            title: "Out Of The Black",
            artist: "Royal Blood",
            lengthInSeconds: 250,
            url: "youtube/song.mp4",
            tags: ["Rock"],
            dateAdded: "Jan 29, 2022",
          },
          {
            id: "s1004",
            title: "Little Monster",
            artist: "Royal Blood",
            lengthInSeconds: 195,
            url: "youtube/song.mp4",
            tags: ["Bass", "Rock"],
            dateAdded: "Jan 25, 2022",
          },
          {
            id: "s1005",
            title: "Come On Over",
            artist: "Royal Blood",
            lengthInSeconds: 221,
            url: "youtube/song.mp4",
            tags: ["Bass", "Rock"],
            dateAdded: "Jan 10, 2022",
          },
        ],
      },
      {
        id: "03mX4WEpvZPkHmEsd2ZoV8",
        name: "Spring Girl",
        albumCoverUrl:
          "https://upload.wikimedia.org/wikipedia/en/1/17/AreyouexpUK.jpg",
        type: "single",
        createdBy: {
          id: "ak491k",
          username: "Or Doga",
          imgUrl: 'http://some-photo/"',
        },
        likedByUsers: ["{minimal-user}", "{minimal-user}"],
        createdAt: 162521763928,
        songs: [
          {
            id: "s1007",
            title: "Spring Girl",
            artist: "Adam Ten",
            album: "Spring Girl",
            lengthInSeconds: 394,
            url: "youtube/song.mp4",
            tags: ["Electronic", "House"],
            dateAdded: "Jul 13, 2023",
          },
        ],
      },
      {
        id: "03mX3928vZPkHmEsd2ZoV8",
        name: "Or's Finest",
        albumCoverUrl:
          "https://upload.wikimedia.org/wikipedia/en/1/17/AreyouexpUK.jpg",
        type: "playlist",
        createdBy: {
          id: "ak491k",
          username: "Or Doga",
          imgUrl: 'http://some-photo/"',
        },
        likedByUsers: ["{minimal-user}", "{minimal-user}"],
        createdAt: 162521763962,
        songs: [
          {
            id: "s1009",
            title: "Spring Girl",
            artist: "Adam Ten",
            album: "Spring Girl",
            lengthInSeconds: 394,
            url: "youtube/song.mp4",
            tags: ["Electronic", "House"],
            dateAdded: "Feb 4, 2024",
          },
          {
            id: "s1003",
            title: "Out Of The Black",
            artist: "Royal Blood",
            album: "Royal Blood",
            lengthInSeconds: 250,
            url: "youtube/song.mp4",
            tags: ["Rock"],
            dateAdded: "Jan 29, 2022",
          },
          {
            id: "s1004",
            title: "Little Monster",
            artist: "Royal Blood",
            album: "Royal Blood",
            lengthInSeconds: 195,
            url: "youtube/song.mp4",
            tags: ["Bass", "Rock"],
            dateAdded: "Jan 25, 2022",
          },
          {
            id: "s1005",
            title: "Come On Over",
            artist: "Royal Blood",
            album: "Royal Blood",
            lengthInSeconds: 221,
            url: "youtube/song.mp4",
            tags: ["Bass", "Rock"],
            dateAdded: "Jan 10, 2022",
          },
          {
            id: "s1006",
            title: "Come On Over",
            artist: "Royal Blood",
            album: "Royal Blood",
            lengthInSeconds: 221,
            url: "youtube/song.mp4",
            tags: ["Bass", "Rock"],
            dateAdded: "Jan 10, 2022",
          },
          {
            id: "s1007",
            title: "Come On Over",
            artist: "Royal Blood",
            album: "Royal Blood",
            lengthInSeconds: 221,
            url: "youtube/song.mp4",
            tags: ["Bass", "Rock"],
            dateAdded: "Jan 10, 2022",
          },
          {
            id: "s1008",
            title: "Come On Over",
            artist: "Royal Blood",
            album: "Royal Blood",
            lengthInSeconds: 221,
            url: "youtube/song.mp4",
            tags: ["Bass", "Rock"],
            dateAdded: "Jan 10, 2022",
          },
        ],
      },
    ]
    utilService.saveToStorage(STORAGE_KEY, stations)
  }
}
