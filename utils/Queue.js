class Queue {
  items

  constructor() {
    this.items = []
  }

  enqueue(item) {
    this.items.push(item)
  }

  dequeue() {
    return this.items.shift()
  }

  isEmpty() {
    return this.size() === 0
  }

  size() {
    return this.items.length
  }
}

exports.default = Queue
