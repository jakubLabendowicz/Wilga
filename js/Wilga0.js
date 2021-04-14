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

  downloadLocalLenght() {
    return localStorage.lenght;
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

  downloadSessionLenght() {
    return sessionStorage.lenght;
  }

  synchronizeSession() {
    this.uploadSession(this.downloadLocal());
  }
}

class Theme {
  counter = 0;
  variables = [];
  values = [];

  constructor(name="") {
    this.name = name;
  }

  add(variable, value) {
    var permission = true;
    for (var i = 0; i < this.counter; i++) {
      if (this.variables[i] == variable) {
        this.values[i] = value;
        permission = false;
      }
    }
    if (permission == true) {
      this.variables.push(variable);
      this.values.push(value);
      this.counter++;
    }
  }

  set() {
    for (var i = 0; i < this.counter; i++) {
      document.documentElement.style.setProperty(this.variables[i], this.values[i]);
    }
  }
}

class ThemeController {
  themesCounter = 0;
  themes = [];

  statusesCounter = 0;
  statuses = [];

  buttonsCounter = 0;
  buttons = [];

  constructor(name="") {
    this.name = name;
  }

  //--------------------ADD--------------------//
  addTheme(theme) {
    this.themes.push(theme);
    this.themesCounter++;
  }

  addButton(button_id) {
    this.buttons.push(button_id);
    this.buttonsCounter++;
    document.getElementById(button_id).addEventListener('click', function () {themeController.toogleSessionTheme()});
  }

  addStatus(status_id) {
    this.statuses.push(status_id);
    this.statusesCounter++;
  }

  //(+)
    synchronizeLocalTheme() { //Ustawianie obecnego motywu jako domyślny
      var storage = new Storage(this.name);
      storage.synchronizeLocal();
    }

//(+)
  toogleSessionTheme(themeNumber=-9) { //Przełączanie motywu
    var storage = new Storage(this.name);
    var state = storage.downloadSession();

    if (themeNumber>=0) storage.uploadSession(themeNumber);
    else {
      if (themeNumber == -9) state++;
      else if (themeNumber == -10) state=state;
      else if (themeNumber == -11) state--;

      if (state>=this.themesCounter) state=0;
      storage.uploadSession(state);
    }

    this.showSessionTheme();
  }

//(+)
  showSessionTheme() { //Wyświetlanie motywu
    var storage = new Storage(this.name);
    var state = storage.downloadSession();

    this.themes[state].set();
    for (var i = 0; i < this.statusesCounter; i++) {
      document.getElementById(this.statuses[i]).innerHTML = this.themes[state].name;
    }
  }


  synchronizeSessionTheme() { //Ustawianie domyślnego motywu jako obecny
    var storage = new Storage(this.name);
    storage.synchronizeSession();
  }

  run() {
    //Jeżeli sessionStorage jest pusty
    //Sprawdzenie czy sessionStorage jest pusty
    var storage = new Storage(this.name);
    var lenght = storage.downloadSessionLenght();

    if (lenght == 0) {
      this.synchronizeSessionTheme();
    }
    this.synchronizeSessionTheme();
    this.showSessionTheme();
  }
}
