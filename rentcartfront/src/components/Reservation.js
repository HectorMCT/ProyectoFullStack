import React from "react";

import { Button } from "primereact/button";
import {Card} from "primereact/card";
import {Calendar} from "primereact/calendar";
import {Dropdown} from "primereact/dropdown";
import {Panel} from "primereact/panel";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {Dialog} from "primereact/dialog";
import {InputText} from "primereact/inputtext";
import {CustomerService} from "../service/CustomerService";
import {CarService} from "../service/CarService";
import { Toast } from 'primereact/toast';

import 'primereact/resources/themes/bootstrap4-dark-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import {RentService} from "../service/RentService";



export class Reservation extends React.Component {

    emptyCar = {
        VIN: '',
        category: '',
        make: '',
        model: '',
        year: 0,
        color: '',
        price: 0,
        description: ''
    };

    constructor(props) {
        super(props);

        let today = new Date();
        let month = today.getMonth();
        let year = today.getFullYear();
        let nextMonth = month === 11 ? 0 : month + 1;
        let nextYear = nextMonth === 0 ? year + 1 : year;

        let minDate = new Date();
        let maxDate = new Date();
        maxDate.setMonth(nextMonth);
        maxDate.setFullYear(nextYear);
        let maxDateS = new Date();
        maxDateS.setMonth(nextMonth+4);
        maxDateS.setFullYear(nextYear);

        this.state = {
            dateStart: new Date(),
            dateEnd: null,
            minDate: minDate,
            maxDate: maxDate,
            maxDateS: maxDateS,
            cars:null,
            category:'',color:'',carYear:'',model:'',makec:'',
            rentCar: '',
            carDialog: false,
            carSelected: this.emptyCar,
            submitted: false,
            diffDays: 0
        };
        this.customerService = new CustomerService();
        this.carService = new CarService();
        this.rentService = new RentService();

        this.searchAvaiable = this.searchAvaiable.bind(this);
        this.rentThisCar = this.rentThisCar.bind(this);
        this.actionBodyTemplate = this.actionBodyTemplate.bind(this);
        this.hideDialog = this.hideDialog.bind(this);
        this.saveRent = this.saveRent.bind(this);

        this.footerCard = (
            <Button label="Search" style={{marginRight: '.25em'}} onClick={this.searchAvaiable}/>
        );


    }

    componentDidMount() {
        this.carService.getCategory().then(data => {this.setState({categories: data});
            this.state.categories.unshift('');});
        this.carService.getColors().then(data => {this.setState({colors: data});
            this.state.colors.unshift('');});
        this.carService.getCarsY().then(data => {this.setState({carYears: data});
            this.state.carYears.unshift('');});
        this.carService.getModels().then(data => {this.setState({models: data});
            this.state.models.unshift('');});
        this.carService.getMakers().then(data => {this.setState({makers: data});
            this.state.makers.unshift('');});
    }

    async searchAvaiable() {
        await this.carService.getByFilters(
            this.state.category,
            this.state.color,
            this.state.carYear,
            this.state.model,
            this.state.makec,
            this.state.dateStart.toISOString().slice(0, 10),
            this.state.dateEnd.toISOString().slice(0, 10)).then(data => {
            this.setState({cars: data})
        });

        const diffTime = Math.abs(this.state.dateStart - this.state.dateEnd);
        this.state.cars.forEach(element => element.total = Math.round((element.price * Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + Number.EPSILON) * 100) / 100);
        this.setState({cars: this.state.cars});

    }

    rentThisCar(car)  {
        this.setState({
            carSelected: { ...car },
            carDialog: true
        });
    }

    actionBodyTemplate(rowData) {
        return (
            <React.Fragment>
                <Button label="Rent" className="p-button-rounded p-button-success mr-2" onClick={() => this.rentThisCar(rowData)} />
            </React.Fragment>
        );
    }

    hideDialog() {
        this.setState({
            submitted: false,
            carDialog: false
        });
    }

    saveRent() {
        console.log(this.state.rentCar);
        this.rentService.postRent(this.state.rentCar).then(data => {
            console.log(data.rental_id);
            this.toast.show({severity:'success', summary: 'Rent success', detail:'Your rent ID is '+data.rental_id, life: 10000});
        });
        this.setState({
            submitted: false,
            carDialog: false
        });
    }

