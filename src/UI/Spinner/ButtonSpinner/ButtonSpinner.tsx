import React from 'react';
import './ButtonSpinner.css';

const ButtonSpinner = () => {
    return (
        <>
            <button className="buttonload">
                <i className="fa fa-refresh fa-spin"></i>Loading
            </button>
        </>
    );
};

export default ButtonSpinner;