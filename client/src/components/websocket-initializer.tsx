'use client'
import {FC, useEffect} from "react";
import {AppWebsocket, useWebsocket} from "../state/websocket";


export const WebsocketInitializer: FC = () => {
    const setWebsocket = useWebsocket(s => s.setWebsocket)

    useEffect(() => {
        setWebsocket(new AppWebsocket('ws://localhost:8000/ws'))
    }, []);


    return null
}
