import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortcut'
})
export class ShortcutPipe implements PipeTransform {

  transform(value: string, limit: number = 20): unknown {
    return value?.length > limit ? value.slice(0, limit) + "..." : value;
  }

}
