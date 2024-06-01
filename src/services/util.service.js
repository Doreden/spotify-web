
export const utilService = {
    saveToStorage,
    loadFromStorage,
    generateId,
    formatSongLength,
    formatStationLength,
    formatVideoTitle,
    convertYoutubeDurationToSeconds
}



function saveToStorage(key, value) {
    localStorage[key] = JSON.stringify(value);
}

function loadFromStorage(key, defaultValue = null) {
    var value = localStorage[key] || defaultValue;
    return JSON.parse(value);
}

function generateId(length){
    const keys = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'.split('')
    let newId = ''
    for(let i = 0 ; i < length ; i++){
        newId += keys[Math.floor(Math.random()*keys.length)]
    }
    return newId
}

function convertYoutubeDurationToSeconds(durationString){
    console.log(durationString)
    const pattern = /^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/;
    const match = durationString.match(pattern);

    if (match) {
        const hours = match[1] ? parseInt(match[1], 10) : 0;
        const minutes = match[2] ? parseInt(match[2], 10) : 0;
        const seconds = match[3] ? parseInt(match[3], 10) : 0;
        const totalSeconds = hours * 3600 + minutes * 60 + seconds;
        return totalSeconds;
    } else {
        throw new Error("The string does not match the expected format 'PTXMYS'");
    }
}

function formatSongLength(songLengthInSeconds){
    return (
        `${Math.floor(songLengthInSeconds/60)}:${(songLengthInSeconds%60).toString().padStart(2, '0')}`
    )
}

function formatStationLength(songs){
    let totalLength = 0;
    for(let i = 0 ; i < songs.length ; i++){
        totalLength += songs[i].lengthInSeconds
    }
    if(totalLength > 3599){
        return (
            `${Math.floor(totalLength/3600)} hr ${Math.floor(totalLength%3600/60)} min`
        )
    }else{
        return(
            `${Math.floor(totalLength/60)} min ${Math.floor(totalLength%60)} sec`
        )
    }
}

function formatVideoTitle(title){
    const regex = /^(.*?)\s*-\s*(.*?)(?:\s*\((.*?)\))?$/; 
    title = title.replace(/\(([^)]+)\)/g, '');
    title = title.replace(/\[([^\]]+)\]/g, '');
    title = title.replace('&#39;', '\'');
    title = title.replace('&amp;', '&');
    const matches = title.match(regex)
      
    if (!matches){
        return {title}
    }else{
        return( {
            artist: matches[1].trim(),
            title: matches[2].trim()
        })
    }
}

