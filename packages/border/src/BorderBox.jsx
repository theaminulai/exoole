import React from 'react';
import PropTypes from 'prop-types';

const BorderBox = ({ children, width = '1px', style = 'solid', color = 'black', padding = '10px' }) => {
    return (
        <div style={{ border: `${width} ${style} ${color}`, padding }}>
            {children}
        </div>
    );
};

BorderBox.propTypes = {
    children: PropTypes.node,
    width: PropTypes.string,
    style: PropTypes.string,
    color: PropTypes.string,
    padding: PropTypes.string,
};

export default BorderBox;
