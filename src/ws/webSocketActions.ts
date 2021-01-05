export type ReadyUpdate = {
    type: 'com.example.ReadyUpdate',
    isReady: boolean,
}

export const makeReadyUpdate = (isReady: boolean): ReadyUpdate => (
    {
        type: 'com.example.ReadyUpdate',
        isReady
    }
)