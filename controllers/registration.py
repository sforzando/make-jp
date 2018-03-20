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

blueprint = Blueprint("registration", __name__)


@blueprint.route("/registration", methods=["GET", "POST"])
def registration():
    current_app.logger.info("/registration(" + request.method + ")")
    now = datetime.now(timezone.JstTzInfo())
    if request.method == "GET":
        return render_template("registration.html", prefectures=current_app.config["PREFECTURES"], categories=current_app.config["CATEGORIES"], watt=current_app.config["WATT"])
    else:
        """
        request.form -> Werkzeug/MultiDict
        """
        ordered_dict = OrderedDict()

        for key, value in sorted(request.form.items()):
            current_app.logger.info(
                "request_form: %s (%s) -> %s (%s)" % (key, type(key), str(value), type(value)))

        ordered_dict["1-01. 出展者名"] = request.form.get(
            "_101_makers_name", type=str)
        ordered_dict["1-02. 出展者名ふりがな"] = request.form.get(
            "_102_makers_name_phonetic", type=str)
        ordered_dict["1-03. 出展者名の英文表記"] = request.form.get(
            "_103_makers_english_name", default="", type=str)
        ordered_dict["1-04. 代表者名（姓）"] = request.form.get(
            "_104_primary_lastname", type=str)
        ordered_dict["1-05. 代表者名（名）"] = request.form.get(
            "_105_primary_firstname", type=str)
        ordered_dict["1-06. 代表者名（姓）ふりがな"] = request.form.get(
            "_106_primary_lastname_phonetic", type=str)
        ordered_dict["1-07. 代表者名（名）ふりがな"] = request.form.get(
            "_107_primary_firstname_phonetic", type=str)
        ordered_dict["1-08. 代表者のメールアドレス"] = request.form.get(
            "_108_email", type=str)
        # ordered_dict["1-09. 代表者のメールアドレス（確認）"] = request.form.get("_109_email_confirm", type=str)
        ordered_dict["1-10. 代表者の携帯電話番号"] = request.form.get(
            "_110_primary_phone", type=str)
        ordered_dict["1-11. 代表者の住所（郵便番号）"] = request.form.get(
            "_111_zip", type=str)
        ordered_dict["1-12. 代表者の住所（都道府県）"] = current_app.config["PREFECTURES"][request.form.get(
            "_112_prefectures", type=int)]
        ordered_dict["1-13. 代表者の住所（市区町村・番地・建物名・部屋番号・社名）"] = request.form.get(
            "_113_address", type=str)
        ordered_dict["1-14. 出展者のプロフィール"] = request.form.get(
            "_114_maker_bio", type=str)
        if request.form.get("_115_class") == "_115_class_maker":
            _115_class = "Maker"
        elif request.form.get("_115_class") == "_115_class_commercial_maker":
            _115_class = "Commercial Maker"
        else:
            _115_class = "企業出展"
        ordered_dict["1-15. 出展区分"] = _115_class
        ordered_dict["1-16. 出展者タグの枚数"] = request.form.get(
            "_116_tags", type=str) + "枚"
        ordered_dict["2-01. 作品またはプロジェクトの名称"] = request.form.get(
            "_201_project_name", type=str)
        ordered_dict["2-02. 作品またはプロジェクトの名称の英文表記"] = request.form.get(
            "_202_project_english_name", default="", type=str)
        ordered_dict["2-03. 出展内容の紹介"] = request.form.get(
            "_203_project_describe", type=str)
        ordered_dict["2-04-a. ウェブサイトのURL（1）"] = request.form.get(
            "_204_web1", default="", type=str)
        ordered_dict["2-04-b. ウェブサイトのURL（2）"] = request.form.get(
            "_204_web2", default="", type=str)
        ordered_dict["2-05. Twitterアカウント"] = request.form.get(
            "_205_twitter", default="", type=str)
        ordered_dict["2-06-a. 出展カテゴリー（第1希望）"] = current_app.config["CATEGORIES"][request.form.get(
            "_206_category1")]
        ordered_dict["2-06-b. 出展カテゴリー（第2希望）"] = current_app.config["CATEGORIES"][request.form.get(
            "_206_category2")]
        ordered_dict["2-07-a. 写真のURL（1）"] = request.form.get(
            "_207_photo1", default="", type=str)
        ordered_dict["2-07-b. 写真のURL（2）"] = request.form.get(
            "_207_photo2", default="", type=str)
        ordered_dict["2-07-c. 写真のURL（3）"] = request.form.get(
            "_207_photo3", default="", type=str)
        ordered_dict["2-07-d. 動画のURL（1）"] = request.form.get(
            "_207_movie1", default="", type=str)
        ordered_dict["2-07-e. 動画のURL（2）"] = request.form.get(
            "_207_movie2", default="", type=str)
        ordered_dict["2-07-f. 動画のURL（3）"] = request.form.get(
            "_207_movie3", default="", type=str)
        ordered_dict["2-08-a. 作品"] = request.form.get(
            "_208_products", type=str)
        ordered_dict["2-08-b. 機材・配布物"] = request.form.get(
            "_208_equipments", type=str)
        ordered_dict["2-09. 必要な電源容量（W数）"] = current_app.config["WATT"][request.form.get(
            "_209_watt", type=int)]
        if request.form.get("_301_space") == "2100x2100":
            ordered_dict["3-01. スペース"] = "2100mm * 2100mm"
        elif request.form.get("_301_space") == "2100x4200":
            ordered_dict["3-01. スペース"] = "2100mm * 4200mm"
        elif request.form.get("_301_space") == "4200x4200":
            ordered_dict["3-01. スペース"] = "4200mm * 4200mm"
        else:
            ordered_dict["3-01. スペース"] = ""
        ordered_dict["3-02. テーブルの数"] = request.form.get(
            "_302_table", default="0", type=str)
        ordered_dict["3-03. 椅子の数"] = request.form.get(
            "_303_chair", default="0", type=str)
        if request.form.get("_304_sound", type=str) == "1":
            ordered_dict["3-04. 展示の音量のめやす"] = "特に音が出る展示は予定していない"
        elif request.form.get("_304_sound", type=str) == "2":
            ordered_dict["3-04. 展示の音量のめやす"] = "デモを行う際に音がする展示"
        elif request.form.get("_304_sound", type=str) == "3":
            ordered_dict["3-04. 展示の音量のめやす"] = "デモを行う際に大音量を流す展示"
        else:
            ordered_dict["3-04. 展示の音量のめやす"] = ""
        if request.form.get("_305_handson"):
            ordered_dict["3-05. ハンズオン（ミニワークショップ）用テーブル"] = "希望する"
        else:
            ordered_dict["3-05. ハンズオン（ミニワークショップ）用テーブル"] = "希望しない"
        ordered_dict["3-06. ハンズオンのタイトル"] = request.form.get(
            "_306_handson_title", default="", type=str)
        ordered_dict["3-07. ハンズオンの内容"] = request.form.get(
            "_307_handson_describe", default="", type=str)
        ordered_dict["3-08. ハンズオンの参加料"] = request.form.get(
            "_308_handson_charge", default="", type=str)
        if request.form.get("_309_dark"):
            ordered_dict["3-09. 暗いスペース"] = "希望する"
        else:
            ordered_dict["3-09. 暗いスペース"] = "希望しない"
        ordered_dict["3-10. その他、スペースについて"] = request.form.get(
            "_310_space_special_requests", default="", type=str)
        ordered_dict["3-11. 近くで出展したい他の出展者（最大2組まで）"] = request.form.get(
            "_311_space_collaborators", default="", type=str)
        if request.form.get("_401_presentation"):
            ordered_dict["4-01. プレゼンテーション"] = "希望する"
        else:
            ordered_dict["4-01. プレゼンテーション"] = "希望しない"
        ordered_dict["4-02. プレゼンテーションのタイトル"] = request.form.get(
            "_402_presentation_title", default="", type=str)
        ordered_dict["4-03. プレゼンテーションの内容"] = request.form.get(
            "_403_presentation_describe", default="", type=str)
        if request.form.get("_404_workshop"):
            ordered_dict["4-04. ワークショップ"] = "希望する"
        else:
            ordered_dict["4-04. ワークショップ"] = "希望しない"
        ordered_dict["4-05. ワークショップのタイトル"] = request.form.get(
            "_405_workshop_title", default="", type=str)
        ordered_dict["4-06. ワークショップの内容"] = request.form.get(
            "_406_workshop_describe", default="", type=str)
        ordered_dict["4-07. ワークショップの回数"] = request.form.get(
            "_407_workshop_times", default="", type=str) + "回"
        ordered_dict["4-08. ワークショップの時間"] = request.form.get(
            "_408_workshop_time", default="", type=str) + "分"
        ordered_dict["4-09. ワークショップの参加人数"] = request.form.get(
            "_409_workshop_attendees", default="", type=str) + "人"
        ordered_dict["4-10. ワークショップの参加料"] = request.form.get(
            "_410_workshop_charge", default="", type=str)
        ordered_dict["4-11. ワークショップ参加者の申し込み方法"] = request.form.get(
            "_411_workshop_registration", default="", type=str)
        if request.form.get("_412_live"):
            ordered_dict["4-12. ライブパフォーマンス"] = "希望する"
        else:
            ordered_dict["4-12. ライブパフォーマンス"] = "希望しない"
        ordered_dict["4-13. ライブパフォーマンスのタイトル"] = request.form.get(
            "_413_live_title", default="", type=str)
        ordered_dict["4-14. ライブパフォーマンスの内容"] = request.form.get(
            "_414_live_describe", default="", type=str)
        ordered_dict["5-01. その他、不明な点や事務局へのご要望"] = request.form.get(
            "_501_comment", default="", type=str)
        ordered_dict["送信日時"] = now.strftime(u"%Y/%m/%d %H:%M:%S")

        for key, value in ordered_dict.items():
            current_app.logger.info(
                "ordered_dict: %s (%s) -> %s (%s)" % (key, type(key), str(value), type(value)))

        task_store = taskqueue.add(url="/registration/store", params=ordered_dict,
                                   name="registration-store-" + now.strftime(u"%Y%m%d%H%M%S"))
        current_app.logger.info(task_store.name + " was enqueued.")

        task_send = taskqueue.add(url="/registration/send", params=ordered_dict,
                                  name="registration-send-" + now.strftime(u"%Y%m%d%H%M%S"))
        current_app.logger.info(task_send.name + " was enqueued.")

        return render_template("thanks.html", ref="registration")


