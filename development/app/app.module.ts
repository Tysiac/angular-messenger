


import { NgModule,Inject }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {NgClass} from '@angular/common';

import { App,routing,appRoutingProviders }  from './app';
import { FormsModule} from '@angular/forms';
//import { TranslatePipe/*,TRANSLATE_PROVIDERS*/,TranslateModule,TranslateLoader} from 'ng2-translate/ng2-translate';
//import {DROPDOWN_DIRECTIVES, TOOLTIP_DIRECTIVES,TAB_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';
import {RouterLink,Router,RouterModule/*,ROUTER_DIRECTIVES*/ } from '@angular/router';
import {MapToIterable} from './pipe/MapToIterable'
//import {LampFilterPipe}  from './pipe/lampfilter';
//import {TableFilterPipe} from './pipe/tablefilter';



import {HttpModule,Http} from '@angular/http';

import {LoginComponent} from './components/Login/login.component';
import {ContactsListComponent} from './components/ContactsList/contacts_list.component';
import {AuthService} from './services/AuthService/AuthService';
import {HomePageComponent} from './components/HomePage/home_page.component';
//import {DataProviderService} from './services/DataProvider/DataProviderService';

/*require("./components/action/action.html")
require("./components/raport/raport.html")
require("./components/home/home.html")
require("./components/systemLog/systemLog.html")
require("./components/calendar/calendar.html")
require("./components/grouping/grouping.html")
require("./components/connection/connection.html")
require("./components/settings/settings.html")
require("./components/login/login.html")*/
//require("./components//.html")


@NgModule({
  imports: [ BrowserModule,routing,FormsModule/*,TranslateModule*/],
  declarations: [ App/*,LampFilterPipe*/, MapToIterable, /*TableFilterPipe,*/LoginComponent,ContactsListComponent,HomePageComponent

         ],
  providers: [appRoutingProviders,AuthService/*,DataProviderService*/],

  bootstrap: [ App ]
})
export class AppModule 
{
	constructor(@Inject(AuthService) private authService)
	{
		
	}
 }
