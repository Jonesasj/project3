global class EmailDataSourceConnection extends DataSource.Connection{
    private DataSource.ConnectionParams connectionInfo;
    global EmailDataSourceConnection(DataSource.ConnectionParams connectionParams) {
        this.connectionInfo = connectionInfo;
    }
    
    override global List<DataSource.Table> sync() {
        List<DataSource.Table> tables = new List<DataSource.Table>();
        
        //Email table
        List<DataSource.Column> emailColumns = new List<DataSource.Column>();
        emailColumns.add(DataSource.Column.text('email', 255));
        emailColumns.add(DataSource.Column.text('ExternalId',255));
        emailColumns.add(DataSource.Column.indirectLookup('customer_id', 'Account', 'gradwellId__c'));
        emailColumns.add(DataSource.Column.text('email_to', 255));
        emailColumns.add(DataSource.Column.text('subject', 255));
        emailColumns.add(DataSource.Column.boolean('has_attachment'));
        emailColumns.add(DataSource.Column.text('sent_ts', 255));
        emailColumns.add(DataSource.Column.text('latest_event', 255));
        emailColumns.add(DataSource.Column.text('latest_event_ts', 255));
        emailColumns.add(DataSource.Column.url('DisplayUrl'));
        tables.add(DataSource.Table.get('email_log', 'email', emailColumns));
        
        //event table
        List<DataSource.Column> eventColumns = new List<DataSource.Column>();
        eventColumns.add(DataSource.Column.text('event', 255));
        eventColumns.add(DataSource.Column.text('ExternalId',255));
        eventColumns.add(DataSource.Column.externalLookup('message_id', 'email_log__x'));
        eventColumns.add(DataSource.Column.url('DisplayUrl'));
        eventColumns.add(DataSource.Column.text('event', 255));
        eventColumns.add(DataSource.Column.text('event_ts',255));
        tables.add(DataSource.Table.get('events', 'event', eventColumns));
        return tables;
    }

    override global DataSource.TableResult query(DataSource.QueryContext context) {
        
        DataSource.Filter filter = context.tableSelection.filter;
        String selected = context.tableSelection.tableSelected;
        String url;
        List<Map<String, Object>> rows;
        if(selected == 'email_log') {
            if(filter != null) {
                String thisColumnName = filter.columnName;
                //get a specific email
                if(thisColumnName != null && thisColumnName.equals('ExternalId')) {
                    url = 'https://31128a58.ngrok.io' + '/getEmailMessage/' + filter.columnValue;
                }
                else {
                    url = 'https://31128a58.ngrok.io' + '/getEmails/';
                }
            }
            else {
                url = 'https://31128a58.ngrok.io' + '/getEmails/';
            }
            rows = DataSource.QueryUtils.process(context, ConnectorHelper.getData(url, 'message_id'));
        } else if(selected == 'events') {
            if(filter != null) {
                String thisColumnName = filter.columnName;
                //get a specific event
                if(thisColumnName != null && thisColumnName.equals('ExternalId')) {
                    url = 'https://31128a58.ngrok.io' + '/getEmailEvents/' + filter.columnValue;
                }
                else {
                    url = 'https://31128a58.ngrok.io' + '/getEmailEvents/';
                }
            } else {
                url = 'https://31128a58.ngrok.io' + '/getEmailEvents/';
            }
            rows = DataSource.QueryUtils.process(context, ConnectorHelper.getData(url, 'event_id'));
        }
        
        //callout to get the emails
        //List<Map<String, Object>> rows = DataSource.QueryUtils.process(context, getData(url));
        return DataSource.TableResult.get(true, null, context.tableSelection.tableSelected, rows);

    }
}