@blueprint.route("/registration/store", methods=["POST"])
def store():
    url = "https://script.google.com/macros/s/AKfycbyBJFGzebnDwKpVo83Z4Dr6CSRn5wIoGMAjIlRv5u2af8hm-g/exec"

    data = urllib.urlencode(request.form)
    req = urllib2.Request(url, data)
    res = urllib2.urlopen(req)
    current_app.logger.info(
        "registration's spreadsheet doPost() response: " + res.read())

    return "Successfully stored to spreadsheet!"


@blueprint.route("/registration/send", methods=["POST"])
def send():
    sg = sendgrid.SendGridAPIClient(
        apikey=current_app.config["SENDGRID_API_KEY"])

    entries = ""
    for key, value in sorted(request.form.to_dict().items()):
        entries += "{}:\n{}\n\n".format(key, value)

    year = current_app.config["YEAR"]
    exhibitor_name = request.form.get(u"1-01. 出展者名", type=str)
    from_email = Email(current_app.config["FROM_MAILADDRESS"])
    subject = "[MFT{year}] 出展申し込み 受付確認 ({exhibitor_name} 様)".format(
        year=year, exhibitor_name=exhibitor_name)
    to_email = Email(request.form.get(u"1-08. 代表者のメールアドレス", type=str))
    category = Category("registration")

    body = """
{exhibitor_name}様

このたびはMaker Faire Tokyo {year}へ
出展申し込みをいただきありがとうございます。

本メールはお申し込み内容を確認するための自動送信メールです。
（出展を承認するメールではございませんのでご注意ください。）

以下のお申し込み内容を必ずご確認ください。

なお、5月31日（木）までに、すべての出展申し込み者の方に
出展の可否をメールにてお知らせいたします。期日を過ぎても
メールが届かない場合には、事務局までご連絡いただけますと幸いです。

その他にもご不明な点は事務局までメールにてお問い合わせください。
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
