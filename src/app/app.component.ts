import { RESOLUCOES } from './resolucoes-mock';
import { Component, OnInit } from '@angular/core';
import { RedeSocial } from './resolucao.model';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  inputFile: any;
  srcImg: any;
  imgHeight: number = 300;
  imgWidth: number = 300;
  loadingImg: boolean = false;
  resolucoes: RedeSocial[] = RESOLUCOES;
  btnsEscolhaRedeSocial: boolean = false;
  form: FormGroup;
  storiesBtn:boolean = false;

  constructor(private fb: FormBuilder){}

  ngOnInit(){
    this.form = this.fb.group({foto: null});
  }

  resetForm(){
    this.form.reset();
  }

  onChange(event: any){
    console.log(event)
    const selectedPhoto = <FileList>event.srcElement.files;
    if(selectedPhoto[0]){
      this.loadingImg = true;
      const reader = new FileReader();
      reader.addEventListener("load", (e) => {
        this.srcImg = e.target.result;
        this.loadingImg = false;
      });
      reader.readAsDataURL(selectedPhoto[0]);
    }
  }

  escolherRedeSocial(redeSocial: string){
    this.btnsEscolhaRedeSocial = true;
    redeSocial === 'Twitter' ? this.storiesBtn = false : this.storiesBtn = true;
    this.resolucoes = this.resolucoes.filter(r => r.nome === redeSocial);
  }

  escolherTipo(tipo: string){
    this.resolucoes = this.resolucoes.filter(r => r.postagem === tipo);
    this.imgHeight = this.resolucoes[0].resolucao.height;
    this.imgWidth = this.resolucoes[0].resolucao.width;
  }

  voltarOpcoes(){
    this.resolucoes = RESOLUCOES;
    this.btnsEscolhaRedeSocial = false;
  }

  voltar(){
    this.btnsEscolhaRedeSocial = false;
    this.srcImg = null;
    this.loadingImg = false;
    this.resolucoes = RESOLUCOES;
    this.imgHeight = 300;
    this.imgWidth = 300;
    this.resetForm();
  }
}
