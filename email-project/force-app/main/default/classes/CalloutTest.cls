@isTest
public class CalloutTest {

    @isTest static void sfdxTest() {
        system.assertEquals(1, 1);
    }

    @isTest static void testGetEmails() {
        StaticResourceCalloutMock mock = new StaticResourceCalloutMock();
        mock.setStaticResource('email_log');
        mock.setStatusCode(200);
        mock.setHeader('Content-type', 'application/json;charset=UTF-8');

        Test.setMock(HttpCalloutMock.class, mock);

        HttpResponse result = Callout.callout('/getEmails/', 'GET', '1');

        System.assertNotEquals(null, result, 'Callout returned null response');

        System.assertEquals(200, result.getStatusCode());

        //result should contain 1 item

        Map<String, Object> results = (Map<String, Object>) JSON.deserializeUntyped(result.getBody());
        List<Object> emails = (List<Object>) results.get('emails');

        System.assertEquals(1, emails.size(), 'There should be only 1 email');
        //changed
    }
}