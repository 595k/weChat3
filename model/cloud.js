
class cloud {
    db = wx.cloud.database()
    /**
     * 添加云数据
     * @param {*} dataName  表名
     * @param {*} data  数据
     * @param {*} success 
     * @param {*} fail 
     */
    addCloud(dataName, data, success, fail) {
        this.db.collection(dataName).add({
            data: data,
            success: success,
            fail: fail
        })
    }

    /**
     * 获取云数据 默认10条
     * @param {*} dataName  表名
     * @param {*} limit   条数
     * @param {*} success 
     */
    getCloud(dataName, limit = 10, success) {
        this.db.collection(dataName).limit(limit).get({
            success: success
        })
    }

    /**
     * 获取云数据的总数
     * @param {*} dataName  表名
     * @param {*} success 
     */
    getCloudCount(dataName, success) {
        this.db.collection(dataName, success => {
            success: success
        })
    }

    /**
     * 获取最新的一条云数据
     * @param {*} dataName 表名
     * @param {*} success 
     */
    getLatest(dataName, success) {
        this.db.collection(dataName).orderBy("time", "desc").limit(1).get({
            success: res => {
                this.db.collection(dataName).count({
                    success: data => {
                        let result = res.data[0]
                        result.count = data.total
                        success(result)
                    }
                })
            }
        })
    }

    /**
     * 上 下 一条云数据
     * @param {*} type
     * @param {*} time 
     * @param {*} dataName 
     * @param {*} success 
     */
    getClassic(type, index, time, success, dataName = "like") {
        const _ = this.db.command
        time = type == "prev" ? _.lt(time) : _.gt(time)
        let order = type == "prev" ? "desc" : "asc"
        let key = type == "prev" ? index - 1 : index + 1
        if (wx.getStorageSync("classic-" + key)) {
            success(wx.getStorageSync("classic-" + key))
        } else {
            this.db.collection(dataName).where({ time: time })
                .orderBy("time", order)
                .limit(1)
                .get({
                    success: res => {
                        let result = res.data[0]
                        result.index = key
                        wx.setStorageSync("classic-" + key, result)
                        success(result)
                    }
                })
        }
    }
}

export { cloud }