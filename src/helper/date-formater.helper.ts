export const dateFormater = (dateIn: string): string => {
	const date = new Date(dateIn)
	const options = {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	}
	return date.toLocaleDateString('en-US', options)
}

export const dateTimeFormatter = (dateIn: string): string => {
	const date = new Date(dateIn)
	const options = {
		year: 'numeric',
		month: 'numeric',
		day: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
		second: 'numeric',
		hour12: false,
	}

	return date.toLocaleDateString('en-US', options)
}
