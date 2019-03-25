import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-full-news',
  templateUrl: './full-news.component.html',
  styleUrls: ['./full-news.component.css']
})
export class FullNewsComponent implements OnInit {
  news: {id: number, title: String, content: String};

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          let id = params['id'];
          this.news = {
            id: id,
            title: id + ' Title',
            content: id + ' Content',
          };
        }
      );
  }

}
