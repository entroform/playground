const getViewportDimensions = () => {
  const modelElement = document.createElement('DIV');

  modelElement.style.boxSizing = 'border-box';
  modelElement.style.display = 'block';
  modelElement.style.height = '100vh';
  modelElement.style.left = '0';
  modelElement.style.padding = '0';
  modelElement.style.position = 'fixed';
  modelElement.style.top = '0';
  modelElement.style.visibility = 'hidden';
  modelElement.style.width = '100vw';
  modelElement.style.zIndex = '-99999';

  document.body.appendChild(modelElement);

  const { offsetWidth: width, offsetHeight: height } = modelElement;

  modelElement.remove();

  return { width, height };
}

const once = (target: HTMLElement | Window, eventName: string, eventListener: EventListener) => {
  const listener = event => {
    eventListener(event);
    target.removeEventListener(eventName, listener);
  }
  target.addEventListener(eventName, listener);
}

const elementIsInView = (element: HTMLElement) => {
  const rect = element.getBoundingClientRect();

  if (
    rect.right < 0
    || rect.left > window.innerWidth
    || rect.top > window.innerHeight
    || rect.bottom < 0
  ) {
    return false;
  }

  return true;
};

const percentageOfElementInView = (element: HTMLElement) => {
  if (elementIsInView(element) === false) {
    return 0;
  }

  const rect = element.getBoundingClientRect();
  const viewport = getViewportDimensions();

  let { width, height } = rect;

  if (width * height === 0) {
    return 0;
  }

  if (rect.left < 0) {
    width = width + rect.left;
  }

  if (rect.right > viewport.width) {
    width = width - (rect.right - viewport.width);
  }

  if (rect.top < 0) {
    height = height + rect.top;
  }

  if (rect.bottom > viewport.height) {
    height = height - (rect.bottom - viewport.height);
  }

  return (width * height) / (rect.width * rect.height);
}

const cards = document.querySelectorAll('.card');

if (cards !== null) {
  Array.from(cards).forEach(card => {
    let target = card as HTMLElement;

    once(target, 'click', () => {
      alert('hello');
    });
  });
}

const testElement = document.getElementById('test');
window.addEventListener('scroll', event => {
  if (elementIsInView(testElement) === true) {
    console.log(percentageOfElementInView(testElement));
  }
});

window.addEventListener('resize', event => {
  if (elementIsInView(testElement) === true) {
    console.log(percentageOfElementInView(testElement));
  }
});
