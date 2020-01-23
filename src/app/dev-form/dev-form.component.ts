import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { DevMapApiService } from '../dev-map-api.service';
import { Dev } from '../shared/dev.model';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-dev-form',
  templateUrl: './dev-form.component.html',
  styleUrls: ['./dev-form.component.scss']
})
export class DevFormComponent implements OnInit {

  devForm: FormGroup;
  edtLatitude: FormControl;
  edtLongitude: FormControl;
  acao:string='Salvar';

  constructor(private formBuilder: FormBuilder,
    private devApi: DevMapApiService,
    private toastService:ToastrService) { }

  ngOnInit() {
    this.edtLatitude = this.formBuilder.control('', Validators.required);
    this.edtLongitude = this.formBuilder.control('', Validators.required);

    this.devForm = this.formBuilder.group({
      github_username: this.formBuilder.control('', [Validators.required]),
      techs: this.formBuilder.control('', Validators.required),
      latitude: this.edtLatitude,
      longitude: this.edtLongitude,
    });

    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        this.edtLatitude.setValue(latitude);
        this.edtLongitude.setValue(longitude);
      },
      err => {
        console.log(err);
      },
      {
        timeout: 30000,
      }
    );
  }

  salvar(dev: Dev) {  
    for (const name in this.devForm.controls) {
      if (this.devForm.controls.hasOwnProperty(name)) {
        const vaControl = this.devForm.controls[name];
        if ((vaControl != this.edtLatitude) && (vaControl != this.edtLongitude)){
          vaControl.reset();
        }
      }
    }  
    this.acao = 'Salvando...'; 
    this.devApi.salvar(dev).subscribe(vaDev => {      
      this.acao = 'Salvar';
      let vaIndex = this.devApi.devs.findIndex(ipDev => {
        return ipDev.github_username === vaDev.github_username
      });

      if (vaIndex === -1) {
        this.devApi.devs.push(vaDev);
        this.toastService.success("Usuário cadastrado com sucesso",'',{
          closeButton:true,
          positionClass:'toast-center-center',
          timeOut: 2000
        });
      }else{
        this.toastService.info("Usuário já cadastrado",'',{
          closeButton:true,
          positionClass:'toast-center-center',
          timeOut: 3000
        });
      }
    },
      error => {        
        console.log(`Erro ao salvar ${error}`);
        this.acao = 'Salvar';
        this.toastService.error(error,'Não foi possível cadastrar o Dev',{
          closeButton:true,
          timeOut: 3000
        });
      });

  }
}
