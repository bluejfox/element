import { createVue, destroyVM } from '../util';

const testDataArr = [];
const toArray = function(obj) {
  return [].slice.call(obj);
};

const getTestSimpleData = function() {
  return [
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.'
  ];
};

getTestSimpleData().forEach(cur => {
  testDataArr.push(cur);
});

describe('List', () => {
  describe('rendering data is correct', () => {
    const vm = createVue({
      template: `
        <div>
          <el-list border>
            <div slot="header">
              Header
            </div>
            <el-list-item v-for="item in testData" :key="item">
              {{ item }}
            </el-list-item>
            <div slot="footer">
              Footer
            </div>
          </el-list>
        </div>
      `,

      created() {
        this.testData = testDataArr;
      }
    }, true);

    it('header', () => {
      expect(vm.$el.querySelector('.el-list__header div').textContent.trim()).to.equal('Header');
    });

    it('row data', () => {
      const itemArray = toArray(vm.$el.querySelectorAll('.el-list-item-content'));
      const dataArray = itemArray.map(node => node.textContent.trim());
      expect(dataArray).to.eql(testDataArr);
    });

    it('footer', () => {
      expect(vm.$el.querySelector('.el-list__footer div').textContent.trim()).to.equal('Footer');
      destroyVM(vm);
    });
  });

  describe('attribute', () => {
    let vm;

    const createList = function(props, opts) {
      return createVue(Object.assign({
        template: `
          <el-list ${props}>
            <el-list-item v-for="item in testData" :key="item">
              {{ item }}
            </el-list-item>
          </el-list>
        `,

        created() {
          this.testData = getTestSimpleData();
        }
      }, opts));
    };

    it('border', () => {
      vm = createList('border');
      expect(vm.$el.classList.contains('is-bordered')).to.true;
      destroyVM(vm);
    });

    describe('size', () => {
      it('small', () => {
        vm = createList('size="small"');
        expect(vm.$el.classList.contains('el-list--small')).to.true;
        destroyVM(vm);
      });

      it('medium', () => {
        vm = createList('size="medium"');
        expect(vm.$el.classList.contains('el-list--medium')).to.true;
        destroyVM(vm);
      });
    });
  });

});
