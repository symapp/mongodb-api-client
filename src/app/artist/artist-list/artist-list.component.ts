import { Component, OnInit } from '@angular/core';
import { ArtistService } from "../../_service/artist.service";

@Component({
  selector: 'app-artist-element-list',
  templateUrl: './artist-list.component.html',
  styleUrls: ['./artist-list.component.css']
})
export class ArtistListComponent implements OnInit {
  artistList: any[] = [];
  constructor(private artistService: ArtistService) { }

  ngOnInit(): void {
    this.artistService.getArtists().subscribe((data: any) => {
      this.artistList = data;
    })
  }

}
