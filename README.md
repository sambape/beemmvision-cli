 # VisionBoard CLI Reference

> Command-line interface pour gérer vos workflows BEEMM-JAM de manière programmatique.

---

## 🚀 Quick Start

### Installation

```bash
# Installation globale via npm
npm install -g @beemm/visionboard-cli

# Ou utilisation locale depuis le repo
cd cli && npm install
npm link

# Si 'visionboard' n'est pas reconnu après 'npm link', vous pouvez utiliser les exécutables locaux à la racine du projet :
cd ..
./visionboard auth login
```

### Authentification

Avant toute utilisation, connectez-vous à votre compte BEEMM :

```bash
# Se connecter (ouvre le navigateur)
visionboard auth login

# Vérifier le statut
visionboard auth whoami

# Se déconnecter
visionboard auth logout
```

### Configuration du projet

```bash
# Lister vos projets
visionboard project list --type workflow

# Définir le projet courant
visionboard project use --project-id your-project-id

# Vérifier le projet courant
visionboard project current
```

---

## 📖 Command Reference

### 🔐 Auth Commands

Gestion de l'authentification Firebase.

#### `auth login`

Démarre le flux d'authentification OAuth via le navigateur.

```bash
visionboard auth login
```

#### `auth whoami`

Affiche l'état de la connexion courante.

```bash
visionboard auth whoami
```

**Sortie :**
```json
{
  "authenticated": true,
  "userId": "abc123",
  "email": "user@example.com",
  "displayName": "John Doe"
}
```

#### `auth logout`

Déconnecte l'utilisateur courante.

```bash
visionboard auth logout
```

---

### 📁 Project Commands

Gestion du contexte projet local.

#### `project list`

Liste tous les projets accessibles par l'utilisateur.

```bash
# Tous les projets
visionboard project list

# Uniquement les workflows
visionboard project list --type workflow

# Uniquement les boards
visionboard project list --type board

# Format JSON
visionboard project list --json
```

**Options :**

| Option | Description |
|--------|-------------|
| `--type <type>` | Filtre par type : `board` ou `workflow` |
| `--json` | Sortie JSON structurée |

#### `project use`

Stocke un ID de projet localement pour éviter de le répéter dans les commandes suivantes.

```bash
visionboard project use --project-id your-project-id
```

**Options :**

| Option | Description |
|--------|-------------|
| `--project-id <id>` | **Requis.** L'ID du projet à utiliser |

#### `project current`

Affiche le projet courant stocké localement.

```bash
visionboard project current
```

#### `project clear`

Supprime le projet stocké localement.

```bash
visionboard project clear
```

---

### 🔄 Workflow Commands

Opérations principales sur les workflows.

#### `workflow list`

Liste tous les workflows d'un projet.

```bash
visionboard workflow list --project-id your-project-id

# Avec projet courant
visionboard workflow list

# Format JSON
visionboard workflow list --json
```

**Sortie JSON :**
```json
{
  "ok": true,
  "transport": "functions",
  "projectId": "your-project-id",
  "workflowCount": 3,
  "workflows": [
    {
      "workflowId": "default",
      "name": "Mon Workflow",
      "updatedAt": "2026-04-05T10:30:00.000Z",
      "lastExecutedAt": "2026-04-05T09:15:00.000Z",
      "appConfigEnabled": true
    }
  ]
}
```

**Options :**

| Option | Description |
|--------|-------------|
| `--project-id <id>` | L'ID du projet cible |
| `--json` | Sortie JSON |

---

#### `workflow export`

Exporte un workflow complet en document JSON portable.

```bash
visionboard workflow export --project-id your-project-id --workflow-id default

# Sauvegarder dans un fichier
visionboard workflow export --project-id X --workflow-id default > my-workflow.json

# Format JSON
visionboard workflow export --project-id X --workflow-id default --json
```

