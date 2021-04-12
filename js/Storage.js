export class Storage {
  constructor(keyName) {
    this.keyName = keyName;
  }

  uploadLocalStorage(keyValue) {
    localStorage.setItem(this.keyName, keyValue);
  }

  downloadLocalStorage() {
    return localStorage.tItem(this.keyName);
  }

  uploadSessionStorage(keyValue) {
    sessionStorage.setItem(this.keyName, keyValue);
  }

  downloadSessionStorage() {
    return sessionStorage.tItem(this.keyName);
  }

  static arrayToJson(array) {

  }

  static jsonToArray(json) {

  }
}
