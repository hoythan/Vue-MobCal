# vue-mobcal

![vue](https://img.shields.io/badge/MADE%20WITH-VUE-42a97a?style=for-the-badge&labelColor=35495d)
[![GitHub stars](https://img.shields.io/github/stars/hoythan/Vue-MobCal.svg?style=for-the-badge)](https://github.com/hoythan/Vue-MobCal)
[![npm](https://img.shields.io/npm/v/vue-mobcal?color=c7343a&label=npm&style=for-the-badge)](https://www.npmjs.com/package/vue-mobcal)
[![GitHub issues](https://img.shields.io/github/issues-raw/hoythan/Vue-MobCal.svg?style=for-the-badge)](https://github.com/hoythan/Vue-MobCal/issues)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg?style=for-the-badge)](https://github.com/hoythan/Vue-MobCal/blob/master/LICENSE)

[![NPM](https://nodei.co/npm/vue-mobcal.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/vue-mobcal)

### Example
- [CDN example](https://jsfiddle.net/hoythan/a4un3d25/5/)

![image.png](https://i.loli.net/2021/07/21/BXli3sGICa5rcEu.png)

---

### Vue3

> 此插件适用于 Vue2 版本，如果你正在使用 Vue3，请移步[这里](https://github.com/hoythan/Vue-MobCal3)

### 安装

``` bash
npm install vue-mobcal --save

# or
yarn add vue-mobcal
```

### 全局引用

``` javascript
import Vue from 'vue'
import VueMobCal from 'vue-mobcal'
import 'vue-mobcal/dist/vue-mobcal.css'

Vue.use(VueMobCal)
```


### 局部引用

```javascript
import { VueMobCal } from 'vue-mobcal'
import 'vue-mobcal/dist/vue-mobcal.css'

export default {
  components: {
    VueMobCal
  }
}
```

### 通过 CDN 访问

``` html
<link rel="stylesheet" href="https://unpkg.com/vue-mobcal/dist/vue-mobcal.css"/>
<script type="text/javascript" src="path/to/vue.min.js"></script>
<script type="text/javascript" src="https://unpkg.com/vue-mobcal/dist/vue-mobcal.umd.min.js"></script>

<div id="app">
    <vue-mob-cal v-model="currentDate" :mode.sync="mode">
    </vue-mob-cal>
</div>
<script type="text/javascript">
  new Vue({
      el: '#app',
      data: {
          mode: 'month',
          currentDate: new Date()
      }
  })
</script>
```

### 使用教程
#### 基础使用
```html
<vue-mob-cal v-model="currentDate" :mode.sync="mode" color="#007873" />
```
```js
export default {
  data() {
    return {
      currentDate: new Date(),
      mode: 'month'
    }
  }
}
```
#### 自定义插槽
```html
<vue-mob-cal v-model="currentDate" :mode.sync="mode">
  <template #left>
    <span>LeftBtn</span>
  </template>
  <template #right>
    <span>RightBtn</span>
  </template>
  <template #title>
    <span>Title</span>
  </template>
  <template #week="props">
    <span>周{{ props.day | week }}</span>
  </template>
  <template #day="props">
    <span v-if="props.util.isToday(props.date)">今</span>
    <span v-else>{{ props.date.getDate() }}</span>
    <!-- A dot will appear at the bottom -->
    <span v-if="props.date.getDay() === 1" class="mindot" style="background-color: red;"></span>
    <span v-if="props.date.getDay() === 6" class="mindot"></span>
    <!-- If you want to display the background, you have to configure this -->
    <span class="dot"></span> 
  </template>
</vue-mob-cal>
```
```js
export default {
  data() {
    return {
      currentDate: new Date(),
      mode: 'month'
    }
  },
  filters: {
    week (day) {
      const days = ['一', '二', '三', '四', '五', '六', '日']
      day = day || 7
      return days[day - 1]
    }
  }
}
```



### API

#### Props

| 参数名 | 描述 | 类型 | 默认值 |
| :----- | :---- | :----: | :---- |
| value | 当前日历日期 | <span class="t">Date</span> | <span class="v">new Date()</span> |
| mode | 显示模式，支持月视图或周视图，参数,<i>month</i><i>week</i> | <span class="t">String</span> | <span class="v">month</span> |
| color | 主题颜色 | <span class="t">String</span> | <span class="v"><span class="dot"></span>#007ad3</span> |

### 插槽

| 名称 | 描述 | SlotProps |
| :----- | :---- | :---- |
| title | 自定义标题 | <span class="t">	{ util: object }</span> |
| week | 自定义周标题 | <span class="t">{ day: number }</span> 0-6 |
| left | 头部左侧区域 | - |
| right | 头部右侧区域 | - |
| day | 自定义日历项 | <span class="t">	{ date: date, util: object }</span> |
| - util | 通用方法 | <div class="t">{<br>&emsp;isToday: function, <br>&emsp;isWorkDay: function, <br>&emsp;isOtherMonth: function, <br>&emsp;isActiveDay: function, <br>&emsp;onPrev: function, <br>&emsp;onNext: function, <br>&emsp;onChangeMode: function<br>}</div> |

### 事件
| Event | Description | Arguments |
| :----- | :---- | :---- |
| onPrev | 切换到上个月/周 | - |
| onNext | 切换到下个月/周 | - |
| onChangeMode | 切换显示模式或设置显示模式 | <span class="t">mode:!string</span> |

---

### Changelog

Detailed changes for each release are documented in the [release notes](https://github.com/hoythan/vue-mobcal/blob/master/CHANGELOG.md).

### License

[MIT](https://github.com/hoythan/vue-mobcal/blob/master/LICENSE)
<!-- <style>
  table {
    font-size: 12px;
    width: 100%;
  }
  .t {
    color:green;
  }
  .v {
    color: #58727e;
    background-color:#f7f8fa;
    padding: 2px 5px;
    border-radius: 4px;
  }
  .var {
    color: #1989fa;
    background-color: rgba(25, 137, 250, 0.1);
    padding: 2px 5px;
    border-radius: 4px;
    margin-left: 4px;
  }
  i {
    color: #58727e;
    background-color:#f7f8fa;
    padding: 2px 5px;
    border-radius: 4px;
    margin-right: 4px;
  }
  .dot {
    display: inline-block;
    background: #007ad3;
    width: 10px;
    height: 10px;
    margin-right: 6px;
    border-radius: 100px;
  }
</style> -->