async function sendTelegramMessage(message, chatId) {
  try {
    await fetch(
      'https://api.telegram.org/bot1102440603:AAHL5vzKiXB3JX_tvaywrVXzSyp2R6f_gpk/sendMessage',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          parse_mode: 'markdown',
          chat_id: chatId,
          text: message,
        }),
      }
    );
  } catch {}
}

export default sendTelegramMessage;
