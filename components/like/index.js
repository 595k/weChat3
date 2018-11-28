// component/live/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    like: Boolean,
    count: Number
  },

  /**
   * 组件的初始数据
   */
  data: {
    yes_url: "images/like.png",
    no_url: "images/like@dis.png"
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLike: function () {
      let like = !this.data.like
      let count = this.data.like ? this.data.count - 1 : this.data.count + 1;
      this.setData({
        like: like,
        count: count
      })
      //注册like事件，让父类使用
      this.triggerEvent("like", {
        classic_type: this.data.like ? "like" : "cancel"
      })
    }
  }
})
