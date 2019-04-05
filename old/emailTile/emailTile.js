import { LightningElement, api } from 'lwc';

export default class EmailTile extends LightningElement {
    @api email;

    handleClick(event) {
        console.log(event.target.label);
        console.log(this.email.ExternalId);
        /*this.dispatchEvent(new CustomEvent('modal', {
            detail : this.email.ExternalId
        }))*/
        this.dispatchEvent(new CustomEvent('modal', {
            detail : this.email.ExternalId
        }));
    }

}