import {
  camelToSnakeCase,
  copyValuesToObject,
  objectContainsValue,
  snakeToCamelCase,
} from './api-model-converter.util';

describe('camelToSnakeCase', () => {
  test('debería convertir un objeto simple en camelCase a snake_case.', () => {
    const userTest = {
      name: 'Ricardo',
      lastName: 'Arbildo',
      userName: 'ricardo.arbildo',
    };

    const userExpected = {
      name: 'Ricardo',
      last_name: 'Arbildo',
      user_name: 'ricardo.arbildo',
    };

    const result = camelToSnakeCase(userTest);
    expect(result).toEqual(userExpected);
  });

  test('debería convertir un objeto complejo en camelCase a snake_case.', () => {
    const today = new Date();

    const userTest = {
      name: 'Ricardo',
      lastName: 'Arbildo',
      userName: 'ricardo.arbildo',
      currentDate: today,
      preferredLanguage: ['C#', 'Typescript', 'Python', 'Javascript'],
      personalContact: {
        email: 'ricardo.alonne@gmail.com',
        github: 'ricardoalonne',
      },
    };

    const userExpected = {
      name: 'Ricardo',
      last_name: 'Arbildo',
      user_name: 'ricardo.arbildo',
      current_date: today,
      preferred_language: ['C#', 'Typescript', 'Python', 'Javascript'],
      personal_contact: {
        email: 'ricardo.alonne@gmail.com',
        github: 'ricardoalonne',
      },
    };

    const result = camelToSnakeCase(userTest);
    expect(result).toEqual(userExpected);
  });

  test('debería convertir los objetos que tenga un array en camelCase a snake_case.', () => {
    const frameworksTest = [
      {
        idFramework: 1,
        nameFramework: 'Next',
      },
      {
        idFramework: 2,
        nameFramework: 'Angular',
      },
      {
        idFramework: 3,
        nameFramework: 'Nest',
      },
      {
        idFramework: 4,
        nameFramework: 'Vue',
      },
    ];

    const frameworksExpected = [
      {
        id_framework: 1,
        name_framework: 'Next',
      },
      {
        id_framework: 2,
        name_framework: 'Angular',
      },
      {
        id_framework: 3,
        name_framework: 'Nest',
      },
      {
        id_framework: 4,
        name_framework: 'Vue',
      },
    ];

    const result = camelToSnakeCase(frameworksTest);
    expect(result).toEqual(frameworksExpected);
  });
});

describe('snakeToCamelCase', () => {
  test('debería convertir un objeto simple en camelCase a snake_case.', () => {
    const userTest = {
      name: 'Ricardo',
      last_name: 'Arbildo',
      user_name: 'ricardo.arbildo',
    };

    const userExpected = {
      name: 'Ricardo',
      lastName: 'Arbildo',
      userName: 'ricardo.arbildo',
    };

    const result = snakeToCamelCase(userTest);
    expect(result).toEqual(userExpected);
  });

  test('debería convertir un objeto complejo en camelCase a snake_case.', () => {
    const today = new Date();

    const userTest = {
      name: 'Ricardo',
      last_name: 'Arbildo',
      user_name: 'ricardo.arbildo',
      current_date: today,
      preferred_language: ['C#', 'Typescript', 'Python', 'Javascript'],
      personal_contact: {
        email: 'ricardo.alonne@gmail.com',
        github: 'ricardoalonne',
      },
    };

    const userExpected = {
      name: 'Ricardo',
      lastName: 'Arbildo',
      userName: 'ricardo.arbildo',
      currentDate: today,
      preferredLanguage: ['C#', 'Typescript', 'Python', 'Javascript'],
      personalContact: {
        email: 'ricardo.alonne@gmail.com',
        github: 'ricardoalonne',
      },
    };

    const result = snakeToCamelCase(userTest);
    expect(result).toEqual(userExpected);
  });

  test('debería convertir los objetos que tenga un array en camelCase a snake_case.', () => {
    const frameworksTest = [
      {
        id_framework: 1,
        name_framework: 'Next',
      },
      {
        id_framework: 2,
        name_framework: 'Angular',
      },
      {
        id_framework: 3,
        name_framework: 'Nest',
      },
      {
        id_framework: 4,
        name_framework: 'Vue',
      },
    ];

    const frameworksExpected = [
      {
        idFramework: 1,
        nameFramework: 'Next',
      },
      {
        idFramework: 2,
        nameFramework: 'Angular',
      },
      {
        idFramework: 3,
        nameFramework: 'Nest',
      },
      {
        idFramework: 4,
        nameFramework: 'Vue',
      },
    ];

    const result = snakeToCamelCase(frameworksTest);
    expect(result).toEqual(frameworksExpected);
  });
});

describe('copyValuesToObject', () => {
  test('debería hacer una copia de los datos del primer objecto al segundo.', () => {
    const source = {
      name: 'Omar',
      lastName: 'Arbildo Jurupe',
      occupation: 'FrontEnd',
    };

    const target = {
      name: 'Ricardo',
      lastName: 'Arbildo',
      occupation: 'BackEnd',
    };

    const result = copyValuesToObject(source, target);

    expect(result).toEqual({
      name: 'Omar',
      lastName: 'Arbildo Jurupe',
      occupation: 'FrontEnd',
    });
  });
});

describe('objectContainsValue', () => {
  const today = new Date('1999-10-27');
  const user = {
    name: 'Ricardo',
    lastName: 'Arbildo',
    age: 24,
    active: false,
    currentDate: today,
  };

  test('debería retornar true ya que coincide con un string', () => {
    const result = objectContainsValue(user, 'Ricardo');
    expect(result).toBeTruthy();
  });

  test('debería retornar true ya que coincide con un number', () => {
    const result = objectContainsValue(user, '24');
    expect(result).toBeTruthy();
  });

  test('debería retornar true ya que coincide con un boolean', () => {
    const result = objectContainsValue(user, 'false');
    expect(result).toBeTruthy();
  });

  test('debería retornar true ya que coincide con un date', () => {
    const result = objectContainsValue(user, today.toString());
    expect(result).toBeTruthy();
  });

  test('debería retornar false ya que no coincide con ningún string', () => {
    const result = objectContainsValue(user, 'Omar');
    expect(result).toBeFalsy();
  });

  test('debería retornar false ya que no coincide con ningún number', () => {
    const result = objectContainsValue(user, '23');
    expect(result).toBeFalsy();
  });

  test('debería retornar false ya que no coincide con ningún boolean', () => {
    const result = objectContainsValue(user, 'true');
    expect(result).toBeFalsy();
  });

  test('debería retornar false ya que no coincide con ningún date', () => {
    const result = objectContainsValue(user, Date.now().toString());
    expect(result).toBeFalsy();
  });
});
