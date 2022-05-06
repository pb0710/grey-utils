export declare function forEach<T, S>(arr: T[], callback: (item: T, index: number, arr: T[]) => S): void
export declare function map<T, S>(arr: T[], callback: (item: T, index: number, arr: T[]) => S): S[]
export declare function reduce<T>(arr: T[], callback: (pre: T, cur: T, index: number, arr: T[]) => T, initial: T): T
