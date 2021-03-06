import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';

import gql from'graphql-tag';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Course , Query} from '../types';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  courses : Observable<Course[]>;
  constructor(private apollo:Apollo) {
   }

  ngOnInit() {
    this.courses = this.apollo.watchQuery<Query>({
      query: gql`
        query allCourses {
          allCourses{
            id
            title
            author
            description
            topic
            url
          }
        }
      `
    })
    .valueChanges
    .pipe(
      map(result=>result.data.allCourses)
    );
  }

}
