import { LightningElement, track, api, wire } from 'lwc';
import getAllEmails from '@salesforce/apex/EmailController.getAllEmails';
import { getRecord } from 'lightning/uiRecordApi';
import ACCOUNT_GRADWELLID from '@salesforce/schema/Account.GradwellId__c'
import getEmails from '@salesforce/apex/EmailController.getEmails';

const columns = [
    {label: 'Sent', fieldName: 'sent', type: 'text'},
    {label: 'Subject', fieldName: 'subject', type: 'text'},
    {label: 'Status', fieldName: 'latestEvent', type: 'text'},
    {label: 'Events', type : 'button', typeAttributes : {
        disabled : false,
        label : 'View Events',
        name : 'Button',
        variant : 'base',
        iconName: 'utility:view',
        value : 'test'}
    }
];

export default class EmailTable extends LightningElement {

    //@track data = [];
    @track data = [];
    @track columns = columns;
    @track selectedEmailId = null;
    @api recordId;
    @track record;
    @track error;

    @wire(getRecord, { recordId: '$recordId', fields : ['Account.GradwellId__c']})
    wiredAccount({error, data}) {
        if(data) {
            this.record = data;
            this.error = undefined;
            console.log('good');
        } else if (error) {
            this.error = error;
            this.record = undefined;
            console.log('bad');
        }
    }

    get gradwellId() {
        console.log(this.record.fields.GradwellId__c.value);
        return this.record.fields.GradwellId__c.value;
    }

    @wire(getEmails, {customer_id : '$record.fields.GradwellId__c.value'})
    wiredData({error, data}) {
        if(data) {
            let newEmails = []
            data.forEach((row) => {
                let obj = {
                    id : row.ExternalId,
                    sent : row.sent__c || 'no time',
                    subject : row.subject__c,
                    latestEvent : row.latest_event__c
                };
                newEmails.push(obj);
            });
            const currentData = this.data;
            const newData = currentData.concat(newEmails);
            this.data = newData;
        }
        if(error) {
            alert('error');
        }
    }


    /*getSelectedName(event) {
        console.log(event);
        const selectedRows = event.detail.selectedRows;
        // Display that fieldName of the selected rows
        for (let i = 0; i < selectedRows.length; i++){
            alert("You selected: " + selectedRows[i].sent);
        }
    }*/

 

    handleRowAction(event) {
        const row = event.detail.row;
        console.log(row);
        console.log(JSON.stringify(row));
        console.log(row.id);

        this.selectedEmailId = event.detail.row.id;
    }

    //@wire(getAllEmails)
    /*wiredData({error, data}) {
        if(data) {
            let newEmails = []
            data.forEach((row) => {
                let obj = {
                    id : row.ExternalId,
                    sent : row.sent__c || 'no time',
                    subject : row.subject__c,
                    latestEvent : row.latest_event__c
                };
                newEmails.push(obj);
                //this.data.push(obj);
            });
            const currentData = this.data;
            const newData = currentData.concat(newEmails);
            this.data = newData;
        }
    }*/


    /*connectedCallback() {
        this.loadEmails();
    }

    loadEmails() {
        getAllEmails()
        .then((result) => {
            var newEmails = []
            result.forEach((row) => {
                let obj = {
                    id : row.ExternalId,
                    sent : row.sent__c || 'no time',
                    subject : row.subject__c,
                    latestEvent : row.latest_event__c
                };
                newEmails.push(obj);
            });
            const currentData = this.data;
            const newData = currentData.concat(newEmails);
            this.data = newData;
        })
        .catch(error => {
            this.error = error;
            console.log('there was an error: ' + error);
        });
    }*/

    handleCancel() {
        this.selectedEmailId=null;
    }
}