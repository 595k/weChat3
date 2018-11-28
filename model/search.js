import { Http } from "../utils/http.js"
const keys = "q"
const max = 10
class search extends Http {
    //获取热搜关键字
    getHotKeys(success) {
        this.requery({
            url: "/book/hot_keyword",
            success: res => {
                success(res.hot)
            }
        })
    }
    getHistoryKeys() {
        return wx.getStorageSync(keys)
    }
    setHistoryKeys(word) {
        let keywords = this.getHistoryKeys()
        if (keywords) {
            let index = keywords.indexOf(word)
            if (index == -1) {
                if (keywords.length >= max) {
                    keywords.pop()
                }
                keywords.unshift(word)
                wx.setStorageSync(keys, keywords)
            }
        } else {
            wx.setStorageSync(keys, [word])
        }
    }

}

export { search }