export interface GlossaryEntry {
  title: string;      // Titre affiché dans le popover
  summary: string;    // Résumé court (2-3 phrases)
  details: string;    // Explication détaillée (révélée par "En savoir plus")
}

export const GLOSSARY: Record<string, GlossaryEntry> = {
  // ===== MODULE 1 - BASES =====
  "cli": {
    title: "CLI (Command Line Interface)",
    summary: "Interface en ligne de commande qui permet d'interagir avec Claude Code depuis le terminal. C'est l'outil principal pour lancer des sessions interactives ou exécuter des commandes ponctuelles.",
    details: "Le CLI de Claude Code se lance avec la commande `claude` dans le terminal. Il offre deux modes principaux : interactif (pour des conversations longues avec `claude`) et non-interactif (pour des requêtes ponctuelles avec `claude -p \"query\"`). Installer via `curl -fsSL https://claude.ai/install.sh | bash` sur macOS/Linux ou `npm install -g @anthropic-ai/claude-code` via npm."
  },

  "terminal": {
    title: "Terminal",
    summary: "Application qui permet d'exécuter des commandes textuelles sur votre ordinateur. C'est l'environnement où vit Claude Code.",
    details: "Le terminal (ou console/shell) est l'interface où vous tapez des commandes pour interagir avec votre système d'exploitation. Sur macOS/Linux, c'est Terminal ou iTerm, sur Windows c'est PowerShell ou cmd. Claude Code nécessite un terminal moderne avec support des couleurs et du texte formaté pour fonctionner correctement. Les commandes courantes incluent `cd` (changer de dossier), `ls` (lister les fichiers), et bien sûr `claude` pour lancer l'assistant."
  },

  "mcp": {
    title: "MCP (Model Context Protocol)",
    summary: "Protocole qui permet à Claude Code de se connecter à des services externes (GitHub, bases de données, API, etc.). C'est le système de plugins de Claude Code.",
    details: "Le MCP est un standard ouvert créé par Anthropic pour connecter des AI assistants à n'importe quelle source de données ou outil. Il existe deux types de transport : stdio (pour les serveurs locaux comme `npx my-server`) et HTTP (pour les API distantes). On peut configurer les serveurs MCP au niveau user (tous les projets), project (partagé dans .mcp.json), ou local (privé). Exemples : GitHub MCP pour gérer les repos, Supabase MCP pour accéder aux bases de données, ou des MCP custom pour vos propres outils."
  },

  "thinking-mode": {
    title: "Thinking Mode",
    summary: "Mode où Claude montre son raisonnement interne avant de répondre. Activable avec la touche Tab, il permet de comprendre comment Claude analyse votre demande.",
    details: "Le Thinking Mode affiche le processus de réflexion de Claude en temps réel, similaire aux balises <thinking> dans l'API. C'est particulièrement utile pour les tâches complexes où vous voulez suivre le raisonnement étape par étape. Appuyez sur Tab pour activer/désactiver ce mode pendant une session. Le contenu affiché dans ce mode n'est pas compté dans la réponse finale mais consomme des tokens. C'est différent d'Extended Thinking qui est un mode de raisonnement plus profond disponible avec certains modèles."
  },

  "plan-mode": {
    title: "Plan Mode",
    summary: "Mode lecture seule où Claude analyse et planifie sans modifier de fichiers. Activable avec Shift+Tab, idéal pour explorer un projet avant de coder.",
    details: "Le Plan Mode (aussi appelé permission mode 'plan') limite Claude à la lecture seule : il peut explorer les fichiers, analyser l'architecture, et proposer un plan d'action détaillé, mais ne peut rien modifier. C'est le workflow recommandé EPCC (Explore → Plan → Code → Commit). Utilisez Shift+Tab pour basculer entre les modes, ou lancez avec `claude --permission-mode plan`. Parfait pour comprendre un nouveau codebase ou vérifier la faisabilité d'une fonctionnalité avant de commencer le développement."
  },

  "extended-thinking": {
    title: "Extended Thinking",
    summary: "Mode de raisonnement profond disponible avec certains modèles (comme Opus 4.5). Claude prend plus de temps pour analyser les problèmes complexes en profondeur.",
    details: "Extended Thinking est une capacité des modèles les plus avancés qui leur permet de 'réfléchir' beaucoup plus longuement avant de répondre. Au lieu de générer une réponse immédiate, le modèle passe par plusieurs étapes de raisonnement interne, explorant différentes approches et vérifiant sa logique. C'est particulièrement utile pour les problèmes de mathématiques, la conception d'architecture complexe, ou le debugging difficile. Le temps de réflexion peut aller de quelques secondes à plusieurs minutes. Activable via Tab dans certaines conditions."
  },

  "sonnet": {
    title: "Claude Sonnet",
    summary: "Le modèle Claude par défaut, offrant le meilleur équilibre entre performance et coût. Sonnet 4.5 est la version la plus récente (décembre 2024).",
    details: "Claude Sonnet est conçu pour être le modèle quotidien des développeurs : rapide, précis, et économique. Sonnet 4.5 (claude-sonnet-4-5-20250929) est le modèle par défaut de Claude Code. Il excelle dans le coding, l'analyse de code, et la manipulation de fichiers. Coût moyen : environ $6/jour pour un développeur typique. Pour changer de modèle : `/model` ou `claude --model sonnet`."
  },

  "opus": {
    title: "Claude Opus",
    summary: "Le modèle le plus capable de Claude, optimisé pour les tâches complexes nécessitant un raisonnement approfondi. Plus coûteux mais plus puissant que Sonnet.",
    details: "Claude Opus 4.5 (claude-opus-4-5-20251101) est le modèle flagship d'Anthropic, offrant les meilleures capacités de raisonnement, d'analyse, et de compréhension contextuelle. Utilisez Opus pour : architecture système complexe, refactoring majeur, debugging difficile, ou analyse de sécurité approfondie. Il supporte également Extended Thinking pour les problèmes les plus complexes. Environ 2-3x plus coûteux que Sonnet. Changer avec `/model opus` ou `claude --model opus`."
  },

  "haiku": {
    title: "Claude Haiku",
    summary: "Le modèle le plus rapide et économique de Claude. Parfait pour les tâches simples et les sub-agents qui explorent rapidement un codebase.",
    details: "Claude Haiku 4.5 est optimisé pour la vitesse et l'efficacité. Il est particulièrement utilisé par les sub-agents intégrés comme 'Explore' qui doivent parcourir rapidement de nombreux fichiers. Bien qu'il soit moins capable que Sonnet ou Opus pour les tâches complexes, Haiku excelle dans : la recherche de code, les résumés rapides, les réponses factuelles, et les tâches répétitives. Coût : environ 10x moins cher qu'Opus. Utilisez-le pour économiser des tokens sur les tâches simples."
  },

  // ===== MODULE 2 - MEMORY =====
  "claude-md": {
    title: "CLAUDE.md",
    summary: "Fichier de configuration principal qui contient les instructions, préférences, et conventions pour un projet ou utilisateur. C'est la mémoire persistante de Claude.",
    details: "CLAUDE.md est le fichier clé pour personnaliser Claude Code. Il peut exister à plusieurs niveaux : projet (.claude/CLAUDE.md ou ./CLAUDE.md), utilisateur (~/.claude/CLAUDE.md), ou entreprise (managed). Le format est en Markdown avec des sections pour le style de code, les commandes, la structure du projet, etc. Utilisez la commande `/memory` pour éditer facilement. Les fichiers sont chargés par ordre de priorité : Enterprise > Project > Rules > User > Local."
  },

  "claude-local-md": {
    title: "CLAUDE.local.md",
    summary: "Version locale et privée du fichier CLAUDE.md, automatiquement ignorée par git. Parfait pour les notes personnelles ou credentials temporaires.",
    details: "CLAUDE.local.md suit les mêmes règles que CLAUDE.md mais est automatiquement ajouté au .gitignore par Claude Code. Utilisez-le pour : des notes de travail temporaires, des credentials de dev local (à ne jamais committer), des configurations spécifiques à votre machine, ou des expérimentations. Il a la plus basse priorité dans la hiérarchie mémoire, donc il ne peut pas surcharger les fichiers de projet ou utilisateur."
  },

  "markdown": {
    title: "Markdown",
    summary: "Langage de formatage léger utilisé pour tous les fichiers de configuration Claude Code (CLAUDE.md, commandes, skills, etc.). Simple et lisible.",
    details: "Markdown est un format de texte simple qui se convertit facilement en HTML. Il utilise des symboles comme # pour les titres, - pour les listes, ** pour le gras, etc. Tous les fichiers Claude Code (CLAUDE.md, commands/*.md, skills/*/SKILL.md) utilisent Markdown car il est à la fois lisible par les humains et parsable par les machines. Les metadata YAML (entre ---) peuvent être ajoutées en haut des fichiers pour la configuration avancée."
  },

  "gitignore": {
    title: ".gitignore",
    summary: "Fichier qui liste les fichiers/dossiers à ne jamais committer dans git. Claude Code l'utilise pour protéger CLAUDE.local.md et settings.local.json.",
    details: "Le .gitignore est un fichier standard git qui empêche certains fichiers d'être versionnés. Claude Code ajoute automatiquement ces patterns : CLAUDE.local.md, .claude/settings.local.json, et .claude/.session pour éviter de committer des configurations privées ou des sessions temporaires. C'est une bonne pratique de sécurité pour éviter d'exposer des secrets ou des préférences personnelles dans un repo partagé."
  },

  "imports-at": {
    title: "Imports (@)",
    summary: "Syntaxe pour importer d'autres fichiers dans CLAUDE.md. Utilisez @chemin/fichier.md pour inclure du contenu externe dans la mémoire.",
    details: "La syntaxe @ permet de structurer votre mémoire en modules réutilisables. Exemples : `@README pour overview`, `@docs/architecture.md pour détails`, `@~/.claude/mes-regles.md pour perso`. Les imports peuvent être absolus (~/.claude/) ou relatifs au fichier courant. Tous les fichiers importés sont fusionnés dans le contexte de Claude. C'est particulièrement utile pour partager des règles communes entre projets ou pour garder CLAUDE.md concis."
  },

  "rules": {
    title: "Rules (Règles conditionnelles)",
    summary: "Fichiers dans .claude/rules/ qui s'appliquent uniquement à certains chemins. Permet d'avoir des instructions spécifiques par dossier ou type de fichier.",
    details: "Les règles conditionnelles utilisent des metadata YAML pour définir leur scope. Exemple dans .claude/rules/api-rules.md : `---\\npaths: src/api/**/*.ts\\n---` appliquera les règles uniquement aux fichiers TypeScript dans src/api/. Vous pouvez aussi utiliser `extensions: .py,.js` ou `patterns: test_*`. C'est parfait pour avoir des conventions différentes entre frontend/backend, ou des règles strictes pour le code critique (sécurité, API publiques)."
  },

  "memory-hierarchy": {
    title: "Hiérarchie mémoire",
    summary: "Ordre de priorité des fichiers CLAUDE.md : Enterprise > Project > Rules > User > Local. Les niveaux supérieurs peuvent surcharger les inférieurs.",
    details: "La hiérarchie permet une configuration en cascade : 1) Enterprise Policy (managed-settings, non-modifiable) 2) Project Memory (.claude/CLAUDE.md, partagé en équipe) 3) Project Rules (.claude/rules/*.md, conditionnel) 4) User Memory (~/.claude/CLAUDE.md, vos préférences globales) 5) Local Project Memory (./CLAUDE.local.md, privé, gitignored). Si deux niveaux définissent la même chose, le niveau le plus haut gagne. Utilisez cette hiérarchie pour structurer vos configurations du plus général au plus spécifique."
  },

  // ===== MODULE 3 - COMMANDES =====
  "slash-commands": {
    title: "Slash Commands",
    summary: "Commandes spéciales commençant par / qui déclenchent des actions dans Claude Code. Par exemple /clear, /cost, /memory.",
    details: "Les slash commands sont le système de commandes intégré de Claude Code. Commandes essentielles : /clear (réinitialiser contexte), /compact (compresser pour économiser tokens), /context (voir utilisation mémoire), /cost (voir coûts), /memory (éditer CLAUDE.md), /mcp (gérer serveurs), /model (changer modèle), /help (aide). Tapez / pour voir la liste complète avec autocomplétion. Vous pouvez créer vos propres slash commands personnalisées dans .claude/commands/."
  },

  "compact": {
    title: "/compact",
    summary: "Commande qui compresse l'historique de conversation pour libérer de la mémoire contextuelle. Utile pour les longues sessions.",
    details: "La commande /compact demande à Claude de résumer l'historique de la conversation en gardant uniquement les informations essentielles. Cela libère des tokens dans la fenêtre de contexte (200k tokens max) tout en préservant la continuité de la session. Utilisez /compact quand vous sentez que Claude ralentit ou quand /context montre une utilisation élevée. C'est moins radical que /clear qui efface complètement l'historique. Après compaction, la session continue avec le résumé comme base."
  },

  "clear": {
    title: "/clear",
    summary: "Commande qui réinitialise complètement le contexte de conversation. Démarre une session fraîche comme si vous veniez de lancer Claude.",
    details: "La commande /clear efface tout l'historique de conversation et redémarre une session vierge. Les fichiers CLAUDE.md et settings restent chargés, mais toutes les conversations précédentes sont perdues. Utilisez /clear entre deux tâches indépendantes pour éviter que le contexte d'une tâche influence l'autre. C'est aussi utile pour économiser des tokens et des coûts si vous avez accumulé beaucoup d'historique. Alternative moins radicale : /compact pour compresser au lieu d'effacer."
  },

  "context": {
    title: "/context",
    summary: "Commande qui affiche l'utilisation actuelle de la fenêtre de contexte (tokens utilisés / limite). Aide à gérer la mémoire de la session.",
    details: "La commande /context montre : le nombre de tokens utilisés, la limite (200k pour Claude 4.5), et les fichiers chargés en mémoire. Chaque message, fichier lu, et réponse consomme des tokens. Quand vous approchez la limite, Claude peut devenir plus lent ou moins performant. Solutions : /compact pour compresser, /clear pour réinitialiser, ou retirer des fichiers du contexte. Surveillez /context régulièrement sur les longues sessions pour maintenir de bonnes performances."
  },

  "tokens": {
    title: "Tokens",
    summary: "Unités de traitement du texte par l'IA. Environ 1 token = 4 caractères en anglais. Claude Code a une fenêtre de 200k tokens.",
    details: "Les tokens sont la façon dont les modèles de langage découpent et traitent le texte. Un mot anglais = ~1.3 tokens, un mot français = ~1.5-2 tokens, un caractère de code = ~0.3 tokens. La fenêtre de contexte de 200k tokens peut contenir environ 150k mots ou 500-600 pages de code. Chaque fichier lu, message envoyé, et réponse générée consomme des tokens. Les coûts sont calculés sur les tokens : input (lecture) et output (génération). Utilisez /context pour surveiller et /compact pour optimiser."
  },

  "custom-commands": {
    title: "Commandes personnalisées",
    summary: "Slash commands que vous créez vous-même dans .claude/commands/ pour automatiser des tâches répétitives.",
    details: "Créez vos propres commandes en ajoutant des fichiers .md dans .claude/commands/ (projet) ou ~/.claude/commands/ (global). Format : metadata YAML en haut (description, allowed-tools, arguments), puis instructions en Markdown. Exemple : .claude/commands/test.md avec `---\\ndescription: Run tests\\nallowed-tools: Bash\\n---\\n\\n# Run Tests\\n\\nExecute npm test with $ARGUMENTS`. Invoquez avec /test. Les commandes custom sont parfaites pour : workflows d'équipe, scripts de déploiement, checks qualité, ou raccourcis personnels."
  },

  "arguments": {
    title: "Arguments ($ARGUMENTS)",
    summary: "Variable spéciale dans les commandes personnalisées qui capture le texte tapé après la commande. Permet de passer des paramètres.",
    details: "La variable $ARGUMENTS contient tout ce qui est tapé après le nom de la commande. Exemple : si vous tapez `/deploy staging --verbose`, alors $ARGUMENTS vaut 'staging --verbose'. Utilisez $ARGUMENTS dans vos commandes custom pour les rendre flexibles. Vous pouvez aussi accéder à des arguments spécifiques avec $1, $2, etc. dans certains contextes. Les arguments permettent de créer des commandes réutilisables au lieu de commandes hard-codées."
  },

  // ===== MODULE 4 - MCP =====
  "mcp-protocol": {
    title: "MCP Protocol (Model Context Protocol)",
    summary: "Standard ouvert créé par Anthropic pour connecter les AI assistants à n'importe quelle source de données ou outil. C'est l'API des plugins Claude.",
    details: "Le Model Context Protocol (MCP) est une spécification ouverte qui définit comment un AI assistant peut découvrir, se connecter, et utiliser des outils externes. Un serveur MCP expose des 'tools' (fonctions appelables), 'resources' (données accessibles), et 'prompts' (templates). Le protocole est transport-agnostique : stdio pour local, HTTP pour distant, bientôt WebSocket. MCP permet l'interopérabilité : un serveur MCP fonctionne avec n'importe quel client compatible (Claude Code, mais aussi d'autres AI tools). Spec complète sur modelcontextprotocol.io."
  },

  "stdio": {
    title: "stdio (Standard Input/Output)",
    summary: "Type de transport MCP pour les serveurs locaux. Le serveur communique via stdin/stdout, parfait pour les scripts Python, Node, etc.",
    details: "stdio est le transport MCP le plus courant pour les serveurs locaux. Claude Code lance le serveur comme un processus enfant et communique via les flux standard (stdin pour envoyer, stdout pour recevoir, stderr pour logs). Exemple : `claude mcp add --transport stdio db-tool -- python server.py` lancera python server.py et communiquera avec lui via stdin/stdout. Avantages : simple, sécurisé (pas de réseau), parfait pour dev. Les serveurs stdio doivent écrire les messages MCP en JSON sur stdout."
  },

  "http-transport": {
    title: "HTTP Transport",
    summary: "Type de transport MCP pour les serveurs distants accessibles via HTTP/HTTPS. Permet de se connecter à des API cloud ou des services hébergés.",
    details: "Le transport HTTP permet à Claude Code de se connecter à des serveurs MCP distants via des requêtes HTTP. Exemple : `claude mcp add --transport http github https://api.github.com/mcp`. Le serveur doit implémenter l'endpoint MCP sur HTTP POST avec les headers appropriés. Avantages : peut être hébergé sur un serveur distant, partageable entre équipes, peut utiliser l'auth HTTP standard. Inconvénients : latence réseau, nécessite un serveur accessible. Utilisez HTTP pour les services cloud ou les MCP partagés en équipe."
  },

  "scope-user": {
    title: "Scope User",
    summary: "Niveau de configuration MCP qui s'applique à tous vos projets. Les serveurs user sont stockés dans ~/.claude/mcp.json.",
    details: "Les serveurs MCP avec scope 'user' sont disponibles globalement pour tous vos projets. Installation : `claude mcp add --scope user <name> <url>`. Configuration stockée dans ~/.claude/mcp.json (privé, pas versionné). Utilisez le scope user pour : vos outils personnels (dotfiles manager), vos credentials (GitHub token personnel), ou des serveurs que vous utilisez partout (calculatrice, convertisseur). Ces serveurs sont chargés automatiquement dans chaque session Claude."
  },

  "scope-project": {
    title: "Scope Project",
    summary: "Niveau de configuration MCP partagé avec l'équipe via .mcp.json versionné. Les serveurs project sont accessibles à tous les collaborateurs.",
    details: "Les serveurs MCP avec scope 'project' sont définis dans .mcp.json à la racine du projet et versionnés avec git. Installation : `claude mcp add --scope project <name> <url>`. Tout membre de l'équipe qui clone le repo aura accès aux mêmes serveurs MCP. Utilisez le scope project pour : API de votre produit, base de données du projet, outils CI/CD partagés, ou tout service nécessaire au projet. Les credentials sensibles peuvent être passés via variables d'environnement (${DB_PASSWORD}) pour ne pas les committer."
  },

  "mcp-servers": {
    title: "MCP Servers",
    summary: "Programmes qui exposent des outils, données, ou prompts à Claude via le protocole MCP. Exemples : GitHub, Supabase, Postgres, Filesystem.",
    details: "Un serveur MCP est un programme qui implémente le protocole MCP pour exposer des fonctionnalités à Claude. Il peut offrir : 1) Tools (fonctions appelables comme 'create_issue', 'query_db'), 2) Resources (données accessibles comme des fichiers, docs), 3) Prompts (templates réutilisables). Les serveurs peuvent être écrits en n'importe quel langage (Python, Node, Go, Rust). Anthropic et la communauté ont créé des serveurs pour : GitHub, GitLab, Postgres, Supabase, Google Drive, Slack, et bien d'autres. Trouvez-les sur github.com/modelcontextprotocol/servers."
  },

  // ===== MODULE 5 - SETTINGS =====
  "permissions": {
    title: "Permissions",
    summary: "Système de contrôle d'accès qui définit ce que Claude peut/ne peut pas faire. Configuré dans settings.json avec allow/deny/ask.",
    details: "Le système de permissions protège votre projet en contrôlant les actions de Claude. Trois types : 'allow' (auto-approuvé), 'deny' (bloqué), 'ask' (demande confirmation). Format : `{\"permissions\": {\"allow\": [\"Bash(npm run:*)\"], \"deny\": [\"Read(.env*)\"], \"ask\": [\"Bash(git push:*)\"]}}`. Patterns supportés : wildcards (*), paths (src/**), outils MCP (mcp__github). Niveaux : enterprise (imposé) > command-line > local > project > user. Permissions critiques à deny : lecture .env, suppression récursive, git force push."
  },

  "sandbox": {
    title: "Sandbox",
    summary: "Environnement isolé où Claude exécute les commandes dangereuses (comme Bash). Empêche les dégâts sur votre système en cas d'erreur.",
    details: "Le sandbox de Claude Code utilise Docker ou bubblewrap pour isoler l'exécution des commandes. Quand activé via `{\"sandbox\": {\"enabled\": true}}` dans settings.json, toutes les commandes Bash s'exécutent dans un conteneur isolé avec accès limité au filesystem. Avantages : sécurité (malware contenu), reproductibilité (env propre), protection (pas de rm -rf / accidentel). Inconvénients : légèrement plus lent, nécessite Docker. Recommandé pour : projets non-trustés, code de tiers, apprentissage. Article complet : anthropic.com/engineering/claude-code-sandboxing."
  },

  "allow-deny-ask": {
    title: "Allow/Deny/Ask",
    summary: "Les trois modes de permission : allow (toujours autoriser), deny (toujours bloquer), ask (demander confirmation). Permettent un contrôle granulaire.",
    details: "Le système de permissions utilise trois listes : 'allow' pour les actions sûres (auto-approuvées sans prompt), 'deny' pour les actions dangereuses (bloquées silencieusement), et 'ask' pour les actions sensibles (Claude demande confirmation). Exemples d'allow : Bash(npm run:*), Read(src/**). Exemples de deny : Read(.env*), Bash(rm -rf:*), Write(package.json). Exemples d'ask : Bash(git push:*), mcp__github__create_pr. Les patterns sont évalués dans l'ordre deny > allow > ask. Une règle deny a toujours priorité sur allow."
  },

  "settings-json": {
    title: "settings.json",
    summary: "Fichier de configuration principal de Claude Code. Contient permissions, variables d'environnement, modèle, et options diverses.",
    details: "settings.json existe à plusieurs niveaux : user (~/.claude/settings.json), project (.claude/settings.json versionné), et local (.claude/settings.local.json gitignored). Structure : permissions (allow/deny/ask), env (variables d'environnement), model (modèle par défaut), sandbox (activation), et autres options. Les settings sont fusionnés par hiérarchie : enterprise > command-line > local > project > user. Éditez avec un éditeur texte ou via certaines commandes comme /model. Format JSON strict requis."
  },

  "enterprise-policy": {
    title: "Enterprise Policy",
    summary: "Configuration d'entreprise imposée par l'admin et non-modifiable par les utilisateurs. Utilisée pour appliquer des règles de sécurité.",
    details: "L'Enterprise Policy est stockée dans /Library/Application Support/ClaudeCode/ (macOS) ou équivalent système. Elle contient des settings.json et CLAUDE.md avec le plus haut niveau de priorité : impossible à surcharger par les users. Utilisée par les entreprises pour : bloquer l'accès à certains outils (deny cloud APIs), forcer le sandbox, imposer des conventions de code, ou restreindre les modèles utilisables. Seuls les admins système peuvent modifier ces fichiers. C'est le premier niveau de la hiérarchie de configuration."
  },

  // ===== MODULE 6 - SKILLS =====
  "skills": {
    title: "Skills",
    summary: "Outils spécialisés qui s'activent automatiquement quand Claude détecte un contexte approprié. Contrairement aux commandes, ils ne sont pas invoqués manuellement.",
    details: "Les skills sont des capacités automatiques que Claude acquiert via des fichiers de configuration. Structure : .claude/skills/nom/SKILL.md avec metadata (name, description, triggers, allowed-tools) et instructions. Claude active un skill quand : le contexte correspond à la description, des mots-clés sont mentionnés, ou des fichiers spécifiques sont référencés. Exemples : skill 'pdf-processing' s'active si vous mentionnez des PDF, 'api-testing' s'active dans src/api/. Les skills peuvent inclure des scripts helpers dans leur dossier. C'est plus puissant que les commandes car automatique et contextuel."
  },

  "skill-vs-command": {
    title: "Skill vs Command",
    summary: "Différence clé : les commandes sont invoquées manuellement avec /nom, les skills s'activent automatiquement selon le contexte.",
    details: "Commandes : invocation explicite avec /nom, fichier dans commands/nom.md, pour actions ponctuelles (déployer, tester). Skills : activation automatique par détection de contexte, fichier dans skills/nom/SKILL.md, pour capacités continues (traiter PDF, analyser images). Utilisez commands pour workflows manuels et répétables. Utilisez skills pour expertise contextuelle et intelligence ambiante. Exemple : command /deploy pour déployer manuellement, skill 'security-review' qui s'active automatiquement lors d'édition de code sensible."
  },

  "subagents": {
    title: "Sub-agents",
    summary: "Agents IA spécialisés que Claude peut invoquer pour déléguer des tâches spécifiques. Chaque sub-agent a son propre modèle, outils, et instructions.",
    details: "Les sub-agents permettent à Claude de déléguer des sous-tâches à des agents spécialisés. Configuration dans .claude/agents/nom.md avec metadata (name, description, tools, model) et prompt système. Claude principal orchestre et les sub-agents exécutent. Avantages : spécialisation (agent expert en sécurité), optimisation (Haiku pour exploration rapide), isolation (contexte séparé). Sub-agents intégrés : 'plan' (mode plan lecture-seule), 'explore' (Haiku pour parcourir codebase), 'general-purpose' (tâches complexes). Créez vos propres sub-agents pour expertise métier : 'database-expert', 'frontend-reviewer', etc."
  },

  "explore-agent": {
    title: "Explore Agent",
    summary: "Sub-agent intégré utilisant Haiku pour explorer rapidement un codebase. Rapide et économique, parfait pour comprendre la structure d'un projet.",
    details: "L'Explore Agent est un sub-agent pré-configuré qui utilise Claude Haiku pour parcourir rapidement de nombreux fichiers sans coûter cher. Claude principal l'invoque automatiquement quand il a besoin de comprendre l'architecture d'un projet, trouver des fichiers, ou chercher des patterns. L'agent explore peut lire des dizaines de fichiers en quelques secondes et retourner un résumé au parent. Utilisé en interne par le workflow EPCC (Explore → Plan → Code → Commit). Vous pouvez voir son activité dans les logs détaillés avec `claude --debug`."
  },

  "plan-agent": {
    title: "Plan Agent",
    summary: "Sub-agent en mode lecture seule qui analyse et génère des plans d'action détaillés sans modifier de fichiers. Partie du workflow EPCC.",
    details: "Le Plan Agent est configuré avec permission-mode 'plan', le limitant à la lecture seule. Claude l'invoque quand vous demandez un plan ou une analyse. Il explore le codebase, identifie les fichiers à modifier, et génère un plan détaillé étape par étape. Le plan inclut : fichiers à créer/modifier, ordre des opérations, risques potentiels, et tests à faire. Après validation du plan par l'utilisateur, Claude principal exécute avec write permissions. C'est la phase 'P' du workflow EPCC (Explore → Plan → Code → Commit)."
  },

  "haiku-model": {
    title: "Haiku Model",
    summary: "Modèle Claude le plus rapide et économique, souvent utilisé par les sub-agents pour les tâches simples. Environ 10x moins cher qu'Opus.",
    details: "Claude Haiku 4.5 est optimisé pour vitesse et coût. Performance : ~2-3x plus rapide que Sonnet, ~5x plus rapide qu'Opus. Coût : ~10x moins cher qu'Opus, ~3x moins cher que Sonnet. Cas d'usage : exploration de code (Explore Agent), recherche simple, parsing de données, résumés factuels, validation de formats. Moins bon que Sonnet/Opus pour : raisonnement complexe, architecture système, debugging difficile, créativité. Les sub-agents utilisent souvent Haiku pour économiser tokens et accélérer les tâches répétitives."
  },

  // ===== MODULE 7 - HOOKS =====
  "hooks": {
    title: "Hooks",
    summary: "Système d'automation qui exécute des scripts avant/après certaines actions de Claude. Exemples : formatter le code après édition, linter avant commit.",
    details: "Les hooks permettent d'automatiser des tâches en réaction aux actions de Claude. Configuration dans settings.json sous 'hooks'. Trois types : PreToolUse (avant utilisation d'un outil, peut bloquer), PostToolUse (après utilisation, ne peut pas bloquer), SessionStart (au démarrage de session). Chaque hook a : un matcher (quel outil déclenche), un type (command ou webhook), et une action. Exemples : auto-formater avec prettier après Edit/Write, run tests après modifications, notify Slack après déploiement, validate avant git commit."
  },

  "pre-tool-use": {
    title: "PreToolUse Hook",
    summary: "Hook qui s'exécute avant qu'un outil soit utilisé. Peut bloquer l'exécution si le script échoue. Utile pour validation.",
    details: "PreToolUse permet de valider ou modifier les paramètres avant qu'un outil s'exécute. Configuration : `{\"hooks\": {\"PreToolUse\": [{\"matcher\": \"Bash(git commit:*)\", \"hooks\": [{\"type\": \"command\", \"command\": \"npm run lint\"}]}]}}`. Si la commande retourne un code d'erreur non-zéro, l'outil est bloqué. Cas d'usage : linter avant commit, valider format JSON avant écriture, checker sécurité avant déploiement, vérifier tests passent avant push. Attention : peut ralentir si hooks lourds."
  },

  "post-tool-use": {
    title: "PostToolUse Hook",
    summary: "Hook qui s'exécute après qu'un outil a été utilisé. Ne peut pas bloquer l'action (déjà faite). Parfait pour formatting ou notifications.",
    details: "PostToolUse déclenche des actions après utilisation d'un outil. Configuration : `{\"hooks\": {\"PostToolUse\": [{\"matcher\": \"Edit|Write\", \"hooks\": [{\"type\": \"command\", \"command\": \"prettier --write $file_path\"}]}]}}`. Variables disponibles : $file_path, $tool_name, $status. Contrairement à PreToolUse, ne peut pas bloquer (action déjà faite). Cas d'usage : auto-formater code après édition, rebuild après modifications, notifier équipe après déploiement, créer backup après suppressions. Les erreurs sont loggées mais n'arrêtent pas Claude."
  },

  "session-start": {
    title: "SessionStart Hook",
    summary: "Hook qui s'exécute au démarrage d'une session Claude. Utile pour initialisation : checker git status, installer deps, setup env.",
    details: "SessionStart permet d'automatiser l'initialisation de session. Configuration : `{\"hooks\": {\"SessionStart\": [{\"type\": \"command\", \"command\": \"git fetch && npm ci\"}]}}`. S'exécute une fois au lancement de `claude`. Cas d'usage : git fetch pour récupérer dernières branches, npm ci pour installer deps, checker version Node, setup variables d'environnement, afficher TODOs du projet, vérifier status CI/CD. Les erreurs sont affichées mais ne bloquent pas le démarrage de Claude."
  },

  "matcher": {
    title: "Matcher (Hook)",
    summary: "Pattern qui détermine quels outils déclenchent un hook. Supporte wildcards et regex. Exemples : 'Edit|Write', 'Bash(git:*)'.",
    details: "Le matcher est une expression qui filtre quels outils activent le hook. Formats supportés : nom exact ('Edit'), OR avec pipe ('Edit|Write'), wildcards ('Bash(npm:*)'), regex avancées. Exemples : 'Edit' (que les éditions), 'Edit|Write' (éditions et créations), 'Bash(git commit:*)' (git commits uniquement), 'mcp__github' (tous outils GitHub MCP). Le matcher est évalué avant chaque utilisation d'outil. Plus le matcher est spécifique, moins le hook sera déclenché. Utilisez '.*' pour matcher tous les outils."
  },

  "automation": {
    title: "Automation",
    summary: "Ensemble des fonctionnalités pour automatiser les workflows : hooks, custom commands, skills, et scripts. Permet de standardiser les processus d'équipe.",
    details: "L'automation dans Claude Code combine plusieurs systèmes : hooks (réactions aux events), custom commands (workflows manuels), skills (expertise contextuelle), et scripts externes. Objectif : réduire répétition, garantir qualité, standardiser processus. Exemples d'automation : formater automatiquement tout code édité, runner tests avant chaque commit, déployer avec /deploy, notifier Slack après changements critiques, générer docs après modifications API. Configurez l'automation dans settings.json (hooks), .claude/commands/ (commandes), .claude/skills/ (skills). Partagez via git pour standardiser l'équipe."
  },

  // ===== MODULE 8 - BEST PRACTICES =====
  "worktrees": {
    title: "Git Worktrees",
    summary: "Fonctionnalité git qui permet d'avoir plusieurs branches checkées simultanément dans des dossiers différents. Parfait pour multitasking avec Claude.",
    details: "Git worktrees permettent de travailler sur plusieurs branches en parallèle sans changer de branch. Commande : `git worktree add ../feature-a -b feature-a` crée un nouveau dossier avec la branche feature-a. Avantages avec Claude : session Claude par worktree (pas de confusion de contexte), tester PR pendant dev sur autre feature, comparer implémentations, build parallèles. Workflow : mainline dans dossier principal, worktree par feature, une session Claude par worktree. Nettoyage : `git worktree remove ../feature-a`. Article complet dans best practices Anthropic."
  },

  "context-management": {
    title: "Context Management",
    summary: "Pratiques pour gérer efficacement la fenêtre de contexte limitée (200k tokens) : compacter régulièrement, redémarrer entre tâches, éviter fichiers inutiles.",
    details: "La gestion du contexte est cruciale pour performance et coûts. Bonnes pratiques : 1) Utilisez /compact régulièrement sur longues sessions, 2) /clear entre tâches indépendantes, 3) Référencez fichiers spécifiques avec @ au lieu de 'lis tout src/', 4) Surveillez /context pour voir utilisation, 5) Retirez fichiers obsolètes du contexte, 6) Utilisez skills pour charger contexte spécialisé seulement quand nécessaire. Signes de contexte surchargé : ralentissement, réponses moins précises, coûts élevés. La fenêtre de 200k tokens = ~150k mots = ~500 pages de code."
  },

  "tdd": {
    title: "TDD (Test-Driven Development)",
    summary: "Méthodologie où on écrit les tests avant le code. Claude excelle en TDD : il peut générer tests puis implémenter le code qui les passe.",
    details: "TDD avec Claude Code : 1) Décrivez le comportement attendu, 2) Claude génère les tests d'abord, 3) Claude implémente le code minimal qui passe les tests, 4) Refactoring si nécessaire. Avantages : spécification claire, moins de bugs, documentation vivante, refactoring sûr. Workflow : 'Crée des tests pour une fonction de validation email, puis implémente-la'. Claude peut aussi travailler avec tests existants : 'Fais passer tous les tests en échec' ou 'Ajoute des tests pour couvrir le edge case X'. Compatible avec tous frameworks : Jest, Pytest, RSpec, etc."
  },

  "workflow-epcc": {
    title: "Workflow EPCC",
    summary: "Best practice recommandée par Anthropic : Explore → Plan → Code → Commit. Méthodologie structurée pour features complexes.",
    details: "EPCC est le workflow optimal pour features importantes : 1) **Explore** : Utilisez mode plan ou explore agent pour comprendre le codebase, identifier fichiers concernés, comprendre architecture. 2) **Plan** : Demandez un plan détaillé (Shift+Tab pour mode plan), reviewez et validez avant implémentation. 3) **Code** : Implémentez selon le plan, avec validation progressive. 4) **Commit** : Reviewez changements avec git diff, committez avec message clair. Avantages : moins d'erreurs, meilleure compréhension, commits plus propres, facilite review. Pour petits changements, EPCC peut être raccourci."
  },

  // ===== BONUS - TERMES GÉNÉRAUX =====
  "agent": {
    title: "Agent (IA)",
    summary: "Programme d'intelligence artificielle capable d'agir de manière autonome pour accomplir des tâches. Claude Code est un agent de codage.",
    details: "Un agent IA diffère d'un simple chatbot par sa capacité d'action : il peut lire/écrire des fichiers, exécuter des commandes, appeler des APIs, et prendre des décisions. Claude Code est un agent agentique complet : il planifie les étapes, utilise des outils (Read, Edit, Bash, MCP), gère les erreurs, et itère jusqu'au succès. Les sub-agents sont des agents spécialisés délégués par l'agent principal. L'agenticité de Claude Code vient de sa combinaison de : compréhension du contexte, accès aux outils, capacité de raisonnement, et autonomie d'exécution."
  },

  "codebase": {
    title: "Codebase",
    summary: "Ensemble du code source d'un projet : tous les fichiers, dossiers, et configurations qui constituent une application.",
    details: "Un codebase typique contient : code source (src/), tests (tests/), configuration (package.json, tsconfig.json), documentation (README.md), et infrastructure (Dockerfile, CI/CD). Claude Code peut naviguer dans n'importe quel codebase grâce à ses outils : Glob pour trouver fichiers, Grep pour chercher patterns, Read pour lire, Edit pour modifier. La taille du codebase impacte la stratégie : petits projets peuvent être chargés entièrement en contexte, grands projets nécessitent recherche ciblée et exploration progressive."
  },

  "debugging": {
    title: "Debugging",
    summary: "Processus de recherche et correction des bugs (erreurs) dans le code. Claude Code peut débugger automatiquement en analysant erreurs et logs.",
    details: "Claude excelle en debugging grâce à : 1) Lecture des stack traces et messages d'erreur, 2) Analyse du code concerné pour identifier la cause, 3) Hypothèses multiples testées progressivement, 4) Correction automatique et re-test. Workflow de debugging : copiez l'erreur dans Claude, il identifie le problème, propose un fix, applique le changement, et vérifie que ça marche. Claude peut débugger : erreurs runtime, tests qui échouent, problèmes de typage, bugs logiques, et même performance. Pour debugging complexe, activez thinking mode (Tab) pour voir le raisonnement."
  },

  "refactoring": {
    title: "Refactoring",
    summary: "Améliorer la structure du code existant sans changer son comportement. Claude peut refactorer automatiquement tout en préservant les tests.",
    details: "Refactoring avec Claude : 'Refactor cette fonction pour la rendre plus lisible', 'Extrais ce code dupliqué en fonction réutilisable', 'Renomme cette variable partout dans le projet'. Claude maintient le comportement en : 1) Comprenant la logique actuelle, 2) Identifiant améliorations possibles, 3) Appliquant transformations, 4) Vérifiant que tests passent toujours. Types de refactoring : rename (variables, fonctions, fichiers), extract (fonctions, composants, modules), inline (supprimer indirections), move (réorganiser architecture). Best practice : toujours avoir des tests avant de refactorer."
  },

  "api": {
    title: "API (Application Programming Interface)",
    summary: "Interface qui permet à différents programmes de communiquer. Claude Code utilise des APIs pour accéder aux services externes via MCP.",
    details: "Claude Code interagit avec trois types d'APIs : 1) API Anthropic (pour les modèles Claude eux-mêmes), 2) MCP servers (APIs wrappées pour usage par Claude), 3) APIs directes via Bash/curl dans certains cas. Quand vous configurez un MCP comme GitHub, vous donnez à Claude accès à l'API GitHub via le protocole MCP standardisé. Claude peut alors créer issues, PRs, lire repos, etc. Les MCP permettent d'utiliser n'importe quelle API (REST, GraphQL, gRPC) de manière sécurisée et contrôlée."
  },

  "version-control": {
    title: "Version Control (Git)",
    summary: "Système qui track les changements de code au fil du temps. Claude Code intègre git : commits, branches, diffs, et respect des conventions.",
    details: "Claude Code est git-aware : il vérifie git status avant actions, respecte .gitignore, peut créer commits avec messages conventionnels, et travaille avec branches/worktrees. Commandes git via Claude : 'Crée un commit avec ces changements', 'Montre-moi le diff depuis main', 'Crée une branche feature/auth'. Claude suit les best practices : messages de commit descriptifs, atomic commits, vérification avant push. Il peut aussi aider avec : résolution de conflits, rebase interactif, cherry-pick, et history cleanup. Pour workflows avancés, utilisez les hooks pour automatiser linting/tests avant commits."
  },
};
