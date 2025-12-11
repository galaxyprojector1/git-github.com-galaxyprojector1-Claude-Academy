import { Module } from './types';

export const MODULES: Module[] = [
  {
    id: 1,
    title: "Les Bases de Claude Code",
    subtitle: "Comprendre et lancer Claude Code",
    duration: "10 min",
    status: 'available',
    content: `
      <h2>Qu'est-ce que Claude Code ?</h2>
      <p>Claude Code est un <strong>outil en ligne de commande (<span class="info-trigger" data-term="cli">CLI</span>)</strong> qui permet a Claude d'interagir directement avec ton ordinateur :</p>
      <ul>
        <li>Lire et ecrire des fichiers</li>
        <li>Executer des commandes <span class="info-trigger" data-term="terminal">terminal</span></li>
        <li>Naviguer dans ton code</li>
        <li>Utiliser des outils externes (<span class="info-trigger" data-term="mcp">MCP</span>)</li>
      </ul>

      <h3>Difference avec Claude.ai</h3>
      <table>
        <thead>
          <tr><th>Claude.ai</th><th>Claude Code</th></tr>
        </thead>
        <tbody>
          <tr><td>Interface web</td><td>Terminal/CLI</td></tr>
          <tr><td>Conversation seulement</td><td>Actions sur ton PC</td></tr>
          <tr><td>Pas d'acces fichiers</td><td>Lit/ecrit tes fichiers</td></tr>
          <tr><td>Pas de terminal</td><td>Execute des commandes</td></tr>
        </tbody>
      </table>

      <h3>Lancer Claude Code</h3>
      <pre><code># Lancer dans le dossier courant
claude

# Lancer dans un dossier specifique
claude /chemin/vers/projet

# Lancer avec une question directe
claude -p "Explique ce projet"</code></pre>

      <h3>Raccourcis essentiels</h3>
      <table>
        <thead>
          <tr><th>Raccourci</th><th>Action</th></tr>
        </thead>
        <tbody>
          <tr><td><code>Entree</code></td><td>Envoyer le message</td></tr>
          <tr><td><code>Shift+Entree</code></td><td>Nouvelle ligne</td></tr>
          <tr><td><code>Ctrl+C</code></td><td>Annuler</td></tr>
          <tr><td><code>Esc Esc</code></td><td>Interrompre Claude</td></tr>
          <tr><td><code>Tab</code></td><td>Activer/desactiver thinking</td></tr>
          <tr><td><code>Shift+Tab</code></td><td>Plan Mode</td></tr>
        </tbody>
      </table>

      <div class="tip">
        <strong>Conseil Pro :</strong> Claude Code fonctionne comme un assistant de programmation qui a acces a ton systeme. Pense a lui donner du contexte sur ton projet !
      </div>
    `,
    quiz: [
      {
        id: 101,
        text: "Quelle est la principale difference entre Claude.ai et Claude Code ?",
        options: ["L'interface graphique", "Claude Code peut agir sur ton PC (fichiers, terminal)", "Le prix", "La langue"],
        correctIndex: 1,
        explanation: "Claude Code est un CLI qui peut lire/ecrire des fichiers et executer des commandes sur ton ordinateur, contrairement a Claude.ai qui est une interface web conversationnelle."
      },
      {
        id: 102,
        text: "Comment lancer Claude Code dans le dossier courant ?",
        options: ["claude start", "claude run", "claude", "claude init"],
        correctIndex: 2,
        explanation: "La commande 'claude' seule lance Claude Code dans le dossier courant."
      },
      {
        id: 103,
        text: "Comment interrompre Claude quand il travaille ?",
        options: ["Ctrl+Z", "Alt+F4", "Esc Esc (appuyer 2 fois)", "Fermer le terminal"],
        correctIndex: 2,
        explanation: "Appuyer deux fois sur Echap (Esc Esc) interrompt Claude proprement."
      }
    ]
  },
  {
    id: 2,
    title: "Memory & CLAUDE.md",
    subtitle: "Configurer la memoire de Claude",
    duration: "15 min",
    status: 'locked',
    content: `
      <h2>Le systeme de memoire</h2>
      <p>Claude Code utilise des fichiers <span class="info-trigger" data-term="markdown">markdown</span> pour memoriser le contexte de tes projets.</p>

      <h3>Types de fichiers memoire</h3>
      <table>
        <thead>
          <tr><th>Fichier</th><th>Emplacement</th><th>Usage</th></tr>
        </thead>
        <tbody>
          <tr><td><code><span class="info-trigger" data-term="claude-md">CLAUDE.md</span></code></td><td>Racine projet</td><td>Instructions partagees (equipe)</td></tr>
          <tr><td><code><span class="info-trigger" data-term="claude-local-md">CLAUDE.local.md</span></code></td><td>Racine projet</td><td>Instructions perso (<span class="info-trigger" data-term="gitignore">gitignore</span>)</td></tr>
          <tr><td><code>~/.claude/CLAUDE.md</code></td><td>Home</td><td>Instructions globales</td></tr>
          <tr><td><code>.claude/rules/*.md</code></td><td>Projet</td><td>Regles modulaires</td></tr>
        </tbody>
      </table>

      <h3>Hierarchie de priorite</h3>
      <pre><code>CLAUDE.local.md -> CLAUDE.md -> rules/ -> ~/.claude/CLAUDE.md
(plus haute)                                    (plus basse)</code></pre>

      <h3>Exemple de CLAUDE.md</h3>
      <pre><code># Mon Projet

## Preferences
- Langue : Francais
- Style : Concis

## Commandes
- npm run dev : Developpement
- npm run build : Production

## Regles
@.claude/rules/style.md</code></pre>

      <h3>Commandes utiles</h3>
      <table>
        <thead>
          <tr><th>Commande</th><th>Description</th></tr>
        </thead>
        <tbody>
          <tr><td><code>/init</code></td><td>Creer CLAUDE.md</td></tr>
          <tr><td><code>/memory</code></td><td>Editer la memoire</td></tr>
          <tr><td><code>#ma note</code></td><td>Ajouter rapidement une note</td></tr>
        </tbody>
      </table>

      <div class="tip">
        <strong>Conseil Pro :</strong> Garde ton CLAUDE.md concis (moins de 50 lignes). Utilise les imports <code>@fichier</code> pour les details.
      </div>
    `,
    quiz: [
      {
        id: 201,
        text: "Quel fichier a la priorite la plus haute pour les instructions ?",
        options: ["~/.claude/CLAUDE.md", "CLAUDE.md", "CLAUDE.local.md", ".claude/rules/"],
        correctIndex: 2,
        explanation: "CLAUDE.local.md a la priorite la plus haute car il contient les preferences personnelles qui override tout le reste."
      },
      {
        id: 202,
        text: "Comment ajouter rapidement une note a la memoire ?",
        options: ["/note ma note", "#ma note", "@note ma note", "!ma note"],
        correctIndex: 1,
        explanation: "Le prefixe # permet d'ajouter rapidement une note a la memoire de Claude."
      },
      {
        id: 203,
        text: "Quelle commande cree un fichier CLAUDE.md ?",
        options: ["/create", "/new", "/init", "/setup"],
        correctIndex: 2,
        explanation: "La commande /init cree un fichier CLAUDE.md avec un template de base."
      }
    ]
  },
  {
    id: 3,
    title: "Commandes & Raccourcis",
    subtitle: "Maitriser les commandes slash",
    duration: "12 min",
    status: 'locked',
    content: `
      <h2>Commandes integrees</h2>

      <h3>Gestion de session</h3>
      <table>
        <thead>
          <tr><th>Commande</th><th>Description</th></tr>
        </thead>
        <tbody>
          <tr><td><code><span class="info-trigger" data-term="clear">/clear</span></code></td><td>Reinitialiser le contexte</td></tr>
          <tr><td><code><span class="info-trigger" data-term="compact">/compact</span></code></td><td>Compresser le contexte</td></tr>
          <tr><td><code>/context</code></td><td>Voir utilisation <span class="info-trigger" data-term="tokens">tokens</span></td></tr>
          <tr><td><code>/resume</code></td><td>Reprendre une session</td></tr>
          <tr><td><code>/cost</code></td><td>Voir les couts</td></tr>
        </tbody>
      </table>

      <h3>Configuration</h3>
      <table>
        <thead>
          <tr><th>Commande</th><th>Description</th></tr>
        </thead>
        <tbody>
          <tr><td><code>/init</code></td><td>Creer CLAUDE.md</td></tr>
          <tr><td><code>/memory</code></td><td>Editer la memoire</td></tr>
          <tr><td><code>/mcp</code></td><td>Gerer les serveurs MCP</td></tr>
          <tr><td><code>/model</code></td><td>Changer de modele</td></tr>
          <tr><td><code>/config</code></td><td>Configuration generale</td></tr>
          <tr><td><code>/permissions</code></td><td>Gerer permissions</td></tr>
        </tbody>
      </table>

      <h3>Raccourcis clavier</h3>
      <table>
        <thead>
          <tr><th>Raccourci</th><th>Action</th></tr>
        </thead>
        <tbody>
          <tr><td><code>Entree</code></td><td>Envoyer</td></tr>
          <tr><td><code>Shift+Entree</code></td><td>Nouvelle ligne</td></tr>
          <tr><td><code>Tab</code></td><td>Toggle thinking</td></tr>
          <tr><td><code>Shift+Tab</code></td><td>Changer de mode</td></tr>
          <tr><td><code>Ctrl+C</code></td><td>Annuler</td></tr>
          <tr><td><code>Esc Esc</code></td><td>Interrompre/Rewind</td></tr>
          <tr><td><code>Ctrl+R</code></td><td>Historique</td></tr>
          <tr><td><code>#</code></td><td>Ajouter a memoire</td></tr>
          <tr><td><code>@</code></td><td>Mentionner fichier</td></tr>
        </tbody>
      </table>

      <h3>Creer ses propres <span class="info-trigger" data-term="slash-commands">commandes slash</span></h3>
      <pre><code># Emplacement
~/.claude/commands/      # Global (tous projets)
.claude/commands/        # Projet (partage equipe)

# Structure d'une commande (fichier .md)
---
description: Ma commande personnalisee
allowed-tools: Read, Bash
---

# Instructions
Faire ceci avec $ARGUMENTS</code></pre>

      <div class="tip">
        <strong>Conseil Pro :</strong> Utilise <code>@fichier</code> pour mentionner des fichiers dans tes messages. Claude les lira automatiquement !
      </div>
    `,
    quiz: [
      {
        id: 301,
        text: "Quelle commande permet de compresser le contexte quand il devient trop long ?",
        options: ["/clear", "/compact", "/reduce", "/compress"],
        correctIndex: 1,
        explanation: "La commande /compact compresse le contexte pour liberer de l'espace tout en gardant les informations importantes."
      },
      {
        id: 302,
        text: "Ou placer une commande personnalisee pour qu'elle soit disponible dans tous les projets ?",
        options: [".claude/commands/", "~/.claude/commands/", "/commands/", "~/.commands/"],
        correctIndex: 1,
        explanation: "Le dossier ~/.claude/commands/ contient les commandes globales disponibles dans tous les projets."
      },
      {
        id: 303,
        text: "Que fait le raccourci Tab ?",
        options: ["Autocomplete", "Toggle le mode thinking", "Nouvelle ligne", "Annuler"],
        correctIndex: 1,
        explanation: "Tab active ou desactive le mode thinking (reflexion etendue) de Claude."
      }
    ]
  },
  {
    id: 4,
    title: "MCP Servers",
    subtitle: "Connecter Claude a des outils externes",
    duration: "20 min",
    status: 'locked',
    content: `
      <h2>Qu'est-ce que MCP ?</h2>
      <p><strong><span class="info-trigger" data-term="mcp-protocol">Model Context Protocol</span></strong> permet de connecter Claude a des outils externes : GitHub, Supabase, Perplexity, Vercel, Slack...</p>

      <h3>Types de transport</h3>
      <table>
        <thead>
          <tr><th>Type</th><th>Description</th></tr>
        </thead>
        <tbody>
          <tr><td><code><span class="info-trigger" data-term="stdio">stdio</span></code></td><td>Commande locale (npx, node...)</td></tr>
          <tr><td><code><span class="info-trigger" data-term="http-transport">http</span></code></td><td>API distante (URL)</td></tr>
        </tbody>
      </table>

      <h3>Scopes de configuration</h3>
      <table>
        <thead>
          <tr><th>Scope</th><th>Fichier</th><th>Usage</th></tr>
        </thead>
        <tbody>
          <tr><td><span class="info-trigger" data-term="scope-user">User</span></td><td><code>~/.claude.json</code></td><td>Tous projets</td></tr>
          <tr><td>Project</td><td><code>.mcp.json</code></td><td>Partage equipe</td></tr>
          <tr><td>Local</td><td><code>settings.local.json</code></td><td>Perso projet</td></tr>
        </tbody>
      </table>

      <h3>Ajouter un MCP</h3>
      <pre><code># Global (tous projets)
claude mcp add --scope user github

# Projet (partage avec equipe)
claude mcp add --scope project supabase</code></pre>

      <h3>Gerer les MCP</h3>
      <pre><code>/mcp                    # Lister les serveurs
@github                 # Activer/desactiver rapidement
claude mcp remove nom   # Supprimer un serveur</code></pre>

      <h3>Configuration manuelle</h3>
      <pre><code>// Dans ~/.claude.json
{
  "mcpServers": {
    "github": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_TOKEN": "ton_token"
      }
    }
  }
}</code></pre>

      <div class="tip">
        <strong>Conseil Pro :</strong> Desactive les MCP non utilises pour accelerer le demarrage. Utilise <code>@mcp-name</code> pour toggle rapidement !
      </div>
    `,
    quiz: [
      {
        id: 401,
        text: "Que signifie MCP ?",
        options: ["Model Communication Protocol", "Model Context Protocol", "Multi Channel Protocol", "Machine Code Protocol"],
        correctIndex: 1,
        explanation: "MCP signifie Model Context Protocol, le protocole qui permet de connecter Claude a des outils externes."
      },
      {
        id: 402,
        text: "Quelle commande ajoute un MCP au scope global ?",
        options: ["claude mcp add github", "claude mcp add --scope user github", "claude add mcp github", "/mcp add github"],
        correctIndex: 1,
        explanation: "L'option --scope user ajoute le MCP au niveau global (~/.claude.json) pour tous les projets."
      },
      {
        id: 403,
        text: "Comment activer/desactiver rapidement un MCP ?",
        options: ["/mcp toggle nom", "@nom-du-mcp", "claude mcp toggle nom", "Ctrl+M"],
        correctIndex: 1,
        explanation: "Le prefixe @ suivi du nom du MCP permet de l'activer ou le desactiver rapidement."
      }
    ]
  },
  {
    id: 5,
    title: "Settings & Permissions",
    subtitle: "Configurer et securiser Claude Code",
    duration: "15 min",
    status: 'locked',
    content: `
      <h2>Fichiers de configuration</h2>

      <h3>Hierarchie de priorite (haute vers basse)</h3>
      <ol>
        <li>Command-line (flags)</li>
        <li><code>.claude/settings.local.json</code> (perso)</li>
        <li><code>.claude/settings.json</code> (equipe)</li>
        <li><code>~/.claude/settings.json</code> (global)</li>
      </ol>

      <h3>Structure du fichier</h3>
      <pre><code>{
  "<span class="info-trigger" data-term="permissions">permissions</span>": {
    "<span class="info-trigger" data-term="allow-deny-ask">allow</span>": ["Bash(npm run:*)"],
    "deny": ["Read(.env)"],
    "ask": ["Bash(git push:*)"]
  },
  "model": "claude-sonnet-4-5-20250929",
  "<span class="info-trigger" data-term="sandbox">sandbox</span>": {
    "enabled": true
  }
}</code></pre>

      <h3>Types de permissions</h3>
      <table>
        <thead>
          <tr><th>Type</th><th>Description</th></tr>
        </thead>
        <tbody>
          <tr><td><code>allow</code></td><td>Toujours autoriser (sans demander)</td></tr>
          <tr><td><code>deny</code></td><td>Toujours refuser</td></tr>
          <tr><td><code>ask</code></td><td>Demander confirmation a chaque fois</td></tr>
        </tbody>
      </table>

      <h3>Patterns de securite recommandes</h3>
      <pre><code>{
  "permissions": {
    "deny": [
      "Read(.env*)",
      "Read(**/secrets/**)",
      "Read(**/credentials/**)",
      "Bash(rm -rf:*)"
    ]
  }
}</code></pre>

      <h3>Sandbox</h3>
      <pre><code>{
  "sandbox": {
    "enabled": true,
    "excludedCommands": ["git"]
  }
}</code></pre>
      <p>Le sandbox isole les commandes dans un environnement securise.</p>

      <div class="tip">
        <strong>Conseil Pro :</strong> Commence avec des permissions restrictives et assouplis au besoin. Mieux vaut demander trop que pas assez !
      </div>
    `,
    quiz: [
      {
        id: 501,
        text: "Quelle permission bloque TOUJOURS une action ?",
        options: ["allow", "ask", "deny", "block"],
        correctIndex: 2,
        explanation: "La permission 'deny' bloque toujours l'action, sans possibilite de l'autoriser manuellement."
      },
      {
        id: 502,
        text: "Quel fichier de settings a la priorite la plus haute ?",
        options: ["~/.claude/settings.json", ".claude/settings.json", ".claude/settings.local.json", "package.json"],
        correctIndex: 2,
        explanation: "settings.local.json a la priorite la plus haute car il contient les preferences personnelles locales."
      },
      {
        id: 503,
        text: "Pourquoi denier l'acces aux fichiers .env ?",
        options: ["Ils sont trop gros", "Ils contiennent des secrets (API keys, passwords)", "Ils ralentissent Claude", "Ce n'est pas necessaire"],
        correctIndex: 1,
        explanation: "Les fichiers .env contiennent souvent des secrets (tokens, mots de passe) qui ne doivent pas etre exposes."
      }
    ]
  },
  {
    id: 6,
    title: "Skills & Sub-agents",
    subtitle: "Automatiser avec des agents specialises",
    duration: "20 min",
    status: 'locked',
    content: `
      <h2><span class="info-trigger" data-term="skills">Skills</span> vs Commandes</h2>
      <table>
        <thead>
          <tr><th>Aspect</th><th>Commande</th><th>Skill</th></tr>
        </thead>
        <tbody>
          <tr><td>Invocation</td><td><code>/nom</code> manuel</td><td>Automatique</td></tr>
          <tr><td>Fichier</td><td><code>commands/nom.md</code></td><td><code>skills/nom/SKILL.md</code></td></tr>
          <tr><td>Declencheur</td><td>L'utilisateur</td><td>Claude detecte</td></tr>
        </tbody>
      </table>

      <h3>Creer un Skill</h3>
      <pre><code># Structure
.claude/skills/pdf-processing/
  SKILL.md
  scripts/

# Contenu de SKILL.md
---
name: pdf-processing
description: Traite les PDF. Utiliser quand .pdf mentionne.
allowed-tools: Read, Bash
---

# PDF Processing

## Instructions
1. Lire le PDF
2. Extraire le contenu
3. Retourner resultats</code></pre>

      <h3>Sub-agents</h3>
      <p>Les <span class="info-trigger" data-term="subagents">sub-agents</span> sont des agents specialises pour des taches specifiques.</p>

      <pre><code># Creer via la commande
/agents

# Ou fichier .claude/agents/reviewer.md
---
name: code-reviewer
description: Expert code review
tools: Read, Grep, Glob
model: sonnet
---

Tu es un reviewer senior...</code></pre>

      <h3>Subagents integres</h3>
      <table>
        <thead>
          <tr><th>Agent</th><th>Usage</th></tr>
        </thead>
        <tbody>
          <tr><td><code><span class="info-trigger" data-term="explore-agent">Explore</span></code></td><td>Explorer rapidement un codebase (utilise <span class="info-trigger" data-term="haiku-model">Haiku</span>)</td></tr>
          <tr><td><code>Plan</code></td><td>Planifier des taches complexes</td></tr>
        </tbody>
      </table>

      <div class="tip">
        <strong>Conseil Pro :</strong> Les Skills se declenchent automatiquement quand Claude detecte un pattern. Utilise-les pour les taches repetitives !
      </div>
    `,
    quiz: [
      {
        id: 601,
        text: "Quelle est la difference principale entre un Skill et une Commande ?",
        options: ["Le prix", "Les Skills se declenchent automatiquement", "Les Skills sont plus rapides", "Aucune difference"],
        correctIndex: 1,
        explanation: "Les Skills se declenchent automatiquement quand Claude detecte un pattern, contrairement aux commandes qui sont manuelles."
      },
      {
        id: 602,
        text: "Ou placer le fichier SKILL.md pour un skill nomme 'pdf-processing' ?",
        options: [".claude/skills/pdf-processing/SKILL.md", ".claude/commands/pdf-processing.md", "skills/pdf-processing.md", "~/.claude/pdf-processing/"],
        correctIndex: 0,
        explanation: "Les skills sont places dans .claude/skills/nom-du-skill/SKILL.md"
      },
      {
        id: 603,
        text: "Quel subagent integre utilise le modele Haiku pour explorer rapidement ?",
        options: ["Plan", "Review", "Explore", "Search"],
        correctIndex: 2,
        explanation: "L'agent Explore utilise Haiku (modele rapide) pour explorer rapidement un codebase."
      }
    ]
  },
  {
    id: 7,
    title: "Hooks & Automation",
    subtitle: "Automatiser des actions",
    duration: "15 min",
    status: 'locked',
    content: `
      <h2>Qu'est-ce qu'un <span class="info-trigger" data-term="hooks">Hook</span> ?</h2>
      <p>Un hook est du code qui s'execute <strong>automatiquement</strong> avant ou apres une action de Claude.</p>

      <h3>Types de hooks</h3>
      <table>
        <thead>
          <tr><th>Hook</th><th>Quand</th><th>Peut bloquer</th></tr>
        </thead>
        <tbody>
          <tr><td><code><span class="info-trigger" data-term="pre-tool-use">PreToolUse</span></code></td><td>Avant un outil</td><td>Oui</td></tr>
          <tr><td><code><span class="info-trigger" data-term="post-tool-use">PostToolUse</span></code></td><td>Apres un outil</td><td>Non</td></tr>
          <tr><td><code>SessionStart</code></td><td>Debut session</td><td>Non</td></tr>
        </tbody>
      </table>

      <h3>Configuration dans settings.json</h3>
      <pre><code>{
  "hooks": {
    "PostToolUse": [
      {
        "<span class="info-trigger" data-term="matcher">matcher</span>": "Edit|Write",
        "hooks": [
          {
            "type": "command",
            "command": "npx prettier --write \\"$file_path\\""
          }
        ]
      }
    ]
  }
}</code></pre>

      <h3>Exemples utiles</h3>

      <h4>Auto-format apres edition</h4>
      <pre><code>{
  "hooks": {
    "PostToolUse": {
      "Edit": "prettier --write"
    }
  }
}</code></pre>

      <h4>Lint avant commit</h4>
      <pre><code>{
  "hooks": {
    "PreToolUse": {
      "Bash(git commit:*)": "npm run lint"
    }
  }
}</code></pre>

      <h3>Bonnes pratiques</h3>
      <ul>
        <li>Hooks rapides (pas de process longs)</li>
        <li>Gerer les erreurs proprement</li>
        <li>Tester avant production</li>
      </ul>

      <div class="tip">
        <strong>Conseil Pro :</strong> Utilise PostToolUse pour auto-formater le code. Utilise PreToolUse pour valider avant des actions critiques !
      </div>
    `,
    quiz: [
      {
        id: 701,
        text: "Quel hook peut BLOQUER une action de Claude ?",
        options: ["PostToolUse", "PreToolUse", "SessionStart", "Aucun"],
        correctIndex: 1,
        explanation: "PreToolUse s'execute AVANT l'action et peut la bloquer si necessaire (par exemple, lint qui echoue)."
      },
      {
        id: 702,
        text: "Pour auto-formater le code apres edition, quel hook utiliser ?",
        options: ["PreToolUse", "PostToolUse", "SessionStart", "OnEdit"],
        correctIndex: 1,
        explanation: "PostToolUse s'execute apres l'edition, parfait pour lancer prettier ou un formatter."
      },
      {
        id: 703,
        text: "Pourquoi les hooks doivent etre rapides ?",
        options: ["Pour economiser de l'argent", "Pour ne pas ralentir Claude", "Ils ne peuvent pas etre longs", "Ce n'est pas important"],
        correctIndex: 1,
        explanation: "Les hooks s'executent a chaque action. Des hooks lents ralentiraient significativement le workflow."
      }
    ]
  },
  {
    id: 8,
    title: "Best Practices",
    subtitle: "Workflows professionnels et optimisation",
    duration: "20 min",
    status: 'locked',
    content: `
      <h2>Workflows recommandes</h2>

      <h3>1. Explore - Plan - Code - Commit</h3>
      <pre><code>1. Explorer : comprendre le code existant
2. Shift+Tab : Plan Mode (lecture seule)
3. Coder : implementer
4. Committer : verifier puis commit</code></pre>

      <h3>2. Test-Driven Development</h3>
      <pre><code>1. Ecrire tests d'abord
2. Les faire echouer
3. Claude implemente
4. Tests passent</code></pre>

      <h3>3. Taches paralleles (<span class="info-trigger" data-term="worktrees">worktrees</span>)</h3>
      <pre><code>git worktree add ../feature-a -b feature-a
cd ../feature-a && claude</code></pre>

      <h2>Optimisation</h2>

      <h3>Gestion du <span class="info-trigger" data-term="context-management">contexte</span></h3>
      <table>
        <thead>
          <tr><th>Action</th><th>Commande</th></tr>
        </thead>
        <tbody>
          <tr><td>Reinitialiser</td><td><code>/clear</code></td></tr>
          <tr><td>Compresser</td><td><code><span class="info-trigger" data-term="compact">/compact</span></code></td></tr>
          <tr><td>Voir usage</td><td><code>/context</code></td></tr>
        </tbody>
      </table>

      <h3>Optimiser les MCP</h3>
      <ul>
        <li>Desactiver MCP non utilises</li>
        <li>Utiliser <code>@mcp-name</code> pour toggle</li>
      </ul>

      <h3>Optimiser CLAUDE.md</h3>
      <ul>
        <li>Garder concis (moins de 50 lignes)</li>
        <li>Utiliser imports <code>@fichier</code></li>
        <li>Organiser avec <code>.claude/rules/</code></li>
      </ul>

      <h2>Erreurs a eviter</h2>
      <table>
        <thead>
          <tr><th>Erreur</th><th>Solution</th></tr>
        </thead>
        <tbody>
          <tr><td>CLAUDE.md trop long</td><td>Utiliser rules/ et imports</td></tr>
          <tr><td>Tous MCP actifs</td><td>Desactiver non utilises</td></tr>
          <tr><td>Pas de Plan Mode</td><td>Shift+Tab pour explorer</td></tr>
          <tr><td>Secrets dans CLAUDE.md</td><td>Utiliser .env et deny</td></tr>
        </tbody>
      </table>

      <h2>Securite</h2>
      <pre><code>{
  "permissions": {
    "deny": [
      "Read(.env*)",
      "Read(**/secrets/**)"
    ]
  },
  "sandbox": {
    "enabled": true
  }
}</code></pre>

      <div class="tip">
        <strong>Felicitations !</strong> Tu as termine tous les modules ! Continue a pratiquer et explore les fonctionnalites avancees.
      </div>
    `,
    quiz: [
      {
        id: 801,
        text: "Quel est le workflow recommande pour une nouvelle feature ?",
        options: ["Code - Test - Deploy", "Explore - Plan - Code - Commit", "Commit - Test - Fix", "Plan - Deploy - Test"],
        correctIndex: 1,
        explanation: "Explorer d'abord, planifier, coder, puis committer permet de comprendre le contexte et d'eviter les erreurs."
      },
      {
        id: 802,
        text: "Pourquoi garder CLAUDE.md concis (moins de 50 lignes) ?",
        options: ["Limite technique", "Pour economiser les tokens et garder Claude rapide", "C'est juste une recommandation", "Aucune raison"],
        correctIndex: 1,
        explanation: "Un CLAUDE.md trop long consomme des tokens et ralentit Claude. Utilise les imports pour les details."
      },
      {
        id: 803,
        text: "Comment travailler sur plusieurs features en parallele ?",
        options: ["Ouvrir plusieurs terminaux", "Utiliser git worktrees", "Ce n'est pas possible", "Changer de branche"],
        correctIndex: 1,
        explanation: "Les git worktrees permettent d'avoir plusieurs copies du repo avec des branches differentes, parfait pour le travail parallele."
      }
    ]
  }
];
