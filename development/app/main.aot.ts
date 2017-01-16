import { platformBrowser } from '@angular/platform-browser';
//import {provide} from '@angular/core';


debugger;
/*import * as $ from 'jquery';

window["$"] = $;
window["jQuery"] = $;
window['jquery'] = $;*/

import { AppModuleNgFactory } from "./app.module.ngfactory"; // Ignore error


//require('script!./static/jquery-2.1.1.js');

platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);
