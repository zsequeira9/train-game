import {configureStore} from '@reduxjs/toolkit'
import {PeerReducer} from "./peer/PeerReducer";
import {ConnectionReducer} from "./connection/ConnectionReducer";

export const store = configureStore({
    reducer: {
        peer: PeerReducer,
        connection: ConnectionReducer
    }
})


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch