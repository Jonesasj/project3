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

    /* This is what you were working on yesterday */
    public static HttpResponse callout(String path, String method, String param) {
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setEndpoint('https://69ed5208.ngrok.io' + path + param);
        request.setMethod(method);

        HttpResponse response = http.send(request);
        System.debug(response.getStatusCode());
        return response;
    }

    public static void getEmails2(String customer_id) {
        HttpResponse response = callout('/getEmails/', 'GET', customer_id);
        if(response.getStatusCode() == 200) {
            Map<String, Object> results = (Map<String, Object>) JSON.deserializeUntyped(response.getBody());
            List<Object> emails = (List<Object>) results.get('emails');
            for(Object email : emails) {
                System.debug(email);
            }
        }
    }

    

}
