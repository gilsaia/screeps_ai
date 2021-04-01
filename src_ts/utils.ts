export function assignPrototype(target: AnyClass, extension: AnyClass): void {
  Object.getOwnPropertyNames(extension.prototype).map(prop => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
    target.prototype[prop] = extension.prototype[prop];
  });
}
