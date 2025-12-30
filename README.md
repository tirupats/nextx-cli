# NextX CLI 🚀

`nextx` is a CLI tool for scaffolding **Next.js 16 projects** quickly with a standard folder structure, reusable components, hooks, stores, utilities, API routes, and tests.  

It’s designed to save time and enforce best practices.

---

## 📂 Project Folder Structure

When using `nextx setup`, your project will look like this:

```
my-app/
├─ src/
│  ├─ app/                  # App Router (Standard)
│  │  ├─ layout.tsx         # Uses v16 layout deduplication
│  │  └─ page.tsx           # Home page
│  ├─ components/           # UI + Cache Components
│  ├─ hooks/                # Custom React hooks
│  ├─ lib/                  # Shared logic, stores, utilities
│  ├─ proxy.ts              # Replaces middleware.ts in Next.js 16
│  └─ styles/
├─ public/
├─ next.config.ts
├─ package.json
└─ tsconfig.json
```

---

## ⚡ Installation

```bash
# Using npm
npm install -g nextx-cli

# Or run without installing
npx nextx-cli
```

---

## 🛠 CLI Commands

### 1. `setup [projectName]`
Initialize a new Next.js 16 project with the `src/` folder structure.

**Options:**

| Flag | Description | Default |
|------|-------------|---------|
| `-t, --typescript` | Use TypeScript | true |
| `--no-typescript` | Use JavaScript | false |
| `--git` | Initialize git repo | true |
| `--no-git` | Skip git init | false |
| `--install` | Install dependencies | true |
| `--no-install` | Skip npm install | false |
| `--eslint` | Add ESLint config | true |
| `--no-eslint` | Skip ESLint config | false |
| `--prettier` | Add Prettier config | true |
| `--no-prettier` | Skip Prettier config | false |

**Example:**

```bash
nextx setup my-app
nextx setup --no-typescript --no-git
```

---

### 2. `route <name>`
Create a new **page route**.

**Options:**

| Flag | Description | Default |
|------|-------------|---------|
| `-l, --layout <layout>` | Layout to use | default |
| `-t, --typescript` | TypeScript page | true |
| `--no-typescript` | JavaScript page | false |
| `--with-test` | Generate test file | false |
| `--with-api` | Generate API scaffold | false |

**Example:**

```bash
nextx route users --with-test --typescript
```

---

### 3. `component <name>`
Generate a reusable **React component**.

**Options:**

| Flag | Description | Default |
|------|-------------|---------|
| `-t, --typescript` | TypeScript component | true |
| `--no-typescript` | JavaScript component | false |
| `--with-test` | Generate test file | false |
| `--with-styles` | Generate CSS module | false |
| `--functional` | Functional component | true |
| `--class` | Class component | false |
| `--folder` | Create folder for component | false |

**Example:**

```bash
nextx component Button --with-test --with-styles
```

---

### 4. `api <name>`
Generate a new **API route** in `src/app/api/`.

**Options:**

| Flag | Description | Default |
|------|-------------|---------|
| `-t, --typescript` | TypeScript file | true |
| `--no-typescript` | JavaScript file | false |
| `--with-test` | Generate test file | false |

**Example:**

```bash
nextx api users --with-test
```

---

### 5. `env <name>`
Generate a `.env` file in your project.

**Example:**

```bash
nextx env development
```

---

### 6. `hook <name>`
Generate a **custom React hook**.

**Options:**

| Flag | Description | Default |
|------|-------------|---------|
| `-t, --typescript` | TypeScript hook | true |
| `--no-typescript` | JavaScript hook | false |
| `--with-test` | Generate test file | false |

**Example:**

```bash
nextx hook useAuth --with-test
```

---

### 7. `layout <name>`
Generate a **layout file** in `src/app`.

**Options:**

| Flag | Description | Default |
|------|-------------|---------|
| `-t, --typescript` | TypeScript layout | true |
| `--no-typescript` | JavaScript layout | false |

**Example:**

```bash
nextx layout AdminLayout
```

---

### 8. `store <name>`
Generate a **state store** in `src/lib`.

**Options:**

| Flag | Description | Default |
|------|-------------|---------|
| `-t, --typescript` | TypeScript store | true |
| `--no-typescript` | JavaScript store | false |
| `--folder` | Create folder for store | false |
| `--with-test` | Generate test file | false |

**Example:**

```bash
nextx store useCounter --folder --with-test
```

---

### 9. `test <name>`
Generate a **test file** for component, hook, store, page, or layout.

**Options:**

| Flag | Description | Default |
|------|-------------|---------|
| `-t, --typescript` | TypeScript test | true |
| `--no-typescript` | JavaScript test | false |
| `--path <path>` | Custom folder | current folder |
| `--type <type>` | Type: component, hook, store, page, layout | component |

**Example:**

```bash
nextx test MyButton --type component
nextx test useAuthStore --type hook --path src/hooks
```

---

### 10. `utils <name>`
Generate a **utility/helper file** in `src/lib`.

**Options:**

| Flag | Description | Default |
|------|-------------|---------|
| `-t, --typescript` | TypeScript file | true |
| `--no-typescript` | JavaScript file | false |
| `--folder` | Create folder for utility | false |
| `--with-test` | Generate test file | false |

**Example:**

```bash
nextx utils apiClient --folder --with-test
```

---

## ⚙️ Notes

- All generated files respect **Next.js 16 best practices**.  
- CLI supports **TypeScript by default**.  
- Tests are scaffolded for **Jest + React Testing Library**.  
- `setup` installs **Next.js 16.1.1** and all required dependencies.

---

## 📜 License

MIT License. Free for personal and commercial use.

---

## 🌟 Contributing

1. Fork the repository  
2. Create a feature branch (`git checkout -b feature/my-feature`)  
3. Commit your changes (`git commit -m 'Add new feature'`)  
4. Push to branch (`git push origin feature/my-feature`)  
5. Open a Pull Request  

