import { BadRequestException } from '@nestjs/common';
export class Validator{
    validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };
    validateData(inputs:any[]){
        var requiredDAta:object[] = [];
        inputs.forEach(element => {
            element.validators.forEach(option => {
                if(option == 'required'){
                    if(element.value == undefined || element.value == ""){
                        requiredDAta.push({input:element.key,error:'Feild is Required'})
                    }
                }
                else if(option == 'email'){
                   if(!this.validateEmail(element.value)){
                    requiredDAta.push({input:element.key,error:'invalid email address'})
                    }
                }
              else if(option == 'phone'){
                    if(!this.validatePhone(element.value)){
                        requiredDAta.push({input:element.key,error:'invalid phone number'})
                    }
                }
            });
            
        });
        if(requiredDAta.length > 0){
            throw new BadRequestException(requiredDAta);
        }else{
            return true;
        }
    };
    validatePhone(phone:string){
        var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{8})$/;
  if((phone.match(phoneno)))
        {
      return true;
        }
      else
        {
        return false;
        }
    };
}
