public with sharing class EmailController {
    public EmailController() {

    }

    @AuraEnabled(Cacheable=true)
    public static String getEmails(Id accId){
      //get the gradwell id for the account and use it to get the emails

      return '';
    }
}
