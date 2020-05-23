import * as S from './string';

test('padding', () => {
  const e = '00034';
  const m = 34;
  const width = 5;
  const z = '0';
  expect(S.padding(m, width, z)).toEqual(e); 
});


test('contains', () => {
  expect(S.contains('string', 'str')).toEqual(true); 
});

test('parse name', () => {
  expect(S.parseName('[0].lesson')).toEqual({i: "0", key: 'lesson'}); 
  expect(S.parseName('[1].owner')).toEqual({i: "1", key: 'owner'}); 
});

test('capitalize', () => {
  expect(S.capitalize('lesson')).toEqual('Lesson'); 
});

test('readableFileSize', () => {
  expect(S.readableFileSize(568749)).toEqual('555.42 KB');
});


test('removeWhitespace', () => {
  const value = 'first and second';
  const vw = 'firstandsecond';
  expect(S.removeWhitespace(value)).toEqual(vw);

  const a = 'sd sdf gf  r';
  const b = 'sdsdfgfr';

  expect(S.removeWhitespace(a)).toEqual(b);
});

test('parseEnvVar', () => {
  const value = 'fd="gfds"';
  const e = 'fd="gfds"';
  expect(S.parseEnvVar(value)).toEqual(e); 
});

test('format phone', () => {
  const phone = '+4179333211';
  const e = '+417 933 33 11';
  expect(S.formatPhone(phone)).toEqual(e)
});

test('is email', () => {
  const e1 = 'john.doe@gmail.com';
  expect(S.isEmail(e1)).toEqual(true);

  const e2 = 'clearlynotanemail';
  expect(S.isEmail(e2)).toEqual(false);

  const e3 = '';
  expect(S.isEmail(e3)).toEqual(false);

  const e4 = ' ';
  expect(S.isEmail(e4)).toEqual(false);

  const esValid = [
    'test@gmail.com',
    'test@gma.i.l.c.o.m',
    'test@gmailcom',
    'f1.f2@ch.co.com',
    'CaseSensitive@gmail.com'
  ];

  esValid.map(email => {
    expect(S.isEmail(email)).toEqual(true);
  });

  const esInvalid = [
    't es t@gmailcom',
    'b ob @tes tmai l.com',
    'b ob @tes tmai l.com',
  ];

  esInvalid.map(email => {
    expect(S.isEmail(email)).toEqual(false);
  });
});

test('isUUID', () => {
  expect(S.isUUID('this is clearly not a uuid')).toEqual(false);

  // generate UUIDs: https://www.uuidgenerator.net/
  expect(S.isUUID('6f06ad47-4621-4697-b1f9-44fcd65f9d00')).toEqual(true);
  expect(S.isUUID('92958501-b249-46e2-8caf-9075985a2e27')).toEqual(true);
  expect(S.isUUID('0362c242-c7c6-403c-a1ac-58f7e8522527')).toEqual(true);
});

test('strToSnakeCase', () => {
  expect(S.strToSnakeCase('a random: String  ')).toEqual('a_random_string')
})

test('camelToSnakeCase', () => {
  expect(S.camelToSnakeCase('isCamelCase')).toEqual('is_camel_case');
});


test('snakeToCamelCase', () => {
  expect(S.snakeToCamelCase('is_snake_case')).toEqual('isSnakeCase');
});

test('lowerFirst', () => {
  expect(S.lowerFirst('ASD')).toEqual('aSD');
  expect(S.lowerFirst('Asd')).toEqual('asd');
})