**Sortie JSON :**
```json
{
  "ok": true,
  "transport": "functions",
  "portableWorkflow": {
    "version": "1.0.0",
    "workflow": {
      "name": "Mon Workflow",
      "camera": { "x": 0, "y": 0, "zoom": 1 },
      "appConfig": {
        "enabled": true,
        "inputNodeIds": ["node-1"],
        "outputNodeIds": ["node-3"]
      }
    },
    "nodes": [
      {
        "id": "node-1",
        "type": "image-generation",
        "label": "Générer une image",
        "position": { "x": 100, "y": 200 },
        "inputs": {
          "prompt": "A beautiful landscape"
        }
      }
    ],
    "edges": [
      {
        "id": "edge-1",
        "source": "node-1",
        "target": "node-2"
      }
    ]
  }
}
```

**Options :**

| Option | Description |
|--------|-------------|
| `--project-id <id>` | **Requis.** L'ID du projet |
| `--workflow-id <id>` | **Requis.** L'ID du workflow |
| `--json` | Sortie JSON |

---

#### `workflow import`

Importe un workflow depuis un document JSON portable. Par défaut, remplace tous les nodes et edges existants.

```bash
visionboard workflow import --project-id X --workflow-id default --input my-workflow.json

# Mode append (ajoute les nodes à côté de l'existant)
visionboard workflow import --project-id X --workflow-id default --input my-workflow.json --mode append

# Format JSON
visionboard workflow import --project-id X --workflow-id default --input my-workflow.json --json
```

**Options :**

| Option | Description |
|--------|-------------|
| `--project-id <id>` | **Requis.** L'ID du projet cible |
| `--workflow-id <id>` | **Requis.** L'ID du workflow cible (doit exister) |
| `--input <path>` | **Requis.** Chemin vers le fichier JSON portable |
| `--mode <mode>` | Mode d'import : `replace` (défaut) ou `append` |
| `--json` | Sortie JSON |

**Sortie réussite :**
```json
{
  "ok": true,
  "transport": "functions",
  "importMode": "replace",
  "workflowName": "Mon Workflow",
  "importedNodeCount": 5,
  "importedEdgeCount": 4
}
```

> **Note :** Le workflow cible doit exister dans Firestore. Utilisez `workflow create` pour créer un nouveau workflow vide avant d'importer.

---

#### `workflow run`

Exécute un workflow et collecte les résultats (artifacts, images générées, etc.).

```bash
# Execution avec affichage humain
visionboard workflow run --project-id X --workflow-id default

# Execution avec sortie JSON
visionboard workflow run --project-id X --workflow-id default --json
```

**Sortie humaine :**
```
Workflow your-project-id/default
- name: Mon Workflow
- nodes: 5
1/5 Générer une image - success - Image générée avec succès
2/5 Ajouter un filtre - success
3/5 Redimensionner - success
4/5 Exporter - success
5/5 Finaliser - success
Completed run run-123456
- artifacts: 1
- warnings: 0
image output: https://storage.beemm.ai/outputs/abc123.png
```

**Sortie JSON :**
```json
{
  "ok": true,
  "command": "workflow.run",
  "projectId": "your-project-id",
  "workflowId": "default",
  "transport": "callable",
  "run": {
    "runId": "run-123456",
    "workflowName": "Mon Workflow",
    "status": "completed",
    "startedAt": "2026-04-05T10:30:00.000Z",
    "completedAt": "2026-04-05T10:30:45.000Z",
    "artifacts": [
      {
        "kind": "image",
        "label": "Résultat final",
        "url": "https://storage.beemm.ai/outputs/abc123.png"
      }
    ],
    "warnings": []
  },
  "summary": {
    "executedNodeCount": 5,
    "artifactCount": 1,
    "warningCount": 0,
    "errorCount": 0
  }
}
```

**Options :**

| Option | Description |
|--------|-------------|
| `--project-id <id>` | **Requis.** L'ID du projet |
| `--workflow-id <id>` | **Requis.** L'ID du workflow |
| `--json` | Sortie JSON |

---

#### `workflow samy-generate`

Génère un workflow automatiquement à partir d'une description textuelle en utilisant l'agent AI Samy.

