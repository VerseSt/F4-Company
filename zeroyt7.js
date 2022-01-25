//BASE : ZEROYT7
//RECODE + ADD FITUR CACAT : FajarKyoo
//FITUR WORK : 50+ (Terdaftar Di Menu)

let { fetchJosn, kyun, fetchText } = require('./lib/fetcher')
let { color, bgcolor } = require('./lib/color')
let { wait, getBuffer, h2k, generateMessageID, getGroupAdmins, getRandom, start, info, success, close } = require('./lib/functions')

let
	{
		WAConnection,
		MessageType,
		Presence,
		MessageOptions,
		Mimetype,
		WALocationMessage,
		WA_MESSAGE_STUB_TYPES,
		WA_DEFAULT_EPHEMERAL,
		ReconnectMode,
		ProxyAgent,
		GroupSettingChange,
		waChatKey,
		mentionedJid,
		processTime,
	} = require("@adiwajshing/baileys")
const fs = require("fs")
const axios = require('axios')
const speed = require("performance-now")
const util = require('util')
const crypto = require('crypto')
const request = require('request')
const { exec, spawn } = require('child_process')
const fetch = require('node-fetch')
const moment = require('moment-timezone')
const ffmpeg = require('fluent-ffmpeg')
const { removeBackgroundFromImageFile } = require('remove.bg')
var { herodetails } = require('./database/herodetail.js')
var { herolist } = require('./database/herolist.js')
var { wikiSearch } = require('./database/wiki.js')
var { lirikLagu } = require('./database/lirik.js')
//-----------------SUB.WORKER----------------\\
//Error? Fix Sendiri Tod! 
var sendStickerFromUrl = async(to, url) => {
var names = Date.now() / 10000;
var download = function (uri, filename, callback) {
request.head(uri, function (err, res, body) {
request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
});
};
download(url, './stik' + names + '.png', async function () {
console.log('selesai');
let filess = './stik' + names + '.png'
let asw = './stik' + names + '.webp'
exec(`ffmpeg -i ${filess} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${asw}`, (err) => {
let media = fs.readFileSync(asw)
zero.sendMessage(to, media, MessageType.sticker,{quoted:ftrol})
fs.unlinkSync(filess)
fs.unlinkSync(asw)
});
});
}
var sendMediaURL = async(to, url, text="", mids=[]) =>{
if(mids.length > 0){
text = normalizeMention(to, text, mids)
}
var fn = Date.now() / 10000;
var filename = fn.toString()
let mime = ""
var download = function (uri, filename, callback) {
request.head(uri, function (err, res, body) {
mime = res.headers['content-type']
request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
});
};
download(url, filename, async function () {
console.log('done');
let media = fs.readFileSync(filename)
let type = mime.split("/")[0]+"Message"
if(mime === "image/gif"){
type = MessageType.video
mime = Mimetype.gif
}
if(mime.split("/")[0] === "audio"){
mime = Mimetype.mp4Audio
}
zero.sendMessage(to, media, type, { quoted: ftrol, mimetype: mime, caption: text,contextInfo: {"mentionedJid": mids}})

fs.unlinkSync(filename)
});
}
var sendFileFromUrl = async(link, type, options) => {
hasil = await getBuffer(link)
zeroyt7.sendMessage(from, hasil, type, options).catch(e => {
fetch(link).then((hasil) => {
zeroyt7.sendMessage(from, hasil, type, options).catch(e => {
zeroyt7.sendMessage(from, { url : link }, type, options).catch(e => {
reply('_[ ! ] Error Gagal Dalam Mendownload Dan Mengirim Media_')
console.log(e)
})
})
})
})
}	
//━━━━━━━━━━━━━━━[ DATABASE ]━━━━━━━━━━━━━━━━━//

let _antilink = JSON.parse(fs.readFileSync('./database/antilink.json'))
let _antivirtex = JSON.parse(fs.readFileSync('./database/antivirtex.json'))
let setting = JSON.parse(fs.readFileSync('./setting.json'))
let pendaftar = JSON.parse(fs.readFileSync('./database/user.json'))
let nsfww = JSON.parse(fs.readFileSync('./database/nsfww.json'))

//━━━━━━━━━━━━━━━[ SETTING ]━━━━━━━━━━━━━━━━━//

owner = setting.OwnerNumber
botname = setting.BotName
zerokey = setting.ZeroKey
ownername = setting.OwnerName
tz = setting.tz

//━━━━━━━━━━━━━━━[ MODUL EXPORTS ]━━━━━━━━━━━━━━━━━//

