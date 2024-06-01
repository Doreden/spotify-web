import { useEffect } from "react"

export function useEffectUpdate(callback, dependencies){
    
    useEffect(() => {
        const hasUndefined = dependencies.some(element => element === undefined)
        if (hasUndefined) return
        
        return callback()
    }, [dependencies])
}