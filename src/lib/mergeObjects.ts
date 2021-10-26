export function deepMergeObjs(object: any, object2: any) {
  for (const key in object2) {
      if (object2.hasOwnProperty(key)) {
          if (typeof object[key] === "object" && typeof object2[key] === "object" && !Array.isArray(object2[key])) {
            //object[key].merge(object2[key]);
            object[key] = deepMergeObjs(object[key], object2[key])
            continue;
          }

          object[key] = object2[key];
      }
  }

  return object;
}