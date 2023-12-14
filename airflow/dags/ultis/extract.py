from pymongo import MongoClient
from bson import ObjectId
from ultis.constant import  DATABASE_NAME, COURSES_COLLECTION_NAME, REVIEWS_COLLECTION_NAME
from airflow.providers.mongo.hooks.mongo import MongoHook
import re
def extract_data():
        # Connect to MongoDB
        hook = MongoHook(mongo_conn_id="mongo_default")
        client = hook.get_conn()
        database = (
            client[DATABASE_NAME]
        ) 
        courses_collection = database[COURSES_COLLECTION_NAME]

        # Define the query to retrieve all documents
        query = {}
        review_data = {}

        # Perform the query and retrieve _id values
        cursor = courses_collection.find(query)
        # print(cursor)
        course_ids = [document['_id'] for document in cursor]
        # print(course_ids)
        reviews_collection = database[REVIEWS_COLLECTION_NAME]
        for course_id in course_ids:
            cursor = reviews_collection.find(query)
            reviews = [(str(data['_id']), str(data['review_text']) )for data in cursor]
            review_data[str(course_id)] = reviews

        # Close the MongoDB connection
        client.close()

        return review_data

def get_image_URL():
    hook = MongoHook(mongo_conn_id="mongo_default")
    client = hook.get_conn()
    database = (
        client[DATABASE_NAME]
        ) 
    collection = database['users']
    data = list(collection.find({},{"_id": 0, "profile.avatar": 1}))
    avatars = [re.search(r'avatar/([^/.]+)\.',item['profile']['avatar']).group(1) for item in data if 'avatar' in item['profile'] and item['profile']['avatar']]
    return avatars