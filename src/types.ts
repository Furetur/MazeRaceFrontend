export type PlayerId = number

export type RoomId = number

export type MazeCell = 'EMPTY' | 'WALL'

export type MazeMap = MazeCell[][]

export type Position = { x: number, y: number }

export type MazeConfig = {
    map: MazeMap,
    start: Position,
    finish: Position,
}

export type DirectionType = 'UP' | 'DOWN' | 'RIGHT' | 'LEFT'