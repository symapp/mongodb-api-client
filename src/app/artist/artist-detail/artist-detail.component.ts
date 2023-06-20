import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ArtistService } from "../../_service/artist.service";
import { Location } from "@angular/common";

@Component({
  selector: 'app-artist-element-detail',
  templateUrl: './artist-detail.component.html',
  styleUrls: ['./artist-detail.component.css']
})
export class ArtistDetailComponent implements OnInit {
  artist: any;
  albums: any = [];
  attributes: string[][] = [];

  constructor(private activatedRoute: ActivatedRoute, private artistService: ArtistService,
              private router: Router, private location: Location) { }

  ngOnInit(): void {
    const routeParams = this.activatedRoute.snapshot.paramMap;
    const artistIdFromRoute = String(routeParams.get('artistId'));

    this.artistService.getArtist(artistIdFromRoute).subscribe((artist: any) => {
      this.artist = artist;
      this.makeAttributeList()

      this.artistService.getAlbumsByArtist(artistIdFromRoute).subscribe((albums: any) => {
        this.albums = albums;
      });
    });
  }

  private makeAttributeList() {
    for (let attr in this.artist) {
      if (attr == "_id") continue;
      if (this.artist.hasOwnProperty(attr)) {
        this.attributes.push([attr, this.artist[attr]]);
      }
    }
  }

  deleteArtist() {
    let r = confirm("Are you sure you want to delete " + this.artist.name + "?");
    if (r) {
      this.artistService.deleteArtist(this.artist._id).subscribe(() => {
        this.router.navigate(["/artists"]);
      });
    }
  }

  onClose() {
    this.location.back();
  }
}
