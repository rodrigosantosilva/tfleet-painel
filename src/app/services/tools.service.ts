import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToolsService {

  constructor() { }
  
  toDate(data: string) {
    let partes = data.split('/');
    return new Date(Number(partes[2]), Number(partes[1]) - 1, Number(partes[0]));
  }

  randomColorGenerator() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }


}
