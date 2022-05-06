export default function omit<T extends object, S extends keyof T>(obj: T, ...keys: S[]): Omit<T, S>
