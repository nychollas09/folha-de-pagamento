import { FindManyOptions, Like } from 'typeorm';
import { ObjectUtil } from './object.util';

export class QueryUtil {
  public static createWhereConditionFromFilter<T>(
    filter: any,
    propertysNameLikeString: string[] = [],
  ) {
    const cleanedFilter = ObjectUtil.getCleanObject(filter);
    const whereCondition = {};
    for (const property of Reflect.ownKeys(cleanedFilter)) {
      const isLikeProperty = propertysNameLikeString.find(
        (propertyName) => propertyName === property,
      );
      if (isLikeProperty) {
        Reflect.set(
          whereCondition,
          property,
          Like(`%${cleanedFilter[property]}%`),
        );
      } else {
        Reflect.set(whereCondition, property, cleanedFilter[property]);
      }
    }
    return { where: whereCondition } as FindManyOptions<T>;
  }
}
