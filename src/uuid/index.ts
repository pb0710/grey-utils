export default function uuid(): string {
	return URL.createObjectURL(new Blob()).substr(-36)
}
