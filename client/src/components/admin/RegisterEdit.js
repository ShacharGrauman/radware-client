
import React from 'react';
import Table from './RolesDashboard';
import MyTable from '../shared/MyTable';
import Joi from 'joi-browser'
import Input from './input';
import { Redirect } from 'react-router-dom'
import axios from 'axios';
import { putUser } from '../../api/controllers/admin';

export default class RegisterEdit extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            account: { name:"", username: "", phone: "", status: "active", password: "" },
            errors: {},
            orgRoles: [],
            roles: [],
            userdata:[],
            user:this.props.user
        };
   
       

    }




    tableHeaders = ["Select Roles", "Selected Roles"];

    renderRedirect = () => {
        this.setState({
            cancelClicked: true
        });
    }

    schema = {
        name: Joi.string().required().label("Name"),
        //lastname: Joi.string().required().label("Lastname"),
        phone: Joi.string().trim().regex(/[0-9]/).max(10).min(10).label('Phone Number'),
        username: Joi.string().required().email().label("Email"),
        // password: Joi.string().required().min(5).alphanum().label("Password"),
        password: Joi.string().min(6).max(20).required().label("password"),


    }


    
        

    rolesData = [
        { rolename: "Researcher", selected: <input type="checkbox" name="myTextEditBox" value="checked" /> },
        { rolename: "Support", selected: <input type="checkbox" name="myTextEditBox" value="checked" /> },
        { rolename: "Manual QA", selected: <input type="checkbox" name="myTextEditBox" value="checked" /> },
        { rolename: "Performance QA", selected: <input type="checkbox" name="myTextEditBox" value="checked" /> },
        { rolename: "Automation QA", selected: <input type="checkbox" name="myTextEditBox" value="checked" /> }

    ];
    tableHeaders = ["Roles", "Select"];





    validate = () => {
        const options = { abortEarly: false }
        const { error } = Joi.validate(this.state.account, this.schema, options);

        if (!error) return null;
        const errors = {};
        for (let item of error.details)
            errors[item.path[0]] = item.message;
        return errors;

    };

    validateProperty = ({ name, value }) => {
        const obj = { [name]: value };
        const schema = { [name]: this.schema[name] };
        const { error } = Joi.validate(obj, schema)
        return error ? error.details[0].message : null;


    }

    componentWillReceiveProps (nextProps){
        this.setState({account:{
            name:nextProps.user.name,
            username:nextProps.user.username,
            phone:nextProps.user.phone
        }})
        }

    handleSumbit = async e => {

        e.preventDefault();
        const errors = this.validate();//method return object looks like error 
        this.setState({ errors: errors || {} });//we render the object errors  in the setstate 
      //   if (errors) return;
      const id = this.props.id

        const user = {
             name: this.state.account.name,
            status:this.state.account.status,
            username: this.state.account.username,
            phone: this.state.account.phone,
            password: this.state.account.password
        };
    
        const data = await putUser(id.id)
        // axios.put(`http://localhost:3001/users/${id.id}`, user)
        //     .then(response => {
                
        //         console.log(response)
        //         console.log(response.data);
        //     })
        //     .catch(error => {
        //         console.log(error)
        //     })
    };

    handleChange = ({ currentTarget: input }) => {
        const errors = { ...this.state.errors };
        const errorMessage = this.validateProperty(input);
        if (errorMessage) errors[input.name] = errorMessage;
        else delete errors[input.name];

        const account = { ...this.state.account };
        account[input.name] = input.value;
        this.setState({ account, errors });
        console.log(this.state.account)
    };
    
 
 


    render() {
        const { account, errors} = this.state;

        return (
            <>

 
                {this.state.cancelClicked && <Redirect to='/users' />}
                <form className="ml-3" onSubmit={this.handleSumbit}>


                    <fieldset className="scheduler-border">
                        <legend className="scheduler-border">Personal info</legend>
                        <div className="form-group mt-2 ml-2">
                            <label htmlFor="firstname"> name : </label>
                            <Input className="form-control"
                                type="text"
                                id="name"
                                name="name"
                                value={this.state.account.name}
                                onChange={this.handleChange}
                                error={errors.name}
                            />
               

                        </div>

                    

                        <div className="form-group ml-2">
                            <label htmlFor="Rphone">Phone :</label>
                            <Input className="form-control"
                                type="text"
                                id="phone"
                                name="phone"
                                value={this.state.account.phone}
                                onChange={this.handleChange}
                                error={errors.phone} />
                        </div>
                    </fieldset>


                    <fieldset className="scheduler-border">
                        <legend className="scheduler-border">User info</legend>
                        <div className="form-group ml-2">
                            <label htmlFor="Remail">Email address :</label>
                            <Input className="form-control"
                                type="email"
                                className="form-control"
                                id="username"
                                name="username"
                                placeholder="name@example.com"
                                value={this.state.account.username}
                                onChange={this.handleChange}
                                error={errors.username}
                            />
                            <small className="form-text text-muted">This will be used as username.</small>
                        </div>

                        <div className="form-group ml-2">
                            <label htmlFor="PassReg">Password :</label>
                            <Input

                                type="password"
                                name="password"
                                id="password"
                                className="form-control"
                                value={this.props.user.password}
                                onChange={this.handleChange}
                                disabled
                                error={errors.password}
                                ref="password"
                            />
                            <small id="passwordHelp" className="form-text text-muted">Must be 6 at least 6 letters.</small>
                        </div>


                        <p className="ml-2">Select role :</p>


                        <MyTable
                            header={this.tableHeaders}
                            // data={this.rolesData}
                            data={this.state.roles}
                            sortDataByKey={(sortKey) => this.SortByKey(sortKey)}
                            className="col-lg-12 col-md-12 col-sm-12 col-xs-12" >key={this.state.roles.ID}</MyTable>


                    </fieldset>

                    <button  className="btn btn-secondary btn-block" >Save</button>
                    <button type="button" onClick={() => this.renderRedirect("users")} className="btn btn-secondary  btn-block">Cancel</button>

                </form>
            </>
        );
    }
}