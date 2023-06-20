import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from "@angular/common";
import { AlbumService } from "../../_service/album.service";
import { ArtistService } from "../../_service/artist.service";

@Component({
  selector: 'app-album-detail',
  templateUrl: './album-detail.component.html',
  styleUrls: ['./album-detail.component.css']
})
export class AlbumDetailComponent implements OnInit {
  album: any;
  artist: any;
  attributes: string[][] = [];

  constructor(private activatedRoute: ActivatedRoute, private albumService: AlbumService,
              private router: Router, private artistService: ArtistService,
              private location: Location) {
  }

  ngOnInit(): void {
    const routeParams = this.activatedRoute.snapshot.paramMap;
    const albumIdFromRoute = String(routeParams.get('albumId'));

    this.albumService.getAlbum(albumIdFromRoute).subscribe((album: any) => {
      this.album = album;
      this.makeAttributeList()
    });
  }

  private makeAttributeList() {
    this.addArtist()

    for (let attr in this.album) {
      if (attr == "_id") continue;
      if (attr == "artist_id") continue;
      if (this.album.hasOwnProperty(attr)) {
        this.attributes.push([attr, this.album[attr]]);
      }
    }
  }

  addArtist() {
    this.artistService.getArtist(this.album.artist_id).subscribe((artist: any) => {
      this.artist = artist;
    });
  }

  deleteAlbum() {
    let r = confirm("Are you sure you want to delete " + this.album.name + "?");
    if (r) {
      this.albumService.deleteAlbum(this.album._id).subscribe(() => {
        this.router.navigate(["/albums"]);
      });
    }
  }

  onClose() {
    this.location.back();
  }
}
