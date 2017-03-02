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
