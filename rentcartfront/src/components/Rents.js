import React, {Component} from "react";
import {classNames} from 'primereact/utils';
import {Card} from "primereact/card";
import {Button} from "primereact/button";
import {InputText} from "primereact/inputtext";
import { Messages } from 'primereact/messages';
import {RentService} from "../service/RentService";
import validator from 'validator'
import {Dialog} from "primereact/dialog";


export class Rents extends Component {

    emptyRent = {
        rental_id: 0,
        vin: '',
        client_id: '',
        totalAmount: 0.0,
        rentalDate: null,
        returnDate: null,
        statu: false
    };

    constructor(props) {
        super(props);

        this.state = {
            id_email:'',
            submitted: false,
            searchValid: false,
            rent: this.emptyRent,
            rents: {},
            rentDialog: false
        }

        this.rentService = new RentService();

        this.searchRent = this.searchRent.bind(this);
        this.hideDialog = this.hideDialog.bind(this);
        this.showError = this.showError.bind(this);
        this.showErrorID = this.showErrorID.bind(this);
        this.showExist = this.showExist.bind(this);
        this.showNotExist = this.showNotExist.bind(this);
        this.returnCar = this.returnCar.bind(this);
        this.showReturnCar = this.showReturnCar.bind(this);


    }

    onInputChange(e) {
        this.setState({id_email:((e.target && e.target.value) || '').trim()});
    }

    async searchRent() {
        this.setState({submitted:true});
        this.setState({rent:''});
        if (this.state.id_email) {
            if (validator.isInt(this.state.id_email)) {
                await this.rentService.getRentId(this.state.id_email).then(data => {
                    this.setState({rent: data})
                });
                if (this.state.rent) {
                    this.setState({rentalDate: this.state.rent.rentalDate.slice(0, 10)});
                    this.setState({returnDate: this.state.rent.returnDate.slice(0, 10)});
                    if (this.state.rent.statu) {
                        this.setState({status: "RENTED"});
                    } else {
                        this.setState({status: "RETURNED"});
                    }
                    this.state.rentDialog = true;
                    this.showExist();
                } else {
                    this.showNotExist();
                }
            } else {
                this.showErrorID();
            }
        } else {
            this.showError();
        }
    }

    showExist() {
        this.messages.show({
            severity: 'info',
            summary: ' ',
            detail: '\n This rent exist.'
        });
    }

    showNotExist() {
        this.messages.show({
            severity: 'warn',
            summary: 'Warn ',
            detail: '\n This rent does not exist.'
        });
    }

    showError() {
        this.messages.show({
            severity: 'error',
            summary: 'Error id-email: ',
            detail: ' It is necessary and ID or your email'
        });
    }

    showErrorID() {
        this.messages.show({
            severity: 'error',
            summary: 'Error id ',
            detail: ' Invalid ID'
        });
    }

    showReturnCar() {
        this.messages.show({
            severity: 'success',
            summary: ' ',
            detail: 'Car returned'
        });
    }

    hideDialog() {
        this.setState({
            submitted: false,
            rentDialog: false
        });
    }

    async returnCar() {
        this.setState({
            submitted: false,
            rentDialog: false
        });
        console.log(this.state.rent.rental_id);
        await this.rentService.returnCar(this.state.rent.rental_id);
        this.showReturnCar();
    }

    render() {

        const productDialogFooter = (
            <React.Fragment>
                <Button label="Return" icon="pi pi-times" className="p-button-danger" onClick={this.returnCar} />
            </React.Fragment>
        );

        return (
            <div style={{width:'80%', margin:'0 auto', marginTop:'40px'}}>
                <Messages ref={el => (this.messages = el)} />
                <Card title="My Rent" footer={this.footerCard}>
                    <div className="col-12 md:col-4">
                        <div className="p-inputgroup">
                            <InputText id="id_email"
                                       onChange={(e) => this.onInputChange(e)}
                                       required autoFocus
                                       className={classNames({ 'p-invalid': this.state.submitted && !this.state.id_email })}/>
                            <Button icon="pi pi-search" className="p-button-success" onClick={this.searchRent}/>
                        </div>
                    </div>
                </Card>
                <Dialog visible={this.state.rentDialog} style={{ width: '450px' }} header="Rent Details" modal className="p-fluid"  onHide={this.hideDialog}
                        footer={productDialogFooter}>
                    <div className="field">
                        <label htmlFor="name">Rent ID:</label>
                        <InputText id="name" value={this.state.rent.rental_id}  disabled />
                    </div>

                    <div className="field">
                        <label htmlFor="name">Car ID: </label>
                        <InputText id="name" value={this.state.rent.vin} disabled />
                    </div>

                    <div className="field">
                        <label htmlFor="name">Email: </label>
                        <InputText id="name" value={this.state.rent.client_id} disabled />
                    </div>

                    <div className="field">
                        <label htmlFor="name">From: </label>
                        <InputText id="name" value={this.state.rentalDate} disabled />
                    </div>

                    <div className="field">
                        <label htmlFor="name">To: </label>
                        <InputText id="name" value={this.state.returnDate} disabled />
                    </div>

                    <div className="field">
                        <label htmlFor="name">Status: </label>
                        <InputText id="name" value={this.state.status} disabled />
                    </div>

                    <div className="field">
                        <label htmlFor="name">Total: </label>
                        <InputText id="name" value={this.state.rent.totalAmount} disabled />
                    </div>
                </Dialog>
            </div>
        );
    }
}

export default Rents;