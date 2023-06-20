import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ArtistService } from "../../_service/artist.service";
import { Location } from "@angular/common";
import { AlbumService } from "../../_service/album.service";

@Component({
  selector: 'app-album-form',
  templateUrl: './album-form.component.html',
  styleUrls: ['./album-form.component.css']
})
export class AlbumFormComponent implements OnInit {
  protected readonly Object = Object;

  album: any = {};
  artists: any = [];
  selectedArtistId: number = 0;
  albumIdFromRoute: string = "";
  newAttribute: string[] = ["", ""];
  addError: string = "";

  requiredFields: string[] = ["name", "length", "amt_songs", "release_year"];


  constructor(private activatedRoute: ActivatedRoute, private artistService: ArtistService,
              private albumService: AlbumService,
              private location: Location, private router: Router) { }

  ngOnInit(): void {
    const routeParams = this.activatedRoute.snapshot.paramMap;
    this.albumIdFromRoute = String(routeParams.get('albumId'));


    this.artistService.getArtists().subscribe((artists: any) => {
      this.artists = artists;
    });

    if (this.albumIdFromRoute == "new") {
      for (let field of this.requiredFields) {
        this.album[field] = "";
      }
    } else {
      this.albumService.getAlbum(this.albumIdFromRoute).subscribe((album: any) => {
        this.album = album;
        delete album._id;
        this.selectedArtistId = album.artist_id

        delete album.artist_id
      });
    }
  }

  onAddRow() {
    if (!this.newAttribute[0]) {
      this.addError = "Please enter a key."
      return;
    }

    if (this.wouldAddDuplicateKey()) {
      this.addError = "This attribute already exists."
      return;
    }

    this.album[this.newAttribute[0]] = this.newAttribute[1];
    this.newAttribute = ["", ""];
  }

  wouldAddDuplicateKey(): boolean {
    for (let key in this.album) {
      if (this.newAttribute[0] == key) {
        return true;
      }
    }
    return false;
  }

  validateNewKey() {
    this.addError = "";

    if (this.wouldAddDuplicateKey()) {
      this.addError = "This attribute already exists."
    }

    let a = this.newAttribute[0].replace(" ", "_");
    a = a.toLowerCase();
    this.newAttribute[0] = a.replace(/[^\w ]/g, '');

  }

  isDefault(string: string) {
    return this.requiredFields.includes(string);
  }

  onRemoveRow(a: string) {
    delete this.album[a];
  }

  onClose() {
    this.location.back();
  }

  onSave() {
    if (this.hasEmptyFields()) return;

    if (Number.isNaN(parseInt(this.album.amt_songs))) {
      alert("amt_songs must be a number")
      return
    } else
      this.album.amt_songs = parseInt(this.album.amt_songs)


    if (Number.isNaN(parseInt(this.album.release_year))) {
      alert("release_year must be a number")
      return
    } else
      this.album.release_year = parseInt(this.album.release_year)

    if (this.album.sales)
    if (Number.isNaN(parseInt(this.album.sales))) {
      alert("sales must be a number")
      return
    } else
      this.album.sales = parseInt(this.album.sales)


    if (this.selectedArtistId == 0) {
      alert("Please select an artist")
      return
    }
    this.album.artist_id = this.selectedArtistId;

    console.log(this.selectedArtistId)

    if (this.albumIdFromRoute === "new") {
      this.albumService.postAlbum(this.album).subscribe((data: any) => {
        this.router.navigateByUrl("/albums/" + data.InsertedID)
      });
    } else {
      this.albumService.putAlbum(this.albumIdFromRoute, this.album).subscribe(() => {
        this.router.navigateByUrl("/albums/" + this.albumIdFromRoute)
      });
    }
  }

  private hasEmptyFields(): boolean {
    if (!this.album.name){
      alert("name is required")
      return true;
    }
    if (!this.album.length){
      alert("length is required")
      return true
    }
    if (!this.album.amt_songs){
      alert("amt_songs is required")
      return true;
    }
    if (!this.album.release_year){
      alert("release_year is required")
      return true
    }


    for (let key of Object.keys(this.album)) {
      if (!this.album[key]) {
        delete this.album[key];
      }
    }

    return false
  }
}
