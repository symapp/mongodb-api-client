import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-artist-element',
  templateUrl: './artist-element.component.html',
  styleUrls: ['./artist-element.component.css']
})
export class ArtistElementComponent implements OnInit {
  @Input() artist: any;

  constructor() { }

  ngOnInit(): void {
  }

}
