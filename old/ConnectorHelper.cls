public class ConnectorHelper {
    
    public static String getResponse(String url) {
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setEndpoint(url);
        request.setMethod('GET');

        HttpResponse response = http.send(request);
        return response.getBody();
    }

    public static List<Map<String, Object>> getData(String url, String primaryKey) {
        String response = getResponse(url);
        List<Map<String, Object>> rows = new List<Map<String, Object>>();
        Map<String, Object> responseBodyMap = (Map<String, Object>) JSON.deserializeUntyped(response);
        List<Object> dataList = (List<Object>) responseBodyMap.get('dataList');
        if(dataList != null) {
            for(Integer i = 0; i < dataList.size(); i++) {
                Map<String, Object> data = (Map<String, Object>)dataList[i];
                rows.add(createRow(data, primaryKey));
            }
        }
        return rows;
    }

    public static Map<String, Object> createRow(Map<String, Object> data, String primaryKey) {
        Map<String, Object> row = new Map<String, Object>();
        for(String key : data.keySet()) {
            if(key == primaryKey) {
                row.put('ExternalId', data.get(key));
            } else {
                row.put(key, data.get(key));
            }
        }
        return row;
    }
}