```bash
visionboard workflow samy-generate \
  --project-id X \
  --workflow-id my-generated \
  --prompt "Crée un workflow qui génère une image, puis la redimensionne en carré"

# Avec un nom personnalisé
visionboard workflow samy-generate \
  --project-id X \
  --workflow-id my-generated \
  --prompt "..." \
  --name "Mon workflow généré"

# Format JSON
visionboard workflow samy-generate --project-id X --workflow-id Y --prompt "..." --json
```

**Options :**

| Option | Description |
|--------|-------------|
| `--project-id <id>` | **Requis.** L'ID du projet |
| `--workflow-id <id>` | **Requis.** L'ID du workflow cible |
| `--prompt <text>` | **Requis.** Description du workflow souhaité |
| `--name <name>` | Nom du workflow (optionnel) |
| `--json` | Sortie JSON |

---

#### `workflow generate-and-import`

Combine la génération AI et l'import en une seule commande.

```bash
visionboard workflow generate-and-import \
  --project-id X \
  --workflow-id default \
  --prompt "Crée un pipeline de génération d'images avec 3 styles différents"
```

**Options :**

| Option | Description |
|--------|-------------|
| `--project-id <id>` | **Requis.** L'ID du projet |
| `--workflow-id <id>` | **Requis.** L'ID du workflow |
| `--prompt <text>` | **Requis.** Description du workflow |
| `--name <name>` | Nom du workflow |
| `--json` | Sortie JSON |

---

#### `workflow generate-import-run`

Le workflow complet en une seule commande : générer, importer, et exécuter.

```bash
visionboard workflow generate-import-run \
  --project-id X \
  --workflow-id default \
  --prompt "Génère une image de paysage"
```

**Options :**

| Option | Description |
|--------|-------------|
| `--project-id <id>` | **Requis.** L'ID du projet |
| `--workflow-id <id>` | **Requis.** L'ID du workflow |
| `--prompt <text>` | **Requis.** Description du workflow |
| `--name <name>` | Nom du workflow |
| `--json` | Sortie JSON |

---

### 📦 Template Commands

Gestion des templates communautaires.

#### `template list`

Liste les templates disponibles dans la communauté.

```bash
visionboard template list

# Format JSON
visionboard template list --json
```

#### `template get`

Récupère les détails d'un template.

```bash
visionboard template get --template-id template-123

# Format JSON
visionboard template get --template-id template-123 --json
```

#### `template duplicate`

Duplique un template dans votre projet.

```bash
visionboard template duplicate --template-id template-123

# Format JSON
visionboard template duplicate --template-id template-123 --json
```

---

### 🩺 Diagnostic Commands

#### `doctor`

Vérifie la configuration et la connectivité.

```bash
visionboard doctor
```

**Vérifie :**
- Connexion réseau aux Functions Firebase
- Token d'authentification valide
- Fichiers de configuration locaux

---

## 🔧 Global Options

Toutes les commandes acceptent ces options globales :

| Option | Description |
|--------|-------------|
| `--json` | Force la sortie en format JSON |
| `--transport <mode>` | Mode de transport : `auto`, `mock`, `callable` |
| `--functions-base-url <url>` | URL custom pour les Firebase Functions |
| `--firebase-id-token <token>` | Token Firebase ID pour l'authentification |
| `--help` | Affiche l'aide |
| `--version` | Affiche la version |

---

## 📋 Portable Workflow Format

Le format JSON utilisé pour l'export/import des workflows.

### Structure

```json
{
  "version": "1.0.0",
  "workflow": {
    "name": "Mon Workflow",
    "camera": {
      "x": 0,
      "y": 0,
      "zoom": 1
    },
    "appConfig": {
      "enabled": true,
      "inputNodeIds": ["node-input-1"],
      "outputNodeIds": ["node-output-1"]
    }
  },
  "nodes": [
    {
      "id": "node-unique-id",
      "type": "image-generation",
      "label": "Générer une image",
      "position": {
        "x": 100,
        "y": 200
      },
      "inputs": {
        "prompt": "A beautiful landscape",
        "model": "nano-banana",
        "width": 1024,
        "height": 1024
      }
    }
  ],
  "edges": [
    {
      "id": "edge-unique-id",
      "source": "node-source-id",
      "target": "node-target-id",
      "sourceHandle": "output",
      "targetHandle": "input",
      "label": "Flux d'image"
    }
  ]
}
```

