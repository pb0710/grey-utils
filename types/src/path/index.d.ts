export declare function join(...paths: (string | undefined)[]): string
declare const _default: {
	join: typeof join
}
export default _default
interface Node {
	label: string
	children?: Node[]
}
export declare function objToTree(objOrJson: string | object): Node[]
