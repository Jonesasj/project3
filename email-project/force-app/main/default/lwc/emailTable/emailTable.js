import { LightningElement, track, api, wire } from 'lwc';
import getAllEmails from '@salesforce/apex/EmailController.getAllEmails';


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
/*const columns = [
    {label: 'Sent', fieldName: 'sent', type: 'text'},
    {label: 'Events', type : 'button', typeAttributes : {
        disabled : false,
        label : 'View Events',
        name : 'Button',
        variant : 'base',
        iconName: 'utility:view',
        value : 'test'
    }}
];

const data = [
    {
        id : 'a',
        sent : 'something'
    },
    {
        id : 'b',
        sent : 'somethingElse'
    }
];*/



/*const columns = [
    {label: 'Opportunity name', fieldName: 'opportunityName', type: 'text'},
    {label: 'Confidence', fieldName: 'confidence', type: 'percent', cellAttributes:
    { iconName: { fieldName: 'trendIcon' }, iconPosition: 'right' }},
    {label: 'Amount', fieldName: 'amount', type: 'currency', typeAttributes: { currencyCode: 'EUR'}},
    {label: 'Contact Email', fieldName: 'contact', type: 'email'},
    {label: 'Contact Phone', fieldName: 'phone', type: 'phone'},
];

const data = [{
                   id: 'a',
                   opportunityName: 'Cloudhub',
                   confidence: 0.2,
                   amount: 25000,
                   contact: 'jrogers@cloudhub.com',
                   phone: '2352235235',
                   trendIcon: 'utility:down'
               },
               {
                   id: 'b',
                   opportunityName: 'Quip',
                   confidence: 0.78,
                   amount: 740000,
                   contact: 'quipy@quip.com',
                   phone: '2352235235',
                   trendIcon: 'utility:up'
               }];*/

export default class EmailTable extends LightningElement {

    //@track data = [];
    @track data = [];
    @track columns = columns;
    @track selectedEmailId = null;


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

        this.selectedEmailId = event.detail;
    }

    @wire(getAllEmails)
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
                //this.data.push(obj);
            });
            const currentData = this.data;
            const newData = currentData.concat(newEmails);
            this.data = newData;
        }
    }


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

    /*handleRowAction(event) {
        
        console.log('test');
        console.log(event.target.name);
        console.log(event.target.label);
        console.log(event.target['key-field']);
        console.log(event.target.data);
        console.log(event.target.test);
        console.log(event);
    }*/

}