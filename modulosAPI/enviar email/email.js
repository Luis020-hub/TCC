const nodemailer = require('nodemailer')

let nome = 'gabriel'
let email = 'gabrielinboxpx@gmail.com';


let transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
    secure: false,
    auth: {
        user: "safedeliverytcc@outlook.com",
        pass: "safe1234@"
    }
});



transporter.sendMail({
    from: "Safe Delivery <safedeliverytcc@outlook.com>",
    to: `${email}`,
    subject: "Status do Pedido!!",
    text: `Ola Sr(a) ${nome}, seu pedido foi enviado com sucesso e esta em preparo!!`
}).then(message=>{
    console.log('Pedido enviado para Preparo!')
}).catch(err =>{
    console.log('Erro ao finalizar pedido');
})