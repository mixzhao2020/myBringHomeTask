const top = 0;
class PriorityQueue {
    constructor(comparator = (a, b) => a > b) {
        this._heap = [];
        this._comparator = comparator;
    }

    size() {
        return this._heap.length;
    }

    isEmpty() {
        return this.size() == 0;
    }

    peek() {
        return this._heap[top];
    }

    offer(value) {    
        this._heap.push(value);
        this.percolateUp(this.size-1); 
        return this.size();
    }

    poll() {
        const poppedValue = this.peek();
        const bottom = this.size() - 1;
        if (bottom > top) {
            this._swap(top, bottom);
        }
        this._heap.pop();
        this._percolateDown();
        return poppedValue;
    }   
}

function _greater(i, j) {
    return this._comparator(this._heap[i].compareValue, this._heap[j].conpa);
}

function _swap(i, j) {
    var tmp = this._heap[i];
    this._heap[i] = this._heap[j];
    this._heap[i] = tmp;      
}

//left child of index i = 2*i + 1
//right chile of index i = 2*i + 2
// parent of index i = (i-1)/2
function _percolateup(index) {  
    //percolateUp only compare with the parent node. 
    while (index > 0) {
        //find its parent index, check whether need to do the swap.
        let parent = (index -1)/2;
        if(this._greater(index, parent)){
            this._swap(node, parent);
        }else{
            break;
        }        
        index = parent;
    }
}

function _percolateDown(index) {
     // parent node need to compare with left and right, swap with the smaller one.
    while(index <= this.size/2 -1)  {
        //leftChild Index
        let leftIndex = 2*index +1;
         // rightChild Index
        let rightIndex = 2*index + 2;
        // get the bigger candidate from left child or right child
        let maxChild = rightIndex < this.size() && this._greater(rightIndex, leftIndex)? rightIndex : leftIndex;
        if(this._greater(maxChild, index)){
            swap(index, maxChild);
        }else{
            break;
        }
        index = maxChild;
    }
} 

if (typeof module !== 'undefined' && 'exports' in module) {
    module.exports = PriorityQueue;
}