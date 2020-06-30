import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterPipe'
})
export class FilterPipe implements PipeTransform {

  //Pipeline that's filtering data provided by ngFor from transfer article comp
  transform(items: any[], filterStr: string): any {

    if (!items || !filterStr) {
        return items;
    }
    //Preparing a temporary arrays
    let queryLetters: Array<string> = filterStr.split('');
    let tempArrItems: Array<any> = [];
    //A loop which iterates through items provided by user API, and compares it 
    // with query provided by user letter by letter
    for(let item of items) {
      let tagName = item.split('');
      for (let letter in queryLetters) {
        if ((tagName[letter] === queryLetters[letter]) && (tagName[letter + 1] === undefined)) {
          tempArrItems.push(item);
          break;
        } else if (tagName[letter] !== queryLetters[letter]) {
          break;
        }
      }
    }
    return tempArrItems;
  }
}
