public class Callout {
    
    public static HttpResponse getEmails(String customer_id) {
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setEndpoint('https://38b788fd.ngrok.io/getEmails/' + customer_id);
        request.setMethod('GET');

        HttpResponse response = http.send(request);
        System.debug(response.getStatusCode());

        if(response.getStatusCode() == 200) {
            Map<String, Object> results = (Map<String, Object>) JSON.deserializeUntyped(response.getBody());
            List<Object> emails = (List<Object>) results.get('emails');
            for(Object email : emails) {
                System.debug(email);
            }
        }
        return response;
    }

}
