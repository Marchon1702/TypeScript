export abstract class Views<T> {
  protected elemento: HTMLElement;
  constructor(seletor: string) {
    const elemento = document.querySelector(seletor);
    if (elemento) {
      this.elemento = elemento as HTMLElement;
    } else {
        throw Error(`${seletor} não foi encontrado!`)
    }
  }

  protected abstract template(model: T): string;

  public update(model: T) {
    const template = this.template(model);
    this.elemento.innerHTML = ''
    this.elemento.innerHTML = template;
  }
}
