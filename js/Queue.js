function Queue() {
    this.tail = 0;
    this.head = 0;
    this.queue = [];
};


Queue.prototype.isEmpty = function () {
    return this.tail == this.head;
};

Queue.prototype.push = function (x) {
    this.queue.push(x);
    this.tail++;
};

Queue.prototype.front = function () {
    if (!this.isEmpty()) {
        var ans = this.queue[this.head];
        return ans;
    }
};

Queue.prototype.pop = function () {
    this.head++;
};
