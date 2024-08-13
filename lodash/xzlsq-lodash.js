

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
        for (var i = fromIndex; i < array.length; i++) {
            if (predicate(array[i])) {
                return i
            }
        }

        return -1
    },

    findLastIndex: function findLastIndex(array, predicate, fromIndex = array.length - 1) {
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
    }
}
