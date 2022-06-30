/**
 * @typedef {Object} User
 * @property {string} name
 * @property {string} _id
 * @property {string} email
 * @property {string} summitID
 * @property {string[]} participatedEvents
 */

import _axios from "./_axios";

/**
 *@returns {User} The user data
 */
function getUser() {
	const cookieStr = document.cookie;
	const userCookieStr =
		cookieStr &&
		cookieStr.split(";").find((cookie) => cookie.trim().startsWith("ESUMMIT_IITM_USER="));
	if (!userCookieStr) return {};
	const user = JSON.parse(decodeURIComponent(userCookieStr.split("=")[1]) || "{}");

	return user;
}

export const testSummitId = (summitID) => /^ES22[A-Z0-9]{4}$/.test(summitID);
export const isLoggedIn = () => testSummitId(getUser().summitID);
export const logOut = async () => {
	try {
		await _axios.get("/user/logout");
		window.location.reload();
	} catch (error) {
		console.log(error);
	}
};

export default getUser;
