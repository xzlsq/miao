

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
            predicate = this.matchesProperty(predicate[0], predicate[1])
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
            predicate = this.matchesProperty(predicate[0], predicate[1])
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
                flattenDeep(array[i], res)
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
            res.push([key, object[key]])
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
                if (!(key in other) || !(isEqual(value[key], other[key]))) {
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
            predicate = this.matchesProperty(predicate[0], predicate[1])
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
        return function (o) {
            return xzlsq.partialEqual(o, object)
        }
    },

    identity: function identity(value) {
        return value
    },

    matchesProperty: function matchesProperty(path, srcValue) {
        return function (obj) {
            return xzlsq.isEqual(obj[path], srcValue)
        }
    },

    property: function property(path) {
        let paths = null
        if (typeof path == 'string') {
            paths = path.split('.')
        } else if (Array.isArray(path)) {
            paths = path
        }
        return function (obj) {
            if (paths) {
                for (let key of paths) {
                    obj = obj[key]
                }
            }

            return obj
        }
    },

    // 部分对比
    partialEqual: function partialEqual(value, other) {
        if (typeof value == "object" && typeof other == "object" && value !== null && other !== null) {

            for (var key in value) {
                if (!(key in other)) {
                    continue
                }
                if (!(partialEqual(value[key], other[key]))) {
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

    indexOf: function indexOf(array, value, fromIndex = 0) {
        if (fromIndex < 0) {
            if ((fromIndex + array.length) >= 0) {
                fromIndex = array.length - fromIndex
            } else {
                fromIndex = 0
            }
        }

        for (var i = fromIndex; i < array.length; i++) {
            if (this.isEqual(array[i], value)) {
                return i
            }
        }

        return -1
    },

    lastIndexOf: function lastIndexOf(array, value, fromIndex = array.length - 1) {
        if (fromIndex < 0) {
            return -1
        }

        for (var i = fromIndex; i >= 0; i--) {
            if (this.isEqual(array[i], value)) {
                return i
            }
        }

        return -1
    },

    initial: function initial(array) {
        array.pop()
        return array
    },

    join: function join(array, separator = ',') {
        var res = ""
        var len = array.length
        if (typeof separator != 'string') {
            separator = String(separator)
        }
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

    pull: function pull(array, ...values) {
        var res = []
        var tmp = [...values]
        var flag = true
        if (values == undefined) {
            return undefined
        }

        for (var i = 0; i < array.length; i++) {
            for (var j = 0; j < tmp.length; j++) {
                if (this.partialEqual(array[i], tmp[j])) {
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
        while (i < j) {
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
            predicate = this.matchesProperty(predicate[0], predicate[1])
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
            return null
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
                        res += ',' + `"` + idx + `"` + ':' + stringifyJSON(value[idx])
                    } else {
                        res += `"` + idx + `"` + ':' + stringifyJSON(value[idx])
                    }
                }
                res += '}'
            }
        } else {
            if (typeof value == 'string') {
                return `"` + value + `"`
            } else {
                return String(value)
            }
        }

        return res

    },

    parseJSON: function parseJSON(value) {
        var i = 0

        return parseVal()

        // 从i位置开始扫描,并构建对象
        function parseObj() {
            var res = {}

            i++ // skip '{'
            if (value[i] === '}') {
                i++ // 如果对象为空，则跳过对象最后一个的‘}’符号
                return res
            }

            while (i < value.length) {
                var key = parseString()
                if (value[i] !== ':') {
                    throw new SyntaxError('Expected `:` but got' + value[i])
                }
                i++ // skip ':'
                var val = parseVal()
                res[key] = val
                if (value[i] === ',') {
                    i++ // skip ','
                } else if (value[i] === '}') {
                    i++ // skip '}'
                    break
                }
            }

            return res

        }
        // 从i位置开始扫描,并构建数组
        function parseArr() {
            var res = []

            i++ // 跳过数组的‘[’符号
            if (value[i] === ']') {
                i++ // 如果数组为空，则跳过数组最后一个的‘]’符号
                return res
            }

            while (i < value.length) {
                var val = parseVal()
                res.push(val)

                if (value[i] === ',') {
                    i++ // 跳过','
                } else if (value[i] === ']') {
                    i++ // 跳过‘]’
                    break
                }
            }

            return res
        }
        // 从i位置开始扫描,并构建字符串
        function parseString() {
            i++ // skip the start "
            var start = i

            while (value[i] !== '"') {
                i++
            }

            var res = value.slice(start, i)
            i++ // skip the endding "

            return res
        }
        // 从i位置开始扫描,并构建数，暂时只考虑整数
        function parseNum() {
            var startIdx = i
            while (value[i] >= '0' && value[i] <= '9') {
                i++
            }

            var res = Number(value.slice(startIdx, i))

            return res
        }
        // 从i位置开始扫描,并构建数
        function parseVal() {
            if (value[i] === '{') {
                return parseObj()
            } else if (value[i] === '[') {
                return parseArr()
            } else if (value[i] === '"') {
                return parseString()
            } else if (value[i] === 't') {
                if (value.slice(i, i + 4) === 'true') {
                    i += 4
                } else {
                    throw new SyntaxError('unExpected token at pos' + i)
                }
                return true
            } else if (value[i] === 'f') {
                if (value.slice(i, i + 5) === 'false') {
                    i += 5
                } else {
                    throw new SyntaxError('unExpected token at pos' + i)
                }
                return false
            } else if (value[i] === 'n') {
                if (value.slice(i, i + 4) === 'null') {
                    i += 4
                } else {
                    throw new SyntaxError('unExpected token at pos' + i)
                }
                return null
            } else {
                return parseNum()
            }
        }
    },

    some: function some(collection, predicate = xzlsq.identity) {

        if (typeof predicate == 'function') {
            for (let key in collection) {
                if (predicate(collection[key])) {
                    return true
                }
            }

            return true
        } else if (Array.isArray(predicate)) {
            predicate = this.matchesProperty(predicate[0], predicate[1])
        } else if (typeof predicate == "object") {
            predicate = this.matches(predicate)
        } else if (typeof predicate == "string") {
            predicate = this.property(predicate)
        }

        for (let key in collection) {
            if (predicate(collection[key])) {
                return true
            }
        }

        return false
    },

    countBy: function countBy(collection, predicate = xzlsq.identity) {
        var obj = {}

        if (Array.isArray(predicate)) {
            predicate = this.matchesProperty(predicate[0], predicate[1])
        } else if (typeof predicate == "object") {
            predicate = this.matches(predicate)
        } else if (typeof predicate == "string") {
            predicate = this.property(predicate)
        }

        for (var key in collection) {
            let objKey = predicate(collection[key])
            if (objKey in obj) {
                obj[objKey]++
            } else {
                obj[objKey] = 1
            }
        }

        return obj

    },

    groupBy: function groupBy(collection, iteratee = xzlsq.identity) {
        var obj = {}

        if (Array.isArray(iteratee)) {
            iteratee = this.matchesProperty(iteratee[0], iteratee[1])
        } else if (typeof iteratee == "object") {
            iteratee = this.matches(iteratee)
        } else if (typeof iteratee == "string") {
            iteratee = this.property(iteratee)
        }

        for (var key in collection) {
            let objKey = iteratee(collection[key])
            if (objKey in obj) {
                obj[objKey].push(collection[key])
            } else {
                obj[objKey] = [collection[key]]
            }
        }

        return obj
    },

    keyBy: function keyBy(collection, iteratee = xzlsq.identity) {
        var obj = {}

        if (Array.isArray(iteratee)) {
            iteratee = this.matchesProperty(iteratee[0], iteratee[1])
        } else if (typeof iteratee == "object") {
            iteratee = this.matches(iteratee)
        } else if (typeof iteratee == "string") {
            iteratee = this.property(iteratee)
        }

        for (var key in collection) {
            let objKey = iteratee(collection[key])
            obj[objKey] = collection[key]
        }

        return obj
    },

    forEach: function forEach(collection, iteratee = xzlsq.identity) {
        for (var key in collection) {
            if (iteratee(collection[key], key, collection) == false) {
                break
            }
        }

        return collection
    },

    map: function map(collection, iteratee = xzlsq.identity) {
        var res = []

        if (Array.isArray(iteratee)) {
            iteratee = this.matchesProperty(iteratee[0], iteratee[1])
        } else if (typeof iteratee == "object") {
            iteratee = this.matches(iteratee)
        } else if (typeof iteratee == "string") {
            iteratee = this.property(iteratee)
        }

        if (Array.isArray(collection)) {
            for (let i = 0; i < collection.length; i++) {
                res.push(iteratee(collection[i], i, collection))
            }
        } else {
            for (var key in collection) {
                res.push(iteratee(collection[key], key, collection))
            }
        }


        return res
    },

    reduce: function reduce(collection, iteratee = xzlsq.identity, accumulator) {

        for (var key in collection) {
            if (accumulator == null) {
                accumulator = collection[key]
                continue
            }
            accumulator = iteratee(accumulator, collection[key], key, collection)
        }

        return accumulator
    },

    reduceRight: function reduceRight(collection, iteratee = xzlsq.identity, accumulator) {
        if (Array.isArray(collection)) {
            for (var i = collection.length - 1; i >= 0; i--) {
                if (accumulator == null) {
                    accumulator = collection[key]
                    continue
                }
                accumulator = iteratee(accumulator, collection[i], i, collection)
            }
        } else if (typeof collection == 'object') {
            var keys = []
            for (var key in collection) {
                keys.unshift(key)
            }

            for (var key of keys) {
                if (accumulator == null) {
                    accumulator = collection[key]
                    continue
                }
                accumulator = iteratee(accumulator, collection[key], key, collection)
            }
        }

        return accumulator
    },

    size: function size(collection) {

        if (Array.isArray(collection)) {
            return collection.length
        } else if (typeof collection == 'object') {
            var i = 0
            for (var key in collection) {
                i++
            }
            return i
        } else if (typeof collection == 'string') {
            return collection.length
        }

        return 0
    },

    sortBy: function sortBy(collection, iteratees = [_.identity]) {
        var res = []

        if (collection == null) {
            return res
        }

        if (Array.isArray(iteratees)) {
            iteratees = this.matchesProperty(iteratees[0], iteratees[1])
        } else if (typeof iteratees == "object") {
            iteratees = this.matches(iteratees)
        } else if (typeof iteratees == "string") {
            iteratees = this.property(iteratees)
        }

        return mergeSort(res)

        function mergeSort(array) {
            if (array.length < 2) return array

            var midIdx = array.length >> 1 // 除以2之后取整
            var leftArray = array.slice(0, midIdx)
            var rightArray = array.slice(midIdx)

            leftArray = mergeSort(leftArray)
            rightArray = mergeSort(rightArray)

            var i = 0, j = 0, k = 0

            while (i < leftArray.length && j < rightArray.length) {
                if (leftArray[i] < rightArray[j]) {
                    array[k++] = leftArray[i++]
                } else {
                    array[k++] = rightArray[j++]
                }
            }

            while (i < leftArray.length) {
                array[k++] = leftArray[i++]
            }

            while (j < rightArray.length) {
                array[k++] = rightArray[j++]
            }

            return res
        }

    },

    sample: function sample(collection) {
        if (collection == null) {
            return undefined
        }
        if (Array.isArray(collection)) {
            return collection[Math.random() * collection.length | 0]
        } else if (typeof collection == 'object') {
            var keys = []
            for (var key in collection) {
                keys.push(key)
            }

            return collection[keys[Math.random() * collection.length | 0]]
        }

    },

    isUndefined: function isUndefined(value) {
        return value === undefined
    },

    isNull: function isNull(value) {
        return value === null
    },

    isNil: function isNil(value) {
        return xzlsq.isUndefined(value) || xzlsq.isNull(value)
    },

    max: function max(array) {
        if (array.length == 0) {
            return undefined
        }

        var max = -Infinity

        for (var i = 0; i < array.length; i++) {
            if (array[i] == false) {
                return undefined
            }
            if (max < array[i]) {
                max = array[i]
            }
        }

        return max
    },

    min: function min(array) {
        if (array.length == 0) {
            return undefined
        }

        var min = Infinity

        for (var i = 0; i < array.length; i++) {
            if (array[i] == false) {
                return undefined
            }
            if (min > array[i]) {
                min = array[i]
            }
        }

        return min
    },

    maxBy: function maxBy(array, iteratee = xzlsq.identity) {
        if (array.length == 0) {
            return undefined
        }

        if (Array.isArray(iteratee)) {
            iteratee = this.matchesProperty(iteratee[0], iteratee[1])
        } else if (typeof iteratee == "object") {
            iteratee = this.matches(iteratees)
        } else if (typeof iteratee == "string") {
            iteratee = this.property(iteratee)
        }

        var max = iteratee(array[0])
        var res = array[0]

        for (var i = 0; i < array.length - 1; i++) {
            if (!iteratee(array[i])) {
                return undefined
            }
            if (max < iteratee(array[i + 1])) {
                max = iteratee(array[i + 1])
                res = array[i + 1]
            }
        }

        return res
    },

    minBy: function minBy(array, iteratee = xzlsq.identity) {
        if (array.length == 0) {
            return undefined
        }

        if (Array.isArray(iteratee)) {
            iteratee = this.matchesProperty(iteratee[0], iteratee[1])
        } else if (typeof iteratee == "object") {
            iteratee = this.matches(iteratees)
        } else if (typeof iteratee == "string") {
            iteratee = this.property(iteratee)
        }

        var min = iteratee(array[0])
        var res = array[0]

        for (var i = 0; i < array.length - 1; i++) {
            if (!iteratee(array[i])) {
                return undefined
            }
            if (min > iteratee(array[i + 1])) {
                min = iteratee(array[i + 1])
                res = array[i + 1]
            }
        }

        return res
    },

    round: function round(number, precision = 0) {
        if (number == undefined) {
            return NaN
        }

        var res = 0
        var intPart = number | 0
        var decimalPart = number - intPart
        var roundNum = decimalPart
        var prec = Math.abs(precision)

        if (precision > 0) {
            while (precision > 0) {
                roundNum *= 10
                precision--
            }
            if (roundNum >= 0.5) {
                roundNum = (roundNum + 1) | 0
                decimalPart = roundNum / (10 ** prec)
                res = intPart + decimalPart
                return res
            } else {
                roundNum |= 0
                decimalPart = roundNum / (10 ** prec)
                res = intPart + decimalPart
                return res
            }

        } else if (precision < 0) {
            roundNum = number
            while (precision < 0) {
                roundNum /= 10
                precision++
            }
            let intPart2 = roundNum | 0
            decimalPart = roundNum - intPart2
            if (decimalPart >= 0.5) {
                roundNum = decimalPart * (10 ** prec)
                decimalPart = (decimalPart + 1) | 0
                decimalPart *= (10 ** prec)
                res = number + decimalPart - roundNum
                return res
            } else {
                decimalPart *= (10 ** prec)
                res = number - (decimalPart | 0)
                return res
            }
        } else {
            return intPart
        }

    },

    sumBy: function sumBy(array, iteratee = xzlsq.identity) {
        var res = 0

        if (Array.isArray(iteratee)) {
            iteratee = this.matchesProperty(iteratee[0], iteratee[1])
        } else if (typeof iteratee == "object") {
            iteratee = this.matches(iteratee)
        } else if (typeof iteratee == "string") {
            iteratee = this.property(iteratee)
        }

        for (let i = 0; i < array.length; i++) {
            res += iteratee(array[i], i, array)
        }

        return res
    },

    flatMap: function flatMap(collection, iteratee = xzlsq.identity) {
        var res = []

        if (Array.isArray(iteratee)) {
            iteratee = this.matchesProperty(iteratee[0], iteratee[1])
        } else if (typeof iteratee == "object") {
            iteratee = this.matches(iteratee)
        }

        if (Array.isArray(collection)) {
            for (let i = 0; i < collection.length; i++) {
                res.push(...iteratee(collection[i], i, collection))
            }
        } else {
            for (var key in collection) {
                res.push(...iteratee(collection[key], key, collection))
            }
        }


        return res
    },

    flatMapDeep: function flatMapDeep(collection, iteratee = xzlsq.identity) {
        var res = []

        if (Array.isArray(iteratee)) {
            iteratee = this.matchesProperty(iteratee[0], iteratee[1])
        } else if (typeof iteratee == "object") {
            iteratee = this.matches(iteratee)
        }

        if (Array.isArray(collection)) {
            for (let i = 0; i < collection.length; i++) {
                let arr = iteratee(collection[i], i, collection)
                if (Array.isArray(arr)) {
                    res.push(...this.flattenDeep(arr))
                } else {
                    res.push(arr)
                }
            }
        } else if (typeof collection == 'object') {

            for (var key in collection) {
                let obj = iteratee(collection[key], key, collection)
                if (Array.isArray(obj)) {
                    res.push(...this.flattenDeep(obj))
                } else {
                    res.push(obj)
                }
            }
        }

        return res
    },

    flatMapDepth: function flatMapDepth(collection, iteratee = xzlsq.identity, depth = 1) {
        var res = []

        if (Array.isArray(iteratee)) {
            iteratee = this.matchesProperty(iteratee[0], iteratee[1])
        } else if (typeof iteratee == "object") {
            iteratee = this.matches(iteratee)
        } else if (typeof iteratee == "string") {
            iteratee = this.property(iteratee)
        }

        if (Array.isArray(collection)) {
            for (let i = 0; i < collection.length; i++) {
                let arr = iteratee(collection[i], i, collection)
                if (Array.isArray(arr)) {
                    res.push(...this.flattenDepth(arr, depth - 1))
                } else {
                    res.push(arr)
                }
            }
        } else if (typeof collection == 'object') {

            for (var key in collection) {
                let obj = iteratee(collection[key], key, collection)
                if (Array.isArray(obj)) {
                    res.push(...this.flattenDepth(obj, depth - 1))
                } else {
                    res.push(obj)
                }
            }
        }

        return res
    },

    get: function get(object, path, defaultValue) {
        var res = defaultValue
        var paths = ''

        if (typeof path == 'string') {
            for (var i = 0; i < path.length; i++) {
                if (path[i] != '[' && path[i] != ']') {
                    paths += path[i]
                } else if (path[i] == '[') {
                    paths += '.'
                }
            }
        } else {
            paths = path
        }

        let iteratee = property(paths)

        if ((res = iteratee(object)) === undefined) {
            return defaultValue
        } else {
            return res
        }


        function property(path) {
            let paths = null
            if (typeof path == 'string') {
                paths = path.split('.')
            } else if (Array.isArray(path)) {
                paths = path
            }
            return function (obj) {
                for (let key of paths) {
                    if (obj.hasOwnProperty(key)) {
                        obj = obj[key]
                    } else {
                        return undefined
                    }
                }

                return obj
            }
        }
    },

    has: function has(object, path) {
        return this.get(object, path, undefined) !== undefined
    },

    create: function create(prototype, properties) {
        var newObj = Object.create(prototype)

        for (let key in properties) {
            newObj[key] = properties[key]
        }

        return newObj
    },

    mapKeys: function mapKeys(object, iteratee = xzlsq.identity) {
        var obj = {}
        for (let key in object) {
            obj[iteratee(object[key], key, object)] = object[key]
        }

        return obj
    },

    mapValues: function mapValues(object, iteratee = xzlsq.identity) {
        var obj = {}

        if (Array.isArray(iteratee)) {
            iteratee = this.matchesProperty(iteratee[0], iteratee[1])
        } else if (typeof iteratee == "object") {
            iteratee = this.matches(iteratee)
        } else if (typeof iteratee == "string") {
            iteratee = this.property(iteratee)
        }

        for (let key in object) {
            obj[key] = iteratee(object[key], key, object)
        }

        return obj
    },

    range: function range(start, end, step = 1) {
        var arr = []
        var negative = false
        if (!end) {
            end = start
            start = 0
        }
        if (end < 0) {
            end = -end
            negative = true
        }
        if (step < 0) {
            step = -step
        }
        for (var i = start; i < end; i += step) {
            if (negative && i != 0) {
                arr.push(-i)
            } else if (step == 0) {
                i++
                arr.push(1)
            } else {
                arr.push(i)
            }
        }

        return arr
    },

    concat: function concat(array, ...values) {
        var arr = array

        for (var i = 0; i < values.length; i++) {
            if (Array.isArray(values[i])) {
                for (var val of values[i]) {
                    arr.push(val)
                }
            } else {
                arr.push(values[i])
            }
        }

        return arr
    },

    repeat: function repeat(string = '', n = 1) {
        var str = ''

        for (var i = 0; i < n; i++) {
            str += string
        }

        return str
    },

    padStart: function padStart(string = '', length = 0, chars = ' ') {
        var str = ''
        var charArr = chars.split('')
        var len = length - string.length

        for (var i = 0; i < len;) {
            for (var j = 0; j < charArr.length; j++) {
                str += charArr[j]
                i++
                if (i >= len) {
                    str += string
                    return str
                }
            }
        }

        str += string

        return str
    },

    padEnd: function padEnd(string = '', length = 0, chars = ' ') {
        var str = string
        var charArr = chars.split('')
        var len = length - string.length

        for (var i = 0; i < len;) {
            for (var j = 0; j < charArr.length; j++) {
                str += charArr[j]
                i++
                if (i >= len) {
                    return str
                }
            }
        }

        return str
    },

    pad(string = '', length = 0, chars = ' ') {
        var res = ''
        var len = length - string.length
        var strLen = string.length

        var headStr = this.padStart(string, length = (strLen + (len >> 1)), chars)
        var endStr = this.padEnd(string, length = (strLen + len - (len >> 1)), chars)

        var str = (headStr + endStr).split(string)

        res += str[0]
        res += string
        res += str.at(-1)

        return res
    },

    keys(object) {
        var res = []

        if (typeof object == 'number' || typeof object == 'boolean') {
            return res
        }

        if (!Array.isArray(object) && typeof object === 'object') {
            for (let key in object) {
                if (object.hasOwnProperty(key)) {
                    res.push(key)
                }
            }
        } else {
            for (let key in object) {
                res.push(key)
            }
        }

        return res
    },

    values(object) {
        var res = []
        var keys = this.keys(object)

        if (typeof object == 'number' || typeof object == 'boolean') {
            return res
        }

        for (let key of keys) {
            res.push(object[key])
        }

        return res
    },

    random(lower, upper, floating) {
        if (!floating) {
            floating = false
        }
        if (!upper) {
            upper = lower
            lower = 0
        }

        var res = 0

        while (1) {
            if (floating) {
                res = Math.random() * upper
            } else {
                res = Math.random() * upper | 0
            }
            if (res > lower && res < upper) {
                break
            }
        }

        return res
    },

    ceil(number, precision = 0) {
        if (number == undefined) {
            return NaN
        }

        var res = 0
        var intPart = number | 0    // 整数部分
        var decimalPart = number - intPart // 小数部分
        var ceilNum = decimalPart   // 要向上取整的部分
        var prec = Math.abs(precision)

        if (precision > 0) {
            while (precision > 0) {
                ceilNum *= 10
                precision--
            }
            ceilNum = (ceilNum + 1) | 0
            decimalPart = ceilNum / (10 ** prec)
            res = intPart + decimalPart
            return res

        } else if (precision < 0) {
            ceilNum = number
            while (precision < 0) {
                ceilNum /= 10
                precision++
            }
            let intPart2 = ceilNum | 0
            decimalPart = ceilNum - intPart2
            ceilNum = decimalPart * (10 ** prec)
            decimalPart = (decimalPart + 1) | 0
            decimalPart *= (10 ** prec)
            res = number + decimalPart - ceilNum
            return res

        } else {
            if (decimalPart == 0) {
                return intPart
            } else {
                return intPart + 1
            }
        }
    },

    floor(number, precision = 0) {
        if (number == undefined) {
            return NaN
        }

        var res = 0
        var intPart = number | 0
        var decimalPart = number - intPart
        var floorNum = decimalPart
        var prec = Math.abs(precision)

        if (precision > 0) {
            while (precision > 0) {
                floorNum *= 10
                precision--
            }

            floorNum |= 0
            decimalPart = floorNum / (10 ** prec)
            res = intPart + decimalPart
            return res

        } else if (precision < 0) {
            floorNum = number
            while (precision < 0) {
                floorNum /= 10
                precision++
            }
            let intPart2 = floorNum | 0
            decimalPart = floorNum - intPart2

            decimalPart *= (10 ** prec)
            res = number - (decimalPart | 0)
            return res

        } else {
            return intPart
        }
    },

    cloneDeep(value) {

        if (typeof value == 'object' && value != null) {
            if (Array.isArray(value)) {
                var res = []
                for (var i in value) {
                    res.push(cloneDeep(value[i]))
                }
                return res
            } else {
                var res = {}
                for (var key in value) {
                    res[key] = cloneDeep(value[key])
                }
                return res
            }
        } else {
            return value
        }
    },

    trim(string = '', chars = ' ') {
        // debugger
        if (typeof chars !== 'string') {
            chars = ' '
        }
        var str = string.split('')
        var charArr = chars.split('')
        var res = []

        for (var i = 0; i < str.length; i++) {
            var flag = false
            for (var j = 0; j < charArr.length; j++) {
                if (str[i] == charArr[j]) {
                    flag = true
                }
            }
            if (!flag) {
                res.push(str[i])
            }
        }

        return res.join('')
    },

    trimStart(string = '', chars = ' ') {
        if (typeof chars !== 'string') {
            chars = ' '
        }
        var str = string.split('')
        var charArr = chars.split('')


        for (var i = 0; i < str.length;) {
            var flag = false
            for (var j = 0; j < charArr.length; j++) {
                if (str[i] == charArr[j]) {
                    i++
                    flag = true
                }
            }
            if (!flag) {
                return str.slice(i).join('')
            }
        }
    },

    trimEnd(string = '', chars = ' ') {
        if (typeof chars !== 'string') {
            chars = ' '
        }
        var str = string.split('')
        var charArr = chars.split('')

        for (var i = str.length - 1; i >= 0;) {
            var flag = false
            for (var j = 0; j < charArr.length; j++) {
                if (str[i] == charArr[j]) {
                    str.pop()
                    i--
                    flag = true
                }
            }
            if (!flag) {
                return str.join('')
            }
        }

    },

    assign(object, ...sources) {
        var obj = object

        for (var i of sources) {
            if (typeof i == 'object') {
                for (var key in i) {
                    if (i.hasOwnProperty(key)) {
                        obj[key] = i[key]
                    }
                }
            } else {
                return i
            }
        }

        return obj
    },

    merge(object, ...sources) {
        var obj = object

        for (var key in sources) {
            if (typeof sources[key] == 'object' && sources[key] != null) {
                for (var i in sources[key]) {
                    if (Array.isArray(sources[key][i]) && Array.isArray(obj[i])) {
                        for (var j in sources[key][i]) {
                            obj[i][j] = xzlsq.assign(obj[i][j],sources[key][i][j])
                        }
                    } else {
                        obj[i] = xzlsq.assign(obj[i],sources[key][i])
                    }
                }
            } else {
                obj[key] = xzlsq.assign(obj,sources)
            }
        }

        return obj
    }
}
