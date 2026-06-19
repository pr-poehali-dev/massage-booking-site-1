import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

OWNER_EMAIL = "egmalakhov@mail.ru"
SMTP_HOST = "smtp.mail.ru"
SMTP_PORT = 465


def handler(event: dict, context) -> dict:
    """Отправка уведомления о новой заявке на email владельца."""

    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400',
            },
            'body': ''
        }

    body = json.loads(event.get('body') or '{}')
    name = body.get('name', '').strip()
    phone = body.get('phone', '').strip()
    service = body.get('service', '').strip()
    time = body.get('time', '').strip()

    if not name or not phone:
        return {
            'statusCode': 400,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Имя и телефон обязательны'}, ensure_ascii=False)
        }

    smtp_password = os.environ.get('SMTP_PASSWORD', '')

    subject = f"Новая заявка от {name}"
    html_body = f"""
    <div style="font-family: Arial, sans-serif; max-width: 500px;">
      <h2 style="color: #c9a96e;">Новая заявка с сайта</h2>
      <table style="width:100%; border-collapse:collapse;">
        <tr><td style="padding:8px; color:#888;">Имя:</td><td style="padding:8px; font-weight:bold;">{name}</td></tr>
        <tr style="background:#f9f9f9;"><td style="padding:8px; color:#888;">Телефон:</td><td style="padding:8px; font-weight:bold;"><a href="tel:{phone}">{phone}</a></td></tr>
        <tr><td style="padding:8px; color:#888;">Услуга:</td><td style="padding:8px;">{service or 'не указана'}</td></tr>
        <tr style="background:#f9f9f9;"><td style="padding:8px; color:#888;">Время:</td><td style="padding:8px;">{time or 'не указано'}</td></tr>
      </table>
      <p style="margin-top:20px; color:#888; font-size:12px;">Сайт Евгений Массаж</p>
    </div>
    """

    msg = MIMEMultipart('alternative')
    msg['Subject'] = subject
    msg['From'] = OWNER_EMAIL
    msg['To'] = OWNER_EMAIL
    msg.attach(MIMEText(html_body, 'html', 'utf-8'))

    with smtplib.SMTP_SSL(SMTP_HOST, SMTP_PORT) as server:
        server.login(OWNER_EMAIL, smtp_password)
        server.sendmail(OWNER_EMAIL, OWNER_EMAIL, msg.as_string())

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'ok': True})
    }