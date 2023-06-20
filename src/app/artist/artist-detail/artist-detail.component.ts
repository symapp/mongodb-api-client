import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ArtistService } from "../../_service/artist.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-artist-detail',
  templateUrl: './artist-detail.component.html',
  styleUrls: ['./artist-detail.component.css']
})
export class ArtistDetailComponent implements OnInit {
  artist: any;
  attributes: string[][] = [];

  constructor(private activatedRoute: ActivatedRoute, private artistService: ArtistService, private toastr: ToastrService) { }

  ngOnInit(): void {
    const routeParams = this.activatedRoute.snapshot.paramMap;
    const artistIdFromRoute = String(routeParams.get('artistId'));

    this.artistService.getArtist(artistIdFromRoute).subscribe((artist: any) => {
      this.artist = artist;
      this.makeAttributeList()
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

  protected readonly name = name;
}
