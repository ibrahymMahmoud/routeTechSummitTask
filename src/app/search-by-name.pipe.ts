import { Pipe, PipeTransform } from '@angular/core';

interface table_customer  {
  Transaction_id : number,
  custom_id : number ,
  amount : number,
  date:string,
  name : string
}

@Pipe({
  name: 'searchByName'
})
export class SearchByNamePipe implements PipeTransform {

  
  transform(transactions :table_customer[],search_term : string): table_customer[] {
    
    return transactions?.filter((item)=>item.name.toLowerCase().includes(search_term.toLowerCase()));
   
  }

}
