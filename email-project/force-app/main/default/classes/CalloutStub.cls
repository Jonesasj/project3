@isTest
public class CalloutStub implements System.StubProvider {
    
    public Object handleMethodCall(Object stubbedObject, String stubbedMethodName, Type returnType, List<Type> listOfParamTypes, List<String> listOfParamNames, List<Object> listOfArgs) {
        System.debug('Name of stubbed method: ' + stubbedMethodName);
        System.debug('Return type of stubbed method: ' + returnType.getName());

        for (integer i =0; i < listOfParamNames.size(); i++) {
            System.debug('parameter name: ' + listOfParamNames.get(i));
            System.debug('  parameter type: ' + listOfParamTypes.get(i).getName());
        }
        // This shows the actual parameter values passed into the stubbed method at runtime.
        System.debug('number of parameters passed into the mocked call: ' + listOfArgs.size());
        System.debug('parameter(s) sent into the mocked call: ' + listOfArgs);

        if(stubbedMethodName == 'callout') {
            HttpResponse stubResponse = new HttpResponse();
            stubResponse.setBody('{"dataList":[{"id":1,"message_id":"1","customer_id":1,"email_to":"alexsjones@protonmail.com","subject":"test","has_attachment":0,"sent_ts":null,"latest_event":"Delivered","latest_event_ts":"2019-02-02 12:00:00"}]}');
            stubResponse.setStatusCode(200);
            return stubResponse;
        } else {
            return null;
        }
    }
}
