## ConditionFilter 筛选器
筛选器用于帮助用户快速查询所需数据，属于复合型组件。

筛选器一般包含快捷筛选和条件筛选，快捷筛选与快捷筛选互斥，即点击快捷筛选内的选项时，只使用被点击的选项进行查询。此时忽略条件筛选中设置的条件。同理，在点击条件筛选内的查询按钮时，使用当前条件筛选中设置的值进行查询，如果此时快捷筛选存在选中值，则自动被清除。

用户可以在筛选器中编辑设置筛选条件，支持单个条件或多个条件同时筛选。

### 基本使用

::: demo
```html
<div>
  <el-condition-filter :data="data"
                        v-model="value"
                        class="filter"
                        @quick-search="onQuickSearch"
                        @senior-search="onSeniorSearch"
                        @clear="onClear">
    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item prop="projectName" label="采购项目名称">
          <el-input v-model="value.seniorCondition.projectName"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item prop="location" label="省市">
          <el-cascader
            :options="cascaderOptionArray"
            v-model="value.seniorCondition.location">
          </el-cascader>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item prop="procurementApplyType" label="采购申请类型">
          <el-select v-model="value.seniorCondition.procurementApplyType">
            <el-option v-for="item in selectOptionArray" :label="item.label" :value="item.value" :key="`array${item.value}`"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="8">
        <el-form-item prop="publishFlag" label="是否下发">
          <el-radio-group v-model="value.seniorCondition.publishFlag">
            <el-radio label="0">是</el-radio>
            <el-radio label="1">否</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item prop="publishDate" label="下发日期">
          <el-date-picker type="date" v-model="value.seniorCondition.publishDate">
          </el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item prop="procurementType" label="采购类型">
          <el-select
            v-model="value.seniorCondition.procurementType"
            @change="onProcurementTypeChange"
            multiple>
            <el-option
              v-for="procurementTypeItem in procurementTypeArray.data"
              :key="`procurement-type-${procurementTypeItem.value}`"
              :label="procurementTypeItem.label"
              :value="procurementTypeItem.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="8">
        <el-form-item prop="dateRange" label="期间">
          <el-date-picker
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            v-model="value.seniorCondition.dateRange"
            :clearable="false">
          </el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item prop="amount" label="金额">
          <el-input-number v-model="value.seniorCondition.amount"></el-input-number>
        </el-form-item>
      </el-col>
    </el-row>
  </el-condition-filter>
</div>
<script>
  export default {
    data() {
      return {
        data: {
          quickCondition: [
            {
              label: '我创建的',
              value: 1,
              tooltip: '由我创建Tooltip'
            },
            {
              label: '我审批的',
              value: 2
            },
            {
              label: '我负责的',
              value: 3
            }
          ],
          seniorCondition: {
            multipleCondition: {
              approvalStatus: {
                label: '审批状态',
                data: [
                  {
                    label: '草稿',
                    value: '1',
                    tooltip: '草稿tooltip'
                  },
                  {
                    label: '审批中',
                    value: '2',
                    tooltip: {
                      content: '审批中tooltip',
                      placement: 'top-start'
                    }
                  },
                  {
                    label: '审批通过',
                    value: '3'
                  },
                  {
                    label: '审批驳回',
                    value: '4'
                  }
                ]
              },
            }
          }
        },
        value: {
          quickCondition: '2',
          seniorCondition: {
            procurementType: [],
            publishDate: '',
            publishFlag: '',
            procurementApplyType: null,
            projectName: '',
            location: [],
            dateRange: null,
            amount: undefined,
          }
        },
        cascaderOptionArray: [
          {
            value: '01',
            label: '辽宁省',
            children: [
              {
                value: '01',
                label: '沈阳市'
              },
              {
                value: '02',
                label: '大连市'
              }
            ]
          },
          {
            value: '02',
            label: '吉林省',
            children: [
              {
                value: '01',
                label: '长春市'
              },
              {
                value: '02',
                label: '白山市'
              }
            ]
          }
        ],
        selectOptionArray: [
          {
            label: '成本类',
            value: 1
          },
          {
            label: '资本类',
            value: 2
          }
        ],
        procurementTypeArray: {
          label: '采购类型',
          data: [
            {
              label: '一级集采',
              value: '1'
            },
            {
              label: '二级集采',
              value: '2'
            },
            {
              label: '非集采',
              value: '3'
            }
          ]
        },
      };
    },
    mounted() {
      this.value.seniorCondition.publishDate = '2018-10-10';
      this.value.seniorCondition.dateRange = ['2017-09-10', '2018-10-09'];
    },
    methods: {
      onQuickSearch(val) {
        console.log('onQuickSearch', val);
      },
      onSeniorSearch(val) {
        console.log('onSeniorSearch', val);
      },
      updateProcurementTypeName(val) {
        const selectItemLabelArray = [];
        val.forEach(selectedItemValue => {
          const itemIndex = this.procurementTypeArray.data.findIndex(item => item.value === selectedItemValue);
          if (itemIndex !== -1) {
            selectItemLabelArray.push(this.procurementTypeArray.data[itemIndex].label);
          }
        });
        this.value.seniorCondition.procurementTypeName = selectItemLabelArray.length > 0 ? selectItemLabelArray.join(',') : null;
      },
      onProcurementTypeChange(val) {
        this.updateProcurementTypeName(val);
      },
      onClear(keys) {
        if (keys.findIndex(key => key === 'procurementType') !== -1) {
          this.updateProcurementTypeName(this.value.seniorCondition.procurementType);
        }
      },
    }
  }
</script>
```
:::

