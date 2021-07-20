<p align="center">
  <a href="https://swiperjs.com" target="_blank">
    <img width="77px" src="https://github.surmon.me/images/common/swiper-logo.svg" />
  </a>
  <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
  <a href="https://vuejs.org" target="_blank">
    <img width="77px" src="https://github.surmon.me/images/common/vue-logo.png" />
  </a>
</p>

# vue-mobcal

![vue](https://img.shields.io/badge/MADE%20WITH-VUE-42a97a?style=for-the-badge&labelColor=35495d)
[![GitHub stars](https://img.shields.io/github/stars/hoythan/Vue-MobCal.svg?style=for-the-badge)](https://github.com/hoythan/Vue-MobCal)
[![npm](https://img.shields.io/npm/v/vue-mobcal?color=c7343a&label=npm&style=for-the-badge)](https://www.npmjs.com/package/vue-mobcal)
[![GitHub issues](https://img.shields.io/github/issues-raw/hoythan/Vue-MobCal.svg?style=for-the-badge)](https://github.com/hoythan/Vue-MobCal/issues)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg?style=for-the-badge)](https://github.com/hoythan/Vue-MobCal/blob/master/LICENSE)

[![NPM](https://nodei.co/npm/vue-mobcal.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/vue-mobcal)

### Example
- [CDN example](https://jsfiddle.net/hoythan/a4un3d25/)

---

### Install

``` bash
npm install vue-mobcal --save

# or
yarn add vue-mobcal
```

### Global Registration

``` javascript
import Vue from 'vue'
import VueMobCal from 'vue-mobcal'
import 'vue-mobcal/dist/vue-mobcal.css'

Vue.use(VueMobCal)
```


### Local Registration

```javascript
import VueMobCal from 'vue-mobcal'
import 'vue-mobcal/dist/vue-mobcal.css'

export default {
  components: {
    VueMobCal
  }
}
```

### CDN

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

### Usage
#### Basic Usage
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
#### Custom Slot
```html
<vue-mob-cal v-model="currentDate" :mode.sync="mode">
  <template #left>
    <span>LeftBtn</span>
  </template>
  <template #right>
    <span>RightBtn</span>
  </template>
  <template v-slot:day="props">
    <span v-if="props.util.isToday(props.day)">今</span>
    <span v-else>{{ props.day.getDate() }}</span>
    <!-- A dot will appear at the bottom -->
    <span v-if="props.day.getDay() === 1" class="mindot" style="background-color: red;"></span>
    <span v-if="props.day.getDay() === 6" class="mindot"></span>
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
  }
}
```



### API

#### Props

| Attribute | Description | Type | Default |
| :----- | :---- | :----: | :---- |
| value |  Current calendar date | <span class="t">Date</span> | <span class="v">new Date()</span> |
| mode | Display mode, support monthly or weekly display, params <i>month</i><i>week</i> | <span class="t">String</span> | <span class="v">month</span> |
| color | Theme color | <span class="t">String</span> | <span class="v"><span class="dot"></span>#007ad3</span> |

### Slot

| Name | Description | SlotProps |
| :----- | :---- | :---- |
| left | Custom left icon | - |
| right | Custom right icon | - |
| day | Custom Calendar Item | <span class="t">	{ day: date, util: object }</span> |
| - util | Common method | <span class="t">{ isToday: function, isWorkDay: function, isOtherMonth: function, isActiveDay: function }</span> |

### Event
| Event | Description | Arguments |
| :----- | :---- | :---- |

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