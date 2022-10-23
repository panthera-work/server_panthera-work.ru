export default class UserDto{
	uid;
	username;
	email;
	isActivated;

	constructor(uid, username, email, isActivated) {
		this.uid = uid;
		this.email = email;
		this.username = username;
		this.isActivated = isActivated;
	}
}

