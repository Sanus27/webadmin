import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  transform( listas:any[], tipo:string ): any[] {
    let newList:any[] = [];

    if ( listas ) {
      for( let item of listas ){
          if( item.tipo == "Admin"){
              newList.push( item );
          }
      }
    }

    return newList;
  }

}
