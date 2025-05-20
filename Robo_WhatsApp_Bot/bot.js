const { makeWASocket, useMultiFileAuthState, fetchLatestBaileysVersion } = require('baileys')
const P = require('pino')
const fs = require('fs')

function getMenu() {
    return `🤖 *Bem-vindo ao Atendimento WhatsApp* 🤖

Escolha uma opção:
1️⃣ Serviços
2️⃣ Contato
3️⃣ Horário de Atendimento`
}

function loadDB() {
    if (!fs.existsSync('./db.json')) return {}
    return JSON.parse(fs.readFileSync('./db.json'))
}

function saveDB(data) {
    fs.writeFileSync('./db.json', JSON.stringify(data, null, 2))
}

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
                await sock.sendMessage(from, { text: '🛠️ Serviços: Desenvolvimento web, manutenção e suporte técnico.' })
                break
            case '2':
                await sock.sendMessage(from, { text: '📞 Contato: atendimento@empresa.com' })
                break
            case '3':
                await sock.sendMessage(from, { text: '🕒 Atendimento: Segunda a Sexta, das 9h às 18h' })
                break
            default:
                await sock.sendMessage(from, { text: '❌ Opção inválida. Tente novamente.\n' + getMenu() })
                return
        }
        user.step = 0
    }

    saveDB(db)
}

async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState('auth_info')
    const { version } = await fetchLatestBaileysVersion()

    const sock = makeWASocket({
        version,
        logger: P({ level: 'silent' }),
        auth: state
    })

    sock.ev.on('creds.update', saveCreds)

    // Novo jeito de mostrar o QR Code
    sock.ev.on('connection.update', (update) => {
        const { connection, qr } = update

        if (qr) {
            console.log('📲 Escaneie o QR Code abaixo com seu WhatsApp:')
            require('qrcode-terminal').generate(qr, { small: true })
        }

        if (connection === 'open') {
            console.log('✅ Conectado com sucesso!')
        }

        if (connection === 'close') {
            console.log('❌ Conexão encerrada. Tentando reconectar...')
            startBot()
        }
    })

    sock.ev.on('messages.upsert', async ({ messages }) => {
        const msg = messages[0]
        if (!msg.message || msg.key.fromMe) return
        await handleMessage(sock, msg)
    })
}
startBot()