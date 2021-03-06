import React from 'react';
import Joi from 'joi-browser'
import Input from './InputValidation';
import { Redirect } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import PermissionsTable from './PermissionsTable';
import { editRole } from '../../api/controllers/admin';
import { getRoleWithId } from '../../api/controllers/admin';
import NotificationIsCreated from './NotificationIsCreated';

class EditRole extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cancelClicked: false,
            id: [],
            role: [],
            perId: [],
            errors: {},
            message: '',
            isEditRole: true,
            ifRoleUpdated: false,
            checkBoxError: false,
            account: { rolename: '', description: '', permissions: [] },
        };
    }

    schema = {
        rolename: Joi.string().required().label("rolename"),
        description: Joi.string().required().label("description")
    }
    validate = () => {
        const options = { abortEarly: false };
        const { error } = Joi.validate(this.state.account, this.schema, options);
        if (!error)
            return null;
        const errors = {};
        for (let item of error.details)
            errors[item.path[0]] = item.message;
        return errors;
    }

    validateProperty = ({ name, value }) => {
        const obj = { [name]: value };
        const schema = { [name]: this.schema[name] };
        const { error } = Joi.validate(obj, schema)
        return error ? error.details[0].message : null;
    }

    renderRedirect = () => {
        this.setState({
            cancelClicked: true
        });
    }

    registerClick = async e => {
        e.preventDefault();
        const errors = this.validate();
        this.setState({ errors: errors || {} });
        if (errors.description)
            return
        let dataRole = {
            name: this.state.account.rolename,
            description: this.state.account.description,
            permissions: this.state.perId
        }
        if (this.state.perId.length > 0) {
            try {
                this.setState({ checkBoxError: false })
                await editRole(this.state.id, dataRole);
                this.setState({ ifRoleUpdated: true });
            }
            catch (error) {
                this.setState({ message: "Something went wrong... Please try again " });
            }
        } this.setState({ checkBoxError: true })
    }

    async componentDidMount() {
        const id = window.location.pathname.split('/')[2];
        this.setState({ id });
        const role = await getRoleWithId(id);
        let selectedpermissionId = [];
        role.permissions.map(permission => selectedpermissionId.push(permission.id));
        this.setState({ perId: selectedpermissionId });
        this.setState({ role });
        this.setState({
            account: {
                rolename: this.state.role.name,
                description: this.state.role.description,
                permissions: this.state.perId
            }
        })
    }

    onChangeHandler = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const unsavedData = { ...this.state, [target.name]: value };
        this.setState(unsavedData);
    }

    onPermissionSelect = permissionId => {
        if (this.state.perId.includes(permissionId)) {
            this.setState({
                perId: [
                    ...this.state.perId.filter(pid => pid != permissionId)
                ]
            })

        } else {
            this.setState({
                perId: [...this.state.perId, permissionId]
            });
        }
    }

    handleChangeInput = ({ currentTarget: input }) => {
        const errors = { ...this.state.errors };
        const errorMessage = this.validateProperty(input);
        if (errorMessage) errors[input.name] = errorMessage;
        else delete errors[input.name];
        const account = { ...this.state.account };
        account[input.name] = input.value;
        this.setState({ account, errors });
    };

    render() {
        const { account, errors } = this.state;
        if (this.state.ifRoleUpdated) {
            return (
                <NotificationIsCreated ifRoleUpdated={this.state.ifRoleUpdated} />
            )
        }
        return (
            <>
                <div className="container" >
                    <div className="row mt-2" >
                        <div className="col-md-12 ml-4 " style={{ fontFamily: "cursive", fontSize: "30px" }}>
                            <h1>Edit Role</h1>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            {this.state.cancelClicked && <Redirect to='/admin/roles' />}
                            <form className="ml-3" onSubmit={this.handleSumbit}>
                                <div className="scheduler-border">
                                    <h4 className="scheduler-border font-weight-light pb-2 ml-2" style={{ fontFamily: "cursive", fontSize: "20px" }}><u>Role info</u></h4>

                                    <div className="form-group mt-2 ml-2">
                                        <label htmlFor="rolename">Role Name : </label>
                                        <input className="form-control"
                                            name="rolename"
                                            type="text"
                                            id="fName"
                                            onChange={this.handleChangeInput}
                                            defaultValue={this.state.account.rolename}
                                            error={errors.name}
                                            readOnly={true}
                                        />

                                    </div>

                                    <div className="form-group ml-2">
                                        <label htmlFor="lName">Description : </label>
                                        <Input
                                            className="form-control"
                                            name="description"
                                            type="text"
                                            id="lName"
                                            value={account.description}
                                            onChange={this.handleChangeInput}
                                            error={errors.description}
                                        />

                                    </div>
                                    <p className="ml-2">Select Permission :</p>
                                    {this.state.account.permissions.length &&

                                        <PermissionsTable
                                            onSelect={this.onPermissionSelect}
                                            role={this.state.role}
                                            isEdit={this.state.isEditRole}
                                        />

                                    }
                                    {this.state.checkBoxError && <div className="mb-3" style={{ color: "red" }}>
                                        Please select at least 1 permission
                                        </div>
                                    }
                                </div>
                                <button type="button" onClick={this.registerClick} className="btn btn-secondary btn-block" >Save</button>
                                <button type="button" onClick={() => this.renderRedirect("users")} className="btn btn-secondary  btn-block">Cancel</button>

                            </form>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default withRouter(EditRole);