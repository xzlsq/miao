// const { partial } = require("lodash")


var xzlsq = {
    compact: function compact(array) {
        var res = []
        for (var i = 0; i < array.length; i++) {
            if (array[i] != "" && array[i] != null && !Number.isNaN(array[i]) && array[i] != false && array[i] != 0 && array[i] != undefined) {
                res.push(array[i])
            }
        }

        return res
    },

    chunk: function chunk(array, size = 1) {
        var res = []
        for (var i = 0; i < array.length;) {
            var tmp = []
            for (var j = 0; j < size; j++) {
                tmp.push(array[i])
                i++
                if (i == array.length) {
                    break
                }
            }
            res.push(tmp)
            tmp = []
        }

        return res
    },

    fill: function fill(array, element, start = 0, end = array.length) {
        for (var i = start; i < end; i++) {
            array[i] = element
        }

        return array
    },

    drop: function drop(array, n = 1) {
        var res = []

        if (n >= array.length) {
            return res
        }
        if (n == 0) {
            return array
        }

        for (var i = n; i < array.length; i++) {
            res.push(array[i])
        }

        return res
    },

    findIndex: function findIndex(array, predicate, fromIndex = 0) {
        if (typeof predicate == 'function') {
            for (var i = fromIndex; i < array.length; i++) {
                if (predicate(array[i])) {
                    return i
                }
            }
    
            return -1
        } else if (Array.isArray(predicate)) {
            predicate = this.matchesProperty(predicate[0],predicate[1])
        } else if (typeof predicate == "object") {
            predicate = this.matches(predicate)
        } else if (typeof predicate == "string") {
            predicate = this.property(predicate)
        }
        for (var i = fromIndex; i < array.length; i++) {
            if (predicate(array[i])) {
                return i
            }
        }

        return -1
    },

    findLastIndex: function findLastIndex(array, predicate, fromIndex = array.length - 1) {
        if (typeof predicate == 'function') {
            for (var i = fromIndex; i >= 0; i--) {
                if (predicate(array[i])) {
                    return i
                }
            }
    
            return -1
        } else if (Array.isArray(predicate)) {
            predicate = this.matchesProperty(predicate[0],predicate[1])
        } else if (typeof predicate == "object") {
            predicate = this.matches(predicate)
        } else if (typeof predicate == "string") {
            predicate = this.property(predicate)
        }
        for (var i = fromIndex; i >= 0; i--) {
            if (predicate(array[i])) {
                return i
            }
        }

        return -1
    },

    flatten: function flatten(array) {
        var res = []
        for (var i = 0; i < array.length; i++) {
            if (Array.isArray(array[i])) {
                for (var j = 0; j < array[i].length; j++) {
                    res.push(array[i][j])
                }
            } else {
                res.push(array[i])
            }
        }

        return res
    },

    flattenDeep: function flattenDeep(array, res = []) {
        for (var i = 0; i < array.length; i++) {
            if (Array.isArray(array[i])) {
                flattenDeep(array[i],res)
            } else {
                res.push(array[i])
            }
        }

        return res
    },

    flattenDepth: function flattenDepth(array, depth = 1, res = []) {
        if (depth < 0) {
            return res.push(array)
        }

        for (var i = 0; i < array.length; i++) {
            if (Array.isArray(array[i])) {
                flattenDepth(array[i], depth - 1, res)
            } else {
                res.push(array[i])
            }
        }

        return res
    },

    fromPairs: function fromPairs(pairs) {
        var res = {}

        for (var i = 0; i < pairs.length; i++) {
            for (var j = 0; j < pairs[i].length; j++) {
                res[pairs[i][j]] = pairs[i][++j]
            }
        }

        return res
    },

    toPairs: function toPairs(object) {
        var res = []
        for (var key in object) {
            if (key in object.__proto__) {
                continue
            }
            res.push([key,object[key]])
        }
        return res
    },

    head: function head(array) {
        if (array) {
            return array[0]
        } else {
            return undefined
        }
    },

    isEqual: function isEqual(value, other) {
        if (typeof value == "object" && typeof other == "object" && value !== null && other !== null) {
            // 首先对比元素数量是否相同
            let cnt1 = 0
            let cnt2 = 0
            for (var key in value) {
                cnt1++
            }
            for (var key in other) {
                cnt2++
            }
            // 元素数量不相同，直接返回false
            if (cnt1 != cnt2) {
                return false
            }
            // 元素数量相同，则判断key值是否相同
            for (var key in value) {
                if (!(key in other) || !(isEqual(value[key],other[key]))) {
                    return false
                }
            }
        } else {
            if (Number.isNaN(value) && Number.isNaN(other)) {
                return true
            } else {
                return value === other
            }
        }

        return true
    },

    filter: function filter(collection, predicate = xzlsq.identity) {
        var res = []
        if (typeof predicate == 'function') {
            for (let key in collection) {
                if (predicate(collection[key])) {
                    res.push(collection[key])
                }
            }
    
            return res
        } else if (Array.isArray(predicate)) {
            predicate = this.matchesProperty(predicate[0],predicate[1])
        } else if (typeof predicate == "object") {
            predicate = this.matches(predicate)
        } else if (typeof predicate == "string") {
            predicate = this.property(predicate)
        }
        for (let key in collection) {
            if (predicate(collection[key])) {
                res.push(collection[key])
            }
        }

        return res
    },

    matches: function matches(object) {
        return function(o) {
            return xzlsq.partialEqual(o,object)
        }
    },

    identity: function identity(value) {
        return value
    },

    matchesProperty: function matchesProperty(path,srcValue) {
        return function(obj) {
            return xzlsq.isEqual(obj[path], srcValue)
        }
    },

    property: function property(path) {
        return function(obj) {
            return obj[path]
        }
    },

    // 部分对比
    partialEqual: function partialEqual(value, other) { 
        if (typeof value == "object" && typeof other == "object" && value !== null && other !== null) {
            // 首先统计元素数量
            let cnt1 = 0
            let cnt2 = 0
            for (var key in value) {
                cnt1++
            }
            for (var key in other) {
                cnt2++
            }
            // 判断key值是否相同
            for (var key in value) {
                if (!(key in other)) {
                    continue
                }
                if (!(partialEqual(value[key],other[key]))) {
                    return false
                }
            }
        } else {
            if (Number.isNaN(value) && Number.isNaN(other)) {
                return true
            } else {
                return value === other
            }
        }

        return true
    },

    indexOf: function indexOf(array, value, fromIndex=0) {
        if (fromIndex < 0) {
            if ((fromIndex + array.length) >= 0) {
                fromIndex = array.length - fromIndex
            } else {
                return -1
            }
        }

        for (var i = fromIndex; i < array.length; i++) {
            if (this.isEqual(array[i],value)) {
                return i
            }
        }

        return -1
    },

    lastIndexOf: function lastIndexOf(array, value, fromIndex=array.length-1) {
        if (fromIndex < 0) {
            return -1
        }

        for (var i = fromIndex; i >= 0; i--) {
            if (this.isEqual(array[i],value)) {
                return i
            }
        }

        return -1
    },

    initial: function initial(array) {
        array.pop()
        return array
    },

    join: function join(array, separator=',') {
        var res =""
        var len = array.length
        for (var i = 0; i < len; i++) {
            if (i == len - 1) {
                res += array[i]
            } else {
                res += array[i] + separator
            }
        }

        return res
    },

    last: function last(array) {
        return array.pop()
    },

    pull: function pull(array,...values) {
        var res = []
        var tmp = [...values]
        var flag = true
        if (values == undefined) {
            return undefined
        }

        for (var i = 0; i < array.length; i++) {
            for (var j = 0; j < tmp.length; j++) {
                if (this.partialEqual(array[i],tmp[j])) {
                    flag = false
                }
            }

            if (flag) {
                res.push(array[i])
            }
            flag = true
        }

        return res
    },

    reverse: function reverse(array) {
        var i = 0
        var j = array.length - 1
        while(i < j) {
            var tmp = array[j]
            array[j] = array[i]
            array[i] = tmp
            i++
            j--
        }

        return array
    },

    slice: function slice(array, start = 0, end = array.length) {
        var res = []
        for (var i = start; i < end; i++) {
            if (array[i]) {
                res.push(array[i])
            }
        }
        return res
    },
 
    every: function every(collection, predicate = xzlsq.identity) {
        if (collection == null) {
            return true
        }
        if (typeof predicate == 'function') {
            for (let key in collection) {
                if (!predicate(collection[key])) {
                    return false
                }
            }
    
            return true
        } else if (Array.isArray(predicate)) {
            predicate = this.matchesProperty(predicate[0],predicate[1])
        } else if (typeof predicate == "object") {
            predicate = this.matches(predicate)
        } else if (typeof predicate == "string") {
            predicate = this.property(predicate)
        }
        
        for (let key in collection) {
            if (!predicate(collection[key])) {
                return false
            }
        }

        return true
    },

    stringifyJSON: function stringifyJSON(value) {
        var res = ""
        if (!value) {
            return undefined
        }
        if (typeof value == "object" && value !== null) {
            if (Array.isArray(value)) {
                res += '['
                for (var i = 0; i < value.length; i++) {
                    if (i != value.length - 1) {
                        res += stringifyJSON(value[i]) + ','
                    } else {
                        res += stringifyJSON(value[i])
                    }
                }
                res += ']'
            } else {
                res += '{'
                for (var idx in value) {
                    if (res.length > 1) {
                        res += ',' + idx + ':' + stringifyJSON(value[idx])
                    } else {
                        res += idx + ':' + stringifyJSON(value[idx])
                    }
                }
                res += '}'
            }
        } else {
            if (typeof value == 'string') {
                return '"' + value + '"'
            } else {
                return String(value)
            }
        }

        return res

    },

    parseJSON: function parseJSON(value) {
        var res = null
        var obj = null
        var arr  = null

        for (var i = 0; i < value.length; i++) {
            if (value[i] == '{') {
                obj = new Object(null)
            } else if (value[i] == '[') {
                arr = new Array(0)
            }
        }
    }

}
