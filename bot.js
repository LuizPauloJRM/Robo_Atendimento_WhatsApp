const makeWASocket = require('@whiskeysockets/baileys').default
const { useSingleFileAuthState } = require('@whiskeysockets/baileys')
const P = require('pino')
const fs = require('fs')

// Autenticação
const { state, saveState } = useSingleFileAuthState('./auth_info.json')

// Menu principal
function getMenu() {
    return `🤖 *Bem-vindo ao Atendimento WhatsApp* 🤖

Escolha uma opção:
1️⃣ Serviços
2️⃣ Contato
3️⃣ Horário de Atendimento`
}

// Carrega e salva banco de dados simples
function loadDB() {
    if (!fs.existsSync('./db.json')) return {}
    return JSON.parse(fs.readFileSync('./db.json'))
}

function saveDB(data) {
    fs.writeFileSync('./db.json', JSON.stringify(data, null, 2))
}

// Lógica principal de atendimento
async function handleMessage(sock, msg) {
    const from = msg.key.remoteJid
    const text = msg.message?.conversation || msg.message?.extendedTextMessage?.text || ''
    const db = loadDB()

    if (!db[from]) db[from] = { step: 0 }
    const user = db[from]

    if (user.step === 0) {
        await sock.sendMessage(from, { text: getMenu() })
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
                await sock.sendMessage(from, { text: '❌ Opção inválida. Tente novamente.\n' + getMenu() })
                return
        }
        user.step = 0 // volta ao menu
    }

    saveDB(db)
}

// Início do bot
async function startBot() {
    const sock = makeWASocket({
        logger: P({ level: 'silent' }),
        auth: {
            creds: state.creds,
            keys: state.keys,
        },
        printQRInTerminal: true
    })

    sock.ev.on('creds.update', saveState)

    sock.ev.on('messages.upsert', async ({ messages }) => {
        const msg = messages[0]
        if (!msg.message || msg.key.fromMe) return
        await handleMessage(sock, msg)
    })
}

startBot()
