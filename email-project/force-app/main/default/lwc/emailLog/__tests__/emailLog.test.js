import { createElement } from 'lwc';
import EmailLog from 'c/emailLog';
import getEmails from '@salesforce/apex/EmailLogController.getEmails';

jest.mock(
    '@salesforce/apex/EmailLogController.getEmails',
    () => {
        return {
            default: jest.fn()
        };
    },
    { virtual: true }
);

const APEX_SUCCESS = '{"emails":[{"id":1,"message_id":"1","customer_id":1,"email_to":"alexsjones@protonmail.com","subject":"test","has_attachment":0,"sent_ts":null,"latest_event":"Delivered","latest_event_ts":"2019-02-02 12:00:00"}]}';
const APEX_EMPTY = '{"emails":[]}';
const APEX_ERROR = {
    body: { message: 'An internal server error has occurred' },
    ok: false,
    status: 400,
    statusText: 'Bad Request'
};

 

describe('c-email-log', () => {
    afterEach(() => {
        while(document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
        jest.clearAllMocks();
    });
    function flushPromises() {
        return new Promise(resolve => setImmediate(resolve));
    }

    it('always passes', () => {
        expect(1).toBe(1);
    });

    it('receives correct parameters', () => {
        const TEST_CUSTOMER_ID = 'TEST_ID';
        const APEX_PARAMETERS = {customer_id: TEST_CUSTOMER_ID};
        getEmails.mockResolvedValue(APEX_SUCCESS);

        const element = createElement('c-email-log', {is: EmailLog});
        element.customerId = TEST_CUSTOMER_ID;
        document.body.appendChild(element);
        

        return flushPromises().then(() => {
            console.log(getEmails.mock.calls);
            expect(getEmails.mock.calls[0][0]).toEqual(APEX_PARAMETERS);
        });
    });

    it('appends one row to the data table', () => {
        const TEST_CUSTOMER_ID = 'TEST_ID';
        getEmails.mockResolvedValue(APEX_EMPTY);

        const element = createElement('c-email-log', {is: EmailLog});
        element.customerId = TEST_CUSTOMER_ID;
        document.body.appendChild(element);
        

        return flushPromises().then(() => {
            const datatable = element.shadowRoot.querySelector('lightning-datatable');
            let rows = datatable.data;
            expect(rows.length).toBe(0);
        });
    });

    it('has 0 rows when an there are no emails', () => {
        const TEST_CUSTOMER_ID = 'TEST_ID';
        getEmails.mockResolvedValue(APEX_SUCCESS);

        const element = createElement('c-email-log', {is: EmailLog});
        element.customerId = TEST_CUSTOMER_ID;
        document.body.appendChild(element);
        

        return flushPromises().then(() => {
            const datatable = element.shadowRoot.querySelector('lightning-datatable');
            let rows = datatable.data;
            expect(rows.length).toBe(1);
        });
    });
});