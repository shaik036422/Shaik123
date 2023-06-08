import { LightningElement,track } from 'lwc';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import getRates from '@salesforce/apex/RateTypes.getRates';
export default class rateTypesConfigurationScreen extends LightningElement {
    @track currentContent = 'home';
    @track tutorialValue = false;    
    @track integrationValue = false;
    @track visualforceValue = false;
    @track homeclick=false;
    @track datas
    @track searchresults;
    /*@track triggerValue = false;
    @track jqueryJavascriptValue = false;
    @track salesforceLwcValue = false;
    @track showdestination=false;*/
 
 
    changeHandleAction(event) {
        const selected = event.detail.name;        
 
        this.currentContent = selected;
        if (selected == 'home'){
            this.homeclick = true;
        }else{
            this.homeclick = false;
        }
 
        if (selected == 'rateTypes'){
            this.tutorialValue = true;
        }else{
            this.tutorialValue = false;
        }
 
        if (selected == 'rooms'){
            this.integrationValue = true;
        }else{
            this.integrationValue = false;
        }
 
        if (selected == 'news'){
            this.visualforceValue = true;
        }else{
            this.visualforceValue = false;
        }
        
 
    }
    showdest(){
        this.showdestination=true;
    }
    successhandler(){
const show=new ShowToastEvent({
    title:'Created Successfully',
    message:'Record is created',
    variant:'success',
    mode:'pester'
});
this.dispatchEvent(show);
window.open('url','_self');
document.location.reload(true);
}


  
   changeHandler(event){
       this.datas=event.target.value;
   }
   searchRecord(){
    getRates({searchName:this.datas}).then(result=>{
           this.searchresults=result;
           console.log(searchresults);
       })
     .catch(error=>{
       console.log('error occured :'+error)
     })

    

       
   }
   resethandler(){
       const inputFields = this.template.querySelectorAll(
           'lightning-input-field'
       );
       if (inputFields) {
           inputFields.forEach(field => {
               field.reset();
           });
       }
       window.open('url','_self');
       document.location.reload(true); 
   }
   updateHandler(){
    const showmsg=new ShowToastEvent({
        title:'Updated Successfully',
        message:'Record is Updated Successfully',
        variant:'success',
        mode:'pester'
    });
    this.dispatchEvent(showmsg);
   }
   
}