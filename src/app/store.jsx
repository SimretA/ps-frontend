import { configureStore } from '@reduxjs/toolkit'

import WorkspaceReducer from '../features/Workspace/Dataslice.jsx'

export default configureStore({
    reducer: {
        workspace: WorkspaceReducer,
    }
})