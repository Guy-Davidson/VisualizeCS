

export const db = [
    {
        id:0,
        difficulty:1,
        category:'Sorting',
        successfulSubmission: 1235,
        title:'Bubble Sort',
        description:'Bubble sort, is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order. The pass through the list is repeated until the list is sorted. The algorithm, which is a comparison sort, is named for the way smaller or larger elements "bubble" to the top of the list. Implement the algorithm to sort any given array.',
        hints:[{text:'Use two iterations, either for or while'}, {text:'Time: O(n^2) Space:O(1)'}],
        solutions:[{text:'sol 1', price:120, _id:0}, {text:'sol 2', price:120, _id:1}], 
        inputCode:'[5, 3, 1, 2, 4]',
        outputCode:'[1, 2, 3, 4, 5]',
        solutionDefault:'',
        maxEXP:1000,
        link: 'BubbleSort'
    }, 
    {
        id:1,
        difficulty:1,
        category:'Sorting',
        successfulSubmission:32454,
        title:'Merge Sort',
        description:'In computer science, merge sort (also commonly spelled as mergesort) is an efficient, general-purpose, and comparison-based sorting algorithm. Most implementations produce a stable sort, which means that the order of equal elements is the same in the input and output. Merge sort is a divide and conquer algorithm that was invented by John von Neumann in 1945.[2] A detailed description and analysis of bottom-up merge sort appeared in a report by Goldstine and von Neumann as early as 1948. Implement the algorithm to sort any given array.',
        hints:[{text:'Recursion can be effective in this algorithm.'}, {text:'Time: O(nlog(n)) Space:O(n)'}],
        solutions:[{text:'sol 1', price:120, _id:0}, {text:'sol 2', price:120, _id:1}], 
        inputCode:'[5, 3, 1, 2, 4]',
        outputCode:'[1, 2, 3, 4, 5]',
        solutionDefault:'',
        maxEXP:1000,
        link: 'MergeSort'
    },
    {
        id:2,
        difficulty:1,
        category:'Sorting',
        successfulSubmission:1235,
        title:'Quick Sort',
        description:'Quicksort is a divide-and-conquer algorithm. It works by selecting a pivot element from the array and partitioning the other elements into two sub-arrays, according to whether they are less than or greater than the pivot. For this reason, it is sometimes called partition-exchange sort.[4] The sub-arrays are then sorted recursively. This can be done in-place, requiring small additional amounts of memory to perform the sorting. Implement the algorithm to sort any given array.',
        hints:[{text:'Rotate the elements around the pivot, and continue for the left and right parts'}, {text:'Time: O(nlog(n)) Space:O(n)'}],
        solutions:[{text:'sol 1', price:120, _id:0}, {text:'sol 2', price:120, _id:1}], 
        inputCode:'function bubbleSort(array) ...',
        inputCode:'[5, 3, 1, 2, 4]',
        outputCode:'[1, 2, 3, 4, 5]',
        maxEXP:1000,
        link:"QuickSort"
    }, 
    {
        id:3,
        difficulty:3,
        category:'Algorithms',
        successfulSubmission:524,
        title:'DFS',
        description:'Depth-first search (DFS) is an algorithm for traversing or searching tree or graph data structures. The algorithm starts at the root node (selecting some arbitrary node as the root node in the case of a graph) and explores as far as possible along each branch before backtracking. Implement the algorithm to search and store any element in the graph.',
        hints:[{text:'Recursion can be effective in this algorithm.'}, {text:'Time: O(n) Space:O(n)'}],
        solutions:[{text:'sol 1', price:120, _id:0}, {text:'sol 2', price:120, _id:1}], 
        inputCode:'Graph: A \n \t   /  \\ \n \t B   C \n        /  \t  \n     D',
        outputCode:"['A', 'B', 'D', 'C']",
        solutionDefault:'',
        maxEXP:4000,
        link:"DFS"
    },
    {
        id:4,
        difficulty:3,
        category:'Algorithms',
        successfulSubmission:145,
        title:'BFS',
        description:'Breadth-first search (BFS) is an algorithm for searching a tree data structure for a node that satisfies a given property. It starts at the tree root and explores all nodes at the present depth prior to moving on to the nodes at the next depth level. Extra memory, usually a queue, is needed to keep track of the child nodes that were encountered but not yet explored. Implement the algorithm to search and store any element in the graph.',
        hints:[{text:'An iterative approach can be effective in this algorithm.'}, {text:'Time: O(n) Space:O(n)'}],
        solutions:[{text:'sol 1', price:120, _id:0}, {text:'sol 2', price:120, _id:1}], 
        inputCode:'function bubbleSort(array) ...',
        inputCode:'Graph: A \n \t   /  \\ \n \t B   C \n        /  \t  \n     D',
        outputCode:"['A', 'B', 'C', 'D']",
        maxEXP:4000,
        link:"BFS"
    },
]