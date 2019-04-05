@isTest
public class CalloutHelperTest {
    

    @isTest static void testGetEmails() {
        StaticResourceCalloutMock mock = new StaticResourceCalloutMock();
        mock.setStaticResource('email_log');
        mock.setStatusCode(200);
        mock.setHeader('Content-type', 'application/json;charset=UTF-8');

        Test.setMock(HttpCalloutMock.class, mock);

        CalloutHelper testCalloutHelper = new CalloutHelper();
        HttpResponse result = testCalloutHelper.callout('/getEmails/', 'GET', '1');

        System.assertNotEquals(null, result, 'Callout returned null response');
        System.assertEquals(200, result.getStatusCode());

        //result should contain 1 item
        Map<String, Object> results = (Map<String, Object>) JSON.deserializeUntyped(result.getBody());
        List<Object> dataList = (List<Object>) results.get('dataList');
        System.assertEquals(1, dataList.size(), 'There should be only 1 email');
        //changed
    }
}
