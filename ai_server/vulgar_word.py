from pymongo import MongoClient
from bson import ObjectId
client = MongoClient('mongodb+srv://hithere:vU2WKq1quw0FuMVq@mycluster.kotjdi9.mongodb.net/')
db = client['MyDatabase']
vulgar_words= db['vulgar_words']

def get_dict():
    word_db = vulgar_words.find_one()
    _id = word_db['_id']
    word_db.pop('_id', None)
    word_dict = dict(word_db)

    return _id,word_dict


def create(k,x):
    if(x== None or x==''):
        k['end'] = True
        return
    y = x[0]
    z = x[1:]
    if(y not in k):
        k[y] = {}
    create(k[y],z)

def update_dict(list_string):
    _id, word_dict = get_dict()
    for string in list_string:
        create(word_dict,string)
    vulgar_words.update_one({'_id':_id},{'$set':word_dict})

def check_vulgar(word,word_dict,space):
    if(word== None or word==''):
        if'end' in word_dict and word_dict['end']:
            return space + 1
        return 0
    first_character = word[0]
    t = space
    if first_character == ' ':
        t+=1
    rest = word[1:]
    result = 0
    if first_character in word_dict:
        result = check_vulgar(rest,word_dict[first_character],t)
    if result != 0:
        return result
    if 'end' in word_dict and word[0]==' ':
        return space+1
    return 0


def check_sentence(s):
    new_s = []
    i=0
    
    _id, word_dict = get_dict()
    # print(word_dict)
    while i < len(s):
        chuoi = ' '.join(s[i:]).lower()
        # print(chuoi)
        number = check_vulgar(chuoi,word_dict,0)
        if number ==0:
            new_s.append(s[i])
            i+=1
            continue
        for e in range(i,i+number):
            new_s.append('*'*len(s[e]))
        i = i+ number
        # break
    return new_s


def convert_it_to_it(s):
    new_s = ''
    old_str = ''
    for i in range(len(s)):
        if s[i].isalpha() or s[i].isdigit():
            new_s+=s[i]
            old_str+="danhDau"
            continue
        elif s[i]==' ':
            new_s+= ' '
        old_str+=s[i]
    return new_s,old_str

def get_list(original_string):
    return [word for word in original_string.split(' ') if word]
