// convert { a: "1", b: "boo", c: [1, 2, 3, [1, 2, [1, 2], 3]] } to string.

const createSpecialStringFromObject = (object, delimiter = '&') => {
  let keys = Object.keys(object);
  
  if (keys.length > 0) {
    let string = '';

    const appendPrimitiveValue = (string, value, suffix = '') => {
      if (typeof value === 'string') {
        string += value + suffix;
      } else if (typeof value === 'number') {
        string += value.toString() + suffix;
      }
      return string;
    }

    const appendComplexValue = (string, value, suffix = '') => {
      if (Array.isArray(value) === true) {
        string += '[';

        value.forEach(_value => {
          string = appendPrimitiveValue(string, _value, ', ');
          string = appendComplexValue(string, _value, ', ');
        });

        string = string.replace(/[\,\s]+$/g, '');

        string += ']' + suffix;
      }

      return string;
    }

    keys.forEach(key => {
      string += `${key}=`

      string = appendPrimitiveValue(string, object[key]);
      string = appendComplexValue(string, object[key]);

      string += delimiter;
    });

    const endRegex = new RegExp(`${delimiter}$`, 'g');
    string = string.replace(endRegex, '');

    return string;
  }

  return '';
}

getQueryString();

const result = createSpecialStringFromObject({ name: "Andrew", numbers: [1, 2, 3, [4, 5, 6, [4, 5], 4], 4]});
alert(result);