module.exports = zeroyt7 = async (zeroyt7, mek, _welkom) => {
	try {
        if (!mek.hasNewMessage) return
        mek = mek.messages.all()[0]
		if (!mek.message) return
		if (mek.key && mek.key.remoteJid == 'status@broadcast') return
		global.blocked
        	mek.message = (Object.keys(mek.message)[0] === 'ephemeralMessage') ? mek.message.ephemeralMessage.message : mek.message
        let content = JSON.stringify(mek.message)
		let from = mek.key.remoteJid
		let { text, extendedText, contact, contactsArray, groupInviteMessage, listMessage, buttonsMessage, location, liveLocation, image, video, sticker, document, audio, product, quotedMsg } = MessageType
		let time = moment.tz('Asia/Jakarta').format('DD/MM HH:mm:ss')
        let type = Object.keys(mek.message)[0]        
        let cmd = (type === 'conversation' && mek.message.conversation) ? mek.message.conversation : (type == 'imageMessage') && mek.message.imageMessage.caption ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption ? mek.message.videoMessage.caption : (type == 'extendedTextMessage') && mek.message.extendedTextMessage.text ? mek.message.extendedTextMessage.text : ''.slice(1).trim().split(/ +/).shift().toLowerCase()
        let prefix = /^[°•π÷×¶∆£¢€¥®™=|~!#$%^&.?/\\©^z+*@,;]/.test(cmd) ? cmd.match(/^[°•π÷×¶∆£¢€¥®™=|~!#$%^&.?/\\©^z+*,;]/gi) : '-'          	
        body = (type === 'conversation' && mek.message.conversation.startsWith(prefix)) ? mek.message.conversation : (type == 'imageMessage') && mek.message[type].caption.startsWith(prefix) ? mek.message[type].caption : (type == 'videoMessage') && mek.message[type].caption.startsWith(prefix) ? mek.message[type].caption : (type == 'extendedTextMessage') && mek.message[type].text.startsWith(prefix) ? mek.message[type].text : (type == 'listResponseMessage') && mek.message[type].singleSelectReply.selectedRowId ? mek.message[type].singleSelectReply.selectedRowId : (type == 'buttonsResponseMessage') && mek.message[type].selectedButtonId ? mek.message[type].selectedButtonId : ''
		budy = (type === 'conversation') ? mek.message.conversation : (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text : ''
		let command = body.slice(1).trim().split(/ +/).shift().toLowerCase()		
		let args = body.trim().split(/ +/).slice(1)
		let isCmd = body.startsWith(prefix)
		let q = args.join(' ')
		let Verived = "0@s.whatsapp.net"
		let txt = mek.message.conversation
		let botNumber = zeroyt7.user.jid
		let ownerNumber = [`${owner}@s.whatsapp.net`, `6285157740529@s.whatsapp.net`]
		let isGroup = from.endsWith('@g.us')
		let sender = isGroup ? mek.participant : mek.key.remoteJid
		let totalchat = await zeroyt7.chats.all()
		let groupMetadata = isGroup ? await zeroyt7.groupMetadata(from) : ''
		let groupName = isGroup ? groupMetadata.subject : ''
		let groupId = isGroup ? groupMetadata.jid : ''
		let groupMembers = isGroup ? groupMetadata.participants : ''
		let groupDesc = isGroup ? groupMetadata.desc : ''
		let groupOwner = isGroup ? groupMetadata.owner : ''
		let groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
		let isBotGroupAdmins = groupAdmins.includes(botNumber) || false
		let isGroupAdmins = groupAdmins.includes(sender) || false
		let conts = mek.key.fromMe ? zeroyt7.user.jid : zeroyt7.contacts[sender] || { notify: jid.replace(/@.+/, '') }
        let pushname = mek.key.fromMe ? zeroyt7.user.name : conts.notify || conts.vname || conts.name || '-'
        let isNsfw = isGroup ? nsfww.includes(from) : false
        
		let isAntiLink = isGroup ? _antilink.includes(from) : false
		let isWelkom = isGroup ? _welkom.includes(from) : false
		let isAntiVirtex = isGroup ? _antivirtex.includes(from) : false
		let isOwner = ownerNumber.includes(sender)
		let isUser = pendaftar.includes(sender)
		let isMybot = isOwner || mek.key.fromMe
		const buruh1 = ['🐳','🦈','🐬','🐋','🐟','🐠','🦐','🦑','🦀','🐚']
            const buruh2 = ['🐔','🦃','🐿','🐐','🐏','🐖','🐑','🐎','🐺','🦩']
            const buruh3 = ['🦋','🕷','🐝','🐉','🦆','🦅','🕊','🐧','🐦','🦇']
            const buruh11 = buruh1[Math.floor(Math.random() * (buruh1.length))]
		    const buruh22 = buruh2[Math.floor(Math.random() * (buruh2.length))]
		    const buruh33 = buruh3[Math.floor(Math.random() * (buruh3.length))]
		
//━━━━━━━━━━━━━━━[ CONNECTION 1 ]━━━━━━━━━━━━━━━━━//

		mess = {
			wait: '*[ ! ]* 𝙇𝙤𝙖𝙙𝙞𝙣𝙜...',
			tunggu: '*Maaf Kak Fitur Itu Masih Dalam Pengembangan*', 
			success: 'Done!',
			loanjing: 'Loading Asupan Muu😜', 
		    mang: '𝙻𝚘𝚊𝚍𝚒𝚗𝚐.. 𝙼𝚞𝚗𝚐𝚔𝚒𝚗 𝙼𝚎𝚖𝚎𝚛𝚕𝚞𝚔𝚊𝚗 𝚆𝚊𝚔𝚝𝚞 𝚈𝚐 𝙻𝚊𝚖𝚊 𝚄𝚗𝚝𝚞𝚔 𝙼𝚎𝚖𝚞𝚗𝚌𝚞𝚕𝚔𝚊𝚗 𝙼𝚊𝚗𝚐𝚊..', 
			error: {
				stick: 'Gagal Convert Gambar To Sticker...Coba Lagi !',
				Iv: 'Linknya Gaje'
			},
			only: {
				admin: 'Lu Admin Bukan?',
				group: 'Cuma Bisa Di Pakek Di Grup Lol'
			}
		}
		faketeks = 'F4-X'
		let isUrl = (url) => {
        return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%.+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%+.~#?&/=]*)/, 'gi'))
        }
        let reply = (teks) => {
            zeroyt7.sendMessage(from, teks, text, {quoted:mek})
        }
        let sendMess = (hehe, teks) => {
            zeroyt7.sendMessage(hehe, teks, text)
        }
        let mentions = (teks, memberr, id) => {
            (id == null || id == undefined || id == false) ? zeroyt7.sendMessage(from, teks.trim(), extendedText, { contextInfo: { "mentionedJid": memberr } }) : zeroyt7.sendMessage(from, teks.trim(), extendedText, { quoted: ftrol, contextInfo: { "mentionedJid": memberr } })
        }
        let zero = fs.readFileSync ('./zeroyt7/zerothumb.jpg')
        let costum = (pesan, tipe, target, target2) => {
			zeroyt7.sendMessage(from, pesan, tipe, { quoted: { key: { fromMe: false, participant: `${target}`, ...(from ? { remoteJid: from } : {}) }, message: { conversation: `${target2}` } } })
		}
		let runtime = function (seconds) {
  seconds = Number(seconds);
  var d = Math.floor(seconds / (3600 * 24));
  var h = Math.floor((seconds % (3600 * 24)) / 3600);
  var m = Math.floor((seconds % 3600) / 60);
  var s = Math.floor(seconds % 60);
  var dDisplay = d > 0 ? d + (d == 1 ? " hari, " : " Hari, ") : "";
  var hDisplay = h > 0 ? h + (h == 1 ? " jam, " : " Jam, ") : "";
  var mDisplay = m > 0 ? m + (m == 1 ? " menit, " : " Menit, ") : "";
  var sDisplay = s > 0 ? s + (s == 1 ? " detik" : " Detik") : "";
  return dDisplay + hDisplay + mDisplay + sDisplay;
};
var ase = new Date();
                        var jamss = ase.getHours();
                         switch(jamss){
                case 0: jamss = "Jangan gadang kak"; break;
                case 1: jamss = "Jangan gadang kak"; break;
                case 2: jamss = "Jangan gadang kak"; break;
                case 3: jamss = "Jangan gadang kak"; break;
                case 4: jamss = "Jangan lupa sholat Subuh kak"; break;
                case 5: jamss = "Selamat pagi"; break;
                case 6: jamss = "Selamat pagi"; break;
                case 7: jamss = "Selamat pagi"; break;
                case 8: jamss = "Selamat pagi"; break;
                case 9: jamss = "Selamat pagi"; break;
                case 10: jamss = "Selamat pagi"; break;
                case 11: jamss = "Selamat siang"; break;
                case 12: jamss = "Jangan lupa sholat Zuhur kak"; break;
                case 13: jamss = "Selamat siang"; break;
                case 14: jamss = "Selamat sore"; break;
                case 15: jamss = "Jangan lupa sholat Ashar kak"; break;
                case 16: jamss = "Selamat sore"; break;
                case 17: jamss = "Selamat sore"; break;
                case 18: jamss = "Selamat malam"; break;
                case 19: jamss = "Jangan lupa sholat Isya kak"; break;
                case 20: jamss = "Selamat malam"; break;
                case 21: jamss = "Selamat malam"; break;
                case 22: jamss = "Selamat malam"; break;
                case 23: jamss = "Selamat malam"; break;
            }
            var tampilUcapan = "" + jamss;
        
//━━━━━━━━━━━━━━━[ BUTTON ]━━━━━━━━━━━━━━━━━//

        let sendButton = async (from, context, fortext, but, mek) => {
            buttonMessages = {
                contentText: context,
                footerText: fortext,
                buttons: but,
                headerType: 1
            }
            zeroyt7.sendMessage(from, buttonMessages, buttonsMessage, {
                quoted: ftrol
            })
        }
        let sendButImage = async (from, context, fortext, img, but, mek) => {
            jadinya = await zeroyt7.prepareMessage(from, img, image)
            buttonMessagesI = {
                imageMessage: jadinya.message.imageMessage,
                contentText: context,
                footerText: fortext,
                buttons: but,
                headerType: 4
            }
            zeroyt7.sendMessage(from, buttonMessagesI, buttonsMessage, {
                quoted: ftrol,
            })
        }
        async function sendButLocation(id, text1, desc1, gam1, but = [], options = {}) {
            let buttonMessages = { locationMessage: { jpegThumbnail: gam1 }, contentText: text1, footerText: desc1, buttons: but, headerType: 6 }
            return zeroyt7.sendMessage(id, buttonMessages, MessageType.buttonsMessage, options)
        }
        let sendImage = (teks, teks1) => {zeroyt7.sendMessage(from, teks, image, {caption:teks1, quoted:ftrol, thumbnail:Buffer.alloc(0)})}
        
            angka = ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23']
			let randomnay1 = angka[Math.floor(Math.random() * (angka.length))]
			let randomnay2 = angka[Math.floor(Math.random() * (angka.length))]
//━━━━━━━━━━━━━━━[ FAKE FAKEAN ]━━━━━━━━━━━━━━━━━//
        let fakestatus = (teks) => {
            zeroyt7.sendMessage(from, teks, text, {
                quoted: {
                    key: {
                        fromMe: false,
                        participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {})
                    },
                    message: {
                        "imageMessage": {
                            "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc",
                            "mimetype": "image/jpeg",
                            "caption": faketeks,
                            "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=",
                            "fileLength": "28777",
                            "height": 1080,
                            "width": 1079,
                            "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=",
                            "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=",
                            "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69",
                            "mediaKeyTimestamp": "1610993486",
                            "jpegThumbnail": fs.readFileSync('./zeroyt7/zero.jpg'),
                            "scansSidecar": "1W0XhfaAcDwc7xh1R8lca6Qg/1bB4naFCSngM2LKO2NoP5RI7K+zLw=="
                        }
                    }
                }
            })
        }
        zeroyt7.chatRead(from, "read")
        let fakegroup = (teks) => {
            zeroyt7.sendMessage(from, teks, text, {
                quoted: {
                    key: {
                        fromMe: false,
                        participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "6289523258649-1604595598@g.us" } : {})
                    },
                    message: {
                        "imageMessage": {
                            "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc",
                            "mimetype": "image/jpeg",
                            "caption": faketeks,
                            "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=",
                            "fileLength": "28777",
                            "height": 1080,
                            "width": 1079,
                            "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=",
                            "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=",
                            "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69",
                            "mediaKeyTimestamp": "1610993486",
                            "jpegThumbnail": fs.readFileSync('./zeroyt7/zero.jpg'),
                            "scansSidecar": "1W0XhfaAcDwc7xh1R8lca6Qg/1bB4naFCSngM2LKO2NoP5RI7K+zLw=="
                        }
                    }
                }
            })
        }
        let ftrol = {
	key : {
                          participant : '0@s.whatsapp.net'
                        },
       message: {
                    orderMessage: {
                            itemCount : 2021,
                            status: 1,
                            surface : 1,
                            message: `F4-X VERIFIED`, 
                            orderTitle: `F4-X VERIFIED`,
                            thumbnail: zero, //Gambarnye
                            sellerJid: '0@s.whatsapp.net' 
                          }
                        }
                      }
                      var flexx = {
	 key: { 
          fromMe: false,
	      participant: `0@s.whatsapp.net`, ...(from ? 
	 { remoteJid: "status@broadcast" } : {}) 
                },
	 message: { 
		"extendedTextMessage": {
                 "text": `© FajarKyoo`,
                 "title": `© FajarKyoo`,
                 'jpegThumbnail': fs.readFileSync("./zeroyt7/zero.jpg"),
                        }
	                  } 
                     }   
  var sotoy = [
        '🍊 : 🍒 : 🍐',
        '🍒 : 🔔 : 🍊',
        '🍇 : 🍇 : 🍐',
        '🍊 : 🍋 : 🔔', //ANKER
        '🔔 : 🍒 : 🍐',
        '🔔 : 🍒 : 🍊',
        '🍊 : 🍋 : 🔔',        
        '🍐 : 🍒 : 🍋',
        '🍐 : 🍒 : 🍐',
        '🍊 : 🍒 : 🍒',
        '🔔 : 🔔 : 🍇',
        '🍌 : 🍌 : 🔔',
        '🍐 : 🔔 : 🔔',
        '🍊 : 🍋 : 🍒',
        '🍋 : 🍋 : 🍋 Win👑',
        '🔔 : 🔔 : 🍇',
        '🔔 : 🍇 : 🍇', 
        '🔔 : 🍐 : 🔔',
        '🍌 : 🍌 : 🍌 Win👑'
        ]
        
//━━━━━━━━━━━━━━━[ CONNECTION 2 ]━━━━━━━━━━━━━━━━━//

        let sendStickerFromUrl = async(to, url) => {
                var names = Date.now() / 10000;
                var download = function (uri, filename, callback) {
                    request.head(uri, function (err, res, body) {
                        request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
                    });
                };
                download(url, './stik' + names + '.png', async function () {
                    console.log('selesai');
                    let filess = './stik' + names + '.png'
                    let asw = './stik' + names + '.webp'
                    exec(`ffmpeg -i ${filess} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${asw}`, (err) => {
                        let media = fs.readFileSync(asw)
                        zeroyt7.sendMessage(to, media, MessageType.sticker,{quoted:mek})
                        fs.unlinkSync(filess)
                        fs.unlinkSync(asw)
                    });
                });
            }
        let sendMediaURL = async(to, url, text="", mids=[]) =>{
                if(mids.length > 0){
                    text = normalizeMention(to, text, mids)
                }
                let fn = Date.now() / 10000;
                let filename = fn.toString()
                let mime = ""
                var download = function (uri, filename, callback) {
                    request.head(uri, function (err, res, body) {
                        mime = res.headers['content-type']
                        request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
                    });
                };
                download(url, filename, async function () {
                    console.log('done');
                    let media = fs.readFileSync(filename)
                    let type = mime.split("/")[0]+"Message"
                    if(mime === "image/gif"){
                        type = MessageType.video
                        mime = Mimetype.gif
                    }
                    if(mime.split("/")[0] === "audio"){
                        mime = Mimetype.mp4Audio
                    }
                    zeroyt7.sendMessage(to, media, type, { quoted: ftrol, mimetype: mime, caption: text,contextInfo: {"mentionedJid": mids}})
                    
                    fs.unlinkSync(filename)
                });
            }   
            if (budy.includes("https://chat.whatsapp.com/")) {
if (!isGroup) return
if (!isAntiLink) return
if (isGroupAdmins) return
var kic = `${sender.split("@")[0]}@s.whatsapp.net`
reply(` *「 GROUP LINK DETECTOR 」*\nKamu mengirimkan link grup chat, maaf kamu di kick dari grup :(`)
setTimeout(() => {
zeroyt7.groupRemove(from, [kic]).catch((e) => { reply(`BOT HARUS JADI ADMIN`) })
}, 0)
}

		if (budy.length > 3500) {
if (!isGroup) return
if (!isAntiVirtex) return
if (isGroupAdmins) return
reply('Tandai telah dibaca\n'.repeat(300))
reply(`「 *VIRTEX DETECTOR* 」\n\nKamu mengirimkan virtex, maaf kamu di kick dari group :(`)
console.log(color('[KICK]', 'red'), color('Received a virus text!', 'yellow'))
zeroyt7.groupRemove(from, [sender])
}     
if (isCmd && !isUser){
          pendaftar.push(sender)
          fs.writeFileSync('./database/user.json', JSON.stringify(pendaftar, null, 2))
        }
   

//━━━━━━━━━━━━━━━[ CONNECTION 3 ]━━━━━━━━━━━━━━━━━//

		colors = ['red', 'white', 'black', 'blue', 'yellow', 'green']
		let isMedia = (type === 'imageMessage' || type === 'videoMessage')
		let isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
		let isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
		let isQuotedAudio = type === 'extendedTextMessage' && content.includes('audioMessage')
		let isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')
      	if (!isGroup && isCmd) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mEXEC\x1b[1;37m]', time, color(command), 'from', color(sender.split('@')[0]), 'args :', color(args.length))
      	//if (!isGroup && !isCmd) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;31mTEXT\x1b[1;37m]', time, color('Message'), 'from', color(sender.split('@')[0]), 'args :', color(args.length))
     	if (isCmd && isGroup) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mEXEC\x1b[1;37m]', time, color(command), 'from', color(sender.split('@')[0]), 'in', color(groupName), 'args :', color(args.length))
      	//if (!isCmd && isGroup) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;31mTEXT\x1b[1;37m]', time, color('Message'), 'from', color(sender.split('@')[0]), 'in', color(groupName), 'args :', color(args.length))
      
 //APIKEY
 //GW ENC? EMG LU PUNYA APIKEY PRIBADI? 
 function _0x2e3e(){const _0xfaec24=['BETA','8jBFvUP','823185xdWdSP','216096TiLjOi','https://x-restapi.herokuapp.com','1867458BPissz','2659448CtcMqX','2380406rFyHRb','Devilbotz','333445qvcTCf','https://hardianto-chan.herokuapp.com','703580zihFzE','https://pencarikode.xyz'];_0x2e3e=function(){return _0xfaec24;};return _0x2e3e();}function _0x136d(_0x44e50d,_0xc5ebd){const _0x2e3e37=_0x2e3e();return _0x136d=function(_0x136db8,_0x45b341){_0x136db8=_0x136db8-0x11a;let _0x2b6777=_0x2e3e37[_0x136db8];return _0x2b6777;},_0x136d(_0x44e50d,_0xc5ebd);}const _0x8912f=_0x136d;(function(_0x2fdee1,_0x500da9){const _0xca4d4e=_0x136d,_0xb52248=_0x2fdee1();while(!![]){try{const _0x56dc34=parseInt(_0xca4d4e(0x125))/0x1+-parseInt(_0xca4d4e(0x120))/0x2+parseInt(_0xca4d4e(0x124))/0x3+parseInt(_0xca4d4e(0x123))/0x4*(-parseInt(_0xca4d4e(0x11e))/0x5)+parseInt(_0xca4d4e(0x11a))/0x6+parseInt(_0xca4d4e(0x11c))/0x7+-parseInt(_0xca4d4e(0x11b))/0x8;if(_0x56dc34===_0x500da9)break;else _0xb52248['push'](_0xb52248['shift']());}catch(_0x2b21c9){_0xb52248['push'](_0xb52248['shift']());}}}(_0x2e3e,0x4f261));const restv1='https://api-devilbot.herokuapp.com',apiv1=_0x8912f(0x11d),restv2=_0x8912f(0x11f),apiv2='hardianto',restv3=_0x8912f(0x121),restv4=_0x8912f(0x126),apiv4=_0x8912f(0x122);
//━━━━━━━━━━━━━━━[ MENU ]━━━━━━━━━━━━━━━━━//

switch (command) {
	case 'menu':
	gambar = fs.readFileSync('./zeroyt7/zero.jpg')
                   timestamp = speed();
				latensi = speed() - timestamp	
              menunya = 
`Hai Kak ${pushname}, ${tampilUcapan}💫
Saya ${botname}, Gunakan Bot Dengan Bijak Ya Kak!

「 BOT INFO 」
➽ Name Bot : F4-X
➽ Nama Owner Ku : ${ownername}
➽ Author Ku : ZeroYT7
➽ Recode : FajarKyoo
➽ Prefix : Multi-Prefix
➽ Nomer Owner Ku : ${owner.split('@')[0]}
➽ Runtime : ${runtime(process.uptime())}
➽ Total User's : ${pendaftar.length}
➽ Languange : Javascript & Nodejs
﻿ ────────────
「 INFO KAMU 」
ˎˊ˗ Status : ${isOwner ? 'Owner' : 'User'}
ˎˊ˗ Nama Mu : ${pushname}
ˎˊ˗ Nomer Mu : ${sender.split('@')[0]}

𝘚𝘦𝘣𝘦𝘭𝘶𝘮 𝘔𝘦𝘭𝘪𝘩𝘢𝘵 𝘓𝘪𝘴𝘵 𝘔𝘦𝘯𝘶 𝘉𝘢𝘯𝘵𝘶 𝘙𝘢𝘮𝘦𝘪𝘯 𝘎𝘊 𝘒𝘦 2 𝘠𝘶𝘬 𝘒𝘢𝘬
𝘓𝘪𝘯𝘬 𝘎𝘊 : https://chat.whatsapp.com/C7jSCBKUkWu2fsppAUxTyR
𝘒𝘢𝘭𝘰 𝘜𝘥𝘩 𝘑𝘰𝘪𝘯 𝘒𝘭𝘪𝘬 𝘉𝘶𝘵𝘵𝘰𝘯 𝘈𝘭𝘭𝘔𝘦𝘯𝘶 𝘠𝘢 𝘬𝘢𝘬`
teks =
`Bantu Ramein Grup Ke 2\n\nBot By FajarKyoo\nContact Recode This Sc : wa.me/6288239440253`
but = [
          { buttonId: `${prefix}menuall`, buttonText: { displayText: '☰ AllMenu' }, type: 1 }, 
          { buttonId: `${prefix}donate`, buttonText: { displayText: '☰ SEDEKAH' }, type: 1 }, 
          { buttonId: `${prefix}sc`, buttonText: { displayText: '☰ SCRIPT' }, type: 1 }
        ]
        sendButLocation(from, menunya, teks, gambar, but)
  hh = fs.readFileSync('./sticker/maksa.webp')
await zeroyt7.sendMessage(from, hh, {quoted:ftrol})        
break
ftrol = { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "liveLocationMessage": { "caption": `}\n ©FajarKyoo`} } }
case 'caklontong':
            zero2 = await fetchJson(`${restv2}/api/kuis/${command}?apikey=${apiv2}`) 
            zeroyt7.sendMessage(from, `[ *CAKLONTONG* ]\n*SOAL* : ${zero2.result.soal}\n\n[ *WAKTU 30 DETIK* ]`, text,{quoted:ftrol}) 
            setTimeout( () => {
            zeroyt7.sendMessage(from, "20 DETIK LAGI", text,{quoted:ftrol})
            }, 10000)
            setTimeout( () => {
            zeroyt7.sendMessage(from, "10 DETIK LAGI", text,{quoted:ftrol})
            }, 20000)
            setTimeout( () => {
            reply(`[${tz}] WAKTU HABIS\n${tz} *JAWABAN* : ${zero2.result.jawaban}\n *DESK* : ${zero2.result.deskripsi}`)
            }, 30000)
            break
otod = "6288239440253@s.whatsapp.net"
case 'allmenu':
case 'menuall':
gambar = fs.readFileSync('./zeroyt7/zerothumb.jpg')
awokwok = `╭─⬣「 Group Menu 」⬣
│ あ ${prefix}antilink
│ あ ${prefix}welcome
│ あ ${prefix}antivirtex
│ あ ${prefix}group
│ あ ${prefix}linkgrup
│ あ ${prefix}promote
│ あ ${prefix}demote
│ あ ${prefix}add
│ あ ${prefix}kick
│ あ ${prefix}setpp
│ あ ${prefix}setdesc
│ あ ${prefix}setname
│ あ ${prefix}hidetag
└⬣

╭─⬣「 Sticker Menu 」⬣
│ あ ${prefix}attp
│ あ ${prefix}toimg
│ あ ${prefix}sticker
│ あ ${prefix}tomp3
│ あ ${prefix}tovideo
└⬣
	
╭─⬣「 Owner Menu 」⬣
│ あ ${prefix}owner
│ あ ${prefix}sewabot
│ あ ${prefix}bc
│ あ ${prefix}report
└⬣
╭─⬣「 Wibu Menu 」⬣
│ あ ${prefix}waifu
│ あ ${prefix}loli
│ あ ${prefix}husbu
│ あ ${prefix}manga 
│ あ ${prefix}wallanime
│ あ ${prefix}neko
│ あ ${prefix}blowjob
│ あ ${prefix}naruto
│ あ ${prefix}minato
│ あ ${prefix}kurumi
│ あ ${prefix}deku
│ あ ${prefix}eren
│ あ ${prefix}sasuke
│ あ ${prefix}tsunade
└⬣
╭─⬣「 FUN MENU 」⬣
│ あ ${prefix}kapankah (teks) 
│ あ ${prefix}apakah (teks) 
│ あ ${prefix}bisakah (teks) 
│ あ ${prefix}darkjokes
│ あ ${prefix}baikcek
│ あ ${prefix}bebancek
│ あ ${prefix}haramcek
│ あ ${prefix}jahatcek
│ あ ${prefix}pantun
│ あ ${prefix}bucin
│ あ ${prefix}motivasi
│ あ ${prefix}fakta
└⬣
╭─⬣「 GAME MENU 」⬣
│ あ ${prefix}herolist
│ あ ${prefix}herodetail (hero mobile legends) 
│ あ ${prefix}memburu udara/laut/darat
│ あ ${prefix}suit gunting/batu/kertas
│ あ ${prefix}slot
│ あ ${prefix}dadu
└⬣
╭─⬣「 OTHER MENU 」⬣
│ あ ${prefix}lirik (Contoh : Guyon Waton-Sebatas Teman) 
│ あ ${prefix}kisahnabi
└⬣
╭─⬣「 Gacha Asupan 」⬣
│ あ ${prefix}gachafoto
│ あ ${prefix}gachavidio
│ あ ${prefix}gachasantuy
│ あ ${prefix}gacharandom
└⬣

*[ BETA MENU ]*
BETA : GACHA ASUPAN
MASIH DALAM PERKEMBANGAN
ASUPAN GW ILANGIN, ERROR APIKEYNYA
NSFW MENU : BEBERAPA FITUR ERROR`
 teks = 
`© 2022_FajarKyoo`
but = [
          { buttonId: `${prefix}infobot`, buttonText: { displayText: '☰ INFO BOT' }, type: 1 },
          { buttonId: `${prefix}nyewa`, buttonText: { displayText: '☰ PRICING BOT' }, type: 1 }
        ]
        sendButLocation(from, awokwok, teks, gambar, but)
break
case 'changelog':
reply(mess.wait) 
lag = fs.readFileSync('./zeroyt7/zerothumb.jpg')
log = `DAFTAR PERUBAHAN FITUR
- Menghapus Fitur NSFW/18+ 
- Menambahkan Fitur memburu 
- Menambahkan Fitur Lirik 
- Menambahkan Fitur dadu`
fck = 
`FITUR ADDED BY FajarKyoo (VerseSt)`
await zeroyt7.sendMessage(from, log, {quoted :ftrol}) 
break
case 'slot':
case 'slots':
const somtoy = sotoy[Math.floor(Math.random() * sotoy.length)]
zeroyt7.sendMessage(from, `[  🎰 | SLOTS ]\n-----------------\n🍋 : 🍌 : 🍍\n${somtoy}<=====\n🍋 : 🍌 : 🍍\n[  🎰 | SLOTS ]\n\nKeterangan : Jika anda Mendapatkan 3Buah Sama Berarti Anda Menang\n\nContoh : 🍌 : 🍌 : 🍌<=====`, MessageType.text, { quoted: ftrol })
break
        case 'pantun':
            nay2 = await fetchJson(`${restv4}/api/random-pantun?apikey=${apiv4}`)             
            nay3 = `*PANTUN* : \n${nay2.pantun}`            
            but = [
          { buttonId: `${prefix}pantun`, buttonText: { displayText: '☰ NEXT' }, type: 1 }
        ]
        sendButton(from, nay3, but)
            break 
            case 'bucin':
            nay2 = await fetchJson(`${restv4}/api/random-bucin?apikey=${apiv4}`)             
            nay3 = `*BUCIN* : \n${nay2.bucin}`            
            reply(nay3)
            break 
            case 'fakta':
            nay2 = await fetchJson(`${restv4}/api/random-fakta?apikey=${apiv4}`)             
            nay3 = `*FAKTA* : \n${nay2.fakta}`            
            reply(nay3)
            break  
            case 'motivasi':
            nay2 = await fetchJson(`${restv4}/api/random-motivasi?apikey=${apiv4}`)             
            nay3 = `*MOTIVASI* : \n${nay2.motivasi}`            
            reply(nay3)
            break 
case 'playmp3':
if (args.length == 0) return await reply(`Judul Lagunya Mana Tod\nContoh : ${prefix + command} melukis senja`)
reply(mess.wait)
await fetchJson(`https://api.lolhuman.xyz/api/ytsearch?apikey=a2867eec5c98ea18db2ef5c9&query=${args.join(" ")}`)
.then(async(result) => {
await fetchJson(`https://api.lolhuman.xyz/api/ytaudio2?apikey=a2867eec5c98ea18db2ef5c9&url=https://www.youtube.com/watch?v=${result.result[0].videoId}`)
.then(async(result) => {
result = result.result
caption = `❖ Title    : *${result.title}*\n`
caption += `❖ Size     : *${result.size}*`
ini_buffer = await getBuffer(result.thumbnail)
await zeroyt7.sendMessage(from, ini_buffer, image, { quoted: ftrol, caption: caption })
get_audio = await getBuffer(result.link)
await zeroyt7.sendMessage(from, get_audio, audio, { mimetype: 'audio/mp4', filename: `${result.title}.mp3`, quoted: ftrol})
})
})
break
case 'kisahnabi':
if (args.length == 0) return reply(`Example : ${prefix + command} Muhammad`)
query = args.join(" ")
get_result = await fetchJson(`https://api.lolhuman.xyz/api/kisahnabi/${query}?apikey=a2867eec5c98ea18db2ef5c9`)
get_result = get_result.result
zerr = `*Nama :* ${get_result.name}\n`
zerr += `*Lahir :* ${get_result.thn_kelahiran}\n`
zerr += `*Umur :* ${get_result.age}\n`
zerr += `*Tempat :* ${get_result.place}\n`
zerr += `*Story :* ${get_result.story}`
reply(zerr)
break
case "playmp4":
if (args.length === 0)
return reply(`Kirim perintah *${prefix}video* _Judul lagu yang akan dicari_`)
reply(mess.wait)
var srch = args.join("")
aramas = await yts(srch)
aramat = aramas.all;
var mulaikah = aramat[0].url;
try {
ytv(mulaikah).then((res) => {
const { dl_link, thumb, title, filesizeF, filesize } = res;
axios
.get(`https://tinyurl.com/api-create.php?url=${dl_link}`)
.then(async (a) => {
if (Number(filesize) >= 100000)
return sendMediaURL(from,thumb,`*PLAY VIDEO*\n\n*Title* : ${title}\n*Ext* : MP3\n*Filesize* : ${filesizeF}\n*Link* : ${a.data}\n\n_Untuk durasi lebih dari batas disajikan dalam mektuk link_`)
const captions = `*PLAY VIDEO*\n\n*Title* : ${title}\n*Ext* : MP4\n*Size* : ${filesizeF}\n*Link* : ${a.data}\n\n_Silahkan tunggu file media sedang dikirim mungkin butuh beberapa menit_`
sendMediaURL(from, thumb, captions)
await sendMediaURL(from, dl_link).catch(() => reply("error"))
})
})
} catch (err) {
reply(mess.error.api)
}
break
case 'ytsearch':
if (args.length == 0) return reply(`Judul Video Yg Mau Di Cari Tod\nContoh : ${prefix + command} Melukis Senja`)
query = args.join(" ")
get_result = await fetchJson(`https://api.lolhuman.xyz/api/ytsearch?apikey=a2867eec5c98ea18db2ef5c9&query=${query}`)
get_result = get_result.result
ini_txt = ""
for (var x of get_result) {
ini_txt += `Title : ${x.title}\n`
ini_txt += `Views : ${x.views}\n`
ini_txt += `Published : ${x.published}\n`
ini_txt += `Thumbnail : ${x.thumbnail}\n`
ini_txt += `Link : https://www.youtube.com/watch?v=${x.videoId}\n\n`
}
reply(ini_txt)
break
case 'ytmp4':
if (args.length == 0) return reply(`Link Nya Mana Tod\nContoh: ${prefix + command} https://www.youtube.com/watch?v=qZIQAk-BUEc`)
ini_link = args[0]
get_result = await fetchJson(`https://api.lolhuman.xyz/api/ytvideo2?apikey=${zerokey}&url=${ini_link}`)
get_result = get_result.result
ini_txt = `${get_result.title} - ${get_result.size}`
ini_buffer = await getBuffer(get_result.thumbnail)
await zeroyt7.sendMessage(from, ini_buffer, image, { quoted: ftrol, caption: ini_txt })
get_audio = await getBuffer(get_result.link)
await zeroyt7.sendMessage(from, get_audio, video, { mimetype: 'video/mp4', filename: `${get_result.title}.mp4`, quoted: ftrol, caption: 'Nih Jangan Lupa Subscribe Zero YT7'})
break
case 'infobot':
timestamp = speed();
				latensi = speed() - timestamp
                  	teks =
`┏━➤ *INFO BOT* 
*┃┃* Creator Script : F4-Dev
*┃┃* Nama Owner : ${ownername}
*┃┃* Nama Bot : ${botname}
*┃┃* Base : ZeroYT7
*┃┃* Total Pengguna : ${pendaftar.length}
*┃┃* Runtime : ${runtime(process.uptime())}
*┃┃* Speed : ${latensi.toFixed(4)} second
*┃┃* Language : Javascript & Nodejs
*┃┗━━━━━━━━*
*┃◗ Thanks To Allah S.W.T*
*┃◗ Thank To Ortu*
*┃◗ Thank To Zero YT7 (Base)*
*┃◗ Thanks To All Penyedia Case🤣*
*┗━━━━━━━ •*`
                  but = [
          { buttonId: `${prefix}owner`, buttonText: { displayText: '☰ OWNER' }, type: 1 },
          { buttonId: `${prefix}sc`, buttonText: { displayText: '☰ SCRIPT' }, type: 1 }
        ]
        sendButton(from, teks, '©F4-XyZ', but, mek)
break
case 'asupan':
ini = await fetchJson(`https://zeroyt7-api.herokuapp.com/api/asupan?apikey=${zerokey}`)
reply(mess.wait)
buffer = await getBuffer(ini.result.result)
zeroyt7.sendMessage(from, buffer, video, {quoted: ftrol, caption: 'DONE, JAN LUPA FOLLOW TIKTOK : @imyourexhaha'})
break
case 'gachafoto':
case 'asupancecan':
ini = await fetchJson(`https://zeroyt7-api.herokuapp.com/api/asupan/cecan?apikey=${zerokey}`)
reply(mess.loanjing)
buffer = await getBuffer(ini.result.url)
anuloh = `Asupan Mu Semangatku😎`
zeroyt7.sendMessage(from, buffer, image, {quoted: ftrol, caption: 'DONE, JAN LUPA FOLLOW TIKTOK : @imyourexhaha'})
break
case 'asupanhijaber':
ini = await fetchJson(`https://zeroyt7-api.herokuapp.com/api/asupan/hijaber?apikey=${zerokey}`)
reply(mess.loanjing)
buffer = await getBuffer(ini.result.url)
zeroyt7.sendMessage(from, buffer, image, {quoted: ftrol, caption: 'DONE, JAN LUPA FOLLOW TIKTOK : @imyourexhaha'})
but = [
          { buttonId: `${prefix}neko`, buttonText: { displayText: '☰ EXTREME ASUPAN' }, type: 1 },
          { buttonId: `${prefix}asupansantuy`, buttonText: { displayText: '☰ NEXT' }, type: 1 }
        ]
        sendButton(from, anuloh, buffer, 'Kalo Asupan Ga muncul, klik button yang tersedia', but, mek)
break
case 'gachasantuy':
case 'asupansantuy':
ini = await fetchJson(`https://zeroyt7-api.herokuapp.com/api/asupan/santuy?apikey=${zerokey}`)
reply(mess.wait)
buffer = await getBuffer(ini.result.url)
zeroyt7.sendMessage(from, buffer, video, {quoted: ftrol, caption: 'DONE, JAN LUPA FOLLOW TIKTOK : @imyourexhaha'})
break
case 'asupanukhti':
ini = await fetchJson(`https://zeroyt7-api.herokuapp.com/api/asupan/ukty?apikey=${zerokey}`)
reply(mess.wait)
buffer = await getBuffer(ini.result.url)
zeroyt7.sendMessage(from, buffer, video, {quoted: ftrol, caption: 'DONE, JAN LUPA FOLLOW TIKTOK : @imyourexhaha'})
break
case 'gachavidio':
case 'asupanbocil':
ini = await fetchJson(`https://zeroyt7-api.herokuapp.com/api/asupan/bocil?apikey=${zerokey}`)
reply(mess.wait)
zeroyt7.sendMessage(from, buffer, video, {quoted: ftrol, caption: 'DONE, JAN LUPA FOLLOW TIKTOK : @imyourexhaha'})
break
    case 'ytmp3':
                    if (args.length == 0) return reply(`Example: ${prefix + command} https://www.youtube.com/watch?v=qZIQAk-BUEc`)
                    ini_link = args[0]
                    get_result = await fetchJson(`https://api.lolhuman.xyz/api/ytaudio?apikey=a2867eec5c98ea18db2ef5c9&url=${ini_link}`)
                    get_result = get_result.result
                    ini_txt = `Title : ${get_result.title}\n`
                    ini_txt += `Uploader : ${get_result.uploader}\n`
                    ini_txt += `Duration : ${get_result.duration}\n`
                    ini_txt += `View : ${get_result.view}\n`
                    ini_txt += `Like : ${get_result.like}\n`
                    ini_txt += `Dislike : ${get_result.dislike}\n`
                    ini_txt += `Description :\n ${get_result.description}`
                    ini_buffer = await getBuffer(get_result.thumbnail)
                    await zeroyt7.sendMessage(from, ini_buffer, image, { quoted: zeroyt7, caption: ini_txt })
                    get_audio = await getBuffer(get_result.link[3].link)
                    await zeroyt7.sendMessage(from, get_audio, audio, { mimetype: 'audio/mp4', filename: `${get_result.title}.mp3`, quoted: ftrol })
                    break
case 'asupanghea':
ini = await fetchJson(`https://zeroyt7-api.herokuapp.com/api/asupan/ghea?apikey=${zerokey}`)
reply(mess.wait)
buffer = await getBuffer(ini.result.url)
zeroyt7.sendMessage(from, buffer, video, {quoted: ftrol, caption: 'DONE, JAN LUPA FOLLOW TIKTOK : @imyourexhaha'})
break
case 'gacharandom':
case 'asupanrika':
ini = await fetchJson(`https://zeroyt7-api.herokuapp.com/api/asupan/rikagusriani?apikey=${zerokey}`)
reply(mess.wait)
buffer = await getBuffer(ini.result.url)
zeroyt7.sendMessage(from, buffer, video, {quoted: ftrol, caption: 'DONE, JAN LUPA FOLLOW TIKTOK : @imyourexhaha'})
break
	
//━━━━━━━━━━━━━━━[ FITUR GROUP ]━━━━━━━━━━━━━━━━━//

case 'welcome':
if (!isGroup) return reply(mess.only.group)
but = [
{ buttonId: '!welcomeon', buttonText: { displayText: '☰ ON' }, type: 1 },
{ buttonId: '!welcomeoff', buttonText: { displayText: '☰ OFF' }, type: 1 }
]
sendButton(from, "Silahkan pilih untuk welcome group", faketeks, but, mek)
break
case 'suit':
if (args.length < 1) return reply('Pilih gunting/batu/kertas')
			if (args[0] === 'gunting' ) {
			gunting = [
	        "Kamu *Gunting*\nAku *Kertas*\nKamu Menang 🗿",
		    "Kamu *Gunting*\nAku *Batu*\nKamu Kalah 😱",
	        "Kamu *Gunting*\nAku *Gunting*\nKita Seri 🗿"
		    ]
		    gun = gunting[Math.floor(Math.random() * gunting.length)]
		    reply(gun)
			} else if (args[0] === 'kertas') {
		    ker = [
		    "Kamu *Kertas*\nAku *Batu*\nKamu Menang 🗿",
		    "Kamu *Kertas*\nAku *Gunting*\nKamu Kalah 😱",
		    "Kamu *Kertas*\nAku *Kertas*\nKita Seri 🗿"
		    ]
		    kertas = ker[Math.floor(Math.random() * ker.length)]
			reply(kertas)
			} else if (args[0] === 'batu') {
		   bat = [
		   "Kamu *Batu*\nAku *Gunting*\nKamu Menang 🗿",
		   "Kamu *Batu*\nAku *Kertas*\nKamu Kalah 😱",
		   "Kamu *Batu*\nAku *Batu*\nKita Seri 🗿"
	       ]
		   batu = bat[Math.floor(Math.random() * bat.length)]
		   reply(batu)
		   } else {
		   reply('Pilih gunting/batu/kertas')
		   }
           break
           case 'susunkata':
            nay2 = await fetchJson(`${restv2}/api/susunkata?apikey=${apiv2}`) 
            zeroyt7.sendMessage(from, `[ *SUSUN KATA* ]\n${tz} *SOAL* : ${nay2.math.soal}\n${tz} *INDEX* : ${nay2.math.index}\n${tz} *TYPE* : ${nay2.math.tipe}\n\n[ *WAKTU 30 DETIK* ]`, text,{quoted:nay1}) 
            setTimeout( () => {
            zeroyt7.sendMessage(from, "20 DETIK LAGI", text,{quoted:nay1})
            }, 10000)
            setTimeout( () => {
            zeroyt7.sendMessage(from, "10 DETIK LAGI", text,{quoted:nay1})
            }, 20000)
            setTimeout( () => {
            reply(`[${tz}] WAKTU HABIS\n${tz} *JAWABAN* : ${nay2.math.jawaban}`)
            }, 30000)
            break	
case 'sewabot':
case 'nyewa':
image = fs.readFileSync('./zeroyt7/crg.jpg')
sewa = 
`Hi ${pushname}, ${tampilUcapan}
Mau Sewa Bot Ya ? 
Liat PriceList Di Atas Ya!`
but = [
          { buttonId: `${prefix}owner`, buttonText: { displayText: '☰ OWNER' }, type: 1 },
          { buttonId: `${prefix}sebulan`, buttonText: { displayText: '☰ Sewa Sebulan' }, type: 1 }
        ]
        sendButLocation(from, sewa, faketeks, image, but, { thumbnail: Buffer.alloc(0) })
break
case 'herodetail':
res = await herodetails(body.slice(12))
her = `*Hero Details ${body.slice(12)}*

*Nama* : ${res.hero_name}
*Role* : ${res.role}
*Quotes* : ${res.entrance_quotes}
*Fitur Hero* : ${res.hero_feature}
*Spesial* : ${res.speciality}
*Rekomendasi Lane* : ${res.laning_recommendation}
*Harga* : ${res.price.battle_point} [Battle point] | ${res.price.diamond} [DM] | ${res.price.hero_fragment} [Fragment]
*Rilis* : ${res.release_date}

*Durability* : ${res.skill.durability}
*Offence* : ${res.skill.offense}
*Skill Effect* : ${res.skill_effects}
*Difficulty* : ${res.skill.difficulty}
 
*Movement Speed* : ${res.attributes.movement_speed}
*Physical Attack* : ${res.attributes.physical_attack}
*Magic Defense* : ${res.attributes.magic_defense}
*Ability Crit Rate* : ${res.attributes.ability_crit_rate}
*HP* : ${res.attributes.hp}
*Mana* : ${res.attributes.mana}
*Mana Regen* : ${res.attributes.mana_regen}

*Story* : ${res.background_story}`
reply(her)
break
case 'sebulan':
image = fs.readFileSync('./zeroyt7/zerothumb.jpg')
sebulan =
`Untuk Harga Sewa Bot 
Sebulan 10.000

Silahkan Pilih Metode Pembayarannya Dibawah Ini`
but = [
          { buttonId: `${prefix}gopay`, buttonText: { displayText: '☰ GOPAY' }, type: 1 },
          { buttonId: `${prefix}dana`, buttonText: { displayText: '☰ DANA' }, type: 1 },
          { buttonId: `${prefix}ovo`, buttonText: { displayText: '☰ OVO' }, type: 1 }
        ]
        sendButLocation(from, sebulan, faketeks, image, but, { thumbnail: Buffer.alloc(0) })
break
case 'donate':
image = fs.readFileSync('./zeroyt7/zerothumb.jpg')
yur =
`DEVELOPER SANGAT MEMUBUTUHKAN MODAL
UNTUK MEMBELI PERALATAN BOT. JIKA MINAT MEMBANTU
SAYA UCAPKAN TERIMAKASIH.`
but = [
          { buttonId: `${prefix}gopay`, buttonText: { displayText: '☰ GOPAY' }, type: 1 },
          { buttonId: `${prefix}dana`, buttonText: { displayText: '☰ DANA' }, type: 1 },
          { buttonId: `${prefix}ovo`, buttonText: { displayText: '☰ OVO' }, type: 1 }
        ]
        sendButLocation(from, yur, faketeks, image, but, { thumbnail: Buffer.alloc(0) })
break
case 'permanen':
image = fs.readFileSync('./zeroyt7/zerothumb.jpg')
permanen =
`Untuk Harga Sewa Bot 
Permanen 15.000

Silahkan Pilih Metode Pembayarannya Dibawah Ini`
but = [
          { buttonId: `${prefix}gopay`, buttonText: { displayText: '☰ GOPAY' }, type: 1 },
          { buttonId: `${prefix}dana`, buttonText: { displayText: '☰ DANA' }, type: 1 },
          { buttonId: `${prefix}ovo`, buttonText: { displayText: '☰ OVO' }, type: 1 }
        ]
        sendButLocation(from, permanen, faketeks, image, but, { thumbnail: Buffer.alloc(0) })
break
case 'gopay':
gopay =
`No Gopay : 88980417181(TANPA 0) 
A/N : VerseSt`
but = [
{ buttonId: `${prefix}owner`, buttonText: { displayText: '☰ DONE' }, type: 1 }
]
sendButton(from, gopay, faketeks, but, mek)
break
case 'dana':
dana =
`No Gopay : 88239440253(TANPA 0) 
A/N : FJR/BOT`
but = [
{ buttonId: `${prefix}owner`, buttonText: { displayText: '☰ DONE' }, type: 1 }
]
sendButton(from, dana, faketeks, but, mek)
break
case 'ovo':
ovo =
`No Gopay : 088239440253(TANPA 0) 
A/N : Fajar Kyonari JB`
but = [
{ buttonId: `${prefix}owner`, buttonText: { displayText: '☰ DONE' }, type: 1 }
]
sendButton(from, ovo, faketeks, but, mek)
break
case 'lirik':
if (args.length < 1) return reply('Judulnya?')
reply(mess.wait)
teks = body.slice(7)
lirikLagu(teks).then((res) => {
let lirik = `${res[0].result}`
reply(lirik)
})
break
case 'welcomeon':
if (!isGroup) return reply(mess.only.group)
if (isWelkom) return reply('welcome sudah aktif')
_welkom.push(from)
fs.writeFileSync('./database/welcome.json', JSON.stringify(_welkom))
reply(`\`\`\`✓Sukses mengaktifkan fitur welcome di group\`\`\` *${groupMetadata.subject}*`)
break

case 'kurumi':
case 'deku':
case 'sao':
case 'chika':
case 'kurumi':
case 'kaneki':
case 'touka':
case 'eren':
case 'naruto':
case 'minato':
case 'sagiri':
case 'sasuke':
case 'sakura':
case 'tsunade':
case 'gojosatoru':
reply(mess.wait)
anu = await fetchJson(`https://bx-hunter.herokuapp.com/api/pinterest?text=${command}&apikey=FuckBitch`, {method: 'get'})
ngebuff = await getBuffer(anu.image)
zeroyt7.sendMessage(from, ngebuff, image, { quoted: ftrol })
break
case 'sedekah':
case 'donate':
case 'donasi':
wtf = fs.readFileSync('./zeroyt7/qris.jpg')
ngemis = `*[ SEDEKAH ]*

*Donasi Membantu Creator Bot Untuk Membeli Source Code² No Enc, Agar Bs Membuat Bot Yg Berkualitas. Dan gw bikin script bot tanpa modal. Modal Copas (Copy Paste) sih hehe, dan gw punya rdp (kentang parah no kecot), makanya bantu donasi biar gw bisa beli kebutuhan² bot🙄*

_Gopay_ : 88239440253 (Ga Pake 0)
_Dana_ : 88239440253 (Ga Pake 0)
_Ovo_ : 088239440253 (Pake 0)
_Pulsa (Smartfren)_ : 088239440253
 
People : *Bang E-Wallet Gw Belum Premium?*
Sy : *Scan QRIS Di atas*

Makasih Yg Udh Sedekah, Semoga Rejeki Nya Lancar Terus, Aamiin

Yg Belum Sedekah Semoga Di Limpahkan Rejeki Nya, Aamiin`
tekss =
`ini bukan ngemis yaa, gak mau ya udh ini donasi tampa paksaan`
but = [
          { buttonId: `${prefix}allmenu`, buttonText: { displayText: '☰ Back To Menu' }, type: 1 },
          { buttonId: `${prefix}nyewa`, buttonText: { displayText: '☰ Harga Sewa' }, type: 1 }
        ]
        sendButLocation(from, wtf, ngemis, tekss, but)
        break
        case 'quotes':
ini_result = await fetchJson('https://xnxxapi.herokuapp.com/api/randomquote?apikey=xnxx')
get_result = ini_result.result
ini_res = `${get_result.quotes}\n\n`
ini_res += `~ ${get_result.author}`
reply(ini_res)
break
case 'baka':
if (!isGroup) return reply(mess.only.group)
reply(mess.wait)
hai = (`https://hardianto-chan.herokuapp.com/api/anime/random?sfw=baka&apikey=hardianto`)
kon = await getBuffer(hai)
zeroyt7.sendMessage(from, kon, image, { quoted: ftrol, thumbnail: fs.readFileSync('./zeroyt7/zerothumb.jpg')})
break
case 'cecanmalaysia':
huft = await fetchJson(`https://zeroyt7-api.herokuapp.com/api/cewe/malaysia?apikey=ZeroYT7`)
replly(`✍️Tunggu Sebentar....`)
goo = await getBuffer(huft.result.url)
zeroyt7.sendMessage(from, goo, image, {quoted: fgi, caption: 'Nih Jangan Sampe Berdiri yah anunya (≧▽≦)'})
break
case 'cecankorea':
huft = await fetchJson(`https://zeroyt7-api.herokuapp.com/api/cewe/korea?apikey=ZeroYT7`)
replly(`✍️Tunggu Sebentar....`)
goo = await getBuffer(huft.result.url)
zeroyt7.sendMessage(from, goo, image, {quoted: fgi, caption: 'Nih Jangan Sampe Berdiri yah anunya (≧▽≦)'})
break
case 'cecanindonesia':
huft = await fetchJson(`https://zeroyt7-api.herokuapp.com/api/cewe/indonesia?apikey=ZeroYT7`)
replly(`✍️Tunggu Sebentar....`)
goo = await getBuffer(huft.result.url)
zeroyt7.sendMessage(from, goo, image, {quoted: fgi, caption: 'Nih Jangan Sampe Berdiri yah anunya (≧▽≦)'})
break
case 'cecanjapan':
huft = await fetchJson(`https://zeroyt7-api.herokuapp.com/api/cewe/japan?apikey=ZeroYT7`)
replly(`✍️Tunggu Sebentar....`)
goo = await getBuffer(huft.result.url)
zeroyt7.sendMessage(from, goo, image, {quoted: fgi, caption: 'Nih Jangan Sampe Berdiri yah anunya (≧▽≦)'})
break
case 'cecanthailand':
huft = await fetchJson(`https://zeroyt7-api.herokuapp.com/api/cewe/thailand?apikey=ZeroYT7`)
replly(`✍️Tunggu Sebentar....`)
goo = await getBuffer(huft.result.url)
zeroyt7.sendMessage(from, goo, image, {quoted: fgi, caption: 'Nih Jangan Sampe Berdiri yah anunya (≧▽≦)'})
break
case 'slap':
if (!isGroup) return reply(mess.only.group)
reply(mess.wait)
hai = (`https://hardianto-chan.herokuapp.com/api/anime/random?sfw=slap&apikey=hardianto`)
kon = await getBuffer(hai)
zeroyt7.sendMessage(from, kon, image, { quoted: ftrol, thumbnail: fs.readFileSync('./zeroyt7/zerothumb.jpg')})
break
case 'poke':
if (!isGroup) return reply(mess.only.group)
reply(mess.wait)
hai = (`https://hardianto-chan.herokuapp.com/api/anime/random?sfw=poke&apikey=hardianto`)
kon = await getBuffer(hai)
zeroyt7.sendMessage(from, kon, image, { quoted: ftrol, thumbnail: fs.readFileSync('./zeroyt7/zerothumb.jpg')})
break
case 'stalkyt':
            if (args.length < 1) return ("FajarKyoo")
            nay2 = await fetchJson(`${restv4}/api/yt-stalk?username=${aq}&apikey=${apiv4}`)             
            nay3 = `*CHANNEL* : ${nay2.channel}\n`
            nay3 += `*SUBSCRIBERCOUNT* : ${nay2.subscriberCount}\n`
            nay3 += `*ISVERIFIED* : ${nay2.isVerified}\n`
            nay3 += `*ISFAMILYFRIENDLY* : ${nay2.isFamilyFriendly}\n`
            nay3 += `*LINK* : ${nay2.link}\n`
            nay3 += `*DESCRIPTION* : ${nay2.description}`
            reply(nay3)
            break
case 'keta':
if (!isGroup) return reply(mess.only.group)
reply(mess.wait)
hai = (`https://hardianto-chan.herokuapp.com/api/anime/random?nsfw=keta&apikey=hardianto`)
kon = await getBuffer(hai)
zeroyt7.sendMessage(from, kon, image, { quoted: ftrol, thumbnail: fs.readFileSync('./zeroyt7/zerothumb.jpg')})
break
case 'herolist':
await herolist().then((ress) => {
let listt = `*List hero untuk feature ${prefix}herodetail*\n\n`
for (var i = 0; i < ress.hero.length; i++) {
listt += '-  ' + ress.hero[i] + '\n'
}
reply(listt)
})
break
case 'memburu':
case 'tembak':
                    if (args[0] == 'udara') {
                    setTimeout( () => {
                    reply(`[ *PERINTAH DILAKSANAKAN* ]`)
                    }, 1000)
                    setTimeout( () => {
                    reply(`[ *SEDANG BERBURU* ]`)
                    }, 5000)
                    setTimeout( () => {
                    reply(`[ *SUKSES !! DAN ANDA MENDAPATKAN* ]`)
                    }, 8000)
                    setTimeout( () => {
                    reply(`[ *WOW ANDA MENDAPATKAN* ]\n[ *${buruh33}* ]`)
                    }, 12000)
                    }
                    if (args[0] == 'darat') {
                    setTimeout( () => {
                    reply(`[ *PERINTAH DILAKSANAKAN* ]`)
                    }, 1000)
                    setTimeout( () => {
                    reply(`[ *SEDANG BERBURU* ]`)
                    }, 5000)
                    setTimeout( () => {
                    reply(`[ *SUKSES !! DAN ANDA MENDAPATKAN* ]`)
                    }, 8000)
                    setTimeout( () => {
                    reply(`[ *WOW ANDA MENDAPATKAN* ]\n[ *${buruh22}* ]`)
                    }, 12000)
                    }
                    if (args[0] == 'laut') {
                    setTimeout( () => {
                    reply(`[ *PERINTAH DILAKSANAKAN* ]`)
                    }, 1000)
                    setTimeout( () => {
                    reply(`[ *SEDANG BERBURU* ]`)
                    }, 5000)
                    setTimeout( () => {
                    reply(`[ *SUKSES !! DAN ANDA MENDAPATKAN* ]`)
                    }, 8000)
                    setTimeout( () => {
                    reply(`[ *WOW ANDA MENDAPATKAN* ]\n[ *${buruh11}* ]`)
                    }, 12000)
                    }
                    break
case 'baikcek':
            N = `KE *BAIKAN* KAMU\n`
            N += `ADALAH : *${randomnay1}${randomnay2}%* :v`
            reply(N)
            break 
            case 'jahatcek': 
            N = `KE *JAHATAN* KAMU\n`
            N += `ADALAH : *${randomnay1}${randomnay2}%* :v`
            reply(N)
            break 
 case 'haramcek':
            N = `KE *HARAMAN* KAMU\n`
            N += `ADALAH : *${randomnay1}${randomnay2}%* :v`
            reply(N)
            break  
        case 'bebancek':
            N = `KE *BEBANAN* KAMU\n`
            N += `ADALAH : *${randomnay1}${randomnay2}%* :v`
            reply(N)
            break
case 'awoo':
if (!isGroup) return reply(mess.only.group)
reply(mess.wait)
anu = await fetchJson(`https://waifu.pics/api/sfw/awoo`)
buffer = await getBuffer(anu.url)
zeroyt7.sendMessage(from, buffer, image, { quoted: ftrol, thumbnail: fs.readFileSync('./zeroyt7/zerothumb.jpg')})
break
case 'blowjob':
if (!isGroup) return reply(mess.only.group)
reply(mess.wait)
anu = await fetchJson(`https://nekos.life/api/v2/img/blowjob`)
buffer = await getBuffer(anu.url)
zeroyt7.sendMessage(from, buffer, image, { quoted: ftrol, thumbnail: fs.readFileSync('./zeroyt7/zerothumb.jpg')})
break
case 'wiki':
if (args.length < 1) return reply(' Yang Mau Di Cari Apa? ')
teks = args.join(' ')
res = await wikiSearch(teks).catch(e => {
return reply('_[ ! ] Error Hasil Tidak Ditemukan_') 
}) 
result = `*Judul :* ${res[0].judul}
*Wiki :* ${res[0].wiki}`
sendFileFromUrl(res[0].thumb, image, {quoted: ftrol, caption: result}).catch(e => {
  reply(result)
})
break
case 'quotesimg':
reply(mess.wait)
get = await fetchJson(`http://zekais-api.herokuapp.com/quotepic?apikey=JCqDkdK8`)
ini = await getBuffer(`${get.quotes}`)
zeroyt7.sendMessage(from, ini, image, { quoted: ftrol, caption: '𝘼𝙥𝙞𝙠𝙚𝙮 𝘽𝙮 𝙁𝙖𝙟𝙖𝙧𝙆𝙮𝙤𝙤' })
break
case 'randommilf':
api = await fetchJson(`https://zekais-api.herokuapp.com/milf?apikey=JCqDkdK8`) 
ress = await getBuffer(`${api.milf}`) 
zeroyt7.sendMessage(from, ini, image, { quoted: ftrol, caption : 'Random Milf By FajarKyoo' }) 
case 'megumin':
if (!isGroup) return reply(mess.only.group)
reply(mess.wait)
anu = await fetchJson(`https://waifu.pics/api/sfw/megumin`)
buffer = await getBuffer(anu.url)
zeroyt7.sendMessage(from, buffer, image, { quoted: ftrol, thumbnail: fs.readFileSync('./zeroyt7/zerothumb.jpg')})
break
case 'neko':
if (!isGroup) return reply(mess.only.group)
reply(mess.wait)
anu = await fetchJson(`https://waifu.pics/api/nsfw/neko`)
buffer = await getBuffer(anu.url)
zeroyt7.sendMessage(from, buffer, image, { quoted: ftrol, thumbnail: fs.readFileSync('./zeroyt7/zerothumb.jpg')})
break
case 'trapnime':
if (!isGroup) return reply(mess.only.group)
reply(mess.wait)
anu = await fetchJson(`https://waifu.pics/api/nsfw/trap`)
buffer = await getBuffer(anu.url)
zeroyt7.sendMessage(from, buffer, image, { quoted: ftrol, thumbnail: fs.readFileSync('./zeroyt7/zerothumb.jpg')})
break
case 'ass':
case 'femdom':
case 'hentaigif':
case 'ahegao':
case 'cum':
case 'masturbation':
case 'jahy':
case 'orgy':
case 'thigs':
case 'panties':
case 'foot':
case 'gangbang':
case 'bdsm':
case 'ero':
case 'glasses':
if (!isGroup) return reply(mess.only.group)
reply(mess.wait)
ini_result = await fetchJson(`https://ronove-bot-api.herokuapp.com/api/nsfw/${command}?apikey=Alphabot`)
get_result = ini_result.result
ini_img = await getBuffer(get_result)
zeroyt7.sendMessage(from, ini_img, image, {quoted:ftrol})
break
case 'welcomeoff':
if (!isGroup) return reply(mess.only.group)
if (!isGroupAdmins) return reply(mess.only.admin)
if (!isBotGroupAdmins) return reply("Bot Bukan Admin :)")
if (!isWelkom) return reply('welcome sudah off sebelumnya')
_welkom.splice(from, 1)
fs.writeFileSync('./database/welcome.json', JSON.stringify(_welkom))
reply(`\`\`\`✓Sukses menonaktifkan fitur welcome di group\`\`\` *${groupMetadata.subject}*`)
break
case 'antilink' :
if (!isGroup) return reply(mess.only.group)
if (!isGroupAdmins) return reply(mess.only.admin)
if (!isBotGroupAdmins) return reply("Bot Bukan Admin :)")
but = [
{ buttonId: '!antilinkon', buttonText: { displayText: '☰ ON' }, type: 1 },
{ buttonId: '!antilinkoff', buttonText: { displayText: '☰ OFF' }, type: 1 }
]
sendButton(from, "Silahkan pilih untuk antilink group", faketeks, but, mek)
break
case 'antilinkon' :
if (!isGroup) return reply(mess.only.group)
if (!isGroupAdmins) return reply(mess.only.admin)
if (!isBotGroupAdmins) return reply("Bot Bukan Admin :)")
if (isAntiLink) return reply('anti link sudah on')
_antilink.push(from)
fs.writeFileSync('./database/antilink.json', JSON.stringify(_antilink))
reply(`\`\`\`✓Sukses mengaktifkan fitur anti link di group\`\`\` *${groupMetadata.subject}*`)
break
case 'antilinkoff' :
if (!isGroup) return reply(mess.only.group)
if (!isGroupAdmins) return reply(mess.only.admin)
if (!isBotGroupAdmins) return reply("Bot Bukan Admin :)")
if (!isAntiLink) return reply('anti link sudah off sebelumnya')
_antilink.splice(from, 1)
fs.writeFileSync('./database/antilink.json', JSON.stringify(_antilink))
reply(`\`\`\`✓Sukses menonaktifkan fitur anti link di group\`\`\` *${groupMetadata.subject}*`)
break
case 'antivirtex' :
if (!isGroup) return reply(mess.only.group)
if (!isGroupAdmins) return reply(mess.only.admin)
if (!isBotGroupAdmins) return reply("Bot Bukan Admin :)")
but = [
{ buttonId: '!antivirtexon', buttonText: { displayText: '☰ ON' }, type: 1 },
{ buttonId: '!antivirtexoff', buttonText: { displayText: '☰ OFF' }, type: 1 }
]
sendButton(from, "Silahkan pilih untuk antivirtex group", faketeks, but, mek)
break
case 'antivirtexon' :
if (!isGroup) return reply(mess.only.group)
if (!isGroupAdmins) return reply(mess.only.admin)
if (!isBotGroupAdmins) return reply("Bot Bukan Admin :)")
if (isAntiVirtex) return reply('anti virtex group sudah aktif sebelumnya')
_antivirtex.push(from)
fs.writeFileSync('./database/antivirtex.json', JSON.stringify(_antivirtex))
reply(`\`\`\`Sukses mengaktifkan mode anti virtex di group\`\`\` *${groupMetadata.subject}*`)
break
case 'semoji':
if (args === 0) return reply('emojinya?')   
aku4 = args.join(' ')
emoji.get(`${aku4}`).then(emoji => {
link = `${emoji.images[10].url}`
sendWebp(from, `${link}`).catch(() => reply('gagal'))
})
break
case 'antivirtexoff' :
if (!isGroup) return reply(mess.only.group)
if (!isGroupAdmins) return reply(mess.only.admin)
if (!isBotGroupAdmins) return reply("Bot Bukan Admin :)")
if (!isAntiVirtex) return reply('Mode anti virtex sudah nonaktif sebelumnya')
_antivirtex.splice(from, 1)
fs.writeFileSync('./database/antivirtex.json', JSON.stringify(_antivirtex))
reply(`\`\`\`✓Sukes menonaktifkan mode anti virtex di group\`\`\` *${groupMetadata.subject}*`)
break
case 'group' :
if (!isGroupAdmins) return reply(mess.only.admin)
if (!isGroup) return reply(mess.only.group)
if (!isBotGroupAdmins) return reply("Bot Bukan Admin :)")
but = [
{ buttonId: '!groupbuka', buttonText: { displayText: '☰ BUKA' }, type: 1 },
{ buttonId: '!geouptutup', buttonText: { displayText: '☰ TUTUP' }, type: 1 }
]
sendButton(from, "Silahkan pilih untuk buka/tutup group", faketeks, but, mek)
break

     case 'susunkata':
            nay2 = await fetchJson(`${restv2}/api/susunkata?apikey=${apiv2}`) 
            zeroyt7.sendMessage(from, `[ *SUSUN KATA* ]\n${tz} *SOAL* : ${nay2.math.soal}\n${tz} *INDEX* : ${nay2.math.index}\n${tz} *TYPE* : ${nay2.math.tipe}\n\n[ *WAKTU 30 DETIK* ]`, text,{quoted:ftrol}) 
            setTimeout( () => {
            zeroyt7.sendMessage(from, "20 DETIK LAGI", text,{quoted:ftrol})
            }, 10000)
            setTimeout( () => {
            zeroyt7.sendMessage(from, "10 DETIK LAGI", text,{quoted:ftrol})
            }, 20000)
            setTimeout( () => {
            reply(`[${tz}] WAKTU HABIS\n${tz} *JAWABAN* : ${nay2.math.jawaban}`)
            }, 30000)
            break	
            case 'tebakkalimat':
            nay2 = await fetchJson(`${restv2}/api/${command}?apikey=${apiv2}`) 
            zeroyt7.sendMessage(from, `[ *TEBAK KALIMAT* ]\n${tz} *SOAL* : ${nay2.math.soal}\n${tz} *INDEX* : ${nay2.math.index}\n\n[ *WAKTU 30 DETIK* ]`, text,{quoted:ftrol}) 
            setTimeout( () => {
            zeroyt7.sendMessage(from, "20 DETIK LAGI", text,{quoted:ftrol})
            }, 10000)
            setTimeout( () => {
            zeroyt7.sendMessage(from, "10 DETIK LAGI", text,{quoted:ftrol})
            }, 20000)
            setTimeout( () => {
            reply(`[${tz}] WAKTU HABIS\n${tz} *JAWABAN* : ${nay2.math.jawaban}`)
            }, 30000)
            break	
            case 'tebakkata':
            nay2 = await fetchJson(`${restv2}/api/${command}?apikey=${apiv2}`) 
            zeroyt7.sendMessage(from, `[ *TEBAK KATA* ]\n${tz} *SOAL* : ${nay2.math.soal}\n${tz} *INDEX* : ${nay2.math.index}\n\n[ *WAKTU 30 DETIK* ]`, text,{quoted:ftrol}) 
            setTimeout( () => {
            zeroyt7.sendMessage(from, "20 DETIK LAGI", text,{quoted:ftrol})
            }, 10000)
            setTimeout( () => {
            zeroyt7.sendMessage(from, "10 DETIK LAGI", text,{quoted:ftrol})
            }, 20000)
            setTimeout( () => {
            reply(`[${tz}] WAKTU HABIS\n${tz} *JAWABAN* : ${nay2.math.jawaban}`)
            }, 30000)
            break		    	
            case 'tebakkimia':
            nay2 = await fetchJson(`${restv2}/api/${command}?apikey=${apiv2}`) 
            zeroyt7.sendMessage(from, `[ *TEBAK KIMIA* ]\n${tz} *SOAL* : ${nay2.math.lambang}\n\n[ *WAKTU 30 DETIK* ]`, text,{quoted:ftrol}) 
            setTimeout( () => {
            zeroyt7.sendMessage(from, "20 DETIK LAGI", text,{quoted:ftrol})
            }, 10000)
            setTimeout( () => {
            zeroyt7.sendMessage(from, "10 DETIK LAGI", text,{quoted:ftrol})
            }, 20000)
            setTimeout( () => {
            reply(`[${tz}] WAKTU HABIS\n${tz} *JAWABAN* : ${nay2.math.unsur}`)
            }, 30000)
            break	
            case 'tebaklirik':
            nay2 = await fetchJson(`${restv2}/api/${command}?apikey=${apiv2}`) 
            zeroyt7.sendMessage(from, `[ *TEBAK LIRIK* ]\n${tz} *SOAL* : ${nay2.math.soal}\n\n[ *WAKTU 30 DETIK* ]`, text,{quoted:ftrol}) 
            setTimeout( () => {
            zeroyt7.sendMessage(from, "20 DETIK LAGI", text,{quoted:ftrol})
            }, 10000)
            setTimeout( () => {
            zeroyt7.sendMessage(from, "10 DETIK LAGI", text,{quoted:ftrol})
            }, 20000)
            setTimeout( () => {
            reply(`[${tz}] WAKTU HABIS\n${tz} *JAWABAN* : ${nay2.math.jawaban}`)
            }, 30000)
            break		    	  	    
            case 'tebaktebakan':
            nay2 = await fetchJson(`${restv2}/api/${command}?apikey=${apiv2}`) 
            zeroyt7.sendMessage(from, `[ *TEBAK TEBAKAN* ]\n${tz} *SOAL* : ${nay2.math.soal}\n\n[ *WAKTU 30 DETIK* ]`, text,{quoted:ftrol}) 
            setTimeout( () => {
            zeroyt7.sendMessage(from, "20 DETIK LAGI", text,{quoted:ftrol})
            }, 10000)
            setTimeout( () => {
            zeroyt7.sendMessage(from, "10 DETIK LAGI", text,{quoted:ftrol})
            }, 20000)
            setTimeout( () => {
            reply(`[${tz}] WAKTU HABIS\n${tz} *JAWABAN* : ${nay2.math.jawaban}`)
            }, 30000)
            break
	case 'listonline': 
			if (!isGroup) return reply(mess.only.group)
        	let ido = args && /\d+\-\d+@g.us/.test(args[0]) ? args[0] : from
		    let online = [...Object.keys(zeroyt7.chats.get(ido).presences), zeroyt7.user.jid]
		    zeroyt7.sendMessage(from, 'LIST ONLINE:\n' + online.map(v => '- @' + v.replace(/@.+/, '')).join`\n`, text, { quoted: ftrol,
  		    contextInfo: { mentionedJid: online }
		    })			 
			break
		
            case 'tekateki':
            nay2 = await fetchJson(`${restv2}/api/${command}?apikey=${apiv2}`) 
            zeroyt7.sendMessage(from, `[ *TEKA TEKI* ]\n${tz} *SOAL* : ${nay2.math.soal}\n\n[ *WAKTU 30 DETIK* ]`, text,{quoted:ftrol}) 
            setTimeout( () => {
            zeroyt7.sendMessage(from, "20 DETIK LAGI", text,{quoted:ftrol})
            }, 10000)
            setTimeout( () => {
            zeroyt7.sendMessage(from, "10 DETIK LAGI", text,{quoted:ftrol})
            }, 20000)
            setTimeout( () => {
            reply(`[${tz}] WAKTU HABIS\n${tz} *JAWABAN* : ${nay2.math.jawaban}`)
            }, 30000)
            break             
            case 'asahotak':
            nay2 = await fetchJson(`${restv2}/api/${command}?apikey=${apiv2}`) 
            zeroyt7.sendMessage(from, `[ *ASAH OTAK* ]\n${tz} *SOAL* : ${nay2.math.soal}\n\n[ *WAKTU 30 DETIK* ]`, text,{quoted:ftrol}) 
            setTimeout( () => {
            zeroyt7.sendMessage(from, "20 DETIK LAGI", text,{quoted:ftrol})
            }, 10000)
            setTimeout( () => {
            zeroyt7.sendMessage(from, "10 DETIK LAGI", text,{quoted:ftrol})
            }, 20000)
            setTimeout( () => {
            reply(`[${tz}] WAKTU HABIS\n${tz} *JAWABAN* : ${nay2.math.jawaban}`)
            }, 30000)
            break
            case 'caklontong':
            nay2 = await fetchJson(`${restv2}/api/kuis/${command}?apikey=${apiv2}`) 
            zeroyt7.sendMessage(from, `[ *CAKLONTONG* ]\n${tz} *SOAL* : ${nay2.result.soal}\n\n[ *WAKTU 30 DETIK* ]`, text,{quoted:ftrol}) 
            setTimeout( () => {
            zeroyt7.sendMessage(from, "20 DETIK LAGI", text,{quoted:ftrol})
            }, 10000)
            setTimeout( () => {
            zeroyt7.sendMessage(from, "10 DETIK LAGI", text,{quoted:ftrol})
            }, 20000)
            setTimeout( () => {
            reply(`[${tz}] WAKTU HABIS\n${tz} *JAWABAN* : ${nay2.result.jawaban}\n${tz} *DESK* : ${nay2.result.deskripsi}`)
            }, 30000)
            break	
            case 'siapaaku':
            nay2 = await fetchJson(`${restv2}/api/${command}?apikey=${apiv2}`) 
            zeroyt7.sendMessage(from, `[ *SIAPA AKU* ]\n${tz} *SOAL* : ${nay2.math.soal}\n\n[ *WAKTU 30 DETIK* ]`, text,{quoted:ftrol}) 
            setTimeout( () => {
            zeroyt7.sendMessage(from, "20 DETIK LAGI", text,{quoted:ftrol})
            }, 10000)
            setTimeout( () => {
            zeroyt7.sendMessage(from, "10 DETIK LAGI", text,{quoted:ftrol})
            }, 20000)
            setTimeout( () => {
            reply(`[${tz}] WAKTU HABIS\n${tz} *JAWABAN* : ${nay2.math.jawaban}`)
            }, 30000)
            break  
            case 'wallanime': case 'kemono': case 'neko': case 'shota': case 'husbu': case 'waifu': case 'loli':        
            reply(mess.wait)
            nay2 = await fetchJson(`${restv4}/api/random-${command}?apikey=${apiv4}`)
            nay3 = await getBuffer(nay2.link)
            sendImage(nay3, "NIHH KAK")
            break
case 'groupbuka' :
if (!isGroup) return reply(mess.only.group)
if (!isGroupAdmins) return reply(mess.only.admin)
if (!isBotGroupAdmins) return reply("Bot Bukan Admin :)")
reply(`\`\`\`✓Sukses Membuka Group\`\`\` *${groupMetadata.subject}*`)
zeroyt7.groupSettingChange(from, GroupSettingChange.messageSend, false)
break
case 'grouptutup' :
if (!isGroup) return reply(mess.only.group)
if (!isGroupAdmins) return reply(mess.only.admin)
if (!isBotGroupAdmins) return reply("Bot Bukan Admin :)")
reply(`\`\`\`✓Sukses Menutup Group\`\`\` *${groupMetadata.subject}*`)
zeroyt7.groupSettingChange(from, GroupSettingChange.messageSend, true)
break
case 'linkgrup' :
if (!isGroup) return reply(mess.only.group)
if (!isBotGroupAdmins) return reply("Bot Bukan Admin :)")
linkgc = await zeroyt7.groupInviteCode(from)
yeh = `https://chat.whatsapp.com/${linkgc}\n\nlink Group *${groupName}*`
zeroyt7.sendMessage(from, yeh, text, { quoted: ftrol })
break
case 'promote' :
if (!isGroup) return reply(mess.only.group)
if (!isGroupAdmins) return reply(mess.only.admin)
if (!isBotGroupAdmins) return reply("Bot Bukan Admin :)")
if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('Tag target yang ingin di jadi admin!')
mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
if (mentioned.length > 1) {
teks = 'Perintah di terima, anda menjdi admin :\n'
for (let _ of mentioned) {
teks += `@${_.split('@')[0]}\n`
}
mentions(teks, mentioned, true)
zeroyt7.groupMakeAdmin(from, mentioned)
} else {
mentions(`Perintah di terima, @${mentioned[0].split('@')[0]} Kamu Menjadi Admin Di Group *${groupMetadata.subject}*`, mentioned, true)
zeroyt7.groupMakeAdmin(from, mentioned)
}
break
case 'zoro': case 'luffy': case 'sanji': case 'ussop': case 'nami': case 'copper': case 'naruto': case 'minato': case 'sasuke': case 'sakura': case 'boruto': case 'sarada': case 'mitsuki': case 'orochimaru': case 'tsunade': case 'kakashi': case 'killua': case 'gon': case 'saitama': case 'rimuru': case 'sagiri': case 'natsu': case 'tanjirou': case 'nezuko': case 'senku':   
            nay2 = await fetchJson(`${restv4}/api/pinterest?q=${command}&apikey=${apiv4}`)
            reply(mess.wait)
            nay3 = await getBuffer(nay2.image) 
            sendImage(nay3, "Done!, JAN LUPA FOLLOW TIKTOK @imyourexhaha")
            break  
case 'demote' :
if (!isGroup) return reply(mess.only.group)
if (!isGroupAdmins) return reply(mess.only.admin)
if (!isBotGroupAdmins) return reply("Bot Bukan Admin :)")
if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('Tag target yang ingin di tidak jadi admin!')
mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
if (mentioned.length > 1) {
teks = 'Perintah di terima, anda tidak menjadi admin :\n'
for (let _ of mentioned) {
teks += `@${_.split('@')[0]}\n`
}
mentions(teks, mentioned, true)
zeroyt7.groupDemoteAdmin(from, mentioned)
} else {
mentions(`Perintah di terima, Menurunkan : @${mentioned[0].split('@')[0]} Menjadi Member`, mentioned, true)
zeroyt7.groupDemoteAdmin(from, mentioned)
}
break
case 'hartatahta':
case 'naruto':
case 'bneon':
case 'matrix':
case 'breakwall':
case 'gneon':
case 'dropwater':
case 'flowertext':
case 'crosslogo':
case 'silktext':
case 'flametext':
case 'glowtext':
case 'smoketext':
case 'skytext':
case 'cslogo':
case 'lithgtext':
case 'crismes':
case 'tfire':
case 'sandw':
case 'epep':
case 'text3dbox':
case 'logobp':
case 'leavest':
case 'thundertext':
case 'tlight':
case 'nulis':
if (args.length == 0) return reply(`Teks Nya Mana\nContoh : ${prefix + command} LeonGanz`)
bo = args.join(" ")
reply(mess.wait)
res = await getBuffer(`https://api.zeks.me/api/${command}?apikey=FajarKeyy&text=${bo}`)
zeroyt7.sendMessage(from, res, image, {quoted: ftrol, caption: 'Done!' })
break
case 'nulis':
if (args.length == 0) return reply(`Teks Nya Mana ?\nContoh: ${prefix + command} Zero Gantenk`)
ini_txt = args.join(" ")
getBuffer(`https://api.lolhuman.xyz/api/nulis?apikey=KurrXd&text=${ini_txt}`).then((gambar) => {
zeroyt7.sendMessage(from, gambar, image, { thumbnail: Buffer.alloc(0), caption: `DONE NIH JANGAN LUPA SUBSCRIBE ZERO YT7`, quoted : ftrol })
})
break
case 'add' :
if (!isGroup) return reply(mess.only.group)
if (!isGroupAdmins) return reply(mess.only.admin)
if (!isBotGroupAdmins) return reply("Bot Bukan Admin :)")
if (args.length < 1) return reply('Yang mau di add siapa??')
if (args[0].startsWith('08')) return reply('Gunakan kode negara Gan')
try {
num = `${args[0].replace(/ /g, '')}@s.whatsapp.net`
zeroyt7.groupAdd(from, [num])
} catch (e) {
console.log('Error :', e)
reply('Gagal menambahkan target, mungkin karena di private')
}
break
case 'kick' :
if (!isGroup) return reply(mess.only.group)
if (!isGroupAdmins) return reply(mess.only.admin)
if (!isBotGroupAdmins) return reply("Bot Bukan Admin :)")
if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('Tag target yang ingin di tendang!')
mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
if (mentioned.length > 1) {
teks = 'Perintah di terima, mengeluarkan :\n'
for (let _ of mentioned) {
teks += `@${_.split('@')[0]}\n`
}
mentions(teks, mentioned, true)
zeroyt7.groupRemove(from, mentioned)
} else {
mentions(`Perintah di terima, mengeluarkan : @${mentioned[0].split('@')[0]}`, mentioned, true)
zeroyt7.groupRemove(from, mentioned)
}
break
case 'tagall':
if (!isGroup) return reply(mess.only.group)
if (!isGroupAdmins) return reply(mess.only.admin)
members_id = []
teks = (args.length > 1) ? args.join(' ').trim() : ''
teks += '\n\n'
for (let mem of groupMembers) {
teks += `• @${mem.jid.split('@')[0]}\n`
members_id.push(mem.jid)
}
mentions(teks, members_id, true)
break
case 'apakah':
apakah = body.slice(1)
const apa =['Iya','Tidak','Bisa Jadi','Coba Ulangi','Tanyakan Ayam']
const kah = apa[Math.floor(Math.random() * apa.length)]
zeroyt7.sendMessage(from, 'Pertanyaan : *'+apakah+'*\n\nJawaban : '+ kah, text, { quoted: flexx })
break
case 'kapankah':
kapankah = body.slice(1)
const kapan =['Besok','Lusa','Tadi','4 Hari Lagi','5 Hari Lagi','6 Hari Lagi','1 Minggu Lagi','2 Minggu Lagi','3 Minggu Lagi','1 Bulan Lagi','2 Bulan Lagi','3 Bulan Lagi','4 Bulan Lagi','5 Bulan Lagi','6 Bulan Lagi','1 Tahun Lagi','2 Tahun Lagi','3 Tahun Lagi','4 Tahun Lagi','5 Tahun Lagi','6 Tahun Lagi','1 Abad lagi','3 Hari Lagi','Tidak Akan Pernah']
const koh = kapan[Math.floor(Math.random() * kapan.length)]
zeroyt7.sendMessage(from, 'Pertanyaan : *'+kapankah+'*\n\nJawaban : '+ koh, text, { quoted: flexx })
break
case 'dark': case 'darkjoke': case 'darkjokes':
            reply(mess.wait)
            nay2 = await fetchJson(`${restv4}/api/random-darkjoke?apikey=${apiv4}`)
            nay3 = await getBuffer(nay2.urlimage)
            sendImage(nay3, "Ramdom Image By : ©FajarKyoo")
            break 
case 'bisakah':
bisakah = body.slice(1)
const bisa =['Bisa','Tidak Bisa','Coba Ulangi','Ngimpi kah?','yakin bisa?']
const keh = bisa[Math.floor(Math.random() * bisa.length)]
zeroyt7.sendMessage(from, 'Pertanyaan : *'+bisakah+'*\n\nJawaban : '+ keh, text, { quoted: flexx })
break
case 'setname':
if (!isGroup) return reply(mess.only.group)
if (!isGroupAdmins) return reply(mess.only.admin)
if (!isBotGroupAdmins) return reply(mess.only.Badmin)
zeroyt7.groupUpdateSubject(from, `${body.slice(9)}`)
zeroyt7.sendMessage(from, `\`\`\`✓Sukses Mengganti Nama Group Menjadi\`\`\` *${body.slice(9)}*`, text, { quoted: ftrol })
break
case 'setdesc':
if (!isGroup) return reply(mess.only.group)
if (!isGroupAdmins) return reply(mess.only.admin)
if (!isBotGroupAdmins) return reply(mess.only.Badmin)
zeroyt7.groupUpdateDescription(from, `${body.slice(9)}`)
zeroyt7.sendMessage(from, `\`\`\`✓Sukses Mengganti Deskripsi Group\`\`\` *${groupMetadata.subject}* Menjadi: *${body.slice(9)}*`, text, { quoted: ftrol })
break
case 'playstore':
                    if (args.length == 0) return reply(`Example: ${prefix + command} telegram`)
                    query = args.join(" ")
                    get_result = await fetchJson(`https://api.lolhuman.xyz/api/playstore?apikey=a2867eec5c98ea18db2ef5c9&query=${query}`)
                    get_result = get_result.result
                    ini_txt = 'Play Store Search : \n'
                    for (var x of get_result) {
                        ini_txt += `Name : ${x.title}\n`
                        ini_txt += `ID : ${x.appId}\n`
                        ini_txt += `Developer : ${x.developer}\n`
                        ini_txt += `Link : ${x.url}\n`
                        ini_txt += `Price : ${x.priceText}\n`
                        ini_txt += `Price : ${x.price}\n\n`
                    }
                    reply(ini_txt)
                    break
case 'setpp':
if (!isGroup) return reply(mess.only.group)
if (!isGroupAdmins) return reply(mess.only.admin)
if (!isBotGroupAdmins) return reply(mess.only.Badmin)
media = await zeroyt7.downloadAndSaveMediaMessage(mek, './database/media_user')
await zeroyt7.updateProfilePicture(from, media)
reply(mess.wait)
reply(`\`\`\`✓Sukses Mengganti Profil Group\`\`\` *${groupMetadata.subject}*`)
break
case 'play':
         
                  if (args.length === 0) return reply(`Kirim perintah *${prefix}play* _Judul lagu yang akan dicari_`)
         
                     var srch = args.join('')
                   aramas = await yts(srch);
                   aramat = aramas.all 
                     var mulaikah = aramat[0].url							
                           try {
                             yta(mulaikah)
                             .then((res) => {
                                 const { dl_link, thumb, title, filesizeF, filesize } = res
                                 axios.get(`https://tinyurl.com/api-create.php?url=${dl_link}`)
                                    
                                 .then(async (a) => {
                                 if (Number(filesize) >= 100000) return sendMediaURL(from, thumb, `.â€¢â™«â€¢â™¬â€¢ *PLAYING MUSIC* .â€¢â™«â€¢â™¬â€¢\n\nðŸ“œð™ð™žð™©ð™¡ð™š: ${title}\nðŸŽð™ð™®ð™¥ð™š : mp3\nð™ð™žð™¡ð™š ð™Žð™žð™¯ð™š : ${filesizeF}\nðŸ–‡ð™‡ð™žð™£ð™  ${a.data}\n\n_Untuk durasi lebih dari batas disajikan dalam mektuk link_`)
                                 const captions = `.â€¢â™«â€¢â™¬â€¢ *PLAYING MUSIC* .â€¢â™«â€¢â™¬â€¢\n\nðŸ“œð™ð™žð™©ð™¡ð™š: ${title}\nðŸŽð™ð™®ð™¥ð™š : mp3\nð™ð™žð™¡ð™š ð™Žð™žð™¯ð™š : ${filesizeF}\nðŸ–‡ð™‡ð™žð™£ð™  ${a.data}\n\n_Untuk durasi lebih dari batas disajikan dalam mektuk link_`
                                 sendMediaURL(from, thumb, captions)
                                 await sendMediaURL(from, dl_link).catch(() => reply('error'))
                                 })                
                                 })
                                 } catch (err) {
                                 reply(mess.error.api)
                                 }
                            break
case 'hidetag':
if (!isGroupAdmins) return reply(mess.only.admin)
if (!isGroup) return reply(mess.only.group)
var value = body.slice(9)
var group = await zeroyt7.groupMetadata(from)
var member = group['participants']
var mem = []
member.map(async adm => {
mem.push(adm.id.replace('c.us', 's.whatsapp.net'))
})
var options = {
text: value,
contextInfo: { mentionedJid: mem },
quoted: ftrol
}
zeroyt7.sendMessage(from, options, text)
break

//━━━━━━━━━━━━━━━[ FITUR STICKER ]━━━━━━━━━━━━━━━━━//

case 'attp':
if (args.length == 0) return reply(`Example: ${prefix + command} Hai`)
buffer = await getBuffer(`https://api.xteam.xyz/attp?file&text=${encodeURI(q)}`)
zeroyt7.sendMessage(from, buffer, sticker, { quoted: ftrol })
break
case 'sticker':
case 'stiker':
case 's':
if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
let encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
let media = await zeroyt7.downloadAndSaveMediaMessage(encmedia, './database/media_user')
ran = getRandom('.webp')
await ffmpeg(`./${media}`)
.input(media)
.on('start', function (cmd) {
console.log(`Started : ${cmd}`)
})
.on('error', function (err) {
console.log(`Error : ${err}`)
fs.unlinkSync(media)
reply(mess.error.stick)
})
.on('end', function () {
console.log('Finish')
buffer = fs.readFileSync(ran)
costum(buffer, sticker, Verived, `Done`)
fs.unlinkSync(media)
fs.unlinkSync(ran)
})
.addOutputOptions([`-vcodec`, `libwebp`, `-vf`, `scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
.toFormat('webp')
.save(ran)
} else if ((isMedia && mek.message.videoMessage.seconds < 11 || isQuotedVideo && mek.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.seconds < 11) && args.length == 0) {
let encmedia = isQuotedVideo ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
let media = await zeroyt7.downloadAndSaveMediaMessage(encmedia, './database/media_user')
ran = getRandom('.webp')
reply(mess.wait)
await ffmpeg(`./${media}`)
.inputFormat(media.split('.')[1])
.on('start', function (cmd) {
console.log(`Started : ${cmd}`)
})
.on('error', function (err) {
console.log(`Error : ${err}`)
fs.unlinkSync(media)
tipe = media.endsWith('.mp4') ? 'video' : 'gif'
reply(`❌ Gagal, pada saat mengkonversi ${tipe} ke stiker. pastikan untuk video yang dikirim tidak lebih dari 9 detik`)
})
.on('end', function () {
console.log('Finish')
costum(fs.readFileSync(ran), sticker, Verived, `~ Nih Dah Jadi Gif Stikernya`)
fs.unlinkSync(media)
fs.unlinkSync(ran)
})
.addOutputOptions([`-vcodec`, `libwebp`, `-vf`, `scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
.toFormat('webp')
.save(ran)
} else if ((isMedia || isQuotedImage) && args[0] == 'nobg') {
let encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
let media = await zeroyt7.downloadAndSaveMediaMessage(encmedia, './database/media_user')
ranw = getRandom('.webp')
ranp = getRandom('.png')
reply(mess.wait)
keyrmbg = 'bcAvZyjYAjKkp1cmK8ZgQvWH'
await removeBackgroundFromImageFile({ path: media, apiKey: keyrmbg, size: 'auto', type: 'auto', ranp }).then(res => {
fs.unlinkSync(media)
let buffer = Buffer.from(res.base64img, 'base64')
fs.writeFileSync(ranp, buffer, (err) => {
if (err) return reply('Gagal, Terjadi kesalahan, silahkan coba beberapa saat lagi.')
})
exec(`ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${ranw}`, (err) => {
fs.unlinkSync(ranp)
if (err) return reply(mess.error.stick)
zeroyt7.sendMessage(from, fs.readFileSync(ranw), sticker, { quoted: ftrol })
fs.unlinkSync(ranw)
})
})
} else {
reply(`Kirim gambar dengan caption ${prefix}sticker atau tag gambar yang sudah dikirim`)
}
break
case "truth":
  if (isBanned) return reply(mess.ban)
					// Fix Case By Yogi/Hansâ›”
                 
					const trut =['Pernah suka sama siapa aja? berapa lama?','Kalau boleh atau kalau mau, di gc/luar gc siapa yang akan kamu jadikan sahabat?(boleh beda/sma jenis)','apa ketakutan terbesar kamu?','pernah suka sama orang dan merasa orang itu suka sama kamu juga?','Siapa nama mantan pacar teman mu yang pernah kamu sukai diam diam?','pernah gak nyuri uang nyokap atau bokap? Alesanya?','hal yang bikin seneng pas lu lagi sedih apa','pernah cinta bertepuk sebelah tangan? kalo pernah sama siapa? rasanya gimana brou?','pernah jadi selingkuhan orang?','hal yang paling ditakutin','siapa orang yang paling berpengaruh kepada kehidupanmu','hal membanggakan apa yang kamu dapatkan di tahun ini','siapa orang yang bisa membuatmu sange','siapa orang yang pernah buatmu sange','(bgi yg muslim) pernah ga solat seharian?','Siapa yang paling mendekati tipe pasangan idealmu di sini','suka mabar(main bareng)sama siapa?','pernah nolak orang? alasannya kenapa?','Sebutkan kejadian yang bikin kamu sakit hati yang masih di inget','pencapaian yang udah didapet apa aja ditahun ini?','kebiasaan terburuk lo pas di sekolah apa?']
					const ttrth = trut[Math.floor(Math.random() * trut.length)]
					truteh = await getBuffer(`https://i.ibb.co/305yt26/bf84f20635dedd5dde31e7e5b6983ae9.jpg`)
					sendButMessage(from, ttrth, "Case By @iamghosky_\nmau lagi? tekan tombol di bawah", [
          {
            buttonId: `${prefix}truth`,
            buttonText: {
              displayText: `Truth`,
            },
            type: 1,
          },
         {
            buttonId: `${prefix}dare`,
            buttonText: {
              displayText: `Dare`,
            },
            type: 1,
          },

 ]);
					
					break
		case "dare":
		  if (isBanned) return reply(mess.ban)
					// Fix Case By Yogi/Hansâ›”
                 
					const dare =['Kirim pesan ke mantan kamu dan bilang "aku masih suka sama kamu','telfon crush/pacar sekarang dan ss ke pemain','pap ke salah satu anggota grup','Bilang "KAMU CANTIK BANGET NGGAK BOHONG" ke cowo','ss recent call whatsapp','drop emot "ðŸ¦„ðŸ’¨" setiap ngetik di gc/pc selama 1 hari','kirim voice note bilang can i call u baby?','drop kutipan lagu/quote, terus tag member yang cocok buat kutipan itu','pake foto sule sampe 3 hari','ketik pake bahasa daerah 24 jam','ganti nama menjadi "gue anak lucinta luna" selama 5 jam','chat ke kontak wa urutan sesuai %batre kamu, terus bilang ke dia "i lucky to hv you','prank chat mantan dan bilang " i love u, pgn balikan','record voice baca surah al-kautsar','bilang "i hv crush on you, mau jadi pacarku gak?" ke lawan jenis yang terakhir bgt kamu chat (serah di wa/tele), tunggu dia bales, kalo udah ss drop ke sini','sebutkan tipe pacar mu!','snap/post foto pacar/crush','teriak gajelas lalu kirim pake vn kesini','pap mukamu lalu kirim ke salah satu temanmu','kirim fotomu dengan caption, aku anak pungut','teriak pake kata kasar sambil vn trus kirim kesini','teriak " anjimm gabutt anjimmm " di depan rumah mu','ganti nama jadi " BOWO " selama 24 jam','Pura pura kerasukan, contoh : kerasukan maung, kerasukan belalang, kerasukan kulkas, dll']
					const der = dare[Math.floor(Math.random() * dare.length)]
					sya = await getBuffer(`https://i.ibb.co/305yt26/bf84f20635dedd5dde31e7e5b6983ae9.jpg`)
					sendButMessage(from, der, "Case By @iamghosky_\nmau lagi? tekan tombol di bawah", [
					  {
            buttonId: `${prefix}truth`,
            buttonText: {
              displayText: `Truth`,
            },
            type: 1,
          },
          {
            buttonId: `${prefix}dare`,
            buttonText: {
              displayText: `Dare`,
            },
            type: 1,
          },

 ]);
					break
case 'toimg':
if (!isQuotedSticker) return reply(' reply stickernya gan')
encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
media = await zeroyt7.downloadAndSaveMediaMessage(encmedia, './database/media_user')
ran = getRandom('.png')
exec(`ffmpeg -i ${media} ${ran}`, (err) => {
fs.unlinkSync(media)
if (err) return reply(' Gagal, pada saat mengkonversi sticker ke gambar ')
buffer = fs.readFileSync(ran)
costum(buffer, image, Verived, `𝘊𝘮?? 𝘌𝘹𝘦?? : 𝘵𝘰𝘪𝘮𝘨`)
fs.unlinkSync(ran)
})
break
case 'tomp3':
zeroyt7.updatePresence(from, Presence.recording)
if (!isQuotedVideo) return reply('Reply Video nya Tod')
reply(mess.wait)
encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
media = await zeroyt7.downloadAndSaveMediaMessage(encmedia, './database/media_user')
ran = getRandom('.mp4')
exec(`ffmpeg -i ${media} ${ran}`, (err) => {
fs.unlinkSync(media)
if (err) return reply('Gagal, pada saat mengkonversi video ke mp3')
bufferlkj = fs.readFileSync(ran)
zeroyt7.sendMessage(from, bufferlkj, audio, { mimetype: 'audio/mp4', quoted: ftrol })
fs.unlinkSync(ran)
})
break
case 'tovideo':
if (!isQuotedSticker) return reply('Reply stikernya')
reply(mess.wait)
anumedia = JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
anum = await zeroyt7.downloadAndSaveMediaMessage(anumedia, './database/media_user')
ran = getRandom('.webp')
exec(`ffmpeg -i ${anum} ${ran}`, (err) => {
fs.unlinkSync(anum)
buffer = fs.readFileSync(ran)
zeroyt7.sendMessage(from, buffer, video, { quoted: ftrol, caption: 'DONE! , JAN LUPA FOLLOW TIKTOK @imyourexhaha' })
fs.unlinkSync(ran)
})
break
case 'searchgc':   
            case 'grubwa':
            case 'grupwa':
            if (args.length < 1) return query("bts")
            nay2 = await fetchJson(`${restv4}/api/search-grup?q=${aq}&apikey=${apiv4}`)
            nay3 = 'GRUB WA\n'             
            for (let nyz of nay2.data) {
            nay3 += `${tz} *JUDUL* : ${nyz.judul}\n`
            nay3 += `${tz} *LINK* : ${nyz.link}\n\n`
            }
            reply(nay3)
            break  
case 'manga':
                    if (args.length == 0) return reply(`Example: ${prefix + command} Gotoubun No Hanayome`)
                    query = args.join(" ")
                    get_result = await fetchJson(`https://api.lolhuman.xyz/api/manga?apikey=a2867eec5c98ea18db2ef5c9&query=${query}`)
                    get_result = get_result.result
                    ini_txt = `Id : ${get_result.id}\n`
                    ini_txt += `Id MAL : ${get_result.idMal}\n`
                    ini_txt += `Title : ${get_result.title.romaji}\n`
                    ini_txt += `English : ${get_result.title.english}\n`
                    ini_txt += `Native : ${get_result.title.native}\n`
                    ini_txt += `Format : ${get_result.format}\n`
                    ini_txt += `Chapters : ${get_result.chapters}\n`
                    ini_txt += `Volume : ${get_result.volumes}\n`
                    ini_txt += `Status : ${get_result.status}\n`
                    ini_txt += `Source : ${get_result.source}\n`
                    ini_txt += `Start Date : ${get_result.startDate.day} - ${get_result.startDate.month} - ${get_result.startDate.year}\n`
                    ini_txt += `End Date : ${get_result.endDate.day} - ${get_result.endDate.month} - ${get_result.endDate.year}\n`
                    ini_txt += `Genre : ${get_result.genres.join(", ")}\n`
                    ini_txt += `Synonyms : ${get_result.synonyms.join(", ")}\n`
                    ini_txt += `Score : ${get_result.averageScore}%\n`
                    ini_txt += `Characters : \n`
                    ini_character = get_result.characters.nodes
                    for (var x of ini_character) {
                        ini_txt += `- ${x.name.full} (${x.name.native})\n`
                    }
                    ini_txt += `\nDescription : ${get_result.description}`
                    thumbnail = await getBuffer(get_result.coverImage.large)
                    await zeroyt7.sendMessage(from, thumbnail, image, { quoted: flexx, caption: ini_txt })
                    break

//━━━━━━━━━━━━━━━[ FITUR OWNER ]━━━━━━━━━━━━━━━━━//

case 'owner':
let inilist = []
for (let i of ownerNumber) {
let vname = zeroyt7.contacts[i] != undefined ? zeroyt7.contacts[i].vname || zeroyt7.contacts[i].notify : undefined
inilist.push({
"displayName": 'F4-XyZ',
"vcard": 'BEGIN:VCARD\n'
+ 'VERSION:3.0\n'
+ `FN:${ownername}\n`
+ `ORG:Creator F4-X ;\n`
+ `TEL;type=CELL;type=VOICE;waid=${owner}:${owner}\n`
+ 'END:VCARD'.trim()
})
}
hehe = await zeroyt7.sendMessage(from, {
"displayName": `${inilist.length} kontak`,
"contacts": inilist 
}, 'contactsArrayMessage', { quoted: ftrol })
button = [
  {buttonId: '.youtube', buttonText: {displayText: '☰ GitHub'}, type: 1},
  {buttonId: '.tiktok', buttonText: {displayText: '☰ TIKTOK'}, type: 1}
]
 buttons = {
    contentText: 'Nih Nomer Owner Ku Mau Tau Tentang Apa Ya ?',
    footerText: faketeks,
    buttons: button,
    headerType: 1
}
await zeroyt7.sendMessage(from, buttons, MessageType.buttonsMessage, {quoted: ftrol})
break
case 'bc':
case 'allbc':
case 'lolkey':
if (!isOwner) return reply('LU BUKAN OWNER GBLOK')
if (args.length < 1) return reply('Teksnya?')
anu = await zeroyt7.chats.all()
for (let _ of anu) {
buttonss = [{buttonId: `${prefix}allmenu`, buttonText: {displayText: '☰ ALLMENU'}, type: 1},{buttonId: `${prefix}donate`, buttonText: {displayText: '☰ SEDEKAH'}, type: 1}]
const btnbc = {
contentText: `${q}`,
footerText: '*[ ❗ ]* 𝘽𝙍𝙊𝘼𝘿𝘾𝘼𝙎𝙏 𝘽𝙊𝙏',
buttons: buttonss,
headerType: 1
}
await zeroyt7.sendMessage(_.jid, btnbc, MessageType.buttonsMessage, {quoted: ftrol})
}
reply(`Sukses mengirim Broadcast:\n${q}`)
break
case 'grupct':
case 'grupchat':
case 'linkgc':
inilink = `https://chat.whatsapp.com/C7jSCBKUkWu2fsppAUxTyR`
xyz = 
`Liat Doang Apa Mau Join? `
but = [
          { buttonId: `${prefix}fakebutton`, buttonText: { displayText: '☰ Iye Bang Join Iyee' }, type: 1 }
        ]
        sendButLocation(from, inilink, xyz, but)
break
case 'vietnam':
case 'korea':
case 'china':
case 'indonesia':
case 'malaysia':
case 'japan':
case 'thailand':
reply(mess.wait)
ini_result = await fetchJson(`https://zeroyt7-api.herokuapp.com/api/cewe/vietnam?apikey=ZeroYT7`)
get_result = ini_result.result
ini_img = await getBuffer(get_result.url)
zeroyt7.sendMessage(from, ini_img, image, {quoted:ftrol})
break
case 'asmaulhusna':
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/asmaulhusna?apikey=KemolX7`)
                    get_result = get_result.result
                    ini_txt = `No : ${get_result.index}\n`
                    ini_txt += `Latin: ${get_result.latin}\n`
                    ini_txt += `Arab : ${get_result.ar}\n`
                    ini_txt += `Indonesia : ${get_result.id}\n`
                    ini_txt += `English : ${get_result.en}`
                    reply(ini_txt)
                    break
case 'report':
let pesan = body.slice(8)
if (pesan.length > 300) return pras.sendMessage(from, 'Maaf Teks Terlalu Panjang, Maksimal 300 Teks', text, { quoted: ftrol })
var nomor = mek.participant
let teks1 = `*[REPORT]*\nNomor : @${nomor.split("@s.whatsapp.net")[0]}\nPesan : ${pesan}`
var options = {
text: teks1,
contextInfo: { mentionedJid: [nomor] },
}
zeroyt7.sendMessage(`6288239440253@s.whatsapp.net`, options, text, { quoted: ftrol })
reply('Masalah Telah Di Laporkan Ke Owner BOT, Mohon Tunggu Untuk Proses Perbaikan')
break
case 'request':
let chat = body.slice(8)
if (chat.length > 300) return pras.sendMessage(from, 'Maaf Teks Terlalu Panjang, Maksimal 300 Teks', text, { quoted: ftrol })
var nomor = mek.participant
let reqq = `*[REQUEST FITUR]*\nNomor : @${nomor.split("@s.whatsapp.net")[0]}\nPesan : ${chat}`
var options = {
text: reqq1,
contextInfo: { mentionedJid: [nomor] },
}
zeroyt7.sendMessage(`6288239440253@s.whatsapp.net`, options, reqq, { quoted: ftrol })
reply('Succes! Jika Request Melalui Button Itu Cuma Petunjuk. contoh ${prefix}request funmenu')
break
case 'youtube':
teks =
`Github.com/FajarXCbot`
zeroyt7.sendMessage(from, teks, text, {quoted: ftrol})
break
case 'instagram':
teks =
`Nih Instagram Owner Ku Jangan Lupa Di Follow Ya https://instagram.com/tektok_reall`
zeroyt7.sendMessage(from, teks, text, {quoted: ftrol})
break
case 'nsfw':
	        if (!isGroup) return reply(mess.only.group)
			if (!isOwner && !isGroupAdmins) return reply(mess.only.admin)
					if (args.length < 1) return reply(`untuk mengaktifkan ketik : ${prefix}nsfw 1`)
					if (Number(args[0]) === 1) {
						if (isNsfw) return reply('Sudah Aktif Kak')
						nsfww.push(from)
						fs.writeFileSync('./database/nsfww.json', JSON.stringify(nsfww))
						reply('Sukses mengaktifkan fitur nsfw')
						zeroyt7.sendMessage(from, `Bebas Nyari Hentai :v`, text)
					} else if (Number(args[0]) === 0) {
						if (!isNsfw) return reply('Sudah Mati Kak')
						var ini = nsfww.indexOf(from)
						nsfww.splice(ini, 1)
						fs.writeFileSync('./database/nsfww.json', JSON.stringify(nsfww))
						reply('Sukses menonaktifkan fitur nsfw')
					} else {
						reply('1 untuk mengaktifkan, 0 untuk mematikan')
					}
					break
case 'grup':
  case 'gc' :
  if (!isGroup) return reply(mess.only.group)
if (!isGroupAdmins) return reply(mess.only.admin)
     if (!isBotGroupAdmins) return reply(mess.only.Badmin)
const opclose = `*Halo Admin ${pushname} ðŸ‘‹ðŸ»*\n
Di Pilh yah, Grupnya Mau di Tutup Atau Buka?`
gbutsan = [
{buttonId:`opengc`,buttonText:{displayText:'OPEN'},type:1},
{buttonId:`closegc`,buttonText:{displayText:'CLOSE'},type:1},
]
mhan = await zeroyt7.prepareMessage(from, ofrply, image, {thumbnail: ofrply})
const sendBtnclose = {
imageMessage: mhan.message.imageMessage,
contentText:`${opclose}`,
footerText:'F4-FajarKyoo Â© 2021', 
buttons: gbutsan,
headerType: 4
}
zeroyt7.sendMessage(from, sendBtnclose, MessageType.buttonsMessage, {quoted:ftrol, contextInfo: { mentionedJid: [sender]}})
        break
					case 'opengc':
					  case 'opengroup':
						    case 'opengrup':
						      case 'grupopen':
						 case 'open group':
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
                   if (!isBotGroupAdmins) return reply(mess.only.Badmin)
                   reply(`Sukses membuka grup ${groupName}`)
						zeroyt7.groupSettingChange(from, GroupSettingChange.messageSend, false)
						break
						case 'closegc':
						  case 'closegroup':
						    case 'closegrup':
						      case 'grupclose':
				 case 'close group':
						if (!isGroup) return reply(mess.only.group)
						if (!isGroupAdmins) return reply(mess.only.admin)
                   if (!isBotGroupAdmins) return reply(mess.only.Badmin)
						reply(`Sukses menutup grup ${groupName}`)
						zeroyt7.groupSettingChange(from, GroupSettingChange.messageSend, true)
					break
case 'tiktok':
teks =
`https://tiktok.com/@imyourexhaha`
zeroyt7.sendMessage(from, teks, text, {quoted: ftrol})
break
case 'sc':
case 'script':
case 'ngemis':
case 'source code':
img = fs.readFileSync('./zeroyt7/sc.jpg')
esce = `╭─⬣「 Script 」⬣
  github.com/FajarXCbot
└⬣`
ngemis =
`Itu Cuma Base Bot Bukan Sc Nya`
but = [
          { buttonId: `${prefix}menu`, buttonText: { displayText: '☰</Back To Menu' }, type: 1 },
        ]
        sendButLocation(from, esce, ngemis, img, but)
break
//━━━━━━━━━━━━━━━[ INFO BOT ]━━━━━━━━━━━━━━━━━//

case "speed":
case "ping":
timestamp = speed();
latensi = speed() - timestamp;
exec(`neofetch --stdout`, (error, stdout, stderr) => {
child = stdout.toString("utf-8");
ssd = child.replace(/Memory:/, "Ram:");
pingnya = `*${ssd}Speed: ${latensi.toFixed(4)} Second*`;
reply(pingnya);
});
break
case "runtime":
case "test":
run = process.uptime();
teks = `${kyun(run)}`;
reply(teks);
break
default:
if (isOwner) {
			if (budy.startsWith('>')) {
				console.log(color('[EVAL1]'), color(moment(mek.messageTimestamp * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`eval return`))
				try {
					let evaled = await eval(budy.slice(2))
					if (typeof evaled !== 'string') evaled = require('util').inspect(evaled)
					reply(`${evaled}`)
				} catch (err) {
					reply(`${err}`)
				}
			} else if (budy.startsWith('x')) {
				console.log(color('[EVAL2]'), color(moment(mek.messageTimestamp * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`eval identy`))
				try {
					return zeroyt7.sendMessage(from, JSON.stringify(eval(budy.slice(2)), null, '\t'), text, { quoted: ftrol })
				} catch (err) {
					e = String(err)
					reply(e)
				}
			}
		}
		}
	} catch (e) {
    e = String(e)
    if (!e.includes("this.isZero") && !e.includes("jid")) {
	console.log('Error : %s', color(e, 'red'))
        }
	// console.log(e)
	}
}