    onInputChange(e, name) {
        const val = (e.target && e.target.value) || '';
        let rentCar = {...this.state.rentCar};
        rentCar[`${name}`] = val;

        rentCar['vin'] = this.state.carSelected.vin;
        rentCar['rentalDate'] = this.state.dateStart.toISOString().slice(0, 10);
        rentCar['returnDate'] = this.state.dateEnd.toISOString().slice(0, 10);

        this.setState({ rentCar });
    }

    render() {

        const productDialogFooter = (
            <React.Fragment>
                <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={this.hideDialog} />
                <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={this.saveRent} />
            </React.Fragment>
        );


        return(
            <div style={{width:'80%', margin:'0 auto', marginTop:'40px'}}>
                <Toast ref={(el) => this.toast = el} />
                <Card title="Reservacion" footer={this.footerCard}>
                    <div className='p-col-12 p-md-4'>
                        <h3>From: </h3>
                        <Calendar
                            onChange={e => this.setState({ dateStart: e.value })}
                            minDate={this.state.minDate}
                            maxDate={this.state.maxDate}
                            readonlyInput={true}
                            showIcon={true}
                            dateFormat='yy-mm-dd'
                            required={true}/>
                    </div>
                    <div className='p-col-12 p-md-4'>
                        <h3>To: </h3>
                        <Calendar
                            onChange={e => this.setState({ dateEnd: e.value })}
                            minDate={this.state.dateStart}
                            maxDate={this.state.maxDateS}
                            readonlyInput={true}
                            showIcon={true}
                            dateFormat='yy-mm-dd'
                            required={true}/>
                    </div>
                    <div className='p-col-12 p-md-4'>
                        <Dropdown value={this.state.category} options={this.state.categories} onChange={e => {
                            this.setState({ category: e.value });
                        }} placeholder="Category"/>
                        <Dropdown value={this.state.color} options={this.state.colors} onChange={e => {
                            this.setState({ color: e.value });
                        }} placeholder="Color"/>
                        <Dropdown value={this.state.carYear} options={this.state.carYears} onChange={e => {
                            this.setState({ carYear: e.value });
                        }} placeholder="Year"/>
                        <Dropdown value={this.state.model} options={this.state.models} onChange={e => {
                            this.setState({ model: e.value });
                        }} placeholder="Model"/>
                        <Dropdown value={this.state.makec} options={this.state.makers} onChange={e => {
                            this.setState({ makec: e.value });
                        }} placeholder="Maker"/>
                    </div>
                </Card>
                <Panel header="Rent Car">
                    <DataTable value={this.state.cars} paginator={true} rows={10} selectionMode={"single"} selection={this.state.selectedCar}
                               onSelectionChange={(e) => this.setState({ selectedCar: e.value })}
                               paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown">
                        <Column field="vin" header="VIN"/>
                        <Column field="category" header="Category"/>
                        <Column field="model" header="Model"/>
                        <Column field="make" header="Make"/>
                        <Column field="color" header="Color"/>
                        <Column field="year" header="Year"/>
                        <Column field="price" header="Price"/>
                        <Column field="total" header="Total"/>
                        <Column body={this.actionBodyTemplate} exportable={false} style={{minWidth: '8rem'}}/>
                    </DataTable>
                </Panel>

                <Dialog visible={this.state.carDialog} style={{ width: '450px' }} header="Product Details" modal className="p-fluid" footer={productDialogFooter} onHide={this.hideDialog}>
                    <div className="field">
                        <label htmlFor="Email">Email</label>
                        <InputText id="Email" value={this.state.carSelected.name} required autoFocus
                                   onChange={(e) => this.onInputChange(e, 'client_id')}/>
                        {this.state.submitted && !this.state.carSelected.name && <small className="p-error">Email is required.</small>}
                    </div>
                    <div className="field">
                        <label htmlFor="ID_CAR">ID CAR</label>
                        <InputText id="ID_CAR" value={this.state.carSelected.vin} required autoFocus disabled/>
                    </div>
                    <div className="field">
                        <label htmlFor="From">From:</label>
                        <InputText id="rent_from" value={this.state.dateStart} required autoFocus disabled/>
                    </div>
                    <div className="field">
                        <label htmlFor="To">To:</label>
                        <InputText id="rent_to" value={this.state.dateEnd} required autoFocus disabled/>
                    </div>
                </Dialog>
            </div>
        );
    }
}

export default Reservation;