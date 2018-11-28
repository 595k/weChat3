import { Http } from "../utils/http.js"

class classic extends Http {
    //获取最新一期的数据
    getLatest(callback) {
        this.requery({
            url: "/classic/latest",
            success: res => {
                //缓存
                wx.setStorageSync("classic-end-" + res.index, res)
                //处理之后把数据返回出去
                callback(res)
            }
        })
    }
    //获取上，下期的数据
    getClassic(type, index, success) {
        let key = type == "next" ? index + 1 : index - 1
        if (this.isEnd(key)) {
            success(wx.getStorageSync("classic-end-" + key))
        } else {
            let data = wx.getStorageSync("classic-" + key)
            if (!data) {
                let url = type == "first" ? "/classic/" + index + "/next" : "/classic/" + index + "/previous"
                let params = {
                    url: url,
                    success: res => {
                        wx.setStorageSync("classic-" + res.index, res)
                        success(res)
                    }
                };
                this.requery(params)
            } else {
                success(data)
            }
        }

    }
    isFirst(index) {
        return index == 1 ? true : false
    }
    isEnd(index) {
        return wx.getStorageSync("classic-end-" + index) ? true : false
    }
}

export { classic }