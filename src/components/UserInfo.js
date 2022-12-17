export default class UserInfo {
  constructor({ userName, job, avatar }) {
    this._userName = document.querySelector(userName);
    this._job = document.querySelector(job);
    this._avatar = document.querySelector(avatar);
  }

  getUserInfo() {
    return {
      userName: this._userName.textContent,
      job: this._job.textContent,
      avatar: this._avatar.src
    }
  }

  setUserInfo(data) {
    if (data.name) this._userName.textContent = data.name;
    if (data.about) this._job.textContent = data.about;
    if (data.avatar) this._avatar.src = data.avatar;
  }
}
