<style>
  .demo-list.demo-zh-CN {
    .simple-list-title__first {
      margin-top: 0;
    }
    
    .basic-list-avatar-image {
      width: 32px;
      height: 32px;
      display: block;
    }
    
    .extra-img {
      width: 272px;
    }
    
    .vertical-action {
      color: rgba(0,0,0,.45)
    }
  }
</style>
<script>
  module.exports = {
    data() {
      return {
        simpleList: [
          'Racing car sprays burning fuel into crowd.',
          'Japanese princess to wed commoner.',
          'Australian walks 100km after outback crash.',
          'Man charged over missing wedding girl.',
          'Los Angeles battles huge wildfires.'
        ],
        basicList: [
          {
            avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Justin_Bieber_in_2015.jpg/838px-Justin_Bieber_in_2015.jpg',
            title: 'Justin Drew Bieber',
            description: '是一名加拿大歌手与词作人。2008年，他在YouTube上翻唱歌曲的影片被星探发掘后与RBMG唱片签约，发行了自己的首张迷你专辑《我的世界》。2009年年末，专辑在美国已获得白金认证。[4]2010年，比伯发行了他的首张录音室专辑《我的世界2.0》，专辑在许多国家取得了冠军或接近冠军的成绩，在美国已获得多白金认证。[4]这张专辑收录了单曲《宝贝》。'
          },
          {
            avatar: 'https://upload.wikimedia.org/wikipedia/commons/f/f4/Joey_Santiago.jpg',
            title: 'Joseph Alberto "Joey" Santiago',
            description: '是一位菲律宾裔美国吉他手兼作曲家，于1986年出道，以身为美国另类摇滚乐队小妖精的主音吉他手闻名。1993年乐队解散后，他为多部电影或电视纪录片谱写配乐，并和夫人林达·马拉里（Linda Mallari）共同组建The Martinis乐队。他还参与过查尔斯·道格拉斯（Charles Douglas）和小妖精乐队队友弗兰克·布莱克（Frank Black）的唱片制作。2004年小妖精乐队重聚，圣地牙哥回归继续担任主音吉他手。'
          },
          {
            avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Alice_Cooper_by_Gage_Skidmore.jpg/1280px-Alice_Cooper_by_Gage_Skidmore.jpg',
            title: 'Alice Cooper',
            description: '出生名为文森特·达蒙·傅奈尔（ Vincent Damon Furnier），是一位美国摇滚歌手、作曲家和音乐家。他的职业生涯将近五十年。他的舞台形式包括断头台、电动椅、假血、蟒蛇、娃娃玩具、拐杖和剑决斗，被球迷和同行一致认为是“休克摇滚教父”; 库珀已被刻画为从恐怖电影、杂技以及车库摇滚开拓出一个被设计成为惊悚的舞台和恐怖品牌。[2]2011年初，埃利斯·库珀乐队入选了摇滚名人堂。'
          }
        ],
        listLoadingFlag: false,
        loadingConfig: {
          text: '加载中'
        }
      };
    },
    watch: {
      listLoadingFlag(val) {
        if (val) {
          this.handleLoadMoreClick();
        }
      }
    },
    methods: {
      handleLoadMoreClick() {
        setTimeout(() => {
          this.basicList.push({
            avatar: 'https://upload.wikimedia.org/wikipedia/commons/3/31/Michael_Jackson_in_1988.jpg',
            title: 'Michael Joseph Jackson',
            description: '是一位美国的歌手、流行歌曲作家、唱片制作人、舞蹈家及演员，常被尊称为“流行音乐之王”（King of Pop）[3]。杰克逊对音乐、舞蹈和时尚的贡献，以及备受关注的个人生活，使他成为全球流行文化的代表人物超过四十年。'
          });
          this.listLoadingFlag = false;
        }, 3000);
      }
    }
  };
