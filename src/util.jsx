export function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

export function mergeSort(array) {
    const animations = [];
    if (array.length <= 1) return array;
    const auxiliaryArray = array.slice();
    mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
    return animations;
}

function mergeSortHelper(mainArray, startIdx, endIdx, auxiliaryArray, animations) {
    if (startIdx === endIdx) return
    const middleIdx = Math.floor((startIdx + endIdx) / 2);
    mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
    mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations)
    doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

function doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations) {
    let k = startIdx;
    let i = startIdx;
    let j = middleIdx + 1;
    while (i <= middleIdx && j <= endIdx) {
        animations.push([i, j]);
        animations.push([i, j]);
        // const animation = {};
        // animation.comparison = [i, j];
        if (auxiliaryArray[i] <= auxiliaryArray[j]) {
            animations.push([k, auxiliaryArray[j]]);
            // animation.swap = [k, i];
            mainArray[k++] = auxiliaryArray[i++];
        } else {
            animations.push([k, auxiliaryArray[j]]);
            // animation.swap = [k, j];
            mainArray[k++] = auxiliaryArray[j++];
        }
        // animations.push(animation);
    }
    while (i <= middleIdx) {
        // animations.push({
        //     comparison: [i, i],
        //     swap: [k, i]
        // });
        animations.push([i, i]);
        animations.push([i, i]);
        animations.push([k, auxiliaryArray[i]]);
        mainArray[k++] = auxiliaryArray[i++];
    }
    while (j <= endIdx) {
        // animations.push({
        //     comparison: [j, i],
        //     swap: [k, j]
        // });
        animations.push([j, j])
        animations.push([j, j])
        animations.push([k, auxiliaryArray[j]])
        mainArray[k++] = auxiliaryArray[j++];
    }
}

export function arraysAreEqual(arrayOne, arrayTwo) {
    if (arrayOne.length !== arrayTwo.length) return false;
    for (let i = 0; i < arrayOne.length; i++) {
        if (arrayOne[i] !== arrayTwo[i]) return false;
    }
    return true;
}

export function testSortingAlgorithms() {
    for (let i = 0; i < 100; i++); {
        const array = [];
        const arrayLength = randomIntFromInterval(1, 1000)
        for (let i = 0; i < arrayLength; i++) {
            array.push(randomIntFromInterval(-1000, 1000))
        }
        const javascriptSortedArray = array.slice().sort((a, b) => a - b);
        const sortedArray = mergeSort(array);
        console.log(arraysAreEqual(javascriptSortedArray, sortedArray))
    }
}