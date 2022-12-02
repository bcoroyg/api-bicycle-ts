import nodemailer from 'nodemailer';
import juice from 'juice';
import pug from 'pug';
import { convert } from 'html-to-text';
import config from '../../config';

let mailConfig = {};
if (process.env.NODE_ENV === 'production') {
  mailConfig = {
    host: config.mailHost,
    port: Number(config.mailPort),
    secure: true,
    auth: {
      user: config.mailUser,
      pass: config.mailPassword,
    },
  };
} else {
  mailConfig = {
    host: config.mailHost,
    port: Number(config.mailPort),
    auth: {
      user: config.mailUser,
      pass: config.mailPassword,
    },
  };
}

const generateHTML = (file: string, options = {}) => {
  const html = pug.renderFile(`${__dirname}/views/${file}.pug`, options);
  return juice(html);
};

export const sendMail = async (options: any) => {
    const transporter = nodemailer.createTransport(mailConfig);
    //Utilizar template
    const html = generateHTML(options.file, options);
    const text = convert(html);
    //Configurar las opciones del correo
    const optionsEmail = {
      from: `${options.subject} <${options.from}>`,
      to: options.to,
      subject: options.subject,
      text,
      html,
    };
    //Enviar el correo
    return transporter.sendMail(optionsEmail);
};
