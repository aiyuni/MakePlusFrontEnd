import { Component, OnInit, Input, Output } from '@angular/core';
import { PhaseItem } from 'src/app/classes/phaseItem';
import { PhaseColors } from 'src/app/classes/phaseColors';
import { Column } from 'primeng/components/common/shared';
import { Project } from 'src/app/classes/project';
import { Observable } from 'rxjs';

/** The phase component in LOW level view. */
@Component({
  selector: 'app-phase-tracking',
  templateUrl: './phase-tracking.component.html',
  styleUrls: ['./phase-tracking.component.css']
})
export class PhaseTrackingComponent implements OnInit {
   eventsSubscription: any

  /** the current project in this page */
  @Input() porject:Project;
  /** each row of the phase  */
  @Input() phases:PhaseItem[];
  /** indicator if this page is read only or not. */
  @Input() readMode:boolean;
  /** Recive of other module fired phase change event. */
  @Input() phaseChangedEventListener: Observable<void>;
  /** total weeks of phase estimates */
  totalPhasePredicted:number;
  /** total weeks of actual phases. */
  totalActualPredicted:number;

  constructor() { }

  /** Initialize the directive/component. */
  ngOnInit() {
    this.totalPhasePredicted = 0;
    this.totalActualPredicted = 0;
    this.calcuateTotal();
    this.eventsSubscription = this.phaseChangedEventListener.subscribe(() => this.calcuateTotal())

  }

  /** applying phase color based on phase index */
  setPhaseBackgroundColor(i){
    let styles = {
      'color': PhaseColors.colors[i],
      'font-weight': 'bold',
      'width': '10px'
    };
    return styles;
  }

  /** calculate phase totals */
  calcuateTotal(){
    this.totalPhasePredicted = 0;
    this.totalActualPredicted = 0;
    for(var i = 0; i < this.phases.length; i++){
      this.totalPhasePredicted += parseFloat(this.phases[i].predictedDurationInWeeks.toString());
      this.totalActualPredicted += parseFloat(this.phases[i].actualDurationInWeeks.toString());
    }
  }

  /** fires when user exit field */
  onEditComplete(event: {column: Column, data: any}): void {
    this.calcuateTotal();
  }

  /** fires when user change the text */
  onTextEnterdInField(event: {originalEvent: any, column: Column, data: any}): void {
    this.calcuateTotal();
  }

}
