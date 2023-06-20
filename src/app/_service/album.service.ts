import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AlbumService {
  url = environment.api_url

  constructor(private http: HttpClient) { }

  getAlbums() {
    return this.http.get(this.url + "/albums").pipe(
      map((data: any) => data.data.data)
    )
  }

  getAlbum(id: string) {
    return this.http.get(this.url + "/albums/" + id).pipe(
      map((data: any) => data.data.data)
    )
  }

  putAlbum(id: string, album: any) {
    return this.http.put(this.url + "/albums/" + id, album).pipe(
      map((data: any) => data.data.data)
    )
  }

  postAlbum(album: any) {
    return this.http.post(this.url + "/albums", album).pipe(
      map((data: any) => data.data.data)
    )
  }

  deleteAlbum(id: string) {
    return this.http.delete(this.url + "/albums/" + id).pipe(
      map((data: any) => data.data.data)
    )
  }

}
