export type Todo = {
    id?: number,
    name: string,
    description: string,
    status: Status
}


export const StatusValues = {
  DONE: 'DONE',
  OPEN: 'OPEN',
  PENDING: 'PENDING',
  IN_PROGRESS: 'IN_PROGRESS'
} as const

export type Status = typeof StatusValues[keyof typeof StatusValues]