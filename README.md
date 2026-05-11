# 🐙 Connect Byte Attendance

Extensão para Google Chrome que captura e exporta a lista de participantes de reuniões no Google Meet.

---

## 📥 Como instalar

### 1. Baixe os arquivos

No repositório, clique em **Code → Download ZIP** e extraia em uma pasta no seu computador.

---

### 2. Ative o modo desenvolvedor no Chrome

1. Abra o Google Chrome
2. Na barra de endereços, acesse:
   ```
   chrome://extensions/
   ```
3. No canto superior direito, ative o **Modo do desenvolvedor**

---

### 3. Instale a extensão

1. Clique em **Carregar sem compactação**
2. Selecione a pasta extraída do ZIP
3. A extensão aparecerá na lista ✅

---

### 4. Fixe o ícone na barra

1. Clique no ícone de 🧩 quebra-cabeça na barra do Chrome
2. Clique no 📌 ao lado de **Connect Byte Attendance**

---

## 🚀 Como usar

1. Entre em uma reunião no **Google Meet**
2. Abra o **painel de participantes** clicando no ícone de pessoas no canto superior direito da tela
3. Clique no ícone 🐙 da extensão na barra do Chrome
4. Clique em **Capturar participantes**
5. Os nomes aparecerão na lista
6. Clique em **⬇ Baixar Excel** para exportar

O arquivo será salvo com o nome da reunião e a data, por exemplo:
```
Meet sps-dcwg-nhi - 07-05-2026.xls
```

---

## 📊 Formato do arquivo exportado

O arquivo abre no Excel ou Google Sheets com as seguintes informações:

| Campo | Descrição |
|---|---|
| Reunião | Nome da reunião no Meet |
| Data | Data da captura |
| Hora | Hora da captura |
| Total | Quantidade de participantes |
| # | Número |
| Nome | Nome de cada participante |

---

## ⚠️ Dicas

- Sempre **abra o painel de participantes** antes de capturar — o Meet só carrega os nomes quando o painel está visível
- A extensão só funciona dentro de uma aba ativa do Google Meet
- Se aparecer um aviso de formato ao abrir o `.xls`, clique em **Sim** para continuar

---

Feito com 🐙 por **Danielle Costa** ([@damacosta](https://github.com/damacosta))