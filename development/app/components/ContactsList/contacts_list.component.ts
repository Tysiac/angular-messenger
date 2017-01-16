import {Component, ViewEncapsulation, ElementRef,Inject} from '@angular/core';


@Component({
    selector: 'contacts-list',
    encapsulation: ViewEncapsulation.None,
     providers: [],
    templateUrl:'contacts_list.html',
   // styles:[require('./contacts_list.css').toString()]
})



export class ContactsListComponent 
{
    constructor()
    {

    }
}