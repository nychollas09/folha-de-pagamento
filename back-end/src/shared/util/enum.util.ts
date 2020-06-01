export function getAllMembersOfEnumAsStringArray(enumType: any): string[] {
  const membersAsStringArray: string[] = [];
  for (const property of Reflect.ownKeys(enumType)) {
    membersAsStringArray.push(String(property));
  }
  return membersAsStringArray;
}

export function getAllMembersValueAsString(enumType: any): string[] {
  const membersValueAsString: string[] = [];
  for (const property of Reflect.ownKeys(enumType)) {
    membersValueAsString.push(enumType[property]);
  }
  return membersValueAsString;
}
