let participantesCapturados = [];
let reuniaoCapturada = '';

document.getElementById('btn-capturar').addEventListener('click', function() {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    const url = tabs[0].url || '';
    const vazio = document.getElementById('vazio');
    const lista = document.getElementById('lista');
    const badgeArea = document.getElementById('badge-area');
    const btnExportar = document.getElementById('btn-exportar');

    if (!url.includes('meet.google.com')) {
      vazio.style.display = 'block';
      vazio.innerHTML = '⚠️ Abra o Google Meet antes de capturar.';
      badgeArea.innerHTML = '';
      lista.innerHTML = '';
      btnExportar.style.display = 'none';
      return;
    }

    chrome.tabs.sendMessage(tabs[0].id, { action: 'getParticipants' }, function(res) {
      if (!res || !res.participants || res.participants.length === 0) {
        vazio.style.display = 'block';
        vazio.innerHTML = '😕 Nenhum participante encontrado.<br>Abra o painel de pessoas no Meet.';
        badgeArea.innerHTML = '';
        lista.innerHTML = '';
        btnExportar.style.display = 'none';
        participantesCapturados = [];
        return;
      }

      participantesCapturados = res.participants;
      reuniaoCapturada = res.reuniao;

      vazio.style.display = 'none';
      btnExportar.style.display = 'block';
      badgeArea.innerHTML = '<div class="badge">' + res.participants.length + ' participante(s)</div>';
      lista.innerHTML = res.participants.map(function(p) {
        return '<li>' + p + '</li>';
      }).join('');
    });
  });
});

document.getElementById('btn-exportar').addEventListener('click', function() {
  if (participantesCapturados.length === 0) return;

  const agora = new Date();
  const data = agora.toLocaleDateString('pt-BR');
  const hora = agora.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  const dataArquivo = data.replace(/\//g, '-');

  // Linhas da tabela — somente # e Nome, cores alternadas
  const linhasDados = participantesCapturados.map(function(nome, i) {
    const bg = i % 2 === 0 ? '#EDE7F6' : '#FFFFFF';
    return '<tr>' +
      '<td style="text-align:center;background:' + bg + ';border:1px solid #D1C4E9;padding:10px;width:40px;font-size:14px">' + (i + 1) + '</td>' +
      '<td style="background:' + bg + ';border:1px solid #D1C4E9;padding:10px;width:280px;font-size:14px">' + nome + '</td>' +
    '</tr>';
  }).join('');

  const html =
    '<html xmlns:o="urn:schemas-microsoft-com:office:office" ' +
    'xmlns:x="urn:schemas-microsoft-com:office:excel" ' +
    'xmlns="http://www.w3.org/TR/REC-html40">' +
    '<head><meta charset="UTF-8">' +
    '<!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets>' +
    '<x:ExcelWorksheet><x:Name>Participantes</x:Name>' +
    '<x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions>' +
    '</x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->' +
    '</head><body>' +
    '<table style="border-collapse:collapse;font-family:Segoe UI,sans-serif;">' +

    // Título
    '<tr><td colspan="2" style="background:#6A1B9A;color:#FFFFFF;font-size:16px;' +
    'font-weight:bold;text-align:center;padding:14px;border:1px solid #6A1B9A;">' +
    'CONNECT BYTE ATTENDANCE</td></tr>' +

    // Info da reunião
    '<tr>' +
    '<td style="background:#EDE7F6;font-weight:bold;color:#6A1B9A;border:1px solid #D1C4E9;padding:10px;font-size:14px">Reunião</td>' +
    '<td style="background:#FFFFFF;border:1px solid #D1C4E9;padding:10px;font-size:14px">' + reuniaoCapturada + '</td>' +
    '</tr>' +
    '<tr>' +
    '<td style="background:#EDE7F6;font-weight:bold;color:#6A1B9A;border:1px solid #D1C4E9;padding:10px;font-size:14px">Data</td>' +
    '<td style="background:#FFFFFF;border:1px solid #D1C4E9;padding:10px;font-size:14px">' + data + '</td>' +
    '</tr>' +
    '<tr>' +
    '<td style="background:#EDE7F6;font-weight:bold;color:#6A1B9A;border:1px solid #D1C4E9;padding:10px;font-size:14px">Hora</td>' +
    '<td style="background:#FFFFFF;border:1px solid #D1C4E9;padding:10px;font-size:14px">' + hora + '</td>' +
    '</tr>' +
    '<tr>' +
    '<td style="background:#EDE7F6;font-weight:bold;color:#6A1B9A;border:1px solid #D1C4E9;padding:10px;font-size:14px">Total</td>' +
    '<td style="background:#FFFFFF;border:1px solid #D1C4E9;padding:10px;font-size:14px">' + participantesCapturados.length + ' participante(s)</td>' +
    '</tr>' +

    // Linha em branco
    '<tr><td colspan="2" style="padding:6px;border:none"></td></tr>' +

    // Cabeçalho da tabela — só # e Nome
    '<tr>' +
    '<th style="background:#B39DDB;color:#FFFFFF;border:1px solid #D1C4E9;padding:10px;text-align:center;font-size:14px;width:40px">#</th>' +
    '<th style="background:#B39DDB;color:#FFFFFF;border:1px solid #D1C4E9;padding:10px;text-align:left;font-size:14px">Nome</th>' +
    '</tr>' +

    // Dados
    linhasDados +

    '</table></body></html>';

  const blob = new Blob([html], { type: 'application/vnd.ms-excel;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = reuniaoCapturada + ' - ' + dataArquivo + '.xls';
  a.click();
  URL.revokeObjectURL(url);
});