import {ConnectionActionType} from "./ConnectionTypes";
import {Dispatch} from "redux";
import {PeerConnection} from "../../p2p";
import { AnyEventObject } from "xstate";

export const changeConnectionInput = (id: string) => ({
    type: ConnectionActionType.CONNECTION_INPUT_CHANGE, id
})

export const setLoading = (loading: boolean) => ({
    type: ConnectionActionType.CONNECTION_CONNECT_LOADING, loading
})
export const addConnectionList = (id: string) => ({
    type: ConnectionActionType.CONNECTION_LIST_ADD, id
})

export const removeConnectionList = (id: string) => ({
    type: ConnectionActionType.CONNECTION_LIST_REMOVE, id
})

export const selectItem = (id: string) => ({
    type: ConnectionActionType.CONNECTION_ITEM_SELECT, id
})

export const connectPeer: (id: string, callback: (f: AnyEventObject) => void) => (dispatch: Dispatch) => Promise<void>
    = (id: string, callback: (f: AnyEventObject) => void) => (async (dispatch) => {
    dispatch(setLoading(true))
    try {
        await PeerConnection.connectPeer(id)
        PeerConnection.onConnectionDisconnected(id, () => {
            console.log("Connection closed: " + id)
            dispatch(removeConnectionList(id))
        })
        PeerConnection.onConnectionReceiveData(id, (data) => {
            console.log("Peer connection receive data", data.event)
            callback(data.event)
        })
        dispatch(addConnectionList(id))
        dispatch(setLoading(false))
    } catch (err) {
        dispatch(setLoading(false))
        console.log(err)
    }
})

