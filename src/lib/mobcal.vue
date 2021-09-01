<template>
  <div class="vue-mobcal-wrapper">
    <div class="vue-mobcal-head f-acjc t-c">
      <div class="vue-mobcal-head-left"><slot name="left"></slot></div>
      <div class="vue-mobcal-head-content f1">
        <slot name="title" :util="util">
          <i @click.stop.prevent="onPrev">
            <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M631.744 774.208l-245.76-292.544 244.224-296.896a38.4 38.4 0 0 0-0.128-47.36c-10.88-13.056-28.48-13.056-39.296 3.328L330.24 454.08a52.992 52.992 0 0 0-8.256 13.312 46.72 46.72 0 0 0 6.208 39.872l264.128 317.76c10.88 9.792 28.608 9.792 39.488-3.264a38.592 38.592 0 0 0-0.128-47.552z"></path></svg>
          </i>
          <span class="current-mode">{{ currentTime | month }}</span>
          <i @click.stop.prevent="onNext">
            <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M392.256 774.208l245.76-292.544-244.224-296.896a38.4 38.4 0 0 1 0.128-47.36c10.88-13.056 28.48-13.056 39.296 3.328l260.48 313.344a52.992 52.992 0 0 1 8.256 13.312 46.72 46.72 0 0 1-6.208 39.872L431.616 824.96a27.2 27.2 0 0 1-39.488-3.264 38.592 38.592 0 0 1 0.128-47.552z"></path></svg>
          </i>
        </slot>
      </div>
      <div class="vue-mobcal-head-right">
        <slot name="right"></slot>
      </div>
    </div>
    <div class="vue-mobcal-body">
      <div class="vue-mobcal-page">
        <table class="vue-mobcal-table-head-fixed">
          <thead>
              <tr>
                  <th v-for="i in 7" :key="`week_${i}`" class="t-c">
                    <slot name="week" :day="i">
                      {{ i | week }}
                    </slot>
                  </th>
              </tr>
            </thead>
        </table>
        <div class="cal-container">
          <div class="cal-wrapper">
            <div class="cal-slide" v-for="slideDate in slidePages" :key="slideDate.getTime()">
              <table>
                <thead>
                  <tr>
                    <th v-for="i in 7" :key="`week_${i}`">{{ i }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(week, index) in getDates(slideDate)" :key="index">
                    <td v-for="(date, i) in week" :key="i" @click="activeDate = date" :class="{
                      'is-today': isToday(date),
                      'is-active-day': isActiveDay(date),
                      'is-work-day': isWorkDay(date),
                      'is-other-month' : isOtherMonth(date) && mode === 'month'
                    }">
                      <div class="detail">
                        <slot name="day" :date="date" :util="util">
                          <span>{{ isToday(date) ? '今' : date.getDate()}}</span>
                          <!-- <span class="mindot"></span> -->
                          <span class="dot"></span>
                        </slot>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div @click="onChangeMode(false)" class="vue-mobcal-mode-control t-c" :class="{ expand: this.currentMode === 'month' }">
      <span>
        <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M246.266795 654.304523C234.028248 666.54307 213.828634 666.481405 201.331856 653.984628 189.200556 641.853327 188.691857 621.369793 201.011961 609.049689L480.945257 329.11639C493.183805 316.877843 513.383419 316.939507 525.880196 329.436288 526.327405 329.883494 526.758819 330.342054 527.174378 330.811136 527.652734 331.235987 528.12141 331.677504 528.579625 332.135718L806.999757 610.555848C819.761472 623.317563 819.933222 643.750592 807.436442 656.247369 795.305146 668.37867 774.482874 668.548635 761.744922 655.810682L503.252779 397.318539 246.266795 654.304523Z"></path></svg>
      </span>
    </div>
  </div>
</template>

<script>
import SwiperCore, { Swiper, Mousewheel } from 'swiper/core'
SwiperCore.use([Mousewheel])

