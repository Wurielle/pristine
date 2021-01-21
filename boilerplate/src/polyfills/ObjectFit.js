import ready from "@ryanmorr/ready";
import "objectFitPolyfill/dist/objectFitPolyfill.min.js";

const selector = '[data-ref="objectFit"]';

const ObjectFit = (el = null) => {
  window.objectFitPolyfill(el);
};

(() => {
  ready(selector, element => {
    if (
      element &&
      !element.parentNode.classList.contains("object-fit-polyfill")
    ) {
      ObjectFit(element);
    }
  });
})();
export default ObjectFit;
