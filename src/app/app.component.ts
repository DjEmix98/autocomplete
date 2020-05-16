import { Component, HostListener, ElementRef } from '@angular/core';
import { DICTIONARY } from './constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


  search:string;
  response = [];
  elementRef: ElementRef;
  indexDictionary = -1;
  
  readonly ARROW_DOWN = 'ArrowDown';
  readonly ARROW_UP = 'ArrowUp';
  readonly ENTER = 'Enter';
  readonly BACKSPACE = 'Backspace';
  onInput(event: string) {

    console.time('time to excecution');
    let count = 0;
    if(event.length > 2) {
    this.response = DICTIONARY.filter(v => { 
      if(count < 10) {
      if(v && v.toLocaleLowerCase().includes(event.toLocaleLowerCase())) {
        count ++;
        return v;
      } 
    } else {
      
      return null;
    }
    });
  }
    console.log(this.response);
    console.timeEnd('time to excecution');
  }

  select(value: string) {

    this.search = value;
    this.clear();
  }

  clear() {

    this.response = []
  }

  //for focusout
  @HostListener('document:click', ['$event']) handleClick() {
    this.clear();
}

@HostListener('document:keydown', ['$event']) keyDown(eventKey: KeyboardEvent) {
  

  if (eventKey.key === this.ARROW_DOWN && this.response.length > 0) {
    this.indexDictionary = this.indexDictionary < this.response.length - 1 ? this.indexDictionary + 1 : this.indexDictionary;
    this.search = this.response[this.indexDictionary];
} else if (eventKey.key === this.ARROW_UP && this.response.length > 0)  {
    if (this.indexDictionary === 0) {
        this.search = this.response[this.indexDictionary];
    } else if (this.indexDictionary > 0) {

        this.indexDictionary -= 1;
        this.search = this.response[this.indexDictionary];
    }
}
  if (eventKey.key === this.ENTER && this.response.length > 0) {

    this.search = this.response[this.indexDictionary];
    this.clear();
}

if (eventKey.key === this.BACKSPACE) {

  this.indexDictionary = -1;
}
}

}