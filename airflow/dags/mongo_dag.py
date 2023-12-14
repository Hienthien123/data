import json
from airflow.decorators import dag, task
from pendulum import datetime
from datetime import timedelta
from ultis.cloudinary import get_file_name,delete_dupicate
from airflow.utils.dates import days_ago
from ultis.extract import get_image_URL
@dag(schedule_interval=timedelta(days=1), start_date=days_ago(1), catchup=False,tags=['test'])
def delete_file_unused():
    @task
    def get_file_from_cloud():
        return {'cloud_data': get_file_name()}
    
    @task
    def get_file_from_db():
        return {'db_data': get_image_URL()}
    

    @task
    def remove_dupicate(cloud: dict,db:dict):
        cloud_data = cloud['cloud_data']
        db_data = db['db_data']
        delete_dupicate(cloud_data,db_data)


    cloud = get_file_from_cloud()
    db  = get_file_from_db()

    remove_dupicate_image = remove_dupicate(cloud,db)

delete_file_unused()


# 	{'db_data': ['m0zo7j27mhswym6xzoxl']}
#   {'cloud_data': ['oxnhhkmfvlru8rzcpypm', 'ru7yeahg6x7ozd3bi0u0', 'ukuoqzw6qxcghnhbkdzn']}
