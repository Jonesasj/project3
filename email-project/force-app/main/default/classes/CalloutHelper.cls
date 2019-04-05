public class CalloutHelper {

     public HttpResponse callout(String path, String method, String param) {
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setEndpoint('https://1c7e1a4b.ngrok.io' + path + param);
        request.setMethod(method);

        HttpResponse response = http.send(request);
        System.debug(response.getStatusCode());
        return response;
    }
}
