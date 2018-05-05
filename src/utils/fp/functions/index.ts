/**
 * Gets property of an object
 */
export const prop = (name: string) => (o: {[key: string]: any}) => o[name]
