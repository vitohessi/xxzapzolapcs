import { Component, OnInit } from '@angular/core';
import { DbFireService } from '../services/db-fire.service';
import * as $ from 'jquery';
import { NgForm, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-li',
  templateUrl: './li.component.html',
  styleUrls: ['./li.component.css']
})
export class LiComponent implements OnInit {
	suivisDatas: [];
	loginForm: FormGroup;
	submitted = false;
    showList = false;
    accesGranted = false;
    topError = false;
  constructor(private db: DbFireService) { }

  get f(){ return this.loginForm.controls; }

  deleteTrack(id: string){
    this.db.deleteSuivi(id)
    .then(res => {})
    .catch(err => {});
  }

  ngOnInit() {
  	this.db.getSuivi()
  	.subscribe(res => {
  		this.suivisDatas = res;
  	});







    this.loginForm = new FormGroup({
    	id: new FormControl('', [Validators.required]),
    	pw: new FormControl('', [Validators.required])
    })
  	$('body, html').css('overflow', 'hidden');
  }


  onSubmit(){
  	this.submitted = true;
  	if(!this.f.id.errors && !this.f.pw.errors){
  		if(this.loginForm.get('id').value == "idtest" && this.loginForm.get('pw').value == "passtest"){
  			this.accesGranted = true;
  			this.topError = false;
  		}else{
  			this.topError = true;
  		}
  	}
  }

}
