var countdown
var sessionTime
var breakTime = 300

var pomodoro = {
  currentTime: 0, // 管理session or break 0: session, 1: break
  SPEED: 1000,
  time: [
    {
      name: "session",
      duration: 300
    },
    {
      name: "break",
      duration: 300
    }
  ],
  isPaused: false,
  timer: function(current) {
    var self = this
    countdown = setInterval(function() {
      if (!self.isPaused) {
        self.time[current].duration--
        view.displayTimerTime(current)
        view.displayTimerProgress(current)
      }
      if (self.time[current].duration <= 0) {
        self.currentTime = self.currentTime + 1
        if (self.currentTime === 2) {
          clearInterval(countdown)
          alert("Break time is over, please restart pomodoro")
          self.reset()
          view.displayPomoType("session")
          return
        } else {
          clearInterval(countdown)
          alert("Work Time Up, start break time")
          view.displayPomoType("break")
          self.timer(self.currentTime)
        }
      }
    }, self.SPEED)
  },
  displayTimeLeft: function(seconds) {
    const min = Math.floor(seconds / 60)
    const remainderSeconds = seconds % 60
    return `${min}:${remainderSeconds < 10 ? "0" : ""}${remainderSeconds}`
  },
  pauseTime: function() {
    this.isPaused = !this.isPaused
  },
  reset: function() {
    clearInterval(countdown)
    this.time = [
      {
        name: "session",
        duration: 300
      },
      {
        name: "break",
        duration: 300
      }
    ]
    this.isPaused = false
    this.currentTime = 0
    this.SPEED = 1000
    document.querySelector(
      "#session-time"
    ).innerHTML = `<span id="session">5</span>:00`
  },
  changeSpeed: function() {
    clearInterval(countdown)
    this.SPEED = 30
    this.timer(this.currentTime)
  }
}

handlers = {
  startPomodoro: function() {
    sessionTime = document.querySelector("#session").innerText * 1
    console.log("sessionTime", sessionTime)
    pomodoro.timer(pomodoro.currentTime)
  },
  pause: function() {
    pomodoro.pauseTime()
  },
  reset: function() {
    pomodoro.reset()
  }
}

view = {
  displayPomoType: function(type) {
    document.querySelector("#pomo-type").innerHTML = type
  },
  displayTimerTime: function(i) {
    var timeString = pomodoro.displayTimeLeft(pomodoro.time[i].duration)
    document.querySelector("#session-time").innerHTML = timeString
  },
  displayTimerProgress: function(i) {
    var totalProgress
    var progress
    totalProgress = i === 0 ? sessionTime * 1 * 60 : breakTime * 1
    progress = 100 - (pomodoro.time[i].duration / totalProgress) * 100 + ""
    document.querySelector("#progress-bar").style.width = progress + "%"
    document.querySelector("#progress-bar").innerHTML =
      Math.round(progress) + "%"
  }
}