</script>
## List 列表
参考自Ant Design的[List 列表](https://ant.design/components/list-cn/)

最基础的列表展示，可承载文字、列表、图片、段落，常用于后台数据展示页面。

### 简单列表

:::demo 列表拥有大、中、小三种尺寸。通过设置 size 为 large/small 分别把按钮设为大、小尺寸。若不设置 size，则尺寸为中。可通过设置 header 和 footer，来自定义列表头部和尾部。

```html
<template>
  <h3 class="simple-list-title__first">Default</h3>
  <el-list border>
    <div slot="header">
      Header
    </div>
    <el-list-item v-for="item in simpleList">
      {{ item }}
    </el-list-item>
    <div slot="footer">
      Footer
    </div>
  </el-list>
  <h3>Small</h3>
  <el-list border size="small">
    <div slot="header">
      Header
    </div>
    <el-list-item v-for="item in simpleList">
      {{ item }}
    </el-list-item>
    <div slot="footer">
      Footer
    </div>
  </el-list>
  <h3>Large</h3>
  <el-list border size="large">
    <div slot="header">
      Header
    </div>
    <el-list-item v-for="item in simpleList">
      {{ item }}
    </el-list-item>
    <div slot="footer">
      Footer
    </div>
  </el-list>
</template>
<script>
  export default {
    data() {
      return {
        simpleList: [
          'Racing car sprays burning fuel into crowd.',
          'Japanese princess to wed commoner.',
          'Australian walks 100km after outback crash.',
          'Man charged over missing wedding girl.',
          'Los Angeles battles huge wildfires.'
        ],
      };
    }
  };
</script>
```
:::


### 基础列表

:::demo
```html
<template>
  <el-list>
    <el-list-item v-for="item in basicList">
      <el-list-item-meta :title="item.title" slot="meta">
        <span slot="avatar">
          <img :src="item.avatar" class="basic-list-avatar-image">
        </span>
        <span slot="description">
          {{ item.description }}
        </span>
      </el-list-item-meta>
    </el-list-item>
  </el-list>
</template>
<script>
  export default {
    data() {
      return {
        basicList: [
          {
            avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Justin_Bieber_in_2015.jpg/838px-Justin_Bieber_in_2015.jpg',
            title: 'Justin Drew Bieber',
            description: '是一名加拿大歌手与词作人。2008年，他在YouTube上翻唱歌曲的影片被星探发掘后与RBMG唱片签约，发行了自己的首张迷你专辑《我的世界》。2009年年末，专辑在美国已获得白金认证。[4]2010年，比伯发行了他的首张录音室专辑《我的世界2.0》，专辑在许多国家取得了冠军或接近冠军的成绩，在美国已获得多白金认证。[4]这张专辑收录了单曲《宝贝》。'
          },
          {
            avatar: 'https://upload.wikimedia.org/wikipedia/commons/f/f4/Joey_Santiago.jpg',
            title: 'Joseph Alberto "Joey" Santiago',
            description: '是一位菲律宾裔美国吉他手兼作曲家，于1986年出道，以身为美国另类摇滚乐队小妖精的主音吉他手闻名。1993年乐队解散后，他为多部电影或电视纪录片谱写配乐，并和夫人林达·马拉里（Linda Mallari）共同组建The Martinis乐队。他还参与过查尔斯·道格拉斯（Charles Douglas）和小妖精乐队队友弗兰克·布莱克（Frank Black）的唱片制作。2004年小妖精乐队重聚，圣地牙哥回归继续担任主音吉他手。'
          },
          {
            avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Alice_Cooper_by_Gage_Skidmore.jpg/1280px-Alice_Cooper_by_Gage_Skidmore.jpg',
            title: 'Alice Cooper',
            description: '出生名为文森特·达蒙·傅奈尔（ Vincent Damon Furnier），是一位美国摇滚歌手、作曲家和音乐家。他的职业生涯将近五十年。他的舞台形式包括断头台、电动椅、假血、蟒蛇、娃娃玩具、拐杖和剑决斗，被球迷和同行一致认为是“休克摇滚教父”; 库珀已被刻画为从恐怖电影、杂技以及车库摇滚开拓出一个被设计成为惊悚的舞台和恐怖品牌。[2]2011年初，埃利斯·库珀乐队入选了摇滚名人堂。'
          }
        ]
      };
    }
  };
</script>
```
:::

### 加载更多

:::demo
```html
<template>
  <el-list load-more="加载更多" :loading.sync="listLoadingFlag" :loading-config="loadingConfig">
    <el-list-item v-for="item in basicList">
      <el-list-item-meta :title="item.title" slot="meta">
        <span slot="avatar">
          <img :src="item.avatar" class="basic-list-avatar-image">
        </span>
        <span slot="description">
          {{ item.description }}
        </span>
      </el-list-item-meta>
      <div>
        content
      </div>
      <div slot="actions">
        <a href="#">修改</a> | <a href="#">删除</a>
      </div>
    </el-list-item>
  </el-list>
</template>
<script>
  export default {
    data() {
      return {
        basicList: [
          {
            avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Justin_Bieber_in_2015.jpg/838px-Justin_Bieber_in_2015.jpg',
            title: 'Justin Drew Bieber',
            description: '是一名加拿大歌手与词作人。2008年，他在YouTube上翻唱歌曲的影片被星探发掘后与RBMG唱片签约，发行了自己的首张迷你专辑《我的世界》。2009年年末，专辑在美国已获得白金认证。[4]2010年，比伯发行了他的首张录音室专辑《我的世界2.0》，专辑在许多国家取得了冠军或接近冠军的成绩，在美国已获得多白金认证。[4]这张专辑收录了单曲《宝贝》。'
          },
          {
            avatar: 'https://upload.wikimedia.org/wikipedia/commons/f/f4/Joey_Santiago.jpg',
            title: 'Joseph Alberto "Joey" Santiago',
            description: '是一位菲律宾裔美国吉他手兼作曲家，于1986年出道，以身为美国另类摇滚乐队小妖精的主音吉他手闻名。1993年乐队解散后，他为多部电影或电视纪录片谱写配乐，并和夫人林达·马拉里（Linda Mallari）共同组建The Martinis乐队。他还参与过查尔斯·道格拉斯（Charles Douglas）和小妖精乐队队友弗兰克·布莱克（Frank Black）的唱片制作。2004年小妖精乐队重聚，圣地牙哥回归继续担任主音吉他手。'
          },
          {
            avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Alice_Cooper_by_Gage_Skidmore.jpg/1280px-Alice_Cooper_by_Gage_Skidmore.jpg',
            title: 'Alice Cooper',
            description: '出生名为文森特·达蒙·傅奈尔（ Vincent Damon Furnier），是一位美国摇滚歌手、作曲家和音乐家。他的职业生涯将近五十年。他的舞台形式包括断头台、电动椅、假血、蟒蛇、娃娃玩具、拐杖和剑决斗，被球迷和同行一致认为是“休克摇滚教父”; 库珀已被刻画为从恐怖电影、杂技以及车库摇滚开拓出一个被设计成为惊悚的舞台和恐怖品牌。[2]2011年初，埃利斯·库珀乐队入选了摇滚名人堂。'
          }
        ],
        listLoadingFlag: false,
        loadingConfig: {
          text: '加载中'
        }
      };
    },
    methods: {
      handleLoadMoreClick() {
        setTimeout(() => {
          this.basicList.push({
            avatar: 'https://upload.wikimedia.org/wikipedia/commons/3/31/Michael_Jackson_in_1988.jpg',
            title: 'Michael Joseph Jackson',
            description: '是一位美国的歌手、流行歌曲作家、唱片制作人、舞蹈家及演员，常被尊称为“流行音乐之王”（King of Pop）[3]。杰克逊对音乐、舞蹈和时尚的贡献，以及备受关注的个人生活，使他成为全球流行文化的代表人物超过四十年。'
          });
          this.listLoadingFlag = false;
        }, 3000);
      }
    }
  };
</script>
```
:::

### 竖排列表样式

:::demo 通过设置 itemLayout 属性为 vertical 可实现竖排列表样式。
```html
<template>
  <el-list item-layout="vertical">
    <el-list-item v-for="item in basicList">
      <el-list-item-meta :title="item.title" slot="meta">
        <span slot="avatar">
          <img :src="item.avatar" class="basic-list-avatar-image">
        </span>
        <span slot="description">
          {{ item.description }}
        </span>
      </el-list-item-meta>
      <div>
        content
      </div>
      <div slot="actions">
        <a href="#" class="vertical-action"><i class="el-icon-star-off"></i> 256</a>
      </div>
      <div slot="extra">
        <img
        class="extra-img"
        src="https://lh3.googleusercontent.com/aR34MxRBretppyADbJcfqIZp-LraO1ELhk00lTZw0Q7MF1ebUKZeggeQkjBuZCCmYRSYNzr8=w640-h400-e365"/>
      </div>
    </el-list-item>
  </el-list>
</template>
<script>
  export default {
    data() {
      return {
        basicList: [
          {
            avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Justin_Bieber_in_2015.jpg/838px-Justin_Bieber_in_2015.jpg',
            title: 'Justin Drew Bieber',
            description: '是一名加拿大歌手与词作人。2008年，他在YouTube上翻唱歌曲的影片被星探发掘后与RBMG唱片签约，发行了自己的首张迷你专辑《我的世界》。2009年年末，专辑在美国已获得白金认证。[4]2010年，比伯发行了他的首张录音室专辑《我的世界2.0》，专辑在许多国家取得了冠军或接近冠军的成绩，在美国已获得多白金认证。[4]这张专辑收录了单曲《宝贝》。'
          },
          {
            avatar: 'https://upload.wikimedia.org/wikipedia/commons/f/f4/Joey_Santiago.jpg',
            title: 'Joseph Alberto "Joey" Santiago',
            description: '是一位菲律宾裔美国吉他手兼作曲家，于1986年出道，以身为美国另类摇滚乐队小妖精的主音吉他手闻名。1993年乐队解散后，他为多部电影或电视纪录片谱写配乐，并和夫人林达·马拉里（Linda Mallari）共同组建The Martinis乐队。他还参与过查尔斯·道格拉斯（Charles Douglas）和小妖精乐队队友弗兰克·布莱克（Frank Black）的唱片制作。2004年小妖精乐队重聚，圣地牙哥回归继续担任主音吉他手。'
          },
          {
            avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Alice_Cooper_by_Gage_Skidmore.jpg/1280px-Alice_Cooper_by_Gage_Skidmore.jpg',
            title: 'Alice Cooper',
            description: '出生名为文森特·达蒙·傅奈尔（ Vincent Damon Furnier），是一位美国摇滚歌手、作曲家和音乐家。他的职业生涯将近五十年。他的舞台形式包括断头台、电动椅、假血、蟒蛇、娃娃玩具、拐杖和剑决斗，被球迷和同行一致认为是“休克摇滚教父”; 库珀已被刻画为从恐怖电影、杂技以及车库摇滚开拓出一个被设计成为惊悚的舞台和恐怖品牌。[2]2011年初，埃利斯·库珀乐队入选了摇滚名人堂。'
          }
        ],
        listLoadingFlag: false,
        loadingConfig: {
          text: '加载中'
        }
      };
    },
    methods: {
      handleLoadMoreClick() {
        setTimeout(() => {
          this.basicList.push({
            avatar: 'https://upload.wikimedia.org/wikipedia/commons/3/31/Michael_Jackson_in_1988.jpg',
            title: 'Michael Joseph Jackson',
            description: '是一位美国的歌手、流行歌曲作家、唱片制作人、舞蹈家及演员，常被尊称为“流行音乐之王”（King of Pop）[3]。杰克逊对音乐、舞蹈和时尚的贡献，以及备受关注的个人生活，使他成为全球流行文化的代表人物超过四十年。'
          });
          this.listLoadingFlag = false;
        }, 3000);
      }
    }
  };
</script>
```
:::

### List Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| border  | 是否展示边框    | boolean   |  —  | false   |
| size  | list 的尺寸    | string   |  large / middle / small | middle   |
| split  | 是否展示分割线    | boolean   |  —  | true   |
| load-more  | 加载更多（同时设置了插槽的场合，优先显示插槽）    | string   |  —  |  —  |
| loading  | 当卡片内容还在加载中时，可以用 loading 展示一个占位,支持 .sync 修饰符  | boolean   |  —  |  false  |
| loading-config  | 加载组件的配置信息    | object   |  参考 Loading 加载 组件  |  —  |

### List Events
| 事件名称      | 说明    | 回调参数      |
|---------- |-------- |---------- |
|  load-more-click  | 点击默认加载更多按钮的回调 |  —  |

### List Slot
| name | 说明 |
|------|--------|
| — | 列表的内容 |
| header | 列表头部的内容 |
| load-more | 加载更多的自定义内容 |
| footer | 列表尾部的内容 |

### List-Item Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
|   |  |  |   |

### List-Item Slot
| name | 说明 |
|------|--------|
| — | 列表元素的内容 |
| meta | 列表元素元数据的内容 |

### List-Item-Meta Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| title  | 列表元素的标题（同时设置了标题插槽的场合，优先显示插槽）    | string   |  —  |  —  |
| description  | 列表元素的描述内容（同时设置了描述内容插槽的场合，优先显示插槽）   | string   |  —  |  —  |

### List-Item-Meta Slot
| name | 说明 |
|------|--------|
| avatar | 列表元素的图标 |
| title | 列表元素的标题 |
| description | 列表元素的描述内容 |