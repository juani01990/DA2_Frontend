import { Pipe, PipeTransform } from '@angular/core';
import { Components } from '../intefaces/Components';


@Pipe({
  name: 'componentNameFilter'
})
export class ComponentNameFilterPipe implements PipeTransform {

  transform(list: Array<Components>, filterBy: string):Array<Components>{
    if(!filterBy) return list;
    return list.filter(
      x => x.name.toLocaleLowerCase()
        .includes(filterBy.toLocaleLowerCase())
    );
  }

}
