import { Component, OnInit, Input } from '@angular/core';
import { PhaseItem } from 'src/app/classes/phaseItem';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  @Input() phases: PhaseItem[];

  value: Date;
  phase1end: number;
  phase1start: number;
  phaseColors: string[] = [
    "#AD1B57", "#F4511F", "#E4C440", "#0C8043", "#3F51B4", "#8E25AA",
    "#D9235F", "#C0CB34", "#009588", "#7986CB", "#795548",
    "#F09400", "#049CE5", "#B39EDB", "#E67B74", "#F7BE27", "#F7BE27",
    "#4285F3", "#9E69B0", "#A79C8F", "#616161"
  ];

  constructor() { }

  ngOnInit() {
    this.phase1end = 21;
    this.phase1start = 5;
  }

  checkdateInPhase(date: number, month: number, year: number) {
    var current = new Date(year, month, date);
    // this.phases.forEach((p, index) => {
    //   if (current.getTime >= p.startDate.getTime && current.getTime <= p.endDate.getTime){
    //     console.log(year,month,date, index);
    //     return index;
    //   }
    // })
    for (let i = 0; i < this.phases.length; i++) {
      try {
        let startDate = new Date(this.phases[i].startDate.toString());
        let endDate = new Date(this.phases[i].endDate.toString());
        if (current.getTime() >= startDate.getTime() && current.getTime() <= endDate.getTime()) {
          return i;
        }
      }
      catch (Exception) {
        return -1;
      }
    }
    return -1;
  }
  hightlighDate(date: number, month: number, year: number) {
    var backgroundColor: string = "inherit";
    var color: string = "inherit";
    var index = this.checkdateInPhase(date, month, year);
    if (index == -1) {
      return "inherit";
    } else {
      index %= this.phaseColors.length
      return this.phaseColors[index];
    }
  }
  colorDate(date: number, month: number, year: number) {

    var index = this.checkdateInPhase(date, month, year);
    if (index == -1) {
      return "inherit";
    } else {
      return "#FFFFFF";
    }
  }

}
