import { Component, OnInit, Input } from '@angular/core';
import { PhaseItem } from 'src/app/classes/phaseItem';

/** The calendar component in LOW level view. */
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  /** Each row of the phase table. */
  @Input() phases: PhaseItem[];

  /** may not in used. TODO: need to be confirmed. */
  value: Date;  // not in used.
  /** may not in used. TODO: need to be confirmed. */
  phase1end: number;  // not in used.
  /** may not in used. TODO: need to be confirmed. */
  phase1start: number;  // not in used.
  /** The hardcoded phase colors. */
  phaseColors: string[] = [
    "#AD1B57", "#F4511F", "#E4C440", "#0C8043", "#3F51B4", "#8E25AA",
    "#D9235F", "#C0CB34", "#009588", "#7986CB", "#795548",
    "#F09400", "#049CE5", "#B39EDB", "#E67B74", "#F7BE27", "#F7BE27",
    "#4285F3", "#9E69B0", "#A79C8F", "#616161"
  ];

  /** constructor before calling directive/component hook method */
  constructor() { }

  /** Initialize the directive/component. */
  ngOnInit() {
    this.phase1end = 21;  // not in used.
    this.phase1start = 5;  // not in used.
  }

  /** check the date of the phase for rendinger the calendar. */
  checkdateInPhase(date: number, month: number, year: number) {
    var current = new Date(year, month, date);
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

  /** apply the background color of the date in phases. */
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

  /** apply the text color of the text, either balck or white. */
  colorDate(date: number, month: number, year: number) {
    var index = this.checkdateInPhase(date, month, year);
    if (index == -1) {
      return "inherit";
    } else {
      return "#FFFFFF";
    }
  }

}
