export declare type Fn = (...s: any[]) => any
export default function compose(...fns: Fn[]): Fn
