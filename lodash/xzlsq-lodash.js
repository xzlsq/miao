

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
    }
}
