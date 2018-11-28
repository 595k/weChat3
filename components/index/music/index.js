// components/index/music/index.js
import { beh } from "../classic_beh.js"
let mMgr = wx.getBackgroundAudioManager()
Component({
  behaviors: [beh],
  /**
   * 组件的属性列表
   */
  properties: {
    playing: Boolean,
    src: String,
    title: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    playingUrl: "images/player@playing.png",
    waittingUrl: "images/player@waitting.png",
  },

  attached: function () {
    //判断当前是否在播放中
    this._isPlaying()
    //监听播放状态
    this._monitorSwitch()
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onPlay: function () {
      if (!this.data.playing) {
        mMgr.src = this.data.src
        mMgr.title = this.data.title
      } else {
        mMgr.pause()
      }
      this.setData({
        playing: !this.data.playing
      })
    },
    _isPlaying: function () {
      if (mMgr.paused) {
        this.setData({
          playing: false
        })
        return
      }
      if (mMgr.src == this.data.src) {
        this.setData({
          playing: true
        })
      }
    },
    _monitorSwitch: function () {
      mMgr.onPlay(() => {
        this._isPlaying()
      })
      mMgr.onError(() => {
        this._isPlaying()
      })
      mMgr.onPause(() => {
        this._isPlaying()
      })
      mMgr.onStop(() => {
        this._isPlaying()
      }),
        mMgr.onEnded(() => {
          this._isPlaying()
        })
    }
  }
})
