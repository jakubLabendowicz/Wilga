class Theme {
  counter = 0;
  variables = [];
  values = [];

  constructor(name="") {
    this.name = name;
  }

  add(variable, value) {
    this.variables.push(variable);
    this.values.push(value);
    this.counter++;
  }

  set() {
    for (var i = 0; i < this.counter; i++) {
      document.documentElement.style.setProperty(this.variables[i], this.values[i]);
    }
  }
}

class ThemeSwitch {
  state = 0;

  themesCounter = 0;
  themes = [];

  statusesCounter = 0;
  statuses = [];

  schedulesCounter = 0;
  schedules = [];

  constructor(name="", status="") {
    this.name = name;
    if (status!="") {
      this.addStatus(status);
    }
  }

  add(theme) {
    this.themes.push(theme);
    this.themesCounter++;
  }

  show(state=-1) {
    if (state==-1) {
      this.state++;
      if (this.state==this.themesCounter) this.state=0;
    } else {
      this.state=state;
    }
    this.themes[this.state].set();
    this.showStatus();
  }

  addStatus(id) {
    this.statuses.push(id);
    //tutaj
    document.getElementById(statuses[statusesCounter]).onclick = this.show();
    //do tutaj
    this.statusesCounter++;
  }

  showStatus() {
    for (var i = 0; i < this.statusesCounter; i++) {
      document.getElementById(this.statuses[i]).innerHTML = this.themes[this.state].name;
    }
  }

  addSchedule(id, start, end) {
    this.schedules[this.schedulesCounter] = [id, start, end];
    this.schedulesCounter++;
    this.showSchedule();
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

var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.4.1.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);
