import React, {Component} from "react";
import {Messages} from "primereact/messages";
import {Card} from "primereact/card";
import {InputText} from "primereact/inputtext";
import {classNames} from "primereact/utils";
import {Button} from "primereact/button";
import validator from 'validator'
import {CustomerService} from "../service/CustomerService";
import axios from "axios";

export class User extends Component {

    newUser = {
        name : "",
        middleName: "",
        lastName: "",
        email: "",
        phone: ""
    }

    constructor(props) {
        super(props);
        this.state = {
            submitted: false,
            user: this.newUser
        }

        this.customerService = new CustomerService();

        this.register = this.register.bind(this);
        this.showSuccess = this.showSuccess.bind(this);
        this.showError = this.showError.bind(this);


    }

    onInputChange(e, name) {
        const val = (e.target && e.target.value) || '';
        let user = {...this.state.user};
        user[`${name}`] = val;

        this.setState({ user });
    }

    async register() {
        let state = {submitted: true};

        if (this.state.user.name.trim() && this.state.user.lastName.trim() && this.state.user.email.trim() && this.state.user.phone.trim()) {
            let user = {...this.state.user};
            if (validator.isEmail(user.email)) {
                let res = await this.customerService.postCustomer(user);
                if (Object.keys(res).length !== 0) {
                    this.showSuccess();
                } else {
                    this.showError();
                }
            }
        }
        this.setState(state);
    }

    showSuccess() {
        this.messages.show({
            severity: 'success',
            summary: 'New User    ',
            detail: 'You have successfully registered'
        });
    }

    showError() {
        this.messages.show({
            severity: 'error',
            summary: 'Impossible create account ',
            detail: 'Email has already been registered '
        });
    }


    render() {

        const productDialogFooter = (
            <React.Fragment>
                <div style={{ display: "flex" }}>
                    <Button label="Register" icon="pi pi-check" className="p-button-success mr-2"  style={{ marginLeft: "auto" }} onClick={this.register} />
                </div>
            </React.Fragment>
        );

        return (
            <div style={{width:'80%', margin:'0 auto', marginTop:'40px'}}>
                <Messages ref={el => (this.messages = el)} />
                <Card title="Register" footer={productDialogFooter} >
                    <div className="col-12 md:col-4">
                        <label htmlFor="name">Name</label>
                        {this.state.submitted && !this.state.user.name && <small className="p-error">Your name is required.</small>}
                        <div className="p-inputgroup">
                            <InputText id="name"
                                       value={this.state.user.name}
                                       onChange={(e) => this.onInputChange(e, "name")}
                                       required
                                       className={classNames({ 'p-invalid': this.state.submitted && !this.state.user.name })}/>
                        </div>
                        <label htmlFor="midName">Middle Name</label>
                        <div className="p-inputgroup">
                            <InputText id="midName"
                                       value={this.state.user.middleName}
                                       onChange={(e) => this.onInputChange(e, 'middleName')}/>
                        </div>
                        <label htmlFor="lastName">Last Name</label>
                        {this.state.submitted && !this.state.user.lastName && <small className="p-error">Your Last Name is required.</small>}
                        <div className="p-inputgroup">
                            <InputText id="lastName"
                                       value={this.state.lastName}
                                       onChange={(e) => this.onInputChange(e, "lastName")}
                                       required
                                       className={classNames({ 'p-invalid': this.state.submitted && !this.state.user.lastName })}/>
                        </div>
                        <label htmlFor="Email">Email</label>
                        {this.state.submitted && !this.state.user.email && <small className="p-error">Your Email is required.</small>}
                        {this.state.submitted && !validator.isEmail(this.state.user.email) && <small className="p-error">Ingres a valid Email.</small>}
                        <div className="p-inputgroup">
                            <InputText id="Email"
                                       value={this.state.user.email}
                                       onChange={(e) => this.onInputChange(e, "email")}
                                       required
                                       className={classNames({ 'p-invalid': this.state.submitted && !this.state.user.email })}/>
                        </div>
                        <label htmlFor="Phone">Phone</label>
                        {this.state.submitted && !this.state.user.phone && <small className="p-error">Your Phone is required.</small>}
                        <div className="p-inputgroup">
                            <InputText id="Phone"
                                       value={this.state.user.phone}
                                       onChange={(e) => this.onInputChange(e, "phone")}
                                       required
                                       className={classNames({ 'p-invalid': this.state.submitted && !this.state.user.phone })}/>
                        </div>
                    </div>
                </Card>
            </div>
        );
    }
}

export default User;