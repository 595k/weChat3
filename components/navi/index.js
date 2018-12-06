// components/navi/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    first: Boolean,
    end: Boolean,
    title: String,
  },

  /**
   * 组件的初始数据
   */
  data: {
    first_yes_img: "images/triangle.dis@right.png",
    first_no_img: "images/triangle@right.png",
    end_yes_img: "images/triangle.dis@left.png",
    end_no_img: "images/triangle@left.png"
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onPrev: function () {
      if (!this.data.first) {
        this.triggerEvent("classic", {
          type: "prev"
        })
      }

    },
    onNext: function () {
      if (!this.data.end) {
        this.triggerEvent("classic", {
          type: "next"
        })
      }

    }
  }
})
