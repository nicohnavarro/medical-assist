import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss']
})
export class LanguageSelectorComponent implements OnInit {
  checked: boolean;
  lang: string;
  options: any;

  constructor(private translateService: TranslateService) {
    if (localStorage.getItem("lang") === 'en') {
      this.translateService.use('en');
      document.documentElement.lang = 'en'
      this.checked = true;
    }
    else if (localStorage.getItem("lang") === 'es') {
      this.translateService.use('es');
      document.documentElement.lang = 'es'
      this.checked = false;
    }
    else {
      localStorage.setItem("lang", "es")
      this.translateService.use('es');
      document.documentElement.lang = 'es'
    }
  }

  ngOnInit(): void {
    this.options = [
      { Value: 'es', Text: '🇦🇷 Español', },
      { Value: 'en', Text: '🇬🇧 English', },
    ];
  }

  onEnglishSwitched({ checked }: MatSlideToggleChange) {
    this.lang = checked ? 'en' : 'es';
    localStorage.setItem("lang", this.lang);
    this.translateService.use(this.lang);
    document.documentElement.lang = this.lang;
  }

}