# Sorting Algorithms

## Bubble Sort

An inefficient algorithm - Big O of `O(n^2)` - but a useful learning tool. Two loops run through all numbers in the array, comparing adjacent pairs and swapping if current > next. In each pass, the next-largest number "bubbles" to the end of the array.

```javascript
function bubbleSort(arr){
	var swapped;
	do {
  	swapped = false;
  	for (let i = 0; i < arr.length; i++){
    	if (arr[i] > arr[i+1]){
      	let temp = arr[i];
        arr[i] = arr[i+1];
        arr[i+1] = temp;
        swapped = true;
      }
    }
  } while(swapped);

  return arr;
}
```


## Insertion Sort

Slightly better than Bubble Sort, but still `O(n^2)`. Has a much more favorable outcome if the list is already partially sorted. The algorithm breaks the main array into a progressively more sorted sub-array.

## Merge Sort

Merge Sort is an effective recursive sorting algorithm that underlies the native JavaScript `sort` method. It breaks an array into two parts, then those two parts into four etc. all the way down until arrays of one element. Then it stitches them back together to form a fully sorted array.


**References**

* [www.bigocheatsheet.com](http://www.bigocheatsheet.com/)
