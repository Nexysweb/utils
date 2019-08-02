import Joi from 'joi';
import { isCrud, isSchema } from './test-query-joi';

test('simple query test', () => {
  const j = {
    PlanParticipant: {
      params: {},
      projection: {},
      filters: { plan: { id: 45 } }
    },
    Partner: {
      projection: {}
    }
  };

  expect(isCrud(j)).toEqual(true);
});

test('simple query test - fail (`filters` is misspelt)', () => {
  const j = {
    PlanParticipant: {
      params: {},
      projection: {},
      filter: { plan: { id: 45 } }
    },
    Partner: {
      projections: {}
    }
  };

  expect(isCrud(j)).toEqual(false);
});

const ddl = [
  {
    name: 'Test',
    params: [
      {arg: 'name', type: 'String', optional: false},
      {arg: 'age', type: 'Int', optional: false},
    ]
  }
];

test('is schema', () => {
  const j = {
    Test: {
      params: {},
      projection: {},
      filter: { }
    }
  };

  expect(isSchema(j, ddl)).toEqual(true);
})

test('is not schema - entity misspelt', () => {
  const j = {
    Tesst: {
      params: {},
      projection: {},
      filter: { }
    }
  };

  expect(isSchema(j, ddl)).toEqual(false);
})