// 一天的毫秒数
const oneDayTime = 60 * 60 * 24 * 1000
export default {
  name: 'VueMobCal',
  props: {
    value: {
      type: Date,
      default () {
        return new Date()
      }
    },
    mode: {
      type: String,
      default: 'month',
      validator: function (value) {
        return ['month', 'week'].indexOf(value) !== -1
      }
    },
    color: {
      type: String,
      default: '#007ad3'
    }
  },
  data () {
    return {
      currentTime: this.mode === 'month'
        ? new Date(this.value.getFullYear(), this.value.getMonth(), 1)
        : this.value,
      // 被选中的日期
      activeDate: this.value,
      currentMode: this.mode,
      calSwiper: null,
      util: {
        isToday: this.isToday,
        isWorkDay: this.isWorkDay,
        isOtherMonth: this.isOtherMonth,
        isActiveDay: this.isActiveDay,
        onPrev: this.onPrev,
        onNext: this.onNext,
        onChangeMode: this.onChangeMode
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      let swiperChangeTotal = 0
      this.calSwiper = new Swiper('.cal-container', {
        wrapperClass: 'cal-wrapper',
        slideClass: 'cal-slide',
        slideActiveClass: 'cal-slide-active',
        slideVisibleClass: 'cal-slide-visible',
        slideNextClass: 'cal-slide-next',
        slidePrevClass: 'cal-slide-prev',
        containerModifierClass: 'cal-container-',
        autoHeight: true,
        initialSlide: 1,
        on: {
          // 切换时加载下一个月数据,始终保持只有三个月的数据被渲染
          slideChange: (swiper) => {
            if (swiperChangeTotal !== 0) {
              this.currentTime = this.slidePages[swiper.activeIndex]
              swiper.slideTo(1, 0)
            }
            swiperChangeTotal++
          }
        }
      })
    })
  },
  computed: {
    slidePages () {
      // 如果当前 mode 为月份形式显示,则返回当前加前后两个月
      if (this.currentMode === 'month') {
        return [
          new Date(this.currentTime.getFullYear(), this.currentTime.getMonth() - 1, 1),
          this.currentTime,
          new Date(this.currentTime.getFullYear(), this.currentTime.getMonth() + 1, 1)
        ]
      }

      // 如果当前 mode 为周,则返回当前周加前后两周 (周一)
      const monday = this.getMonday(this.currentTime)
      const prevMondayTime = +monday - (oneDayTime * 7)
      const nextMondayTime = +monday + (oneDayTime * 7)

      return [
        new Date(prevMondayTime),
        monday,
        new Date(nextMondayTime)
      ]
    }
  },
  filters: {
    year (date) {
      return `${date.getFullYear()}年`
    },
    month (date) {
      return `${date.getMonth() + 1}月`
    },
    week (day) {
      const days = ['一', '二', '三', '四', '五', '六', '日']
      day = day || 7
      return days[day - 1]
    }
  },
  methods: {
    // 是否是今天
    isToday (date) {
      const today = new Date()
      return today.getFullYear() === date.getFullYear() && today.getMonth() === date.getMonth() && today.getDate() === date.getDate()
    },
    // 是工作日
    isWorkDay (date) {
      return date.getDay() > 0 && date.getDay() < 6
    },
    // 是否为非当前月
    isOtherMonth (date) {
      return date.getMonth() !== this.currentTime.getMonth()
    },
    // 被选中的那一天
    isActiveDay (date) {
      return this.activeDate.getFullYear() === date.getFullYear() && this.activeDate.getMonth() === date.getMonth() && this.activeDate.getDate() === date.getDate()
    },
    getDates (date) {
      return this.currentMode === 'month' ? this.getMonthDates(date) : this.getWeekDates(date)
    },
    getMonthDates (date) {
      // 当前月第一天
      const monthFirstDay = new Date(date.getFullYear(), date.getMonth(), 1)

      // 当前月是周几
      const monthFirstDayWeek = monthFirstDay.getDay() || 7

      // 当前月最后一天
      const monthLashDay = new Date(date.getFullYear(), date.getMonth() + 1, 0)

      // 当前月最后一天是周几
      const monthLashDayWeek = monthLashDay.getDay() || 7

      // 获取上个月最后一天,因为日历的周一可能不是本月
      const prevMonthLastDate = new Date(date.getFullYear(), date.getMonth(), 0)

      // 时间数组
      const prevDates = []; const currentDates = []; const nextDates = []

      for (var i = 0; i < (monthFirstDayWeek + monthLashDay.getDate() + (7 - monthLashDayWeek)); i++) {
        // 计算日历上个月天数
        if (i < monthFirstDayWeek - 1) {
          prevDates.unshift(
            new Date(date.getFullYear(), date.getMonth() - 1, prevMonthLastDate.getDate() - i)
          )
          continue
        }

        // 计算日历下个月天数
        if (i > prevMonthLastDate.getDate() + monthFirstDayWeek) {
          nextDates.push(
            new Date(date.getFullYear(), date.getMonth() + 1, i - (monthFirstDayWeek + monthLashDay.getDate()) + 1)
          )
          continue
        }

        // 计算日历这个月天数
        if (i > monthFirstDayWeek - 1) {
          currentDates.push(
            new Date(date.getFullYear(), date.getMonth(), i - monthFirstDayWeek + 1)
          )
          continue
        }
      }

      const days = [...prevDates, ...currentDates, ...nextDates]

      // 将时间按每 7 天分割返回
      const weekDays = []
      const loopNum = days.length % 7 === 0 ? days.length / 7 : parseInt(days.length / 7) + 1
      for (let i = 0; i < loopNum; i++) {
        weekDays.push(days.splice(0, 7))
      }
      return weekDays
    },
    getWeekDates (date) {
      // date 为一周的第一天
      const weekDays = []
      for (let i = 0; i < 7; i++) {
        weekDays.push(new Date(+new Date(date) + (i * oneDayTime)))
      }

      return [weekDays]
    },
    getMonday (date) {
      const monday = new Date(date.getTime() - (((date.getDay() || 7) - 1) * oneDayTime))
      return new Date(monday.getFullYear(), monday.getMonth(), monday.getDate())
    },
    updateSwiper () {
      // 更新 swiper
      this.$nextTick(() => {
        this.calSwiper.update()
      })
    },
    onPrev () {
      this.calSwiper.slideTo()
    },
    onNext () {
      this.calSwiper.slideNext()
    },
    onChangeMode (mode = false) {
      if (typeof mode === 'boolean' && mode) {
        if (['month', 'week'].indexOf(mode) !== -1) {
          this.currentMode = mode
        }
      } else {
        this.currentMode = this.currentMode === 'month' ? 'week' : 'month'
      }
    }
  },
  watch: {
    value (val) {
      // 每当切换一个月份,都将激活时间到当前月的一号
      // 如果模式为 week 则会切换到当前第一周
      this.activeDate = val

      this.currentTime = this.currentMode === 'month'
        ? new Date(val.getFullYear(), val.getMonth(), 1)
        : val
    },
    activeDate (val) {
      if (+val !== +this.value) {
        this.$emit('input', val)
      }
    },
    currentTime (val, prev) {
      // 如果用户通过 v-model 更新日期,将不更新 activeDate 以免造成 $emit 死循环
      if (this.currentMode === 'month') {
        if (val.getMonth() !== this.activeDate.getMonth()) {
          this.activeDate = val
        }
      }
      if (this.currentMode === 'week') {
        const monday = this.getMonday(val)
        if (+monday !== +this.getMonday(new Date()) || +this.getMonday(this.activeDate) !== +monday) {
          this.activeDate = val
        }
      }

      this.updateSwiper()
    },
    mode (val) {
      this.currentMode = val
      // 切换模式时改变当前时间为激活的时间
      this.currentTime = this.activeDate
    },
    currentMode (val) {
      if (val !== this.mode) {
        this.$emit('update:mode', val)
      }

      this.updateSwiper()
    },
    color: {
      immediate: true,
      handler (color) {
        if (document.getElementById('mobcal-styles')) {
          document.body.removeChild(document.getElementById('mobcal-styles'))
        }

        const style = document.createElement('style')
        style.id = 'mobcal-styles'
        style.innerHTML = `
          :root {
            --vue-mobcal-color-primary: ${color};
          }
        `.replace(/\s+/g, '')
        document.body.appendChild(style)
      }
    }
  }
}
</script>
