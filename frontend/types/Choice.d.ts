interface Question {
    id: string;
    q_num: number;
    type: string;
    question: string;
    reference: string | null;
}

export interface Choice {
    id: string;
    subject: string;
    year: number;
    unit: number;
    c_num: number;
    answer: string;
    c1: string;
    c2: string | null;
    question: Question
}