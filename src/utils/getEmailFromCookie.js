function getEmailID() {
	const cookieStr = document.cookie;
	const emailIDCookieStr =
		cookieStr &&
		cookieStr
			.split(";")
			.find((cookie) => cookie.trim().startsWith("ESUMMIT_IITM_USER_EMAIL_ID="));
	const emailID = emailIDCookieStr && emailIDCookieStr.split("=")[1];

	return decodeURIComponent(emailID) || null;
}

export default getEmailID;
