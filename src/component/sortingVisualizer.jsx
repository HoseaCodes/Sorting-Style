import React from 'react';
import './sortingVisualizer.css';
import { randomIntFromInterval, mergeSort, arraysAreEqual } from '../util';

class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            array: [],
        }
    }

    componentDidMount() {
        this.resetArray();
        this.changeColor();
    }

    resetArray() {
        const array = [];
        for (let i = 0; i < 300; i++) {
            array.push(randomIntFromInterval(5, 730));
        }
        this.setState({ array });
    }

    changeColor() {
        const random_hex_color_code = (Math.random() * 0xfffff * 1000000).toString(16);
        return '#' + random_hex_color_code.slice(0, 6);
    };
    mergeSort() {
        const animations = mergeSort(this.state.array);
        // const newAnimations = [];
        // for (const animation of animations) {
        //     newAnimations.push(animation.comparison);
        //     newAnimations.push(animation.comparison);
        //     newAnimations.push(animation.swap);
        // }
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const isColorChange = i % 3 !== 2;
            if (isColorChange) {
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color = i % 3 === 0 ? 'red' : 'blue';
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * 10);
            } else {
                setTimeout(() => {
                    const [barOneIdx, newHeight] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    barOneStyle.height = `${newHeight}px`;
                }, i * 10)
            }
        }

        const javascriptSortedArray = this.state.array
            .slice()
            .sort((a, b) => a - b);
        const sortedArray = mergeSort(this.state.array);
        console.log(arraysAreEqual(javascriptSortedArray, sortedArray))
    }

    testSortingAlgorithms() {
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

    render() {
        const { array } = this.state;

        return (
            <>
                <div className="btn-styles">
                    <button className="btn" onClick={() => this.resetArray()}>Generate New Array</button>
                    <button className="btn" onClick={() => this.changeColor()}>Change Color</button>
                    <button className="btn" onClick={() => this.mergeSort()}>Merge Sort</button>
                    <button className="btn" onClick={() => this.testSortingAlgorithms()}>Test Algorithms</button>
                </div>
                <div className="array-container">
                    {array.map((value, idx) => (
                        <div
                            className="array-bar"
                            key={idx}
                            style={{ height: `${value}px` }}
                        >
                        </div>
                    ))}
                </div>
            </>
        )
    }
}

export default SortingVisualizer;