function Vector(x, y) {
    this.x = x
    this.y = y
}

Vector.prototype.plus = function (vector) {
    return new Vector(this.x + vector.x, this.y + vector.y)
}

Vector.prototype.minus = function (vector) {
    return new Vector(this.x - vector.x, this.y - vector.y)
}

// Vector.prototype.length = function() {
//     return Math.sqrt(this.x * this.x + this.y * this.y)
// }

Object.defineProperty(Vector.prototype, "length", {
    get: function () {
        return Math.sqrt(this.x * this.x + this.y * this.y)
    }
})

function Complex(real, imag) {
    this.real = real
    this.imag = imag
}

Complex.prototype.plus = function (complex) {
    return new Complex(this.real + complex.real, this.imag + complex.imag)
}

Complex.prototype.minus = function (complex) {
    return new Complex(this.real - complex.real, this.imag - complex.imag)
}

Complex.prototype.multiple = function (complex) {
    // (ac - bd) + (ad + bc)i
    let real = (this.real * complex.real - this.imag * complex.imag)
    let imag = (this.real * complex.imag + this.imag * complex.real)

    return new Complex(real, imag)
}

Complex.prototype.div = function (complex) {
    //  [(ac + bd) + (bc - ad)i] / (c² + d²)
    let dNum = (complex.real ** 2 + complex.imag ** 2)
    let real = (this.real * complex.real + this.imag * complex.imag) / dNum
    let imag = (this.imag * complex.real - this.real * complex.imag) / dNum

    return new Complex(real, imag)
}

Complex.prototype.toString = function () {
    return this.real + "+" + this.imag + "i"
}


function LinkedList() {
    this._head = null
    this._length = 0 // _开头的属性约定为私有属性，尽量在对象外部不修改或读取
}

LinkedList.prototype = {
    get size() {
        return this._length
    },

    // 返回链表第idx个结点的值
    at: function (idx) {
        if (idx < 0) {
            return undefined
        }

        let _head = this._head

        while (_head != null && idx > 0) {
            _head = _head.next
            idx--
        }

        if (_head) {
            return _head.val
        } else {
            return undefined
        }
    },
    // 设置链表第idx项的值为val
    set: function (idx, val) {
        if (idx >= 0) {
            let _head = this._head

            while (_head != null && idx > 0) {
                _head = _head.next
                idx--
            }

            if (_head) {
                _head.val = val
            }
        }

    },
    // 在链表末尾新增一个结点，值为val
    append: function (val) {
        let node = {
            val: val,
            next: null,
        }
        this._length++
        let _head = this._head

        if (this._head == null) {
            this._head = node
            return this._head
        }

        while (_head.next) {
            _head = _head.next
        }

        _head.next = node

        return this._head
    },
    // 返回链表末尾结点的值，并删除末尾结点
    pop: function () {
        let _head = this._head
        let p = this._head

        if (!_head) {
            return undefined
        }

        while (_head.next) {
            p = _head
            _head = _head.next
        }

        let res = _head.val
        p.next = null

        this._length--

        return res
    },
    // 在链表头部新增一个结点，值为val
    prepend: function (val) {
        let node = {
            val: val,
            next: this._head,
        }

        this._length++

        this._head = node

        return this._head
    },
    // 返回链表第一个结点的值，并删除这一个结点
    shift: function () {
        if (this._head == null) {
            return undefined
        }
        this._length--
        let res = this._head.val
        this._head = this._head.next

        return res
    },
    toArray: function () {
        let res = []
        let _head = this._head
        while (_head) {
            res.push(_head.val)
            _head = _head.next
        }

        return res
    },

    toString: function () {
        return this.toArray().join("->")
    },

}


// 表示一个集合（集合中元素没有序，但不能重复）
// 构造函数可选的可以传入集合中的初始值，但会被去重后存放
function MySet(initalValues = []) {
    this._elements = []

    for (let val of initalValues) {
        this.add(val)
    }

    Object.defineProperty(this, "size", {
        get: function () {
            return this._elements.length
        }
    })
}
// 向集合中添加元素
MySet.prototype.add = function (item) {
    if (!(this._elements.includes(item))) {
        this._elements.push(item)
    }
    return this
}
// 从集合中删除item元素
MySet.prototype.delete = function (item) {

    let idx = this._elements.indexOf(item)
    if (idx > 0) {
        this._elements.splice(idx, 1)
    }

    return this
}

// 获取集合中的元素用 c.size，它是一个getter

// 清空集合中的所有元素
MySet.prototype.clear = function () {
    this._elements = []

    return this
}

// 判断集合中是否存在某元素
MySet.prototype.has = function (item) {
    return this._elements.includes(item)
}
// 遍历集合中的元素（顺序无所谓）
MySet.prototype.forEach = function (func) {
    for (let val of this._elements) {
        func(val)
    }
}


