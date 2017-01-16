import {Component, ViewEncapsulation, ElementRef,Inject} from '@angular/core';
import {AuthService} from '../../services/AuthService/AuthService';

@Component({
    selector: 'home-page',
    encapsulation: ViewEncapsulation.None,
     providers: [],
    templateUrl:'home_page.html',
    //styleUrls:['home_page.css']
    //styles:[require('login.css').toString()]
})



export class HomePageComponent 
{
    constructor(@Inject(AuthService) public authService)
    {
      
    }
}