### 条件筛选的切换

可根据业务场景动态显示不同的多选项目

::: demo
```html
<div>
  <div style="margin-bottom: 10px;font-weight: 700;">点击切换显示的条件筛选条件：</div>
  <el-checkbox-group v-model="checkList" style="margin-bottom: 10px;">
    <el-checkbox label="procurementApplyStatus">采购申请状态</el-checkbox>
    <el-checkbox label="procurementType">采购类型</el-checkbox>
    <el-checkbox label="approvalStatus">审批状态</el-checkbox>
  </el-checkbox-group>
  <el-condition-filter
    :data="data"
    v-model="value"
    :expand.sync="expand"
    @quick-search="onQuickSearch"
    @senior-search="onSeniorSearch">
    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item prop="projectName" label="采购项目名称">
          <el-input v-model="value.seniorCondition.projectName"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item prop="applyNo" label="采购申请单号">
          <el-input v-model="value.seniorCondition.applyNo"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item prop="procurementApplyType" label="采购申请类型">
          <el-select
            v-model="value.seniorCondition.procurementApplyType">
            <el-option v-for="item in selectOptionArray" :label="item.label" :value="item.value" :key="`array-${item.value}`"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
  </el-condition-filter>
</div>
<script>
  export default {
    data() {
      return {
        data: {
          quickCondition: [
            {
              label: '由我创建',
              value: 1
            },
            {
              label: '由我审批',
              value: 2
            },
            {
              label: '由我处理',
              value: 3
            },
            {
              label: '由我保存',
              value: 4
            }
          ],
          seniorCondition: {
            multipleCondition: {
            }
          }
        },
        value: {
          quickCondition: '2',
          seniorCondition: {
            procurementApplyStatus: [],
            procurementType: [],
            approvalStatus: [],
            procurementApplyType: null,
            applyNo: '',
            projectName: ''
          }
        },
        selectOptionArray: [
          {
            label: '成本类',
            value: 1
          },
          {
            label: '资本类',
            value: 2
          }
        ],
        approvalStatus: {
          label: '审批状态',
          data: [
            {
              label: '草稿',
              value: '1'
            },
            {
              label: '审批中',
              value: '2'
            },
            {
              label: '审批通过',
              value: '3'
            },
            {
              label: '审批驳回',
              value: '4'
            }
          ]
        },
        procurementApplyStatus: {
          label: '采购申请状态',
          data: [
            {
              label: '已接收',
              value: '1'
            },
            {
              label: '未处理',
              value: '2'
            },
            {
              label: '项目已创建',
              value: '3'
            }
          ]
        },
        procurementType: {
          label: '采购类型',
          data: [
            {
              label: '一级集采',
              value: '1'
            },
            {
              label: '二级集采',
              value: '2'
            },
            {
              label: '非集采',
              value: '3'
            }
          ]
        },
        expand: false
      };
    },
    computed: {
      checkList: {
        get() {
          return Object.keys(this.data.seniorCondition.multipleCondition);
        },
        set(val) {
          this.data.seniorCondition.multipleCondition = {};
          val.forEach(key => {
            this.data.seniorCondition.multipleCondition[key] = this[key]
          })
        }
      }
    },
    methods: {
      onQuickSearch(val) {
        console.log('onQuickSearch', val);
      },
      onSeniorSearch(val) {
        console.log('onSeniorSearch', val);
      }
    }
  }
</script>
```
:::

