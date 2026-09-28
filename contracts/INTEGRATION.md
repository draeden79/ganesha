# Integração com acesso e pagamentos

Estado: proposta de interface a validar com o colega; não há integração de produção confirmada.

## Entrada

O aplicativo usa `/course/[locale]` para demonstração pública identificada e `/learn/[locale]` para percurso protegido, com `/api/progress` reservado à persistência autenticada. Sem integração configurada, o percurso protegido falha fechado. O sistema externo autentica o aluno e resolve o direito de acesso no servidor. Nunca enviar credencial ou dado de pagamento por query string. Idioma, ferramenta e aula desejada podem ser parâmetros de navegação não sensíveis.

```ts
type AccessContext =
  | { status: 'granted'; learnerId: string; courseIds: string[]; displayName?: string; locale?: string }
  | { status: 'denied'; reason: 'signed-out' | 'not-entitled' | 'expired'; actionUrl?: string }
  | { status: 'demo'; learnerId: 'demo-local' };

interface AccessAdapter {
  getAccess(): Promise<AccessContext>;
}
```

`learnerId` é opaco e estável. O frontend não decide pagamento ou autenticação a partir de localStorage. No protótipo, o adaptador de demonstração se identifica na interface e não libera dados protegidos reais. Produção exige verificação pelo backend do colega. URLs de retorno configuradas devem usar origem permitida.

## Progresso

```ts
interface ProgressAdapter {
  load(learnerId: string, courseId: string, courseVersion: string): Promise<LearnerProgress | null>;
  save(progress: LearnerProgress): Promise<void>;
}
```

O protótipo pode persistir localmente sob chave incluindo learner/curso/versão. A UI informa quando salvar falha e permite continuar na sessão sem afirmar que os dados foram salvos. JSON corrompido é preservado ou isolado para recuperação; não gerar loop de erro. O adaptador remoto futuro deve aplicar autorização por aluno no servidor.

Locale e ferramenta são preferências, não chaves de identidade. Uma troca de ferramenta preserva tentativas registradas com a ferramenta original; critérios incompatíveis precisam de revalidação explícita.

## Eventos opcionais

`lesson_started`, `practice_completed`, `check_attempted`, `lesson_completed`: incluir courseId/version, lessonId, stepId, tool e locale. Não registrar prompts pessoais, conteúdo de projetos, email ou dados de pagamento. Nenhum serviço de analytics é requisito do primeiro incremento.

## Handoff necessário

O colega informa framework, origem/path final, mecanismo de sessão, acesso a curso e endpoint/adaptador de progresso. O Construtor mantém essas diferenças atrás dos adaptadores; o conteúdo e seus IDs não dependem do framework. Publicação e domínio são decisões posteriores à validação do release candidate.
