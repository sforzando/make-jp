# -*- coding: utf-8 -*-

from collections import OrderedDict
from datetime import datetime
import urllib
import urllib2

from flask import current_app, Blueprint, render_template, request
from google.appengine.api import taskqueue
import sendgrid
from sendgrid.helpers.mail import *

from utilities import timezone

blueprint = Blueprint("survey", __name__)


@blueprint.route("/survey", methods=["GET", "POST"])
def survey():
    current_app.logger.info("/survey(" + request.method + ")")
    now = datetime.now(timezone.JstTzInfo())
    if request.method == "GET":
        return render_template("survey.html")
    else:
        """
        request.form -> Werkzeug/MultiDict
        """
        ordered_dict = OrderedDict()

        for key, value in sorted(request.form.items()):
            current_app.logger.info(
                "Request Forms: %s (%s) -> %s (%s)" % (key, type(key), str(value), type(value)))

        ordered_dict["1-01. 出展者ID"] = request.form.get(
            '_101_makers_id', type=str)
        ordered_dict["1-02. 出展者名"] = request.form.get(
            '_102_makers_name', type=str)
        ordered_dict["1-03. 代表者名（姓）"] = request.form.get(
            '_103_primary_lastname', type=str)
        ordered_dict["1-04. 代表者名（名）"] = request.form.get(
            '_104_primary_firstname', type=str)
        ordered_dict["1-05. 代表者のメールアドレス"] = request.form.get(
            '_105_email', type=str)
        ordered_dict["2-01. 会場に持ち込む作品と機材"] = request.form.get(
            '_201_equipments', type=str)
        if request.form.get('_202_dangerous') == "YES":
            ordered_dict["2-02. 東京都火災予防条例上の危険物に該当する物品の持ち込み予定"] = "有り"
        else:
            ordered_dict["2-02. 東京都火災予防条例上の危険物に該当する物品の持ち込み予定"] = "無し"
        loading = []
        if "hand" in request.form.getlist('_301_loading[]'):
            loading.append("手持ち")
        if "car" in request.form.getlist('_301_loading[]'):
            loading.append("自動車")
        if "yamato" in request.form.getlist('_301_loading[]'):
            loading.append("宅配便（ヤマト宅急便を予定）")
        if "sagawa" in request.form.getlist('_301_loading[]'):
            loading.append("宅配便（佐川急便を予定）")
        ordered_dict["3-01. 搬入方法"] = "、".join(loading)
        ordered_dict["3-02. 搬入日"] = "、".join(
            request.form.getlist("_302_loading_day[]", type=str))
        unloading = []
        if "hand" in request.form.getlist('_303_unloading[]'):
            unloading.append("手持ち")
        if "car" in request.form.getlist('_303_unloading[]'):
            unloading.append("自動車")
        if "yamato" in request.form.getlist('_303_unloading[]'):
            unloading.append("宅配便（ヤマト宅急便を予定）")
        if "sagawa" in request.form.getlist('_303_unloading[]'):
            unloading.append("宅配便（佐川急便を予定）")
        ordered_dict["3-03. 搬出方法"] = "、".join(unloading)
        ordered_dict["3-04-a. 車種、色（自動車の場合）"] = request.form.get(
            "_304a_car_type", type=str)
        ordered_dict["3-04-b. 車両番号（ナンバー、自動車の場合）"] = request.form.get(
            "_304b_car_number", type=str)
        ordered_dict["3-04-c. 運転者氏名（自動車の場合）"] = request.form.get(
            "_304c_car_driver", type=str)
        ordered_dict["3-04-d. 運転者携帯電話番号（自動車の場合）"] = request.form.get(
            "_304d_car_telephone", type=str)
        ordered_dict["送信日時"] = now.strftime(u"%Y/%m/%d %H:%M:%S")

        for key, value in ordered_dict.items():
            current_app.logger.info(
                "ordered_dict: %s (%s) -> %s (%s)" % (key, type(key), str(value), type(value)))

        task_store = taskqueue.add(url="/survey/store", params=ordered_dict,
                                   name="survey-store-" + now.strftime(u"%Y%m%d%H%M%S"))
        current_app.logger.info(task_store.name + " was enqueued.")

        task_send = taskqueue.add(url="/survey/send", params=ordered_dict,
                                  name="survey-send-" + now.strftime(u"%Y%m%d%H%M%S"))
        current_app.logger.info(task_send.name + " was enqueued.")

        return render_template("thanks.html", ref="survey")


@blueprint.route("/survey/store", methods=["POST"])
def store():
    url = "https://script.google.com/macros/s/AKfycbxJI4_rD_2f1FAsaBcG6yKu9vkqNpCbhb2Pob2BGZChA0VPDEUO/exec"

    data = urllib.urlencode(request.form)
    req = urllib2.Request(url, data)
    res = urllib2.urlopen(req)
    current_app.logger.info(
        "survey's spreadsheet doPost() response: " + res.read())

    return "Successfully stored to spreadsheet!"


@blueprint.route("/survey/send", methods=["POST"])
def send():
    sg = sendgrid.SendGridAPIClient(
        apikey=current_app.config["SENDGRID_API_KEY"])

    entries = ""
    for key, value in sorted(request.form.to_dict().items()):
        entries += "{}:\n{}\n\n".format(key, value)

    year = current_app.config["YEAR"]
    exhibitor_name = request.form.get(u"1-02. 出展者名", type=str)
    from_email = Email(current_app.config["FROM_MAILADDRESS"])
    subject = "[MFT{year}] 出展内容調査 受付確認 ({exhibitor_name} 様)".format(
        year=year, exhibitor_name=exhibitor_name)
    to_email = Email(request.form.get(u"1-05. 代表者のメールアドレス", type=str))
    category = Category("survey")

    entries = ""
    for key, value in sorted(request.form.to_dict().items()):
        entries += "{}:\n{}\n\n".format(key, value)

    body = """
{exhibitor_name}様

この度は、Maker Faire Tokyo {year} 出展内容調査シートをご提出いただき、
ありがとうございました。下記の内容で承りました。

「危険物」に当てはまる物品を持ち込む方は「危険物申請書」「展示レイアウト図」の提出も必要です。
「Maker Toolkit（出展者向け情報ページ）」より書式のダウンロードをお願いいいたします。

Maker Toolkit（出展者向け情報ページ）
http://makezine.jp/event/mft2017/makers/
パスワード:mft2017makers

ご不明な点は事務局までメールにてお問い合わせください。
どうぞよろしくお願いいたします。

---
Maker Faire Tokyo 事務局（makers@makejapan.org）

------
［申込内容]
{entries}
------
以上""".format(exhibitor_name=exhibitor_name, year=year, entries=entries)

    content = Content("text/plain", body)
    mail = Mail(from_email, subject, to_email, content)
    mail.personalizations[0].add_cc(
        Email(current_app.config["CC_MAILADDRESS"]))
    mail.add_category(category)

    mg = mail.get()
    current_app.logger.info(mg)

    res = sg.client.mail.send.post(request_body=mg)
    if res.status_code != 202:
        return "An error occurred: {}".format(res.body), 500
    else:
        current_app.logger.info(res.headers)
        current_app.logger.info("Response Body: " + res.body)
        return "Successfully sent email!", 200
