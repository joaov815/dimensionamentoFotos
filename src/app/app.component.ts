import { RESOLUCOES } from './resolucoes-mock';
import { Component, ViewChild } from '@angular/core';
import { RedeSocial } from './resolucao.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('inputImg') fileInput: HTMLElement;
  inputFile: any;
  srcImg: any;
  imgHeight: number = 300;
  imgWidth: number = 300;
  loadingImg: boolean = false;
  resolucoes: RedeSocial[] = RESOLUCOES;
  btnsEscolhaRedeSocial: boolean = false;

  onChange(event){
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
    this.resolucoes = this.resolucoes.filter(r => r.nome === redeSocial);
  }

  escolherTipo(tipo: string){
    this.resolucoes = this.resolucoes.filter(r => r.postagem === tipo);
    this.imgHeight = this.resolucoes[0].resolucao.height;
    this.imgWidth = this.resolucoes[0].resolucao.width;
  }

  voltar(){
    this.btnsEscolhaRedeSocial = false;
    this.srcImg = null;
    this.loadingImg = false;
    this.resolucoes = RESOLUCOES;
    this.imgHeight = 300;
    this.imgWidth = 300;
    this.fileInput = null;
  }
}
