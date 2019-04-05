/*import { LightningElement, track } from 'lwc';

const columns = [
     {label: 'Opportunity name', fieldName: 'opportunityName', type: 'text'}
];

const data = [
    {
        id: 'a',
        opportunityName: 'Cloudhub'
    },
    {
        id: 'b',
        opportunityName: 'Quip'
    }
];

export default class DatatableExample extends LightningElement {
    @track data = data;
    @track columns = columns;

    getSelectedName(event) {
        const selectedRows = event.detail.selectedRows;
        // Display that fieldName of the selected rows
        for (let i = 0; i < selectedRows.length; i++){
            alert("You selected: " + selectedRows[i].opportunityName);
        }
    }
}*/

import { LightningElement, track } from 'lwc';

const actions = [
    { label: 'Show details', name: 'show_details' },
    { label: 'Delete', name: 'delete' }
];

const columns = [
    // Other column data here
    {label: 'Opportunity name', fieldName: 'opportunityName', type: 'text'},
    { type: 'action', typeAttributes: { rowActions: actions, menuAlignment: 'left' } }
];

const data = [
    {
        id: 'a',
        opportunityName: 'Cloudhub'
    },
    {
        id: 'b',
        opportunityName: 'Quip'
    }
];

export default class DatatableExample extends LightningElement {
    @track data = data;
    @track columns = columns;

    handleRowAction(event) {
            const action = event.detail.action;
            const row = event.detail.row;
            switch (action.name) {
                case 'show_details':
                    alert('Showing Details: ' + JSON.stringify(row));
                    break;
                case 'delete':
                    const rows = this.data;
                    const rowIndex = rows.indexOf(row);
                    rows.splice(rowIndex, 1);
                    this.data = rows;
                    break;
            }
    }
}