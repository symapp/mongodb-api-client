import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { map } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ArtistService {
  url = environment.api_url

  constructor(private http: HttpClient) {
  }

  getArtists() {
    return this.http.get(this.url + "/artists").pipe(
      map((data: any) => data.data.data)
    )
  }

  getArtist(id: string) {
    return this.http.get(this.url + "/artists/" + id).pipe(
      map((data: any) => data.data.data)
    )
  }

  putArtist(id: string, artist: any) {
    return this.http.put(this.url + "/artists/" + id, artist).pipe(
      map((data: any) => data.data.data)
    )
  }

  postArtist(artist: any) {
    return this.http.post(this.url + "/artists", artist).pipe(
      map((data: any) => data.data.data)
    )
  }

  deleteArtist(id: string) {
    return this.http.delete(this.url + "/artists/" + id).pipe(
      map((data: any) => data.data.data)
    )
  }
}
