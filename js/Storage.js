class Storage {
  constructor(keyName) {
    this.keyName = keyName;
  }

  uploadLocal(keyValue) {
    localStorage.setItem(this.keyName, keyValue);
  }

  downloadLocal() {
    return localStorage.tItem(this.keyName);
  }

  synchronizeLocal() {
    localStorage.setItem(this.keyName, this.downloadSession());
  }

  uploadSession(keyValue) {
    sessionStorage.setItem(this.keyName, keyValue);
  }

  downloadSession() {
    return sessionStorage.tItem(this.keyName);
  }

  synchronizeSession() {
    sessionStorage.setItem(this.keyName, this.downloadLocal());
  }
}
