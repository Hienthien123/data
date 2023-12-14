tu_dien_viet_tat = {'e': 'em',
        'a': 'anh',
        'đc':'được',
        'z':'vậy',
        'k':'không',
        'hok':'không',
        'ko':'không',
        'kh':'không',
        'bt': 'bài tập',
        'bt1': 'bài tập 1',
        'bt2' : 'bài tập 2',
        'bt3': 'bài tập 3',
        'bt4': 'bài tập 4',
        'bt5': 'bài tập 5',
        'bt6': 'bài tập 6',
        'bt7': 'bài tập 7',
        'r': 'rồi',
        'c1': 'câu 1',
        'c2': 'câu 2',
        'c3': 'câu 3',
        'c4': 'câu 4',
        'c5': 'câu 5',
        'c6': 'câu 6',
        'c7': 'câu 7',
        'c8': 'câu 8',
        'c9': 'câu 9',
        'c10': 'câu 10',
        'cty': 'công ty',
        'đc': 'địa chỉ',
        'ad': 'admin',
        'ae':'anh em',
        'ah': 'ạ',
        'vd': 'ví dụ',
        'đky': 'đăng ký',
        'cmt': 'comment',
        'dể': 'dễ',
        'be': 'back end',
        'fe': 'front end',
        'nhg': 'nhưng',
        'j':'gì',
        'vide': 'video',
        'vid': 'video',
        'dc': 'được',
        'rep': 'trả lời',
        'trg': 'trường',
        'vs':'với',
        'tym': 'tim',
        'rùi': 'rồi',
        'ng': 'người',
        'sv':'sinh viên',
        'hs': 'học sinh',
        'gv':'giảng viên',
        'dk':'đăng kí',
        'ưi': 'ơi',
        'quó': 'quá'
        }

uniChars = "àáảãạâầấẩẫậăằắẳẵặèéẻẽẹêềếểễệđìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵÀÁẢÃẠÂẦẤẨẪẬĂẰẮẲẴẶÈÉẺẼẸÊỀẾỂỄỆĐÌÍỈĨỊÒÓỎÕỌÔỒỐỔỖỘƠỜỚỞỠỢÙÚỦŨỤƯỪỨỬỮỰỲÝỶỸỴÂĂĐÔƠƯ"
unsignChars = "aaaaaaaaaaaaaaaaaeeeeeeeeeeediiiiiooooooooooooooooouuuuuuuuuuuyyyyyAAAAAAAAAAAAAAAAAEEEEEEEEEEEDIIIOOOOOOOOOOOOOOOOOOOUUUUUUUUUUUYYYYYAADOOU"


char1252 = 'à|á|ả|ã|ạ|ầ|ấ|ẩ|ẫ|ậ|ằ|ắ|ẳ|ẵ|ặ|è|é|ẻ|ẽ|ẹ|ề|ế|ể|ễ|ệ|ì|í|ỉ|ĩ|ị|ò|ó|ỏ|õ|ọ|ồ|ố|ổ|ỗ|ộ|ờ|ớ|ở|ỡ|ợ|ù|ú|ủ|ũ|ụ|ừ|ứ|ử|ữ|ự|ỳ|ý|ỷ|ỹ|ỵ|À|Á|Ả|Ã|Ạ|Ầ|Ấ|Ẩ|Ẫ|Ậ|Ằ|Ắ|Ẳ|Ẵ|Ặ|È|É|Ẻ|Ẽ|Ẹ|Ề|Ế|Ể|Ễ|Ệ|Ì|Í|Ỉ|Ĩ|Ị|Ò|Ó|Ỏ|Õ|Ọ|Ồ|Ố|Ổ|Ỗ|Ộ|Ờ|Ớ|Ở|Ỡ|Ợ|Ù|Ú|Ủ|Ũ|Ụ|Ừ|Ứ|Ử|Ữ|Ự|Ỳ|Ý|Ỷ|Ỹ|Ỵ'.split('|')
charutf8 = "à|á|ả|ã|ạ|ầ|ấ|ẩ|ẫ|ậ|ằ|ắ|ẳ|ẵ|ặ|è|é|ẻ|ẽ|ẹ|ề|ế|ể|ễ|ệ|ì|í|ỉ|ĩ|ị|ò|ó|ỏ|õ|ọ|ồ|ố|ổ|ỗ|ộ|ờ|ớ|ở|ỡ|ợ|ù|ú|ủ|ũ|ụ|ừ|ứ|ử|ữ|ự|ỳ|ý|ỷ|ỹ|ỵ|À|Á|Ả|Ã|Ạ|Ầ|Ấ|Ẩ|Ẫ|Ậ|Ằ|Ắ|Ẳ|Ẵ|Ặ|È|É|Ẻ|Ẽ|Ẹ|Ề|Ế|Ể|Ễ|Ệ|Ì|Í|Ỉ|Ĩ|Ị|Ò|Ó|Ỏ|Õ|Ọ|Ồ|Ố|Ổ|Ỗ|Ộ|Ờ|Ớ|Ở|Ỡ|Ợ|Ù|Ú|Ủ|Ũ|Ụ|Ừ|Ứ|Ử|Ữ|Ự|Ỳ|Ý|Ỷ|Ỹ|Ỵ".split('|')


def loaddicchar():
    dic = {}
    for i in range(len(char1252)):
        dic[char1252[i]] = charutf8[i]
    return dic


bang_nguyen_am = [['a', 'à', 'á', 'ả', 'ã', 'ạ', 'a'],
                  ['ă', 'ằ', 'ắ', 'ẳ', 'ẵ', 'ặ', 'aw'],
                  ['â', 'ầ', 'ấ', 'ẩ', 'ẫ', 'ậ', 'aa'],
                  ['e', 'è', 'é', 'ẻ', 'ẽ', 'ẹ', 'e'],
                  ['ê', 'ề', 'ế', 'ể', 'ễ', 'ệ', 'ee'],
                  ['i', 'ì', 'í', 'ỉ', 'ĩ', 'ị', 'i'],
                  ['o', 'ò', 'ó', 'ỏ', 'õ', 'ọ', 'o'],
                  ['ô', 'ồ', 'ố', 'ổ', 'ỗ', 'ộ', 'oo'],
                  ['ơ', 'ờ', 'ớ', 'ở', 'ỡ', 'ợ', 'ow'],
                  ['u', 'ù', 'ú', 'ủ', 'ũ', 'ụ', 'u'],
                  ['ư', 'ừ', 'ứ', 'ử', 'ữ', 'ự', 'uw'],
                  ['y', 'ỳ', 'ý', 'ỷ', 'ỹ', 'ỵ', 'y']]
bang_ky_tu_dau = ['', 'f', 's', 'r', 'x', 'j']


def nguyen_am_to_id():
    nguyen_am_to_ids = {}

    for i in range(len(bang_nguyen_am)):
        for j in range(len(bang_nguyen_am[i]) - 1):
            nguyen_am_to_ids[bang_nguyen_am[i][j]] = (i, j)
    return nguyen_am_to_ids

nguyen_am_to_ids = nguyen_am_to_id()

DATABASE_NAME = "MyDatabase" 
COURSES_COLLECTION_NAME = "courses"  
REVIEWS_COLLECTION_NAME = "reviews" 
TOPICS_COLLECTION_NAME = "topics"