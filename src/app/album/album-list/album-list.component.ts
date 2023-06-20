import { Component, OnInit } from '@angular/core';
import { AlbumService } from "../../_service/album.service";

@Component({
  selector: 'app-album-list',
  templateUrl: './album-list.component.html',
  styleUrls: ['./album-list.component.css']
})
export class AlbumListComponent implements OnInit {
  albumList: any[] = [];

  constructor(private albumService: AlbumService) { }

  ngOnInit(): void {
    this.albumService.getAlbums().subscribe((data: any) => {
      this.albumList = data;
    });
  }

}
