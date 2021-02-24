import { createTest, destroyVM } from '../util';
import QueryCriteriaForm from 'packages/query-criteria-form';

describe('QueryCriteriaForm', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  it('create', () => {
    vm = createTest(QueryCriteriaForm, true);
    expect(vm.$el).to.exist;
  });
});

