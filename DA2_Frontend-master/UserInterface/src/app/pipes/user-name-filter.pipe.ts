import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../intefaces/User';

@Pipe({
  name: 'userNameFilter'
})
export class UserNameFilterPipe implements PipeTransform {

  transform(list: User[], filterBy: string):User[]{
    if(!filterBy) return list;
    return list.filter(
      x => x.username.toLocaleLowerCase()
        .includes(filterBy.toLocaleLowerCase())
    );
  }
}
