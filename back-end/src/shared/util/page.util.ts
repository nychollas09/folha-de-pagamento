import { Page } from 'src/domain/interface/page';
import { FindManyOptions, Repository } from 'typeorm';
import { ObjectUtil } from './object.util';

export class PageUtil {
  public static async pageByCount<T>(
    { page, size }: { page: number; size: number },
    repository: Repository<T>,
    { where }: FindManyOptions<T> = {},
    innerType: new (value?: T) => T,
  ): Promise<Page<T>> {
    if ((await repository.count()) > 0) {
      return this.page<T>({ page, size }, repository, { where }, innerType);
    }
    return {
      content: [],
      empty: true,
      first: true,
      last: true,
      number: page,
      numberOfElements: 0,
      size,
      totalElements: 0,
      totalPages: 0,
    };
  }

  public static async page<T extends any>(
    { page, size }: { page: number; size: number },
    repository: Repository<T>,
    { where }: FindManyOptions<T> = {},
    innerType: new (value?: T) => T,
  ): Promise<Page<T>> {
    const conditions: FindManyOptions<T> = {
      where,
      skip: size * page,
      take: size,
    };
    const [values, countByFilter, countAllEntities] = await Promise.all([
      repository.find(conditions),
      repository.count(conditions),
      repository.count(),
    ]);
    const totalPages = Math.ceil(countByFilter / size);
    return {
      content: ObjectUtil.instanceObject<T>(values, innerType) as T[],
      empty: values.length < 1,
      first: Number(page) === 0,
      last: totalPages === Number(page),
      number: page,
      numberOfElements: values ? values.length : 0,
      size,
      totalElements: countAllEntities,
      totalPages,
    };
  }
}
