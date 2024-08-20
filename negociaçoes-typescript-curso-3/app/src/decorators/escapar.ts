export function escapar(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
) {
    const metodoOriginal = descriptor.value 
    descriptor.value = function(...args: any[]) {
        let retorno = metodoOriginal.apply(this, args)
        if(typeof retorno === 'string') {
            console.log(`Método em ação na classe ${this.constructor.name}`)
            retorno = retorno.replace(/<script>[\s\S]*?<\/script>/, '')
        }
        return retorno
    }

    return descriptor
}