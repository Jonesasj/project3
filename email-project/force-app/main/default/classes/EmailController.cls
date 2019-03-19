public with sharing class EmailController {

    @AuraEnabled(Cacheable=true)
    public static List<email_log__x> getEmails(Id customer_id){
      //get the gradwell id for the account and use it to get the emails

      return [SELECT ExternalId, email_to__c, latest_event__c, subject__c FROM email_log__x WHERE customer_id__c =:customer_id];
    }

    @AuraEnabled(Cacheable=true)
    public static List<email_log__x> getAllEmails(){
      return [SELECT ExternalId, email_to__c, latest_event__c, subject__c, sent_ts__c FROM email_log__x];
    }

    @AuraEnabled(Cacheable=true)
    public static List<events__x> getAllEvents() {
      return [SELECT ExternalId, event__c, event_ts__c, message_id__c FROM events__x];
    }
}
