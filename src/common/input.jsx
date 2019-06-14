import React from "react";
// using below approach to define Input, we are repeating -
//const Input = ({ type, name, label, value, error, onChange }) => {
//name={name}
//onChange={onChange}
//type={type}
//value={value} // value={this.state.account.username} is used to tell that this component will take value from 'props'

//NOTE: If you are using {...rest} make sure you have 'name:{name}' otherwise {...rest} will not work
//because {...rest} includes all other properties other than "name", "label","error"
const Input = ({ name, label, error, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input {...rest} name={name} id={name} className="form-control" />
      {error && <div className="alert alert-danger"> {error}</div>}
    </div>
  );
};

export default Input;
