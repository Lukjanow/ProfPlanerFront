class Module {
    constructor(start, duration, dozent, studySemester, room=None) {
      this.start = start;
      this.duration = duration;
      this.end = start + duration;

      this.dozent = dozent;
      this.studySemester = studySemester;
      this.room = room;
    }
  }