### Node Types

| Type | Description | Inputs principaux |
|------|-------------|-------------------|
| `image-generation` | Génère une image à partir d'un prompt | `prompt`, `model`, `width`, `height` |
| `image-to-image` | Modifie une image existante | `image`, `prompt`, `model` |
| `import` | Importe une image externe | `url` |
| `export` | Exporte le résultat final | - |
| `image-filter` | Applique un filtre | `image`, `filter` |
| `image-resize` | Redimensionne une image | `image`, `width`, `height` |
| `concat` | Concatène des images | `images[]` |
| `array` | Crée un tableau d'images | - |

---

## 💡 Exemples d'utilisation

### Créer et exécuter un workflow de bout en bout

```bash
# 1. Se connecter
visionboard auth login

# 2. Voir ses projets
visionboard project list --type workflow

# 3. Sélectionner un projet
visionboard project use --project-id my-project-id

# 4. Lister les workflows existants
visionboard workflow list

# 5. Générer un nouveau workflow avec l'AI
visionboard workflow generate-and-import \
  --workflow-id auto-pipeline \
  --prompt "Crée un workflow qui génère une image, la redimensionne à 512x512, puis applique un flou gaussien"

# 6. Exécuter le workflow
visionboard workflow run --workflow-id auto-pipeline --json | jq '.run.artifacts[].url'

# 7. Exporter le workflow pour le partager
visionboard workflow export --workflow-id auto-pipeline > auto-pipeline.json
```

### Importer un workflow depuis un fichier

```bash
# 1. Vérifier le projet courant
visionboard project current

# 2. Importer le workflow (remplace le contenu existant par défaut)
visionboard workflow import \
  --workflow-id default \
  --input ~/Downloads/mon-workflow.json

# 3. Importer en mode append (ajoute les nodes à côté de l'existant)
visionboard workflow import \
  --workflow-id default \
  --input ~/Downloads/mon-workflow-2.json \
  --mode append

# 4. Vérifier l'import
visionboard workflow list --json | jq '.workflows[] | select(.workflowId == "default")'
```

### Utiliser le mode JSON pour du scripting

```bash
#!/bin/bash

# Récupérer le dernier artifact généré
artifact_url=$(visionboard workflow run --project-id X --workflow-id default --json \
  | jq -r '.run.artifacts[0].url')

echo "Dernière image : $artifact_url"
```

---

## ⚠️ Codes d'erreur

| Code | Description |
|------|-------------|
| `0` | Succès |
| `1` | Erreur de validation (arguments manquants ou invalides) |
| `2` | Erreur d'authentification (token invalide ou expiré) |
| `3` | Erreur serveur / Functions non disponibles |
| `4` | Projet non trouvé ou accès refusé |
| `5` | Workflow non trouvé |

---

## 🔒 Sécurité

- **Authentification** : Toutes les commandes nécessitent un token Firebase ID valide
- **Transport** : Les communications sont chiffrées via HTTPS
- **Token local** : Le token est stocké de manière sécurisée dans `~/.beemm-visionboard/`
- **Secrets** : Les clés API sont gérées côté serveur via Google Secret Manager

---

## 📝 Notes

- Les commandes `--json` sont recommandées pour l'automatisation et le scripting
- Les noms de workflow doivent être uniques dans un projet
- L'import de workflow par défaut **remplace** entièrement les nodes et edges existants. Utilisez `--mode append` pour ajouter les nodes à côté de l'existant.
- Le mode `mock` est utile pour le développement et les tests unitaires

---

*Documentation générée pour visionboard-cli v1.0.0*