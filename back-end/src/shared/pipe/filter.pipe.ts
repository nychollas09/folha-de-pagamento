import { Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class FilterPipe<T> implements PipeTransform {
  private innerTypeFilter: new (value?: T) => T;

  constructor(innerTypeFilter: new (value?: T) => T) {
    this.innerTypeFilter = innerTypeFilter;
  }

  transform(value: any): T {
    Reflect.deleteProperty(value, 'page');
    Reflect.deleteProperty(value, 'size');
    return new this.innerTypeFilter(value);
  }
}
