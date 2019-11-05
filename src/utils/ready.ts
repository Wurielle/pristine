class Ready {
  listeners: any[] = [];
  observer: any = null;

  constructor() {}

  public watch(selector: string | Document, callback: any) {
    if (!this.observer) {
      this.observer = new MutationObserver(this.checkMutations.bind(this));
      this.observer.observe(document, {
        childList: true,
        subtree: true
      });
    }
    if (
      selector === document &&
      /complete|loaded|interactive/.test(document.readyState)
    ) {
      callback.call(document, document);
      return () => {};
    }
    const listener = { selector, callback };
    this.listeners.push(listener);
    if (typeof selector === "string") {
      // Array.from(document.querySelectorAll(selector)).forEach((el: any) => callback.call(el, el));
    }
    return () => this.removeListener(listener);
  }

  private checkMutations(mutations: any) {
    this.listeners.forEach(
      ({ selector, callback }: { selector: string; callback: any }) => {
        const elements = document.querySelectorAll(selector);
        [].forEach.call(elements, (element: any) => {
          if (!element.$ready) {
            element.$ready = true;
            callback.call(element, element);
          }
        });
      }
    );
  }

  private removeListener(listener: any) {
    let i = this.listeners.length;
    while (i--) {
      if (listener === this.listeners[i]) {
        this.listeners.splice(i, 1);
      }
    }
    if (!this.listeners.length && this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
  }
}
const instance = new Ready();
export default instance;
