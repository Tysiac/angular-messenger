//require('script!./static/jquery-2.1.1.js');


/*import * as $ from 'jquery';

window["$"] = $;
window["jQuery"] = $;
window['jquery'] = $;*/

require('script!./static/jquery-2.1.1.js'); 
require('./app.css');
require('./assets/css/bootstrap.css');
require('./static/bootstrap-3.3.7/js/bootstrap.min.js');
require('./components/Login/login.css');


import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
//import {provide} from '@angular/core';
//import {TranslateService, TranslatePipe/*, TRANSLATE_PROVIDERS,*/, TranslateLoader} from 'ng2-translate/ng2-translate';

import {LocationStrategy, HashLocationStrategy} from '@angular/common';

//import {WebpackTranslateLoader} from './services/Utils/TranslateLoader';
import { AppModule } from './app.module';
import {AuthService} from './services/AuthService/AuthService';


//import {ActionsComponent} from './components/action/actions.component'


/************************************************************/
/*                                    ANY CSS REQUIRE HERE                                          */
/************************************************************/
//require('./assets/css/jquery-ui.css');

platformBrowserDynamic().bootstrapModule(AppModule,[{provide:LocationStrategy, useClass: HashLocationStrategy}/*,{provide:TranslateLoader, useClass: WebpackTranslateLoader}*/]);