### 只显示条件筛选

当 `data` 属性中不设置 `quickCondition` 的场合，快捷筛选Label将不显示。

::: demo
```html
<div>
  <el-condition-filter
    v-model="value"
    @senior-search="onSeniorSearch">
    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item prop="projectName" label="采购项目名称">
          <el-input v-model="value.seniorCondition.projectName"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item prop="applyNo" label="采购申请单号">
          <el-input v-model="value.seniorCondition.applyNo"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item prop="procurementApplyType" label="采购申请类型">
          <el-select v-model="value.seniorCondition.procurementApplyType">
            <el-option v-for="item in selectOptionArray" :label="item.label" :value="item.value" :key="`array${item.value}`"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="8">
        <el-form-item prop="publishFlag" label="是否下发">
          <el-radio-group v-model="value.seniorCondition.publishFlag">
            <el-radio label="0">是</el-radio>
            <el-radio label="1">否</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item prop="publishDate" label="下发日期">
          <el-date-picker type="date" v-model="value.seniorCondition.publishDate">
          </el-date-picker>
        </el-form-item>
      </el-col>
    </el-row>
  </el-condition-filter>
</div>
<script>
  export default {
    data() {
      return {
        selectOptionArray: [
          {
            label: '成本类',
            value: 1
          },
          {
            label: '资本类',
            value: 2
          }
        ],
        value: {
          seniorCondition: {
            procurementApplyType: null,
            applyNo: '',
            projectName: '',
            publishFlag: '',
            publishDate: ''
          }
        },
      };
    },
    methods: {
      onSeniorSearch(val) {
        console.log('onSeniorSearch', val);
      }
    }
  }
</script>
```
:::

### 动态表单设置

::: demo
```html
<div>
  <el-condition-filter :data="data"
                        v-model="value"
                        class="filter"
                        :schema="schema"
                        :ui-schema="uiSchema"
                        @quick-search="onQuickSearch"
                        @senior-search="onSeniorSearch"
                        @clear="onClear">
  </el-condition-filter>
</div>
<script>
  export default {
    data() {
      return {
        data: {
          quickCondition: [
            {
              label: '由我创建',
              value: 1,
              tooltip: '由我创建Tooltip'
            },
            {
              label: '由我审批',
              value: 2
            },
            {
              label: '由我处理',
              value: 3
            },
            {
              label: '由我保存',
              value: 4
            }
          ],
          seniorCondition: {
            multipleCondition: {
              approvalStatus: {
                label: '审批状态',
                data: [
                  {
                    label: '草稿',
                    value: '1',
                    tooltip: '草稿tooltip'
                  },
                  {
                    label: '审批中',
                    value: '2',
                    tooltip: {
                      content: '审批中tooltip',
                      placement: 'top-start'
                    }
                  },
                  {
                    label: '审批通过',
                    value: '3'
                  },
                  {
                    label: '审批驳回',
                    value: '4'
                  }
                ]
              },
            }
          },
        },
        value: {
          quickCondition: null,
          seniorCondition: {
            procurementType: [],
            publishDate: '',
            publishFlag: '',
            procurementApplyType: '2',
            projectName: '',
            location: [],
            dateRange: null,
            amount: undefined,
            createBy: ''
          }
        },
        schema: {
          "properties": {
            "createBy": {
              "type": "string",
              "title": "创建人"
            },
            "publishDate": {
              "type": "array",
              "title": "下发日期",
              "format": "date"
            },
            "procurementApplyType": {
              "type": "string",
              "title": "采购申请类型",
              "oneOf": [
                {"const": "1", "title": "成本类"},
                {"const": "2", "title": "资本类"}
              ]
            },
            "procurementType": {
              "type": "array",
              "title": "采购类型",
              "anyOf": [
                {"const": "1", "title": "一级集采"},
                {"const": "2", "title": "二级集采"},
                {"const": "3", "title": "非集采"}
              ]
            }
          }
        },
        uiSchema: {
          "createBy": {
            "ui:options": {
              "suffix-icon": "search",
              "readonly": true
            },
            "ui:on": {
              "click": () => {
                alert("创建人 click");
              }
            }
          },
          "procurementType": {
            "ui:colspan": 2
          }
        }
      };
    },
    mounted() {
      this.value.seniorCondition.publishDate = ['2017-09-10', '2018-10-09'];
    },
    methods: {
      onQuickSearch(val) {
        console.log('onQuickSearch', val);
      },
      onSeniorSearch(val) {
        console.log('onSeniorSearch', val);
      },
      updateProcurementTypeName(val) {
        const selectItemLabelArray = [];
        val.forEach(selectedItemValue => {
          const itemIndex = this.procurementTypeArray.data.findIndex(item => item.value === selectedItemValue);
          if (itemIndex !== -1) {
            selectItemLabelArray.push(this.procurementTypeArray.data[itemIndex].label);
          }
        });
        this.value.seniorCondition.procurementTypeName = selectItemLabelArray.length > 0 ? selectItemLabelArray.join(',') : null;
      },
      onProcurementTypeChange(val) {
        this.updateProcurementTypeName(val);
      },
      onClear(keys) {
        if (keys.findIndex(key => key === 'procurementType') !== -1) {
          this.updateProcurementTypeName(this.value.seniorCondition.procurementType);
        }
      },
    }
  }
</script>
```
:::

