import { LightningElement, api, track } from 'lwc';
import getEmails from '@salesforce/apex/EmailLogController.getEmails';

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

export default class EmailLog extends LightningElement {

    @track data = [];
    @track columns = columns;
    @api customerId = 1;

    //recieves a string containing the list of emails
    connectedCallback() {
        console.log(this.customerId);
        getEmails({customer_id: this.customerId})
        .then(result => {
            //turn the string into JSON and use it to populate the datatable
            //email example
            //{"emails":[{"id":1,"message_id":"1","customer_id":1,"email_to":"alexsjones@protonmail.com","subject":"test","has_attachment":0,"sent_ts":null,"latest_event":"Delivered","latest_event_ts":"2019-02-02 12:00:00"}]}
            let responseBody = JSON.parse(result);
            let newEmails = []
            console.log(responseBody);
            responseBody.emails.forEach((email) => {
                let obj = {
                    id : email.message_id,
                    sent : email.sent_ts || 'no time',
                    subject : email.subject,
                    latestEvent : email.latest_event_ts
                };
                newEmails.push(obj);
            });
            const currentData = this.data;
            const newData = currentData.concat(newEmails);
            this.data = newData;
            console.log(result);
        })
        .catch(error => {
            console.error(error);
        });
    }
}