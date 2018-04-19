import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'finfoto',
  pure: false
})
export class FinfotoPipe implements PipeTransform {

  transform(value: any[], args?: any): any {


    let noimg = 'assets/img/icon-sanus.png'
    let url = 'https://firebasestorage.googleapis.com/v0/b/sanus-27.appspot.com/o/avatar%2FAK0I7AusX0e1wFIWTk3p9nllWTi1?alt=media&token=70c7790c-a628-4330-86c2-29820a86b840'
    if (value == undefined) {
      return noimg
    } else {
      return url
    }

  }

}
