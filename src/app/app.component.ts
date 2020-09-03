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
  imgEvent: any;
  imgHeight: number = 1;
  imgWidth: number = 1;
  loadingImg: boolean = false;
  resolucoes: RedeSocial[] = RESOLUCOES;
  btnsEscolhaRedeSocial: boolean = false;
  form: FormGroup;
  storiesBtn:boolean = false;
  redeSocialSelecionda: string = '';
  croppedImage: any;
  fotoConfirmada: boolean = false;

  constructor(private fb: FormBuilder){}

  ngOnInit(){
    this.form = this.fb.group({foto: null});
  }

  imageCropped(e){
    this.croppedImage = e.base64;
  }

  onChange(event: any){
    this.loadingImg = true;
    this.imgEvent = event;
    this.loadingImg = false;
  }

  escolherRedeSocial(redeSocial: string){
    this.btnsEscolhaRedeSocial = true;
    this.redeSocialSelecionda = redeSocial;
    redeSocial === 'Twitter' ? this.storiesBtn = false : this.storiesBtn = true;
    this.resolucoes = this.resolucoes.filter(r => r.nome === redeSocial);
  }

  escolherTipo(tipo: string){
    this.resolucoes = RESOLUCOES;
    this.resolucoes = this.resolucoes.filter(r => r.postagem === tipo);
    this.imgHeight = this.resolucoes[0].resolucao.heightRatio;
    this.imgWidth = this.resolucoes[0].resolucao.widthRatio;
  }

  voltarOpcoes(){
    this.resolucoes = RESOLUCOES;
    this.btnsEscolhaRedeSocial = false;
  }

  voltarInicio(){
    this.btnsEscolhaRedeSocial = false;
    this.redeSocialSelecionda = '';
    this.loadingImg = false;
    this.imgEvent = null;
    this.resolucoes = RESOLUCOES;
    this.imgHeight = 1;
    this.imgWidth = 1;
    this.form.reset();
    this.fotoConfirmada = false;
  }

  postar(){
    this.fotoConfirmada = true;
    // abrir rede social pra postar

  }
}
