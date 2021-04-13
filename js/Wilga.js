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
  state = 0;

  themesCounter = 0;
  themes = [];

  statusesCounter = 0;
  statuses = [];

  buttonsCounter = 0;
  buttons = [];

  schedulesCounter = 0;
  schedules = [];

  constructor(name="") {
    this.name = name;
  }

  //--------------------ADD--------------------//
  add(theme) {
    this.themes.push(theme);
    this.themesCounter++;
  }

  addButton(id) {
    this.buttons.push(id);
    this.buttonsCounter++;
    document.getElementById(id).addEventListener('click', function () {themeController.toogle()});
  }

  addStatus(id) {
    this.statuses.push(id);
    this.statusesCounter++;
  }

  addSchedule(id, start=0.00, end=23.59) {
    this.schedules[this.schedulesCounter] = [id, start, end];
    this.schedulesCounter++;
    this.toogleSchedule();
  }





  synchronizeDefaultTheme() { //podczas pierwszego ładowania strony w przeglądarce
    //...


    //uploadDefaultTheme
    var storage = new Storage(this.name);
    storage.uploadLocal(this.state);
  }

  toogleDefaultTheme() {
    //...


    //uploadDefaultTheme
    var storage = new Storage(this.name);
    storage.uploadLocal(this.state);

    //synchronizacja strony z sesją
    this.synchronizeSessionTheme();
  }

  synchronizeSessionTheme() { //podczas pierwszego ładowania strony w sesji
    //downloadDefaultTheme
    var storage = new Storage(this.name);
    var state = storage.downloadLocal();

    //...

    //uploadSessionTheme
    var storage = new Storage(this.name);
    storage.uploadSession(this.state);
  }

  toogleSessionTheme(state=-101, run=true) {
    if (state==-101 && run==true) {
      this.state++;
      if (this.state==this.themesCounter) this.state=0;
    } else if(state>=0 && run==true) {
      this.state=state;
    }

    //uploadSessionTheme
    var storage = new Storage(this.name);
    storage.uploadSession(this.state);

    //synchronizacja strony z sesją
    this.synchronizePageTheme();
  }

  synchronizePageTheme() { //podczas ładowania strony
    //downloadSessionTheme
    var storage = new Storage(this.name);
    var state = storage.downloadSession();

    this.state = state;
    this.themes[this.state].set();

    //showStatus
    for (var i = 0; i < this.statusesCounter; i++) {
      document.getElementById(this.statuses[i]).innerHTML = this.themes[this.state].name;
    }
  }

  synchronize() {
    //TODO: sprawdzenie czy pierwsze ładowanie strony w przeglądarce
    this.synchronizeDefaultTheme();
    //TODO: sprawdzenie czy pierwsze ładowanie strony w sesji
    this.synchronizeSessionTheme();

    this.synchronizePageTheme();
  }

  //--------------------CYKL ŻYCIA--------------------//
  //1. firstLoad() - automatyczne
  //2. toogleSchedule() - można ręcznie
  //3. sessionLoad() - automatyczne
  //4. toogle() - można ręcznie
  //5. themeLoad() - automatyczne

  //--------------------!!!--------------------//
  firstLoad() {
    //TODO: Jeżeli localStorage jest pusty to
    //        ustawić harmonogram w localStorage z pomocą toogleSchedule()
    this.toogleSchedule();
  }

  toogleSchedule() {
    var storage = new Storage(this.name);
    storage.uploadLocal(this.schedules);

    this.sessionLoad();
  }

  sessionLoad() {
    // TODO: Jeżeli sessionStorage jest pusty to pobrać dane z localStorage
    //        i ustawić stan motywu w sessionStorage z pomocą toogle(wartosc),
    //        gdzie wartosc jest ustalana na podstawie pobranego z localStorage harmonogramu!
    const date = new Date();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var time = hour + minute*0.01;

    for (var i = 0; i < this.schedulesCounter; i++) {
      if (this.schedules[i][1]<this.schedules[i][2]) {
        if (this.schedules[i][1]<=time && this.schedules[i][2]>=time) {
          this.toogle(this.schedules[i][0]);
        }
      } else if (this.schedules[i][1]>this.schedules[i][2]) {
        if (this.schedules[i][1]<=time || this.schedules[i][2]>=time) {
          this.toogle(this.schedules[i][0]);
        }
      }
    }
  }

  toogle(state=-101, run=true) { //like toogleSessionTheme
    if (state==-101 && run==true) {
      this.state++;
      if (this.state==this.themesCounter) this.state=0;
    } else if(state>=0 && run==true) {
      this.state=state;
    }

    var storage = new Storage(this.name + "_state");
    storage.uploadLocal(this.state);

    this.themeLoad();
  }

  themeLoad() { //like synchronizePageTheme
    var storage = new Storage(this.name + "_state");
    var state = storage.downloadLocal();
    this.state=state;

    this.themes[state].set();

    //showStatus
    for (var i = 0; i < this.statusesCounter; i++) {
      document.getElementById(this.statuses[i]).innerHTML = this.themes[state].name;
    }
  }
}
