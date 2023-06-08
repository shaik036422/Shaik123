public class RateTypes {
    
    @AuraEnabled
    public static List<Rate_Type__c> getRates(string searchName)
    {
        List<Rate_Type__c> rateList = [select id,Rate_Type_Name__c,Description__c,Hotel_Name__c from Rate_Type__c
                                    where Rate_Type_Name__c like : searchName+'%'with Security_Enforced ];
           return rateList;    
                                
    }
    @AuraEnabled(cacheable = true)
    public static List<Rate_Type__c> getRatesFilter()
    {
        List<Rate_Type__c> rateList = [select id,Rate_Type_Name__c,Description__c,Hotel_Name__c from Rate_Type__c
                                    with Security_Enforced ];
           return rateList;    
                                
    }

}
