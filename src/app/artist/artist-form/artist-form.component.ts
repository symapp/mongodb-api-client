import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ArtistService } from "../../_service/artist.service";
import { Location } from "@angular/common";

@Component({
  selector: 'app-artist-element-form',
  templateUrl: './artist-form.component.html',
  styleUrls: ['./artist-form.component.css']
})
export class ArtistFormComponent implements OnInit {
  protected readonly Object = Object;

  artist: any = {};
  artistIdFromRoute: string = "";
  newAttribute: string[] = ["", ""];
  addError: string = "";

  requiredFields: string[] = ["name", "genres", "artist_since", "monthly_listeners"];


  constructor(private activatedRoute: ActivatedRoute, private artistService: ArtistService,
              private location: Location, private router: Router) {
  }

  ngOnInit(): void {
    const routeParams = this.activatedRoute.snapshot.paramMap;
    this.artistIdFromRoute = String(routeParams.get('artistId'));

    if (this.artistIdFromRoute == "new") {
      for (let field of this.requiredFields) {
        this.artist[field] = "";
      }
    } else {
      this.artistService.getArtist(this.artistIdFromRoute).subscribe((artist: any) => {
        this.artist = artist;
        delete artist._id;
        this.artist.genres = artist.genres.join(",");
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

    this.artist[this.newAttribute[0]] = this.newAttribute[1];
    this.newAttribute = ["", ""];
  }

  wouldAddDuplicateKey(): boolean {
    for (let key in this.artist) {
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
    delete this.artist[a];
  }

  onClose() {
    this.location.back();
  }

  onSave() {
    if (this.hasEmptyFields()) return;

    this.artist.genres = this.artist.genres.split(",");

    if (Number.isNaN(parseInt(this.artist.artist_since))) {
      alert("artist_since must be a number")
      return
    } else
      this.artist.artist_since = parseInt(this.artist.artist_since)


    if (Number.isNaN(parseInt(this.artist.monthly_listeners))) {
      alert("monthly_listeners must be a number")
      return
    } else
      this.artist.monthly_listeners = parseInt(this.artist.monthly_listeners)

    if (this.artistIdFromRoute === "new") {
      this.artistService.postArtist(this.artist).subscribe((data: any) => {
        this.router.navigateByUrl("/artists/" + data.InsertedID)
      });
    } else {
      this.artistService.putArtist(this.artistIdFromRoute, this.artist).subscribe(() => {
        this.router.navigateByUrl("/artists/" + this.artistIdFromRoute)
      });
    }
  }

  private hasEmptyFields(): boolean {
    if (!this.artist.name) {
      alert("name is required")
      return true;
    }
    if (!this.artist.genres) {
      alert("genres is required")
      return true;
    }
    if (!this.artist.artist_since) {
      alert("artist_since is required")
      return true
    }
    if (!this.artist.monthly_listeners) {
      alert("monthly_listeners is required")
      return true
    }

    for (let key of Object.keys(this.artist)) {
      if (!this.artist[key]) {
        delete this.artist[key];
      }
    }

    return false
  }

}
