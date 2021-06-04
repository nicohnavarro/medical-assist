import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss']
})
export class LanguageSelectorComponent implements OnInit {

  lang: string;
  options: any;
  
  constructor(private translateService: TranslateService) {
    this.lang = localStorage.getItem("lang") || "en"
    this.translateService.setDefaultLang('es');
    const lang = localStorage.getItem("lang") || "es"
    this.translateService.use(lang)
    this.lang= lang;
    document.documentElement.lang = lang
  }

  ngOnInit(): void {
    this.options = [
      { Value: 'es', Text: '🇦🇷 Español',},
      { Value: 'en', Text: '🇬🇧 English',},
    ];
  }

  changeLang(lang: any) {
    this.lang= lang
    localStorage.setItem("lang", lang);
    // window.location.reload()
    this.translateService.use(lang)
  }

  onEnglishSwitched({checked}: MatSlideToggleChange){
    let lang = checked ?  'en' : 'es';
    this.lang = lang;
    localStorage.setItem("lang", lang);
    // window.location.reload()
    this.translateService.use(lang)
  }

}