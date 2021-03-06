# -*- coding: utf-8 -*-

import os
import sys
from flask import Flask, redirect, render_template
from controllers import registration, survey

reload(sys)
sys.setdefaultencoding("utf-8")

app = Flask(__name__)

app.config.from_object(__name__)
app.config.update({"DEBUG": True,  # XXX: it must be False used on production server.
                   "SENDGRID_API_KEY": os.environ['SENDGRID_API_KEY'],
                   "YEAR": 2018,
                   "FROM_MAILADDRESS": "makers@makejapan.org",
                   "FROM_NAME": "Maker Faire Tokyo出展担当",
                   "CC_MAILADDRESS": "makers@makejapan.org",
                   "REPLY_MAILADDRESS": "makers@makejapan.org",
                   # /registration
                   "PREFECTURES": ["北海道", "青森県", "岩手県", "宮城県", "秋田県", "山形県", "福島県", "茨城県", "栃木県", "群馬県",
                                   "埼玉県", "千葉県", "東京都", "神奈川県", "新潟県", "富山県", "石川県", "福井県", "山梨県", "長野県",
                                   "岐阜県", "静岡県", "愛知県", "三重県", "滋賀県", "京都府", "大阪府", "兵庫県", "奈良県", "和歌山県",
                                   "鳥取県", "島根県", "岡山県", "広島県", "山口県", "徳島県", "香川県", "愛媛県", "高知県", "福岡県",
                                   "佐賀県", "長崎県", "熊本県", "大分県", "宮崎県", "鹿児島県", "沖縄県", "海外"],
                   "CATEGORIES": {
                       "01_electronics": "エレクトロニクス（電子工作）", "02_arduino": "Arduino", "03_raspberry": "Raspberry Pi", "04_ai": "AI／画像認識", "05_vr": "VR",
                       "06_iot": "IoT（Internet of Things）", "07_robot": "ロボティクス", "08_drone": "ドローン／飛行物体", "09_camera": "カメラ／映像", "10_gaming": "ゲーミング",
                       "11_education": "教育", "12_young": "Young Makers（学生出展）", "13_kids": "キッズ & ファミリー", "14_toy": "トイ", "15_digital": "デジタルファブリケーション", "16_3d": "3Dプリンター",
                       "17_laser": "レーザーカッター", "18_cnc": "CNC、その他の工作機械", "19_software": "デジタルファブリケーションのためのソフトウェア（3D CADなど）", "20_fablab": "FabLab／Makerスペース／Makerのためのサービスなど", "21_art": "アート／デザイン",
                       "22_craft": "クラフト（木工／ペーパークラフト／電子手芸など）", "23_fashion": "ファッション", "24_music": "ミュージック／サウンド", "25_mobility": "モビリティ（電気自動車／自転車など）", "26_science": "サイエンス",
                       "27_space": "宇宙（ロケット／人工衛星など）", "28_bio": "バイオ", "29_agriculture": "農業（狩猟も含む）", "30_food": "Food Maker *食品を出展される方は必ずこのカテゴリを選択してください。", "31_alternative": "オルタナティブエネルギー",
                       "32_assistive": "アシスティブテクノロジー（福祉関連のプロジェクト）", "33_sport": "スポーツ", "34_handson": "ハンズオン（ミニワークショップ）", "35_pro": "Maker Pro（Makerとしての起業／スタートアップ）", "36_company": "企業内の部活動（業務外での作品製作）", "37_province": "地方（首都圏以外）からの出展"
                   },
                   "WATT": ["0", "100", "200", "300", "400", "500", "600", "700", "800", "900", "1000", "1500", "2000", "2500", "3000", "3001W以上もしくは単相100V以外の電源"],
                   # flask_debugtoolbar
                   "SECRET_KEY": os.urandom(24)})

if app.debug:
    from flask_debugtoolbar import DebugToolbarExtension
    toolbar = DebugToolbarExtension(app)
    app.config["DEBUG_TB_INTERCEPT_REDIRECTS"] = False
    app.config["DEBUG_TB_PROFILER_ENABLED"] = True

app.logger.info("make-jp has been started!")

app.register_blueprint(registration.blueprint)
app.register_blueprint(survey.blueprint)


@app.route("/")
def root():
    app.jinja_env.globals["YEAR"] = app.config["YEAR"]
    return redirect("/registration", code=302)
    # return redirect("/survey", code=302)


@app.route("/thanks")
def thanks():
    return render_template("thanks.html")


@app.errorhandler(404)
def not_found(e):
    app.logger.warn(e)
    return render_template("error.html", message=e), 404


@app.errorhandler(500)
def server_error(e):
    app.logger.exception(e)
    return render_template("error.html", message=e), 500
