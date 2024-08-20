export function inspect(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const metodoOriginal = descriptor.value;
  descriptor.value = function (...args: any[]) {
    console.log(`--- O nome do método é: ${propertyKey}`);
    console.log(`------ Os parâmetros do método são: ${JSON.stringify(args)}`);
    const retorno = metodoOriginal.apply(this, args);
    console.log(`------ Retorno: ${retorno}`);
    return retorno;
  };
  return descriptor;
}
