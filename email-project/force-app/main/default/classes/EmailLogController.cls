public with sharing class EmailLogController {
    
    @AuraEnabled
    public static string getEmails(String customer_id){
        CalloutHelper ch = new CalloutHelper();
        String responseBody = Callout.getEmails3(customer_id, ch);
        return responseBody;
    }
}
