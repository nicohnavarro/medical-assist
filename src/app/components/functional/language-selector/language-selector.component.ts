import { FormControl } from '@angular/forms';
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
  selected: string;
  languageFormCtrl = new FormControl('');

  constructor(private translateService: TranslateService) {
    if (localStorage.getItem("lang") === 'en') {
      this.translateService.use('en');
      document.documentElement.lang = 'en'
      this.selected = 'en';
    }
    else if (localStorage.getItem("lang") === 'es') {
      this.translateService.use('es');
      document.documentElement.lang = 'es'
      this.selected = 'es';
    }
    else if (localStorage.getItem("lang") === 'br') {
      this.translateService.use('br');
      document.documentElement.lang = 'br'
      this.selected = 'br';
    }
    else {
      localStorage.setItem("lang", "es")
      this.translateService.use('es');
      document.documentElement.lang = 'es'
    }
  }

  ngOnInit(): void {
  }

  onEnglishSwitched(selected: string) {
    switch (selected) {
      case 'es':
        localStorage.setItem("lang",'es');
        this.translateService.use('es');
        document.documentElement.lang = 'es';
        break;
      case 'en':
        localStorage.setItem("lang",'en');
        this.translateService.use('en');
        document.documentElement.lang = 'en';
        break;
      case 'br':
        localStorage.setItem("lang",'br');
        this.translateService.use('br');
        document.documentElement.lang = 'br';
        break;

      default:
        break;
    }
  }

}