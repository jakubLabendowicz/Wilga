import Storage from './Storage.js';

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

  add(theme) {
    this.themes.push(theme);
    this.themesCounter++;
  }

  addButton(id) {
    this.buttons.push(id);
    this.buttonsCounter++;
    document.getElementById(id).addEventListener('click', function () {themeController.show()});
  }

  addStatus(id) {
    this.statuses.push(id);
    this.statusesCounter++;
  }

  addSchedule(id, start, end) {
    this.schedules[this.schedulesCounter] = [id, start, end];
    this.schedulesCounter++;
    this.showSchedule();
  }

  toogle(state=-1) {
    if (state==-1) {
      this.state++;
      if (this.state==this.themesCounter) this.state=0;
    } else {
      this.state=state;
    }

    var storage = new Storage(this.name);
    storage.uploadSessionStorage(state);

    this.show();
  }

  show() {
    var storage = new Storage(this.name);
    var state = storage.downloadSessionStorage();

    this.themes[state].set();

    //showStatus
    for (var i = 0; i < this.statusesCounter; i++) {
      document.getElementById(this.statuses[i]).innerHTML = this.themes[state].name;
    }
  }

  showSchedule() {
    const date = new Date();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var time = hour + minute*0.01;

    for (var i = 0; i < this.schedulesCounter; i++) {
      if (this.schedules[i][1]<this.schedules[i][2]) {
        if (this.schedules[i][1]<=time && this.schedules[i][2]>=time) {
          this.show(this.schedules[i][0]);
        }
      } else if (this.schedules[i][1]>this.schedules[i][2]) {
        if (this.schedules[i][1]<=time || this.schedules[i][2]>=time) {
          this.show(this.schedules[i][0]);
        }
      }
    }
  }
}

export {Theme, ThemeController}
