import {PeerActionType} from "./PeerTypes";
import {Dispatch} from "redux";
import {PeerConnection} from "../../p2p";
import {addConnectionList, removeConnectionList} from "../connection/ConnectionActions";
import { AnyEventObject } from "xstate";

export const startPeerSession = (id: string) => ({
    type: PeerActionType.PEER_SESSION_START, id
})

export const stopPeerSession = () => ({
    type: PeerActionType.PEER_SESSION_STOP,
})
export const setLoading = (loading: boolean) => ({
    type: PeerActionType.PEER_LOADING, loading
})

export const startPeer: (callback: (f: AnyEventObject) => void) => (dispatch: Dispatch) => Promise<void>
    = (callback: (f: AnyEventObject) => void) => (async (dispatch) => {
    dispatch(setLoading(true))
    try {
        const id = await PeerConnection.startPeerSession()
        PeerConnection.onIncomingConnection((conn) => {
            const peerId = conn.peer
            console.log("Incoming connection: " + peerId)
            dispatch(addConnectionList(peerId))
            PeerConnection.onConnectionDisconnected(peerId, () => {
                console.log("Connection closed: " + peerId)
                dispatch(removeConnectionList(peerId))
            })
            PeerConnection.onConnectionReceiveData(peerId, (data) => {
                console.log("Peer receive data", data.event)
                callback(data.event)
            })
        })
        dispatch(startPeerSession(id))
        dispatch(setLoading(false))
    } catch (err) {
        console.log(err)
        dispatch(setLoading(false))
    }
})