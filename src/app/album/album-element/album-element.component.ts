import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-album-element',
  templateUrl: './album-element.component.html',
  styleUrls: ['./album-element.component.css']
})
export class AlbumElementComponent implements OnInit {
  @Input() album: any;

  constructor() { }

  ngOnInit(): void {
  }

}
