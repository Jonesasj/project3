import { LightningElement, track, api } from 'lwc';
import getAllEvents from '@salesforce/apex/EmailController.getAllEvents';

export default class EventModal extends LightningElement {
    @api emailid;
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