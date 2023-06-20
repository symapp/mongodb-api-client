import { Component, Input, OnInit } from '@angular/core';
import { ArtistService } from "../../_service/artist.service";

@Component({
  selector: 'app-album-element',
  templateUrl: './album-element.component.html',
  styleUrls: ['./album-element.component.css']
})
export class AlbumElementComponent implements OnInit {
  @Input() album: any;
  artist: any;

  constructor(private artistService: ArtistService) { }

  ngOnInit(): void {
    this.artistService.getArtist(this.album.artist_id).subscribe((artist: any) => {
      this.artist = artist;
    });
  }

}
