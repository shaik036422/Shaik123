import { LightningElement,wire,track } from 'lwc';
import getRatesFilter from '@salesforce/apex/RateTypes.getRatesFilter';
export default class FilterRateTypeConfiguration extends LightningElement {
    
    
    headings=[ "Rate_Type_Name__c", "Description__c", "Select"]
    fullTableData=[]
    filteredData=[]
    datascoll;
    timer
    @track resultingrecds;
    @track recordIdVal;
    filterBy="Rate_Type_Name__c"
    @wire(getRatesFilter)
    contactHandler({data, error}){
        if(data){
            console.log(data)
            this.fullTableData = data
            this.filteredData= data
        }
        if(error){
            console.log(error)
        }
    }

    get FilterByOptions(){
        return [
            {label:"All", value:'All'},
            {label:'Rate_Type_Name__c', value:'Rate_Type_Name__c'}
           
        ]
    }

    filterbyHandler(event){
        this.filterBy = event.target.value
    }

    filterHandler(event){
        const {value} = event.target
        window.clearTimeout(this.timer)
        if(value){
            this.timer = window.setTimeout(()=>{
                console.log(value)
                this.filteredData = this.fullTableData.filter(eachObj=>{
                    if(this.filterBy === 'All'){
                        /**Below logic will filter each and every property of object */
                        return Object.keys(eachObj).some(key=>{
                            return eachObj[key].toLowerCase().includes(value)
                        })
                    } else {
                         /**Below logic will filter only selected fields */
                        const val = eachObj[this.filterBy] ? eachObj[this.filterBy]:''
                        return val.toLowerCase().includes(value)
                    }
                })
            }, 500)
            
        } else {
            this.filteredData = [...this.fullTableData]
        }
        
    }
    handleClick(event)
    {
        const selectedId=event.target.value;
       

       this.recordIdVal = selectedId; 
       console.log(this.recordIdVal) 
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
    window.open('url','_self');
    document.location.reload(true); 
   }

    }