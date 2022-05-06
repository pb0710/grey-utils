declare function delay<T>(duration: number | undefined, value: T): Promise<T>
declare function getCurrentTime(): number
declare function getTimeDiff(start: number, end: number): number
declare function duration(callback: () => void): Promise<number>
declare function continuously<T>(taskList: (() => Promise<T>)[]): Promise<T[]>
declare function continuouslyWithoutAsync<T>(taskList: (() => Promise<T>)[], results?: T[]): Promise<T[]>
