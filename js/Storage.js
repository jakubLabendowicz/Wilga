class Storage {
  constructor(keyName) {
    this.keyName = keyName;
  }

  uploadLocal(keyValue) {
    localStorage.setItem(this.keyName, keyValue);
  }

  downloadLocal() {
    return localStorage.getItem(this.keyName);
  }

  synchronizeLocal() {
    this.uploadLocal(this.downloadSession());
  }

  uploadSession(keyValue) {
    sessionStorage.setItem(this.keyName, keyValue);
  }

  downloadSession() {
    return sessionStorage.getItem(this.keyName);
  }

  synchronizeSession() {
    this.uploadSession(this.downloadLocal());
  }
}
