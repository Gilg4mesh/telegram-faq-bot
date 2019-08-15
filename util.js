function findValue(obj, key, list = []) {
    if (!obj) return list
    if (obj instanceof Array) {
        obj.forEach(content => {
          list = list.concat(findValue(content, key, []))
        })
        return list
    }
    if (obj[key]) {
        list.push(obj[key])
    }
    if ((typeof obj === 'object') && (obj !== null)) {
        const children = Object.keys(obj)
        if (children.length > 0) {
            for (let i = 0; i < children.length; i += 1) {
                list = list.concat(findValue(obj[children[i]], key, []))
            }
        }
    }
    return list
}
module.exports = { findValue: findValue}
