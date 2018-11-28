// components/book/index.js
import { formatLength } from "../../utils/util.js"
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item: Object,
    hasNums: Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  ready: function () {
    let field = formatLength(this.data.item.author, 8)
    let field2 = formatLength(this.data.item.title, 15)
    this.setData({
      ["item.author"]: field,
      ["item.title"]: field2
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onDetail: function () {

      wx.navigateTo({
        url: '../../pages/detail/detail?bid='+this.data.item.id
      })
    }
  }
})
