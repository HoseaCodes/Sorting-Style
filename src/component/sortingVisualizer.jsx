import React from 'react';
import './sortingVisualizer.css';
import { randomIntFromInterval } from '../util';

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

    mergeSort

    render() {
        const { array } = this.state;

        return (
            <>
                <button onClick={() => this.resetArray()}>Generate New Array</button>
                <button onClick={() => this.changeColor()}>Change Color</button>
                <button onClick={() => this.mergeSort()}>Merge Sort</button>
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