export function judgeMobile(): boolean {
	const ua = navigator.userAgent.toLocaleLowerCase()
	return !!ua.match(/(android, iphone, ipod, ipad, symbianos, windows phone)/i)
}

export function judgeAppleMobile(): boolean {
	const ua = navigator.userAgent
	return !!ua.match(/(iPhone|iPad|iPod|iOS)/i)
}

export function judgeAndroidMobile(): boolean {
	const ua = navigator.userAgent
	return !!ua.match(/(Android)/i)
}
