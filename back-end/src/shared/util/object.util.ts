export class ObjectUtil {
  public static instanceObject<T>(
    value: T | T[],
    innerType: new (value?: T) => T,
  ) {
    if (Array.isArray(value)) {
      const instanciedValues = value.map((register) => {
        return new innerType(register);
      });
      return instanciedValues;
    }
    return new innerType(value as T);
  }

  public static getCleanObjectWithoutPageAndSize(object: any) {
    const cleanObject = this.getCleanObject(object);
    Reflect.deleteProperty(cleanObject, 'page');
    Reflect.deleteProperty(cleanObject, 'size');
    return cleanObject;
  }

  public static getCleanObject(object: any) {
    if (object) {
      for (const property of Reflect.ownKeys(object)) {
        if (!object[property] && typeof object[property] !== 'boolean') {
          Reflect.deleteProperty(object, property);
        }
      }
      return object;
    }
    throw new Error('Object inexistente.');
  }
}
