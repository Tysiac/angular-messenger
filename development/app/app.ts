 ///<reference path="../typings/tsd.d.ts"/> 
 

import {enableProdMode} from "@angular/core";


 //   enableProdMode();
 






//import { bootstrap } from '@angular/platform-browser-dynamic';
import {Component, ViewEncapsulation, ElementRef,Inject} from '@angular/core';

import {/*CORE_DIRECTIVES, FORM_DIRECTIVES,*/NgClass,Location} from '@angular/common';

import {MapToIterable} from './pipe/MapToIterable';

//import {TranslateService, TranslatePipe,/* TRANSLATE_PROVIDERS,*/ TranslateLoader} from 'ng2-translate/ng2-translate';

//import {TranslateUtils} from'./services/Utils/TranslateLoader';

import {/*ROUTER_DIRECTIVES,provideRouter,*//*RouterConfig,*/Router,NavigationStart,Routes,RouterModule} from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import {LoginComponent} from './components/Login/login.component';
import {HomePageComponent} from './components/HomePage/home_page.component';
import {AuthService} from './services/AuthService/AuthService';
//import {DataProviderService} from './services/DataProvider/DataProviderService';


const routes: Routes = [
    { path: '', redirectTo: 'home',pathMatch:'full' },

    { path: 'login', component:LoginComponent},
    { path: 'home', component: HomePageComponent,canActivate:[AuthService] },
    /*{ path: 'reports', component: RaportComponent },
    { path: 'calendar', component: CalendarComponent },
    { path: 'systemlog', component: SystemLogComponent,canActivate:[AuthService] },
    { path: 'grouping', component: GroupingComponent,canActivate:[AuthService] },
    { path: 'connection', component: ConnectionComponent },
    { path: 'settings', component: SettingsComponent,canActivate:[AuthService] },
    { path: 'login', component: LoginComponent },
    { path: 'lamps/:id', component: DetailsLampsComponent }*/
];

//export const APP_ROUTER_PROVIDERS = [provideRouter(routes)];    
export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);


//require('./app.css');
@Component({
    selector: 'app',
    encapsulation: ViewEncapsulation.None,
     providers: [],
    templateUrl:'app.html'//,
  //  styleUrls:['app.css']
})



export class App 
{
    public static instance: App; 
    public isLoggedIn =false;


    constructor(@Inject(Router) public router: Router, 
                @Inject(Location) public location: Location, 
                @Inject(ElementRef) public el: ElementRef,
                @Inject(AuthService) public authService,
                //@Inject(DataProviderService) public dataProvider
                )
    {
        App.instance = this; 
        this.authService.onLoginStatusChanged=function(isLoggedIn)
        {
            App.instance.isLoggedIn=isLoggedIn;
        }
        //this.authService.subscribe((val)=>{debugger})
    }
 
    ngOnInit()
    {
       this.isLoggedIn=this.authService.isLogged();

      
    }

    public logout()
    {
        this.authService.logout();
        this.router.navigate(['login']);
        return false;
    }

    

}
