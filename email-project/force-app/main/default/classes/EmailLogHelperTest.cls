@isTest
public class EmailLogHelperTest {
    
    @isTest static void getEmailsCode200() {
        //create callout mock
        CalloutHelper mockCallout = (CalloutHelper)StubUtil.createMock(CalloutHelper.class);
        String testResponseBody = EmailLogHelper.getEmails('CUSTOMER_ID', mockCallout);
        system.assertEquals('{"emails":[{"id":1,"message_id":"1","customer_id":1,"email_to":"alexsjones@protonmail.com","subject":"test","has_attachment":0,"sent_ts":null,"latest_event":"Delivered","latest_event_ts":"2019-02-02 12:00:00"}]}', testResponseBody);
    }
}
