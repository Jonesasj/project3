import { LightningElement, api, track } from 'lwc';
import getALLEmails from '@salesforce/apex/EmailController.getAllEmails';

export default class EmailLog extends LightningElement {
    @api recordId;
    @track selectedEmailId = null;
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
        console.log(this.selectedEmailId);
        this.selectedEmailId = event.detail;
    }
    
    saveMethod() {
        alert('save method invoked');
        this.closeModal();
    }

    handleCancel() {
        this.selectedEmailId=null;
    }

}