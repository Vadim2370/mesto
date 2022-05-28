export default class UserInfo {
  constructor({ nameSelector, aboutSelector, avatarSelector }) {
    this._name = nameSelector;
    this._about = aboutSelector;
    this._avatar = avatarSelector;
  }

  getUserInfo() {
    const userData = {
      name: this._name.textContent,
      about: this._about.textContent,
    };

    return userData;
  }

  setUserInfo({ name, about, avatar }) {
    this._name.textContent = name;
    this._about.textContent = about;
    this._avatar.src = avatar;
  }
}
