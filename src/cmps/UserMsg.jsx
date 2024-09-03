import { useEffect, useState } from "react"

export function UserMsg() {

    const [msg, setMsg] = useState({ txt: "User Msg", type: 'error' })

    useEffect(() => {
        setTimeout(onCloseMsg, 3000)
    }, [])

    function onCloseMsg() {
        setMsg(null)
    }

    if (!msg) return <></>
    return (
        <div className={"user-msg " + msg.type}>
            <div>{msg.txt}</div>
            <button className="close-user-msg" onClick={onCloseMsg}>X</button>
        </div>
    )
}