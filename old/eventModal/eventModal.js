import { LightningElement, track, api, wire } from 'lwc';
import getAllEvents from '@salesforce/apex/EmailController.getAllEvents';
import getEvents from '@salesforce/apex/EmailController.getEvents';

export default class EventModal extends LightningElement {
    @api emailid;
    @track events;
    @track error;
    
    @wire(getEvents, {message_id : '$emailid'})
    wiredData({error, data}) {
        if(data) {
            this.events = data;
        } else if(error) {
            this.error = error
        }
    }

    /*connectedCallback() {
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

    }*/

    handleClick() {
        this.dispatchEvent(new CustomEvent('cancel'));
    }
}