from flask import Flask, request, jsonify, redirect, session
import re
import os
import tweepy
from urllib.parse import unquote
from dotenv import load_dotenv
from nltk.sentiment.vader import SentimentIntensityAnalyzer

app = Flask(__name__)

load_dotenv()

consumer_key_secret = os.environ["API_KEY_AND_SECRET"]
access_token_secret = os.environ["ACCESS_TOKEN_AND_SECRET"]

auth = tweepy.OAuth1UserHandler(
        consumer_key_secret,
        access_token_secret)
    

@app.route('/search', methods = ["POST","GET"])
def SentimentAnalysis():
    api = tweepy.API(auth)

    data = request.get_data()
    search_item = unquote(data)
    

    no_of_tweets = 50

    extracted_tweets = []
    cleaned_tweets = []

    tweets = tweepy.Cursor(api.search_tweets, search_item, tweet_mode="extended", lang='en').items(no_of_tweets)

    for tweet in tweets:
        try:
            tweet.retweeted_status.full_text

        except AttributeError:      
            tweet.full_text

        extracted_tweets.append(tweet.full_text)
    

    cln_list=list(map(lambda x:re.sub(r"\w+:\/{2}[\d\w-]+(\.[\d\w-]+)*(?:(?:\/[^\s/]*))*\
                                        |\d|[)+*}.{/!@#?$%^*_='\"\|\\(-,><~`;\'\[\]:]","",x),extracted_tweets))

    for words in cln_list:
        lower_case = words.lower()
        cleaned_tweets.append(lower_case)
    

    pos_count = 0
    neg_count = 0
    neut_count = 0

    sia = SentimentIntensityAnalyzer()

    for sentences in cleaned_tweets:

        sentences.encode('utf-8')
        print(sentences)

        score = sia.polarity_scores(sentences)

        if score['compound'] >= 0.05:
            "Positive"
            pos_count += 1

        elif score["compound"] <= -0.05:
            "Negative"
            neg_count += 1

        else:
            "Neutral"
            neut_count += 1



    session['pos_count'] = pos_count
    session['neg_count'] = neg_count
    session['neut_count'] = neut_count

    return redirect('json')

@app.route("/json", methods = ["POST","GET"])
def json_route():

    positive = session.get('pos_count')
    negative = session.get('neg_count')
    neutral = session.get('neut_count')
    result = {"Positive":positive, "Negative":negative, "Neutral":neutral}

    return jsonify(result)

    
if __name__ == "__main__":

    app.secret_key = "secret"
    
    app.run(debug=True, port=5000)
    
  