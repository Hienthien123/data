import gensim.corpora as corpora
import gensim
from pathlib import Path

def create_dict(document):
    # Create Dictionary
    id2word = corpora.Dictionary(document)

    # Create Corpus
    texts = document

    # Term Document Frequency
    corpus = [id2word.doc2bow(text) for text in texts]
    return id2word, corpus

def train_model(model_name,document):
    id2word, corpus = create_dict(document)
    lda_model = gensim.models.ldamodel.LdaModel(corpus=corpus,
                                           id2word=id2word,
                                           num_topics=5, 
                                           random_state=100,
                                           update_every=1,
                                           chunksize=100,
                                           passes=5,
                                           alpha='auto',
                                           per_word_topics=True)
    absolute_path = Path(__file__).parent.parent / f'../model/{model_name}.model'
    lda_model.save(str(absolute_path))
    


def check_path():
    absolute_path = Path(__file__).parent.parent / '../model/tai.model'
    return absolute_path.is_file()