chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getParticipants") {

    const nomes = new Set();

    // Seletor EXATO encontrado no DevTools
    // span.zWGUib contém o nome puro ex: "Danielle Costa"
    document.querySelectorAll('span.zWGUib').forEach(el => {
      const nome = el.textContent.trim();
      if (nome.length >= 2 && nome.length <= 60) {
        nomes.add(nome);
      }
    });

    const titulo = document.title.replace(' - Google Meet', '').trim();
    sendResponse({ participants: [...nomes], reuniao: titulo });
  }
  return true;
});