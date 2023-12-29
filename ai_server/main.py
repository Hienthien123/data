from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from typing import List
import os
import vulgar_word
app = FastAPI()

# Để tránh vấn đề về CORS (Cross-Origin Resource Sharing) trong quá trình phát triển,
# bạn có thể sử dụng middleware CORSMiddleware để cho phép tất cả các nguồn.
app.add_middleware(
   CORSMiddleware,
   allow_origins=["*"],  # Cho phép tất cả các nguồn truy cập
   allow_credentials=True,
   allow_methods=["*"],  # Cho phép tất cả các phương thức
   allow_headers=["*"],  # Cho phép tất cả các tiêu đề
)




@app.post("/add/")
def add(l: List[str]):
    vulgar_word.update_dict(l)
    return {"message":"oke"}


@app.post("/check/")
def check(input_data: dict):
    # print(input_data)
    # return input_data
    input_word = input_data.get("input_word")
    ns,ws = vulgar_word.convert_it_to_it(input_word)
    after_check = ''.join(vulgar_word.check_sentence(vulgar_word.get_list(ns)))
    # print(len(after_check))
    # ws = ws.replace('danhDau',str(2))
    for i in range(len(after_check)):
        
        # print(after_check[i])
        ws = ws.replace('danhDau',after_check[i],1)
    return {"result":ws}
