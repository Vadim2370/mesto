export default class UserInfo {
  constructor({ nameSelector, activitySelector }) {
    this._name = document.querySelector(nameSelector);
    this._activity = document.querySelector(activitySelector);
  }

  getUserInfo() {
    const userData = {
      name: this._name.textContent,
      activity: this._activity.textContent,
    };

    return userData;
  }

  setUserInfo({ name, activity }) {
    this._name.textContent = name;
    this._activity.textContent = activity;
  }
}
