import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AlbumService {
  url = environment.api_url

  constructor(private http: HttpClient) { }

  getAlbums() {
    return this.http.get(this.url + "/albums")
  }

  getAlbum(id: string) {
    return this.http.get(this.url + "/albums/" + id)
  }

  putAlbum(id: string, album: any) {
    return this.http.put(this.url + "/albums/" + id, album)
  }

  postAlbum(album: any) {
    return this.http.post(this.url + "/albums", album)
  }

  deleteAlbum(id: string) {
    return this.http.delete(this.url + "/albums/" + id)
  }

}
