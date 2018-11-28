// components/epsoide/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    index: {
      type: Number,
      observer: function (newVal, oldVal, changedPath) {
        //数据改变时，会执行这个
        if (newVal < 10) {
          this.setData({
            _index: "0" + newVal
          })
        }
      }

    },
    month: String,
    year: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月',
      '十二月'],
    _index: String
  },

  ready: function () {
    let date = new Date()
    this.setData({
      month: this.data.months[date.getMonth()],
      year: date.getFullYear()
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
