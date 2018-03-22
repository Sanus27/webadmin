import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'finfoto'
})
export class FinfotoPipe implements PipeTransform {

  transform(value: any[], args?: any): any {
    let noimg = 'assets/img/icon-sanus.png'
  	if (!value) {
  		return noimg
  	}


    return ( value.length > 0 )? value[0].url : noimg;
  }

}
