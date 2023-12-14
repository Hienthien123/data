import cloudinary
import cloudinary.api
from cloudinary.utils import cloudinary_url
from dotenv import load_dotenv
import re
import os
from cloudinary import uploader



folder_name="avatar"

def get_file_name():
    load_dotenv()
    cloudinary.config(
    cloud_name=os.getenv("CLOUDINARY_NAME"),
    api_key=os.getenv("CLOUDINARY_KEY"),
    api_secret=os.getenv("CLOUDINARY_SECRET")
    )
    result = cloudinary.api.resources(
    type="upload",
    prefix=folder_name,
    context=True
    )
    data = [re.search(r'avatar/([^/.]+)\.',r.get("url")).group(1) for r in result.get("resources", [])]
    print(data)
    return data

def delete_dupicate(cloud_data,db_data):
    load_dotenv()
    cloudinary.config(
    cloud_name=os.getenv("CLOUDINARY_NAME"),
    api_key=os.getenv("CLOUDINARY_KEY"),
    api_secret=os.getenv("CLOUDINARY_SECRET")
    )
    for c in cloud_data:
        if c not in db_data:
            public_id = f'avatar/{c}'
            uploader.destroy(public_id)