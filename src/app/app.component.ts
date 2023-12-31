import { Component, Inject } from '@angular/core';
import { Event, Router, RouterEvent } from "@angular/router";
import { filter } from "rxjs";
import { DOCUMENT } from "@angular/common";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MongoDbClient';

  constructor(public router: Router, @Inject(DOCUMENT) private document: Document) {
    router.events.pipe(
      filter((e: Event | RouterEvent): e is RouterEvent => e instanceof RouterEvent)
    ).subscribe((e: RouterEvent) => {
        if (e.url.includes("artist")) {
          this.document.body.classList.add("artist");
          this.document.body.classList.remove("album");
        } else if (e.url.includes("album")) {
          this.document.body.classList.add("album");
          this.document.body.classList.remove("artist");
        } else {
          this.document.body.classList.remove("artist");
          this.document.body.classList.remove("album");
        }
      }
    )
  }
}
