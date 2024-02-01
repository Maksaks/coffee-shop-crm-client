export const isEmailValid = (email: string) => {
	const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
	return emailPattern.test(email)
}
