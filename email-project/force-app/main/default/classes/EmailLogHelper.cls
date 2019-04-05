public class EmailLogHelper {

    /*public static void getEmails2(String customer_id, CalloutHelper ch) {
        HttpResponse response = ch.callout('/getEmails/', 'GET', customer_id);
        if(response.getStatusCode() == 200) {
            Map<String, Object> results = (Map<String, Object>) JSON.deserializeUntyped(response.getBody());
            List<Object> emails = (List<Object>) results.get('emails');
            for(Object email : emails) {
                System.debug(email);
            }
        }
    }*/


    //takes a customer id and passes the response body on
    public static string getEmails(String customer_id, CalloutHelper ch){
        HttpResponse response = ch.callout('/getEmails/', 'GET', customer_id);
        String body = response.getBody();
        return body;
    }

    public static string getEvents(String message_id, CalloutHelper ch) {
        HttpResponse response = ch.callout('/getEmailEvents/', 'GET', message_id);
        String body = response.getBody();
        return body;
    }
    /*Cases
     *customer_id doesn't exist
     *
     */
}
