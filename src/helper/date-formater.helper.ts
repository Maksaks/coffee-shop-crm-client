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

export const isoStringToDatetimeLocal = (isoString: string) => {
	const date = new Date(isoString)
	const year = date.getFullYear()
	const month = (date.getMonth() + 1).toString().padStart(2, '0')
	const day = date.getDate().toString().padStart(2, '0')
	const hours = date.getHours().toString().padStart(2, '0')
	const minutes = date.getMinutes().toString().padStart(2, '0')
	const formattedDatetimeLocal = `${year}-${month}-${day}T${hours}:${minutes}`
	return formattedDatetimeLocal
}
