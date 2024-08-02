class Vector {

    constructor(x, y) {
        this.x = x
        this.y = y
    }

    plus(vector) {
        return new Vector(this.x + vector.x, this.y + vector.y)
    }

    minus(vector) {
        return new Vector(this.x - vector.x, this.y - vector.y)
    }

    get length() {
        return Math.sqrt(this.x * this.x + this.y * this.y)
    }
}

class Complex {

    constructor(real, imag) {
        this.real = real
        this.imag = imag
    }

    plus(complex) {
        return new Complex(this.real + complex.real, this.imag + complex.imag)
    }

    minus(complex) {
        return new Complex(this.real - complex.real, this.imag - complex.imag)
    }

    multiple(complex) {
        // (ac - bd) + (ad + bc)i
        let real = (this.real * complex.real - this.imag * complex.imag)
        let imag = (this.real * complex.imag + this.imag * complex.real)

        return new Complex(real, imag)
    }

    div(complex) {
        //  [(ac + bd) + (bc - ad)i] / (c² + d²)
        let dNum = (complex.real ** 2 + complex.imag ** 2)
        let real = (this.real * complex.real + this.imag * complex.imag) / dNum
        let imag = (this.imag * complex.real - this.real * complex.imag) / dNum

        return new Complex(real, imag)
    }

    toString() {
        return this.real + "+" + this.imag + "i"
    }
}

class LinkedList {

    constructor() {
        this._head = null
        this._length = 0 // _开头的属性约定为私有属性，尽量在对象外部不修改或读取
    }

    get size() {
        return this._length
    }

    // 返回链表第idx个结点的值
    at(idx) {
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
    }

    // 设置链表第idx项的值为val
    set(idx, val) {
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

    }

    // 在链表末尾新增一个结点，值为val
    append(val) {
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
    }

    // 返回链表末尾结点的值，并删除末尾结点
    pop() {
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
    }

    // 在链表头部新增一个结点，值为val
    prepend(val) {
        let node = {
            val: val,
            next: this._head,
        }

        this._length++

        this._head = node

        return this._head
    }

    // 返回链表第一个结点的值，并删除这一个结点
    shift() {
        if (this._head == null) {
            return undefined
        }
        this._length--
        let res = this._head.val
        this._head = this._head.next

        return res
    }

    toArray() {
        let res = []
        let _head = this._head
        while (_head) {
            res.push(_head.val)
            _head = _head.next
        }

        return res
    }

    toString() {
        return this.toArray().join("->")
    }
}


// 表示一个集合（集合中元素没有序，但不能重复）
// 构造函数可选的可以传入集合中的初始值，但会被去重后存放
class MySet {
    constructor(initalValues = []) {
        this._elements = []
        for (let val of initalValues) {
            this.add(val)
        }
    }

    get size() {
        return this._elements.length
    }
    // 向集合中添加元素
    add(item) {
        if (!(this._elements.includes(item))) {
            this._elements.push(item)
        }
        return this
    }
    // 从集合中删除item元素
    delete(item) {

        let idx = this._elements.indexOf(item)
        if (idx >= 0) {
            this._elements.splice(idx, 1)
        }

        return this
    }

    // 清空集合中的所有元素
    clear() {
        this._elements = []

        return this
    }

    // 判断集合中是否存在某元素
    has(item) {
        return this._elements.includes(item)
    }
    // 遍历集合中的元素（顺序无所谓）
    forEach(func) {
        for (let val of this._elements) {
            func(val)
        }
    }
}



// 表示一个映射
// 这个映射中，可以把任何值映射到任何值，映射的key不限于字符串
class MyMap {
    constructor(initMaps = []) {
        this._pairs = []

        for (let pair of initMaps) {
            let key = pair[0]
            let val = pair[1]
            this.set(key, val)
        }
    }
    // 获取这个映射中映射对儿的数量
    get size() {
        return this._pairs.length >>> 1
    }

    // 设置映射中的key所对应的值为val
    set(key, val) {
        for (let i = 0; i < this._pairs.length; i += 2) {
            if (this._pairs[i] === key) {
                this._pairs[i + 1] = val
                return this
            }
        }

        this._pairs.push(key, val)
        return this
    }

    // 获取这个映射中key所对应的val
    get(key) {
        for (let i = 0; i < this._pairs.length; i += 2) {
            if (this._pairs[i] === key) {
                return this._pairs[i + 1]
            }
        }

        return undefined
    }

    // 判断这个映射中是否存在这个key的映射
    has(key) {
        for (let i = 0; i < this._pairs.length; i += 2) {
            if (this._pairs[i] === key) {
                return true
            }
        }

        return false
    }

    // 删除这个映射中key及其映射的值的这一对儿
    delete(key) {
        for (let i = 0; i < this._pairs.length; i += 2) {
            if (this._pairs[i] === key) {
                this._pairs.splice(i, 2)
                return this
            }
        }
    }

    // 清空这个映射中所有的映射对儿
    clear() {
        this._pairs = []
        return this
    }

    // 遍历这个映射中所有的映射对儿
    forEach(iterator) {
        for (let i = 0; i < this._pairs.length; i += 2) {
            iterator(this._pairs[i + 1], this._pairs[i])
        }
    }
}



// 表示一个栈：即后进先出，先进后出
class Stack {
    constructor() {
        this._elements = []
    }

    get size() {
        return this._elements.length
    }

    // 向栈中增加元素
    push(val) {
        this._elements.push(val)
    }
    // 从栈中取出元素并删除栈顶元素
    pop() {
        return this._elements.pop()
    }
    // 查看但不删除栈顶元素
    peek() {
        return this._elements[this._elements.length - 1]
    }
}



// 表示一个队列：即先进先出，后进后出
class Queue {
    constructor(capacity = 20) {
        this.capacity = capacity
        this.queue = new Array(capacity)
        this._head = 0 // 队列头部的索引
        this.tail = 0 // 队列尾部的索引
        this.len = 0 // 当前队列中的元素数量
    }

    get size() {
        return this.len
    }

    // 向队列中增加元素
    add(val) {
        if (this.len !== this.capacity) {
            this.queue[this.tail] = val
            this.tail = (this.tail + 1) % this.capacity
            this.len++
        } else {
            console.log("队列已满")
        }
    }
    // 从队头取出元素并删除队头元素
    pop() {
        if (this.len !== 0) {
            let val = this.queue[this._head]
            this.queue[this._head] = null
            this._head = (this._head + 1) % this.capacity
            this.len--
            return val
        } else {
            console.log("队列为空")
        }
    }
    // 查看队头元素（没有查看队尾元素的功能）
    peek() {
        return this.queue[_head]
    }
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
