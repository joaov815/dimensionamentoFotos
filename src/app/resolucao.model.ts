class Resolucao{
  width: number;
  height: number;
}

export class RedeSocial{
  id: string;
  nome: string;
  postagem: string;
  resolucao: Resolucao = new Resolucao();
}
