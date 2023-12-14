from datetime import datetime, timedelta
from airflow.decorators import dag, task
from airflow.utils.dates import days_ago

from ultis.transform import transform_data
from ultis.train import train_model
from ultis.extract import extract_data
from ultis.load_to_db import load_data,remove_old_data



# Define the DAG using the @dag decorator
@dag(schedule_interval=timedelta(days=1), start_date=days_ago(1), catchup=False,tags=['test'])
def xcom_example_dag():

    @task
    def extract():
        return extract_data()


    @task
    def transform_review(review_data: dict):
        my_data = {}
        for k,v in review_data.items():
            r_data = [dd[1] for dd in v]
            my_data[k] = transform_data(r_data)

            # print(k,v)
        return my_data
        # print(review_data)
    
    @task
    def train(review_data: dict):

        for k,v in review_data.items():
            train_model(k,v)
        
    @task
    def load(raw_data: dict,review_data: dict):
        remove_old_data()
        for k, v in raw_data.items():
            load_data(k,v,review_data[k])

    # Execute the first task to get course_ids
    data = extract()
    transform = transform_review(data)
    # train_ = train(transform) 
    # load_ = 

    train(transform) >> load(data,transform)

# Instantiate the DAG
xcom_dag = xcom_example_dag()