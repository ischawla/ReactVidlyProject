import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "../common/input";
import Select from "../common/select";
class Form extends Component {
  state = {
    data: {},
    errors: {}
  };

  validate = () => {
    const result = Joi.validate(this.state.data, this.schema, {
      abortEarly: false
    });
    console.log("result>>>>>>", result);
    const errors = {};
    if (!result.error) return null;

    for (let item of result.error.details) {
      errors[item.path[0]] = item.message;
    }
    return errors;
  };

  validateInput = ({ name, value }) => {
    //Here we can not validate like below because it will validate the entire form by passing 'this.state.data' -
    //Joi.validate(this.state.data, this.schema);
    // so we have to create a dummy obj which will have single property. And name of the property will be input.name (dynamically)
    // but we dont want to hardcode 'name' as 'username', instead we will use computed property
    const obj = { [name]: value };

    //Similary we can not 'this.schema', we need to pass schema for single input
    const schema = { [name]: this.schema[name] };

    // we will pick error property from the result object
    const { error } = Joi.validate(obj, schema);

    return error ? error.details[0].message : null;
  };

  handleSubmit = e => {
    e.preventDefault();
    const errors = this.validate();
    console.log(errors);
    this.setState({ errors: errors || {} });
    if (errors) return;
    this.doSubmit();
  };

  //NOTE: when we want to work with property of an object DYNAMICALLY, USE [] notation.
  // e.currentTarget is restructured to 'input' because e.currentTarget returns an input field.
  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateInput(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
  };

  renderButton = label => {
    return (
      <button disabled={this.validate()} className="btn btn-primary">
        {label}
      </button>
    );
  };

  //passing type='text' means by default it would be text. if you want to make password input, pass 'password' as 3rd parameter
  renderInput = (name, label, type = "text") => {
    const { data, errors } = this.state;
    return (
      <Input
        name={name}
        type={type}
        label={label}
        value={data[name]}
        error={errors[name]}
        onChange={this.handleChange}
      />
    );
  };

  renderSelect(name, label, options) {
    const { data, errors } = this.state;
    return (
      <Select
        name={name}
        value={data[name]}
        label={label}
        options={options}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }
}

export default Form;
