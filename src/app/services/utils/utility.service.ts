import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor() { }

  getRandomItems(inputArray, count) {
    const copyInput = [];
    copyInput.push(...inputArray);

    if (copyInput && copyInput.length) {
      const  outputArray = [];
      for (let i = 0; i < count; i++) {
        const index = Math.floor(Math.random() * copyInput.length);
        outputArray.push(copyInput[index]);
        copyInput.splice(i, 1);
      }
      return outputArray;
    } else {
      return [];
    }
  }
}
