
import pandas as pd
import numpy as np
import os
import pymysql
from sqlalchemy import create_engine, engine
from sqlalchemy.orm import relationship, sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import  Column, Integer, String, Text, Enum
import enum
from sqlalchemy.sql.expression import null

from sqlalchemy.sql.schema import ForeignKey

base_dir = "/Users/shinmura/Documents/programming/python/scraping/bar_exam/choice/preliminary"

excel_dir = os.path.join(base_dir, "2020/public/choice_pre_2020_行政法.xlsx")


df = pd.read_excel(excel_dir)
df = df.replace({np.nan: None})

# q_df = pd.DataFrame(columns=['id', 'subject', 'year', 'q_num', 'type', 'question'])

engine = create_engine('mysql+pymysql://root:root_password@localhost:3306/database_name?charset=utf8')
Base = declarative_base()

# class SubjectType(str, enum.Enum):
#     憲法 = 0
#     行政法 = 1
#     民法 = 2
#     商法 = 3
#     民事訴訟法 = 4
#     刑法 = 5
#     刑事訴訟法 = 6

# class AnswerType(str, enum.Enum):
#     T = 1
#     F = 2   


class Question(Base):
    __tablename__ = 'question'

    id = Column(String(9),  primary_key=True)
    q_num = Column(Integer)
    type = Column(String(1))
    question = Column(Text)
    reference = Column(Text)

    choices = relationship("Choice",  backref="question")

class Choice(Base):
    __tablename__ = 'choice'

    id = Column(String(13),  primary_key=True)
    subject = Column(String(5))
    year = Column(Integer)
    c_num = Column(Integer)
    unit = Column(String(2))
    answer = Column(String(1))
    c1 = Column(Text)
    c2 = Column(Text, nullable=False)
    questionId = Column(String(11), ForeignKey('question.id'))

    # question = relationship("Question")

Session = sessionmaker(bind=engine)
session = Session()


for row in df.itertuples():
    # idの桁あわせのために分岐
    if row.No < 10:
        if row.Subject == '憲法':
            q_id = '11' + '1' + str(row.Year) + '0' + str(row.No)
        elif row.Subject == '行政法':
            q_id = '11' + '2' + str(row.Year) + '0' + str(row.No)
        elif row.Subject == '民法':
            q_id = '11' + '3' + str(row.Year) + '0' + str(row.No)
        elif row.Subject == '商法':
            q_id = '11' + '4' + str(row.Year) + '0' + str(row.No)
        elif row.Subject == '民事訴訟法':
            q_id = '11' + '5' + str(row.Year) + '0' + str(row.No)
        elif row.Subject == '刑法':
            q_id = '11' + '6' + str(row.Year) + '0' + str(row.No)
        elif row.Subject == '刑事訴訟法':
            q_id = '11' + '7' + str(row.Year) + '0' + str(row.No)
        else:
            q_id = '11' + '0' + str(row.Year) + '0' + str(row.No)
        
        q_text = row.Question.replace('\n', '').replace(' ', '')

        q_arg = Question(id=q_id, q_num=row.No, type=row.Type, question=q_text, reference=row.Reference)

        session.add(q_arg)

        for n in range(1, 6):
            index1 = 'C' + str(n)
            a_index = 'A' + str(n)
            u_index = 'U' + str(n)
            if not pd.isna(getattr(row, index1)):
                c_num = str(n)
                c_id = q_id + c_num
                answer = getattr(row, a_index)
                unit = getattr(row, u_index)

                index2 = 'C' + c_num + '2'
                c1 = getattr(row, index1).replace('\n', '').replace(' ', '')

                if getattr(row, index2) is not None:
                    c2 = getattr(row, index2).replace('\n', '').replace(' ', '')
                else:
                    c2 = getattr(row, index2)

                if answer == 1:
                    c_answer = 1
                elif answer == 2:
                    c_answer = 2
                else:
                    c_answer = null

                c_arg = Choice(id=c_id, subject=row.Subject, year=row.Year, questionId=q_id, c_num=c_num,unit=unit, answer=c_answer, c1=c1, c2=c2)

                session.add(c_arg)

    else:
        if row.Subject == '憲法':
            q_id = '11' + '1' + str(row.Year) + str(row.No)
        elif row.Subject == '行政法':
            q_id = '11' + '2' + str(row.Year) + str(row.No)
        elif row.Subject == '民法':
            q_id = '11' + '3' + str(row.Year) + str(row.No)
        elif row.Subject == '商法':
            q_id = '11' + '4' + str(row.Year) + str(row.No)
        elif row.Subject == '民事訴訟法':
            q_id = '11' + '5' + str(row.Year) + str(row.No)
        elif row.Subject == '刑法':
            q_id = '11' + '6' + str(row.Year) + str(row.No)
        elif row.Subject == '刑事訴訟法':
            q_id = '11' + '7' + str(row.Year) + str(row.No)
        else:
            q_id = '11' + '0' + str(row.Year) + str(row.No)

        q_text = row.Question.replace('\n', '').replace(' ', '')

        q_arg = Question(id=q_id, q_num=row.No, type=row.Type, question=q_text, reference=row.Reference)

        session.add(q_arg)

        for n in range(1, 6):
            index1 = 'C' + str(n)
            a_index = 'A' + str(n)
            u_index = 'U' + str(n)
            if not pd.isna(getattr(row, index1)):
                c_num = str(n)
                c_id = q_id + c_num
                answer = getattr(row, a_index)

                unit = getattr(row, u_index)

                index2 = 'C' + c_num + '2'
                c1 = getattr(row, index1).replace('\n', '').replace(' ', '')

                if getattr(row, index2) is not None:
                    c2 = getattr(row, index2).replace('\n', '').replace(' ', '')
                else:
                    c2 = getattr(row, index2)

                if answer == 1:
                    c_answer = 1
                elif answer == 2:
                    c_answer = 2
                else:
                    c_answer = null


                c_arg = Choice(id=c_id, subject=row.Subject, year=row.Year, questionId=q_id, c_num=c_num, unit=unit, answer=c_answer, c1=c1, c2=c2)

                session.add(c_arg)
                

session.commit()
