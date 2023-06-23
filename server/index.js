require('dotenv').config()
const express = require('express')
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const sequelize = require('./db')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const path = require('path')

const PORT = process.env.PORT || 5000

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api', router)

// Обработка ошибок, последний Middleware
app.use(errorHandler)

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/api/mail', (req, res) => {
    const { name, phone, transport, startDate, endDate, rentalPeriod, additionalServicesPrice, rentalPrice } = req.body;

    // Создайте тело письма
    const emailBody = `
    Новая заявка на аренду легкового авто:
    Имя: ${name}
    Телефон: + ${phone}
    Выбранный транспорт: ${transport} 
    Срок аренды: ${rentalPeriod} 
    ОТ: ${startDate} 
    ДО: ${endDate}   
    Цена дополнительных услуг: ${additionalServicesPrice} ₽
    Цена аренды: ${rentalPrice} ₽
  `;

    // Настройте параметры отправки письма
    const transporter = nodemailer.createTransport({
        // Настройте свои параметры SMTP
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'ozella89@ethereal.email',
            pass: 'tyA6ZfkZ13uTFJr6JH'
        }
    });

    const mailOptions = {
        from: 'ozella89@ethereal.email',
        to: 'sergey.kazancev@bk.ru',
        subject: 'Новая заявка на аренду легкового авто',
        text: emailBody
    };

    // Отправьте письмо
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Ошибка при отправке письма:', error);
            res.status(500).send('Произошла ошибка при отправке письма.');
        } else {
            console.log('Письмо успешно отправлено:', info.response);
            res.status(200).send('Письмо успешно отправлено.');
        }
    });
});
app.post('/api/mailTruck', (req, res) => {
    const { name, phone, transport } = req.body;

    // Создайте тело письма
    const emailBody = `
    Новая заявка на услуги грузовых:
    Имя: ${name}
    Телефон: + ${phone} 
    Выбранный транспорт: ${transport} 
  `;

    // Настройте параметры отправки письма
    const transporter = nodemailer.createTransport({
        // Настройте свои параметры SMTP
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'ozella89@ethereal.email',
            pass: 'tyA6ZfkZ13uTFJr6JH'
        }
    });

    const mailOptions = {
        from: 'ozella89@ethereal.email',
        to: 'sergey.kazancev@bk.ru',
        subject: 'Новая заявка на услуги грузовых',
        text: emailBody
    };

    // Отправьте письмо
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Ошибка при отправке письма:', error);
            res.status(500).send('Произошла ошибка при отправке письма.');
        } else {
            console.log('Письмо успешно отправлено:', info.response);
            res.status(200).send('Письмо успешно отправлено.');
        }
    });
});

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}


start()