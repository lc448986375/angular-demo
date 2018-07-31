import { Component } from '@angular/core';
import { MessageService } from './commons/app-services/message-service';
import { LoadingService } from './commons/app-services/loading-service';
import { TranslateService } from '@ngx-translate/core';
import { GlobalVariable } from './commons/config/global-variable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  
  constructor(protected msgService:MessageService, protected loadingService:LoadingService, private translate: TranslateService){ 
    GlobalVariable.LANGUAGES.forEach(o => {
        translate.getLangs().push(o['value']);
    });

    translate.setDefaultLang(GlobalVariable.LANGUAGES_DEFAULT);
    translate.use(GlobalVariable.LANGUAGES_DEFAULT);

    //获取当前浏览器环境的语言比如en、 zh
    /*
    let broswerLang = translate.getBrowserLang();
    translate.use(broswerLang.match(/en|zh-CN/) ? broswerLang : 'zh-CN');
    */
  }
}
