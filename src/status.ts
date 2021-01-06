export type StatusType = 'idle' | 'pending' | 'error' | 'success'

export const Status = {
    IDLE: 'idle' as StatusType,
    PENDING: 'pending' as StatusType,
    ERROR: 'error' as StatusType,
    SUCCESS: 'success' as StatusType,
}
