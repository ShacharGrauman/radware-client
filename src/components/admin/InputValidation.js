import React from 'react';
const Input = ({ ref, name, type, lable, value, error, onChange }) => {

    return (
        <div className="mb-3">
            <label htmlFor={name}>{lable}</label>
            <input
                size="145"
                defaultValue={value}
                onChange={onChange}
                id={name}
                name={name}
                type={type}
                ref={ref}
            /> {error && <div style={{ color: "red" }} >{error}</div>}
        </div>
    );
};

export default Input;