### 条件筛选 表单验证规则

可根据业务场景动态显示不同的多选项目

::: demo
```html
<div>
  <el-condition-filter
    v-model="value"
    :rules="rules"
    @senior-search="onSeniorSearch">
    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item prop="projectName" label="采购项目名称" >
          <el-input v-model="value.seniorCondition.projectName"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item prop="applyNo" label="采购申请单号">
          <el-input v-model="value.seniorCondition.applyNo"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
  </el-condition-filter>
</div>
<script>
  export default {
    data() {
      return {
        rules: {
          projectName: [
             { required: true, message: '请输入采购项目名称', trigger: 'blur' },
          ]
        },
        selectOptionArray: [
          {
            label: '成本类',
            value: 1
          },
          {
            label: '资本类',
            value: 2
          }
        ],
        value: {
          seniorCondition: {
            applyNo: '',
            projectName: '',
          }
        },
      };
    },
    methods: {
      onSeniorSearch(val) {
        console.log('onSeniorSearch', val);
      }
    }
  }
</script>
```
:::

### ConditionFilter Attributes

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| value / v-model | 绑定值 | Object | 结构参考下表 | — |
| data | 快捷筛选选项和条件筛选多选项的定义 | Object | 结构参考下表 | — |
| expand | 条件筛选是否展开，支持.sync修饰符 | Boolean | — | false |
| show-senior-condition-result | 是否始终显示条件筛选结果 | Boolean | — | false |
| show-control-button | 是否显示清空和查询按钮 | Boolean | — | true |
| rules    | 表单验证规则 | object | — | — |

### ConditionFilter Value Structure

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| quickCondition | 快捷筛选值 | * | — | — |
| seniorCondition | 条件筛选值 | Object | — | — |

### ConditionFilter Data Structure

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| quickCondition | 快捷筛选项目定义 | Array | [{ label:'显示值', value: '存储值' }] | — |
| seniorCondition.multipleCondition | 条件筛选多选项目定义 | Object | { '多选项目Key': { label: '多选项目Label(名称)', data: [{ label: '显示值', value: '存储值', tooltip: '文字提示' }] } } | — |

### ConditionFilter Events

| 事件名称      | 说明    | 回调参数      |
|---------- |-------- |---------- |
| quick-search  | 快捷筛选查询事件 | 当前快捷筛选值 |
| senior-search  | 条件筛选查询事件 | 当前条件筛选值 |
| change  | 筛选条件变化时被触发 | 当前条件筛选值 |
| clear  | 条件筛选项目值被清空（点击条件筛选Label右侧筛选项目的 `X` 图标或点击清空按钮） | 被清空的筛选项目key数组 |

### ConditionFilter Methods

| 方法名      | 说明          | 参数
|---------- |-------------- | --------------
|  search | 执行查询 | — |
