from flask import Flask, render_template, request
import requests
from wordcloud import WordCloud
import matplotlib.pyplot as plt

app = Flask(__name__)

@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        artist = request.form["artist"]
        song = request.form["song"]

        # Lyrics API
        url = f"https://api.lyrics.ovh/v1/{artist}/{song}"
        response = requests.get(url)

        if response.status_code == 200:
            lyrics = response.json()["lyrics"]

            # Word Cloud
            wc = WordCloud(
                width=800,
                height=400,
                background_color="white"
            ).generate(lyrics)

            wc.to_file("static/wordcloud.png")
            return render_template("index.html", image=True)

        else:
            return render_template("index.html", error="Lyrics not found!")

    return render_template("index.html")

if __name__ == "__main__":
    app.run(debug=True)
