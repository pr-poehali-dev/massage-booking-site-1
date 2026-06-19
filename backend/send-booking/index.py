import json
import os
import urllib.request

OWNER_CHAT_ID = "8713101042"


def send_telegram(token: str, chat_id: str, text: str):
    url = f"https://api.telegram.org/bot{token}/sendMessage"
    data = json.dumps({"chat_id": chat_id, "text": text, "parse_mode": "HTML"}).encode()
    req = urllib.request.Request(url, data=data, headers={"Content-Type": "application/json"})
    urllib.request.urlopen(req, timeout=10)


def handler(event: dict, context) -> dict:
    """Отправка уведомления о новой заявке в Telegram."""

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

    token = os.environ.get('TELEGRAM_BOT_TOKEN', '')

    message = (
        f"📋 <b>Новая заявка с сайта!</b>\n\n"
        f"👤 <b>Имя:</b> {name}\n"
        f"📞 <b>Телефон:</b> {phone}\n"
        f"💆 <b>Услуга:</b> {service or 'не указана'}\n"
        f"🕐 <b>Время:</b> {time or 'не указано'}"
    )

    send_telegram(token, OWNER_CHAT_ID, message)

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'ok': True})
    }
