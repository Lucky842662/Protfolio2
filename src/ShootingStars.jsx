import React from 'react';
import './ShootingStars.css';

const ShootingStars = ({ lineCount = 10 }) => {
    // Generate array of lines based on lineCount
    const lines = Array.from({ length: lineCount }, (_, index) => index + 1);

    return (
        <div className="lines-container">
            <div className="lines">
                {lines.map((lineNumber) => (
                    <div key={lineNumber} className="line"></div>
                ))}
            </div>
        </div>
    );
};

export default ShootingStars;