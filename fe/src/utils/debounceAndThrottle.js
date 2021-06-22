export const throttleAndDebounce = () => {
  let throttleCheck, debounceCheck;

  return {
    throttle(callback, milliseconds) {
      return function () {
        if (!throttleCheck) {
          throttleCheck = setTimeout(() => {
            callback(...arguments);
            throttleCheck = false;
          }, milliseconds);
        }
      };
    },

    debounce(callback, milliseconds) {
      return function () {
        clearTimeout(debounceCheck);
        debounceCheck = setTimeout(() => {
          callback(...arguments);
        }, milliseconds);
      };
    },
  };
};
