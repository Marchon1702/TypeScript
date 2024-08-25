export function inspect(target, propertyKey, descriptor) {
    const metodoOriginal = descriptor.value;
    descriptor.value = function (...args) {
        console.log(`--- O nome do método é: ${propertyKey}`);
        console.log(`------ Os parâmetros do método são: ${JSON.stringify(args)}`);
        const retorno = metodoOriginal.apply(this, args);
        console.log(`------ Retorno: ${retorno}`);
        return retorno;
    };
    return descriptor;
}
//# sourceMappingURL=inspect.js.map