// 表示一个映射
// 这个映射中，可以把任何值映射到任何值，映射的key不限于字符串
function MyMap(initMaps = []) {
    this._pairs = []

    for (let pair of initMaps) {
        let key = pair[0]
        let val = pair[1]
        this.set(key, val)
    }
}

MyMap.prototype = {
    // 设置映射中的key所对应的值为val
    set: function (key, val) {
        for (let i = 0; i < this._pairs.length; i += 2) {
            if (this._pairs[i] === key) {
                this._pairs[i + 1] = val
                return this
            }
        }

        this._pairs.push(key, val)
        return this
    },

    // 获取这个映射中key所对应的val
    get: function (key) {
        for (let i = 0; i < this._pairs.length; i += 2) {
            if (this._pairs[i] === key) {
                return this._pairs[i + 1]
            }
        }

        return undefined
    },

    // 判断这个映射中是否存在这个key的映射
    has: function (key) {
        for (let i = 0; i < this._pairs.length; i += 2) {
            if (this._pairs[i] === key) {
                return true
            }
        }

        return false
    },

    // 删除这个映射中key及其映射的值的这一对儿
    delete: function (key) {
        for (let i = 0; i < this._pairs.length; i += 2) {
            if (this._pairs[i] === key) {
                this._pairs.splice(i, 2)
                return this
            }
        }
    },

    // 清空这个映射中所有的映射对儿
    clear: function () {
        this._pairs = []
        return this
    },

    // 获取这个映射中映射对儿的数量
    get size() {
        return this._pairs.length >>> 1
    },

    // 遍历这个映射中所有的映射对儿
    forEach(iterator) {
        for (let i = 0; i < this._pairs.length; i += 2) {
            iterator(this._pairs[i + 1], this._pairs[i])
        }
    },
}



// 表示一个栈：即后进先出，先进后出
function Stack() {
    this._elements = []

    Object.defineProperty(this, "size",
        {
            get: function () {
                return this._elements.length
            },
            enumerable: false,
        })
}
// 向栈中增加元素
Stack.prototype.push = function (val) {
    this._elements.push(val)
}
// 从栈中取出元素并删除栈顶元素
Stack.prototype.pop = function () {
    return this._elements.pop()
}
// 查看但不删除栈顶元素
Stack.prototype.peek = function () {
    return this._elements[this._elements.length - 1]
}


// 表示一个队列：即先进先出，后进后出
function Queue(capacity) {
    this.capacity = capacity
    this.queue = new Array(capacity)
    this._head = 0 // 队列头部的索引
    this.tail = 0 // 队列尾部的索引
    this.len = 0 // 当前队列中的元素数量

    Object.defineProperty(this, "size",
        {
            get: function () {
                return this.len
            },
            enumerable: false,
        })
}

// 向队列中增加元素
Stack.prototype.add = function (val) {
    if (this.len !== this.capacity) {
        this.queue[this.tail] = val
        this.tail = (this.tail++) % this.capacity
        this.len++
    } else {
        console.log("队列已满")
    }
}
// 从队头取出元素并删除队头元素
Stack.prototype.pop = function () {
    if (this.len !== 0) {
        let val = this.queue[this._head]
        this.queue[this._head] = null
        this._head = (this._head++) % this.capacity
        this.len--
        return val
    } else {
        console.log("队列为空")
    }
}
// 查看队头元素（没有查看队尾元素的功能）
Stack.prototype.peek = function () {
    return this.queue[_head]
}
// 以及queue.size获取队列的长度


// // 表示一个队列：即先进先出，后进后出
// function Queue() {
//     this._head = null // 出
//     this._tail = null // 进
//     this._length = 0

//     Object.defineProperty(this, "size",
//         {
//             get: function () {
//                 return this._length
//             },
//             enumerable: false,
//         })
// }

// // 向队列中增加元素
// Queue.prototype.in = function (val) {
//     var node = {
//         val: val,
//         next: null
//     }

//     this._length++

//     if (this._head == null) {
//         this._head = this._tail = node
//         return this
//     }

//     this._tail.next = node
//     this._tail = node

//     return this

// }
// // 从队头取出元素并删除队头元素
// Queue.prototype.out = function () {
//     if (this._head == null) {
//         return undefined
//     }

//     this._length--

//     if (this._head == this._tail) {
//         let res = this._head.val
//         this._head = this._tail = null
//         return res
//     }

//     let res = this._head.val
//     this._head = this._head.next

//     return res
// }
// // 查看队头元素（没有查看队尾元素的功能）
// Queue.prototype.peek = function () {
//     return this._head.val
// }
// // 以及queue.size获取队列的长度
