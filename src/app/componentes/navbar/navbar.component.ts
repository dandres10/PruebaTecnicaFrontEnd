import { Component, OnInit } from '@angular/core';
import { ComicService } from '../../servicios/comic.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private _comicService: ComicService) {
    
  }

  ngOnInit(): void {
  }

}
