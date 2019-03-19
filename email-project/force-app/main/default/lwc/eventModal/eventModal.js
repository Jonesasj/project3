import { LightningElement, track } from 'lwc';
import getAllEvents from '@salesforce/apex/EmailController.getAllEvents';

export default class EventModal extends LightningElement {


    @track events;
    

    connectedCallback() {
        this.loadEvents();
    }

    loadEvents() {
        getAllEvents()
        .then(result => {
            this.events = result;
        })
        .catch(error => {
            this.error = error;
        });

    }

    handleClick() {
        this.dispatchEvent(new CustomEvent('cancel'));
    }
}