## Statistics 统计数值

展示统计数值。

显示小数，指定`precision`属性时，默认进行四舍五入。
同时也可使用 `setaria-ui/src/utils/util` 中的 `toPriceString` 函数进行格式化。

### 基础用法

:::demo
```html
<div>
  <ul>
    整数：
    <div>
      输入值：{{ 123456789 }}<br/>
      显示值：<el-statistics value="123456789"></el-statistics>
    </div>
  </ul>
  <ul>
    小数(显示两位小数并四舍五入)：
    <div>
      <span>
        输入值：{{ 1234.025 }}<br/>
        显示值：
        <el-statistics :value="1234.725" :precision="2">
          <span slot="prefix">
            ¥
          </span>
        </el-statistics>
      </span>
    </div>
  </ul>
  <ul>
    小数(显示两位小数不进行四舍五入)：
    <div>
      <span>
        输入值：{{ -20.719 }}<br/>
        显示值：
        <el-statistics :value="-20.719" :precision="2" :round="false"></el-statistics>
      </span>
    </div>
  </ul>
  <ul>
    小数(输入整数)：
    <div>
      <span>
        输入值：{{ 1212 }}<br/>
        显示值：
        <el-statistics :value="1212" :precision="2">
        </el-statistics>
      </span>
    </div>
  </ul>
  <ul>
    null 处理：
    <div>
      <span>
        输入值：{{ null }}<br/>
        显示值：
        <el-statistics :value="null" :precision="2">
        </el-statistics>
      </span>
    </div>
  </ul>
  <ul>
    undefined 处理：
    <div>
      <span>
        输入值：{{ undefined }}<br/>
        显示值：
        <el-statistics :value="undefined" :precision="2">
        </el-statistics>
      </span>
    </div>
  </ul>
  <ul>
    自定义数值：
    <div>
      <span>
        输入值：{{ 1234.025 }}<br/>
        显示值：
        <el-statistics :value="1234.025" :formatter="customFormatter"></el-statistics>
      </span>
    </div>
  </ul>
</div>
<script>
  export default {
    data() {
      return {
      };
    },
    methods: {
      customFormatter(val) {
        return `人民币:${val}`;
      }
    }
  }
</script>
```
:::

### Statistics Attributes

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| value | 数值内容 | number / string | — | — |
| formatter | 自定义数值展示 | function | — | — |
| precision | 数值精度  | number | — | 0 |
| decimal-separator | 设置小数点 | string | — | . |
| group-separator | 设置千分位标识符 | string | — | , |
| round | 是否四舍五入 | boolean | - | true |

### Statistics Slot

| name | 说明  |
|----|----|
| prefix | 设置数值的前缀 |
| suffix | 设置数值的后缀 |
