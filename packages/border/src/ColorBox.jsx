import React from 'react';
import PropTypes from 'prop-types';

const ColorBox = ({ color = 'lightgray', width = '100px', height = '100px' }) => {
    return (
        <div style={{ backgroundColor: color, width, height }} />
    );
};

ColorBox.propTypes = {
    color: PropTypes.string,
    width: PropTypes.string,
    height: PropTypes.string,
};

export default ColorBox;
