from pymongo import MongoClient
from bson import ObjectId
from pathlib import Path
import gensim.corpora as corpora
import gensim
from gensim.models.ldamodel import LdaModel
from ultis.train import create_dict
import pandas as pd
from ultis.constant import  DATABASE_NAME, TOPICS_COLLECTION_NAME, REVIEWS_COLLECTION_NAME
from airflow.providers.mongo.hooks.mongo import MongoHook


class Topic:
    def __init__(self, course_id, topic):
        self.course_id = course_id
        self.topic = topic

class TopicDAO:
    @staticmethod
    def add_topic(topic,database):
        topic_dict = {
            "course_id": topic.course_id,
            "topic": topic.topic
        }
        result = database[TOPICS_COLLECTION_NAME].insert_one(topic_dict)
        _id = result.inserted_id
        return _id
def format_topics_sentences(ldamodel, corpus, texts):
    # Init output
    sent_topics_df = pd.DataFrame()

    # Get main topic in each document
    for i, row in enumerate(ldamodel[corpus]):
        row = sorted(row[0], key=lambda x: (x[1]), reverse=True)
        # Get the Dominant topic, Perc Contribution and Keywords for each document
        for j, (topic_num, prop_topic) in enumerate(row):
            if j == 0:  # => dominant topic
                wp = ldamodel.show_topic(topic_num)
                topic_keywords = ", ".join([word for word, prop in wp])
                new_row = pd.Series([int(topic_num), round(prop_topic, 4), topic_keywords, texts[i][0]])
                sent_topics_df = pd.concat([sent_topics_df, new_row.to_frame().T],ignore_index=True)
            else:
                break
    sent_topics_df.columns = ['topic_id', 'perc_contribution', 'key_word','comment_id']
    return sent_topics_df

def remove_old_data():
    hook = MongoHook(mongo_conn_id="mongo_default")
    client = hook.get_conn()
    database = (
        client[DATABASE_NAME]
    ) 
    database[TOPICS_COLLECTION_NAME].delete_many({})
    client.close()

def load_data(model_name,raw_texts,document):
    hook = MongoHook(mongo_conn_id="mongo_default")
    client = hook.get_conn()
    database = (
        client[DATABASE_NAME]
    ) 
    absolute_path = Path(__file__).parent.parent / f'../model/{model_name}.model'
    lda_model = LdaModel.load(str(absolute_path))

    topic_content = lda_model.print_topics()

    topic_dict = {}
    for t in topic_content:
        topic_id = TopicDAO.add_topic(Topic(ObjectId(model_name),t[1]),database)
        topic_dict[str(t[0])] = topic_id

    id2word, corpus = create_dict(document)
    df = format_topics_sentences(lda_model,corpus,raw_texts)
    print(df)
    for index, row in df.iterrows():
        comment_id = row['comment_id']
        topic_id = int(row['topic_id'])
        perc_contribution = float(row['perc_contribution'])
        key_word = row['key_word']

        # Tìm tài liệu cần cập nhật
        query = {'_id': ObjectId(comment_id)}

        # Dữ liệu mới cần cập nhật
        update_data = {
            '$set': {
                'topic_id': topic_dict[str(topic_id)],
                'perc_contribution': perc_contribution,
                'key_word': key_word
            }
        }
        database[REVIEWS_COLLECTION_NAME].update_one(query, update_data, upsert=True)
    client.close()



    