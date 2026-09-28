# Revisão da prévia visual Astra

28/09/2026. Prévia local em `127.0.0.1:4180/astra/`, conteúdo Astra-PTBR-1.0. Inspeção interna do Artista, sem participantes externos.

## Cobertura realizada

- As 61 etapas foram abertas no navegador a 1280 px e 390 px. Todas apresentaram título e conteúdo; nenhuma produziu rolagem horizontal da página. Rastros: `desktop-61-stages.json` e `mobile-61-stages.json`.
- Mapa, orientação, galeria e as cenas específicas de arquivo, hierarquia e entrega também foram verificados a 390 px após os ajustes finais.
- Os 13 SVGs foram abertos individualmente. A geometria renderizada dos textos ficou dentro dos painéis; todos têm `title` e `desc`. Registro: `svg-bounds.json`.
- Capturas inspecionadas da abertura desktop/mobile, mapa, cena texto–arquivo–página, ciclo de tarefas e regra de seleção. A fonte e a identidade carregaram localmente.
- Cópia de pedido testada na aula 2: o botão mudou para “Copiado” após a API de cópia concluir. O bloco completo permanece selecionável como alternativa.
- Foco visível de 3 px observado no botão de confirmação da demonstração da aula 10; ativação por Enter produziu o estado esperado. Isso é uma amostra, não uma auditoria completa de acessibilidade.
- Ensaio da composição RTL e ampliação de rótulos na galeria, a 390 px, sem overflow. Os textos continuaram em português, conforme rótulo; não foi testada uma tradução árabe.

## Estados preparados conferidos

| Demonstração | Observação |
|---|---|
| Aula 5, tarefas | Adicionar duas → 2 pendências; concluir a primeira → 1; excluir a segunda → 0, com uma linha concluída restante |
| Aula 6, validação | Vazio, 1.5 e 366 recusados com motivo; 0, −30 e 365 aceitos |
| Aula 7, restauração | Excluir → 3 registros; cancelar → 3; confirmar cópia → 4 e 3 pendências; recusar versão 99 → mantém 4 |
| Aula 9, duas condições | Cadeiras com 3 ou 2 dias: 2 lembretes; com 1 ou −2: 3; roteiro concluído sempre fica fora |
| Aula 10, histórico | Cancelar → 0; confirmar → 2; repetir → continua 2, com chaves A01/A02 + prazo-v1 |

Esses resultados são de **demonstrações locais escritas para o material visual**. Não são execução do código gerado pelos alunos nem prova de persistência, importação real, envio ou aprendizagem.

## Limitações

Não houve teste humano de compreensão, avaliação com leitor de tela, medição de tempo de aprendizagem, tradução das outras dez línguas ou uso das interfaces comerciais. A largura de celular verifica leitura do material; o percurso completo de arquivos do Professor continua destinado ao computador.

As capturas são recortes de viewport; não devem ser tratadas como evidência de conteúdo abaixo da área capturada. Navegação completa e limites de página estão documentados nos rastros separados.
