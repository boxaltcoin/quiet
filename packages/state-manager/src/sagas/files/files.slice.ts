import { createSlice, EntityState, PayloadAction } from '@reduxjs/toolkit'
import { CommunityId } from '../appConnection/connection.types'
import { StoreKeys } from '../store.keys'
import { downloadStatusAdapter } from './files.adapter'
import { CancelDownload, DownloadStatus, FileContent, FileMetadata, RemoveDownloadStatus } from './files.types'

export class FilesState {
  public downloadStatus: EntityState<DownloadStatus> = downloadStatusAdapter.getInitialState()
}

export const filesSlice = createSlice({
  initialState: { ...new FilesState() },
  name: StoreKeys.Files,
  reducers: {
    updateDownloadStatus: (state, action: PayloadAction<DownloadStatus>) => {
      downloadStatusAdapter.upsertOne(state.downloadStatus, action.payload)
    },
    removeDownloadStatus: (state, action: PayloadAction<RemoveDownloadStatus>) => {
      const { cid } = action.payload
      downloadStatusAdapter.removeOne(state.downloadStatus, cid)
    },
    cancelDownload: (state, _action: PayloadAction<CancelDownload>) => state,
    uploadFile: (state, _action: PayloadAction<FileContent>) => state,
    broadcastHostedFile: (state, _action: PayloadAction<FileMetadata>) => state,
    downloadFile: (state, _action: PayloadAction<FileMetadata>) => state,
    updateMessageMedia: (state, _action: PayloadAction<FileMetadata>) => state,
    checkForMissingFiles: (state, _action: PayloadAction<CommunityId>) => state
  }
})

export const filesActions = filesSlice.actions
export const filesReducer = filesSlice.reducer
