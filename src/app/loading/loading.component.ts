import { Component, OnInit, Input } from '@angular/core';

/** The loading component in each view before api class returns. */
@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {

  /** A string indicating loading status. */
  @Input() text:string;

  /** constructor before calling directive/component hook method */
  constructor() { }

  /** Initialize the directive/component. */
  ngOnInit() {
  }

}
