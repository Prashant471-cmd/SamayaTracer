import React, { useState, useEffect } from 'react';
import './Tracker.css';

const initialValue = 0;

export default function Tracker() {
    const [count, setCount] = useState(initialValue);

    // Load from localStorage
    useEffect(() => {
        const saved = localStorage.getItem('trackerCount');
        if (saved !== null) setCount(Number(saved));
    }, []);

    // Save to localStorage
    useEffect(() => {
        localStorage.setItem('trackerCount', count);
    }, [count]);

    const reset = () => {
        setCount(initialValue);
        localStorage.removeItem('trackerCount');
    };

    return (
        <div className="tracker">
            <h2>Counter Tracker</h2>
            <div className="count">{count}</div>
            <button onClick={() => setCount(c => c + 1)}>Increment</button>
            <button onClick={reset}>Reset</button>
        </div>
    );
}
