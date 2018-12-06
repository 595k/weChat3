

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
}

export { cloud }