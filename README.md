# 🥋 Chuck Norris Jokes - Site Interativo

![Chuck Norris](https://api.chucknorris.io/img/avatar/chuck-norris.png)

> **Projeto Acadêmico** - Disciplina de Tecnologias Web Mobile (2025/02)  
> **Curso**: Engenharia de Computação  
> **Autor**: Matheus da Silva Fernandes  
> **GitHub**: [@ChaMatteCoder](https://github.com/ChaMatteCoder)

## 📋 Descrição do Projeto

Site web interativo desenvolvido para consumo da API pública do Chuck Norris, criado como atividade prática da disciplina de **Tecnologias Web Mobile**. O projeto demonstra o uso de tecnologias front-end modernas para criar uma aplicação responsiva e dinâmica.

### 🎯 Objetivos Acadêmicos

- Praticar consumo de APIs RESTful
- Desenvolver interfaces responsivas com HTML5, CSS3 e JavaScript
- Implementar funcionalidades modernas de front-end
- Gerenciamento de estado com localStorage
- Implementação de design patterns em JavaScript

## 🚀 Funcionalidades

### ✨ Principais
- **🔀 Piadas Aleatórias**: Busca piadas aleatórias da API oficial
- **📂 Categorias**: Filtro por categorias específicas
- **⭐ Favoritos**: Sistema de favoritos com persistência local
- **🌐 Tradução**: Tradução automática PT-BR com API MyMemory
- **📊 Estatísticas**: Dashboard com métricas de uso
- **📱 Responsivo**: Design adaptável para todos os dispositivos

### 🎨 Interface
- **Design Moderno**: Interface com gradientes animados e efeitos visuais
- **Animações Suaves**: Transições e micro-interações
- **Modo Escuro**: Tema escuro otimizado para visualização
- **Navegação Intuitiva**: Sistema de abas para organização do conteúdo

## 🛠 Tecnologias Utilizadas

| Tecnologia | Finalidade |
|------------|------------|
| **HTML5** | Estrutura semântica do site |
| **CSS3** | Estilização avançada com variáveis CSS e animações |
| **JavaScript ES6+** | Lógica da aplicação e manipulação de APIs |
| **Chuck Norris API** | Fonte das piadas (https://api.chucknorris.io) |
| **MyMemory API** | Serviço de tradução automática |
| **Font Awesome** | Ícones e elementos visuais |
| **Google Fonts** | Tipografia (Poppins) |
| **LocalStorage** | Persistência de dados local |

chuck-norris-jokes/
├── 📄 index.html # Estrutura principal
├── 🎨 style.css # Estilos e animações
├── ⚡ script.js # Lógica da aplicação
├── 📖 README.md # Documentação


## 🎮 Como Usar

### 🖥️ Online
1. Acesse o site hospedado: [Link do GitHub Pages]
2. Clique em "Obter Piada Aleatória"
3. Explore as categorias, favoritos e estatísticas

### 💻 Localmente
```bash
# Clone o repositório
git clone https://github.com/ChaMatteCoder/chuck-norris-jokes.git

# Abra o arquivo index.html no navegador
# Ou use um servidor local:
python -m http.server 8000
# Acesse: http://localhost:8000

🔧 Funcionalidades Técnicas
API Integration

// Exemplo de consumo da API
const response = await fetch('https://api.chucknorris.io/jokes/random');
const data = await response.json();

Sistema de Favoritos
Armazenamento local no navegador

Persistência entre sessões

Interface para gerenciamento

Responsividade
Mobile-first approach

Breakpoints para tablets e desktops

Interface adaptativa

📚 Aprendizados Desenvolvidos
Front-end Development: HTML5 semântico, CSS3 avançado, JavaScript moderno

APIs REST: Consumo e tratamento de dados externos

Web Storage: Uso de localStorage para persistência

UI/UX Design: Princípios de design responsivo e experiência do usuário

Git & GitHub: Versionamento e documentação de projetos

👨‍💻 Autor
Matheus da Silva Fernandes
🎓 Engenharia de Computação - Disciplina: Tecnologias Web Mobile (2025/02)

🌐 Contatos
GitHub: ChaMatteCoder

Instagram: @cha_matheus

X (Twitter): @ChaMatteh_

📄 Licença
Este projeto foi desenvolvido para fins acadêmicos. A API do Chuck Norris é de uso público e gratuito.

<div align="center">
"Chuck Norris não lê códigos. Ele apenas olha para o computador e espera que ele se comporte." 🤠

</div> ```
🚀 Deploy no GitHub Pages (Opcional)
Para hospedar o site gratuitamente:

No repositório no GitHub, vá em Settings

No menu lateral, clique em Pages

Em Branch, selecione main e /root

Clique em Save

Aguarde alguns minutos e seu site estará em:
https://chamattecoder.github.io/chuck-norris-jokes
