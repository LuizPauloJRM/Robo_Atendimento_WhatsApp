const menu = require('../utils/menu')
const fs = require('fs')

function loadDB() {
    return JSON.parse(fs.readFileSync('./db.json'))
}

function saveDB(data) {
    fs.writeFileSync('./db.json', JSON.stringify(data, null, 2))
}

async function handleMessage(sock, msg) {
    const from = msg.key.remoteJid
    const text = msg.message.conversation || msg.message.extendedTextMessage?.text || ''
    const db = loadDB()

    if (!db[from]) db[from] = { step: 0 }
    const user = db[from]

    if (user.step === 0) {
        await sock.sendMessage(from, { text: menu.principal() })
        user.step = 1
    } else if (user.step === 1) {
        switch (text.trim()) {
            case '1':
                await sock.sendMessage(from, { text: '🛠️ Serviços: Desenvolvimento web, manutenção, suporte técnico.' })
                break
            case '2':
                await sock.sendMessage(from, { text: '📞 Contato: atendimento@empresa.com\nWhatsApp: (00) 90000-0000' })
                break
            case '3':
                await sock.sendMessage(from, { text: '🕒 Atendimento: Segunda a Sexta, das 9h às 18h' })
                break
            default:
                await sock.sendMessage(from, { text: '❌ Opção inválida. Tente novamente.\n' + menu.principal() })
                return
        }
        user.step = 0 // volta ao início após uma resposta
    }

    saveDB(db)
}

module.exports = { handleMessage }
