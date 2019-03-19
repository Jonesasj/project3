import { LightningElement, api, track } from 'lwc';
import getALLEmails from '@salesforce/apex/EmailController.getAllEmails';

export default class EmailLog extends LightningElement {
    @api recordId;
    @track modal = false;
    @track emails;
    connectedCallback() {
        console.log('connected callback');
        this.loadEmails();
    }

    loadEmails() {
        getALLEmails()
        .then(result => {
            this.emails = result;
        })
        .catch(error => {
            this.error = error;
        });
    }

    openModal(event) {
        console.log(event);
        console.log(this.modal);
        this.modal = true;
    }
    closeModal() {
        this.modal = false;
    } 
    saveMethod() {
        alert('save method invoked');
        this.closeModal();
    }

}