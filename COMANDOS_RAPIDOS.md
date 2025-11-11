# ⚡ COMANDOS RÁPIDOS - NewsNow Portal

## 🎯 Instalação Inicial (Faça uma vez)

### 1️⃣ BACKEND
```bash
cd backend
python -m venv venv
```

**Windows:**
```bash
venv\Scripts\activate
pip install -r requirements.txt
copy .env.example .env
notepad .env
```

**Mac/Linux:**
```bash
source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
nano .env
```

**Configure o .env:**
```
MONGO_URL=mongodb://localhost:27017
DB_NAME=newsnow_db
```

**Inicie o backend:**
```bash
uvicorn server:app --host 0.0.0.0 --port 8001 --reload
```

---

### 2️⃣ FRONTEND (NOVO TERMINAL)
```bash
cd frontend
npm install -g yarn
yarn install
```

**Windows:**
```bash
copy .env.example .env
```

**Mac/Linux:**
```bash
cp .env.example .env
```

**Inicie o frontend:**
```bash
yarn start
```

---

## 🚀 Uso Diário (Próximas vezes)

### Terminal 1 - Backend
```bash
cd backend

# Windows
venv\Scripts\activate

# Mac/Linux
source venv/bin/activate

uvicorn server:app --host 0.0.0.0 --port 8001 --reload
```

### Terminal 2 - Frontend
```bash
cd frontend
yarn start
```

---

## 🌐 URLs

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:8001/api

---

## 🛑 Parar Servidores

Em cada terminal, pressione: **CTRL + C**

---

## ❌ Resolução Rápida de Problemas

### "python não reconhecido"
```bash
python3 --version
# Use python3 em vez de python
```

### "Porta já em uso"
**Windows:**
```bash
netstat -ano | findstr :8001
taskkill /PID [NUMERO] /F
```

**Mac/Linux:**
```bash
lsof -ti:8001 | xargs kill -9
```

### "Module not found"
```bash
# Frontend
cd frontend
rm -rf node_modules
yarn install

# Backend
cd backend
pip install -r requirements.txt --force-reinstall
```

---

## 📋 Checklist Rápido

- [ ] Node.js instalado? `node --version`
- [ ] Python instalado? `python --version`
- [ ] MongoDB rodando?
- [ ] Arquivo `.env` criado no backend?
- [ ] Arquivo `.env` criado no frontend?
- [ ] Dois terminais abertos?
- [ ] Backend rodando na porta 8001?
- [ ] Frontend rodando na porta 3000?

✅ Tudo ok? Acesse http://localhost:3000

---

**Para guia completo, veja:** `GUIA_COMPLETO.md`
