public class Callout {
    
    public static HttpResponse getEmails() {
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setEndpoint('http://localhost:3000/getEmails/1');
        request.setMethod('GET');

        HttpResponse response = http.send(request);

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
