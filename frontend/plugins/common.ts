const searchSubject = (eng_subject: string) => {
    switch(eng_subject) {
        case 'cons':
            return '憲法'
        break
        case 'gov':
            return '行政法'
        break
        case 'civil':
            return '民法'
        break
        case 'company':
            return '商法'
        break
        default:
            return '科目'
    }
}

const searchUnit = (subject: string, unitNum: string) => {
    switch(subject) {
        case 'cons':
            switch(unitNum) {
                case "1":
                    return "憲法と立憲主義"
                break
                case "2":
                    return "国民主権の原理"
                break
                case "3":
                    return "平和主義の原理"
                break
                case "4":
                    return "基本的人権の原則"
                break
                case "5":
                    return "基本的人権の限界"
                break
                case "6":
                    return "幸福追求権"
                break
                case "7":
                    return "法の下の平等"
                break
                case "8":
                    return "思想及び良心の自由"
                break
                case "9":
                    return "信教の自由"
                break
                case "10":
                    return "学問の自由"
                break
                case "11":
                    return "表現の自由"
                break
                case "12":
                    return "経済的自由権"
                break
                case "13":
                    return "人身の自由"
                break
                case "14":
                    return "社会権"
                break
                case "15":
                    return "国務請求権"
                break
                case "16":
                    return "参政権"
                break
                case "17":
                    return "国民の義務"
                break
                case "18":
                    return "権力分立の原則"
                break
                case "19":
                    return "国会"
                break
                case "20":
                    return "内閣"
                break
                case "21":
                    return "裁判所"
                break
                case "22":
                    return "財政"
                break
                case "23":
                    return "地方自治"
                break
                case "24":
                    return "憲法の保障"
                break
                default:
                    return "単元"
                break      
            }
        break
        case 'gov':
            switch(unitNum) {
                case "1":
                    return "行政法の基本原理"
                break
                case "2":
                    return "行政上の法律関係"
                break
                case "3":
                    return "行政組織法"
                break
                case "4":
                    return "行政基準"
                break
                case "5":
                    return "行政行為"
                break
                case "6":
                    return "行政裁量"
                break
                case "7":
                    return "行政契約"
                break
                case "8":
                    return "行政指導"
                break
                case "9":
                    return "行政計画"
                break
                case "10":
                    return "行政調査"
                break
                case "11":
                    return "行政上の義務履行確保"
                break
                case "12":
                    return "行政手続"
                break
                case "13":
                    return "情報公開・個人情報保護"
                break
                case "14":
                    return "行政不服審査"
                break
                case "15":
                    return "行政事件訴訟法概観"
                break
                case "16":
                    return "訴訟要件"
                break
                case "17":
                    return "審理・判決・教示"
                break
                case "18":
                    return "取消訴訟以外の抗告訴訟"
                break
                case "19":
                    return "仮の救済"
                break
                case "20":
                    return "当事者訴訟・争点訴訟"
                break
                case "21":
                    return "国家賠償"
                break
                case "22":
                    return "損失補償"
                break
                default:
                    return "単元"
                break      
            }
        break
        case 'civil':
            switch(unitNum) {
                case "1":
                    return "民法の基本原理"
                break
                case "2":
                    return "私権の主体"
                break
                case "3":
                    return "私権の変動"
                break
                case "4":
                    return "無効と取消"
                break
                case "5":
                    return "代理"
                break
                case "6":
                    return "契約の効力発生時期"
                break
                case "7":
                    return "時効"
                break
                case "8":
                    return "物権の一般的効力"
                break
                case "9":
                    return "物権変動"
                break
                case "10":
                    return "占有権"
                break
                case "11":
                    return "所有権"
                break
                case "12":
                    return "用益物権"
                break
                case "13":
                    return "物的担保概観"
                break
                case "14":
                    return "抵当権"
                break
                case "15":
                    return "質権"
                break
                case "16":
                    return "留置権"
                break
                case "17":
                    return "先取特権"
                break
                case "18":
                    return "非典型担保"
                break
                case "19":
                    return "債権の目的"
                break
                case "20":
                    return "債権の効力"
                break
                case "21":
                    return "債権債務の移転"
                break
                case "22":
                    return "債権の消滅"
                break
                case "23":
                    return "責任財産の保全"
                break
                case "24":
                    return "多数当事者の債権関係"
                break
                case "25":
                    return "契約総論"
                break
                case "26":
                    return "贈与"
                break
                case "27":
                    return "売買"
                break
                case "28":
                    return "消費貸借"
                break
                case "29":
                    return "使用貸借"
                break
                case "30":
                    return "賃貸借"
                break
                case "31":
                    return "雇用"
                break
                case "32":
                    return "請負"
                break
                case "33":
                    return "委任"
                break
                case "34":
                    return "寄託・組合・和解"
                break
                case "35":
                    return "事務管理"
                break
                case "36":
                    return "不当利得"
                break
                case "37":
                    return "不法行為"
                break
                case "38":
                    return "親族法総則"
                break
                case "39":
                    return "婚姻"
                break
                case "40":
                    return "親子"
                break
                case "41":
                    return "親権"
                break
                case "42":
                    return "後見・補佐・補助"
                break
                case "43":
                    return "扶養"
                break
                case "44":
                    return "相続法総則"
                break
                case "45":
                    return "相続人"
                break
                case "46":
                    return "相続の効力"
                break
                case "47":
                    return "相続の承認・放棄"
                break
                case "48":
                    return "財産分離・相続人不存在"
                break
                case "49":
                    return "遺言"
                break
                case "50":
                    return "配偶者居住権"
                break
                case "51":
                    return "遺留分"
                break
                default:
                    return "単元"
                break      
            }
        break
        case 'company':
            switch(unitNum) {
                case "1":
                    return "会社法総則"
                break
                case "2":
                    return "設立"
                break
                case "3":
                    return "株式"
                break
                case "4":
                    return "機関"
                break
                case "5":
                    return "計算"
                break
                case "6":
                    return "資金調達"
                break
                case "7":
                    return "定款変更"
                break
                case "8":
                    return "解散・精算"
                break
                case "9":
                    return "買収・結合・再編"
                break
                case "10":
                    return "企業グループ"
                break
                case "11":
                    return "持分会社・組織変更"
                break
                case "12":
                    return "会社法上の訴訟"
                break
                case "13":
                    return "商法総則"
                break
                case "14":
                    return "商行為法"
                break
                case "15":
                    return "有価証券法総則"
                break
                case "16":
                    return "約束手形"
                break
                case "17":
                    return "為替手形・小切手"
                break
                default:
                    return "単元"
                break      
            }
        break
        default:
            return "教科"
        break
    }
}

const searchTotalNum = (subject: string, unitNum: string) => {
    switch(subject) {
        case 'cons':
            switch(unitNum) {
                case "1":
                    return 8
                break
                case "2":
                    return 14
                break
                case "3":
                    return 6
                break
                case "4":
                    return 6
                break
                case "5":
                    return 3
                break
                case "6":
                    return 0
                break
                case "7":
                    return 15
                break
                case "8":
                    return 3
                break
                case "9":
                    return 0
                break
                case "10":
                    return 6
                break
                case "11":
                    return 22
                break
                case "12":
                    return 10
                break
                case "13":
                    return 6
                break
                case "14":
                    return 9
                break
                case "15":
                    return 0
                break
                case "16":
                    return 3
                break
                case "17":
                    return 0
                break
                case "18":
                    return 6
                break
                case "19":
                    return 12
                break
                case "20":
                    return 0
                break
                case "21":
                    return 3
                break
                case "22":
                    return 3
                break
                case "23":
                    return 4
                break
                case "24":
                    return 12
                break
                default:
                    return null
                break      
            }
        break
        case 'gov':
            switch(unitNum) {
                case "1":
                    return 3
                break
                case "2":
                    return 3
                break
                case "3":
                    return 7
                break
                case "4":
                    return 3
                break
                case "5":
                    return 9
                break
                case "6":
                    return 10
                break
                case "7":
                    return 4
                break
                case "8":
                    return 11
                break
                case "9":
                    return 3
                break
                case "10":
                    return 3
                break
                case "11":
                    return 8
                break
                case "12":
                    return 15
                break
                case "13":
                    return 6
                break
                case "14":
                    return 12
                break
                case "15":
                    return 0
                break
                case "16":
                    return 22
                break
                case "17":
                    return 8
                break
                case "18":
                    return 10
                break
                case "19":
                    return 15
                break
                case "20":
                    return 3
                break
                case "21":
                    return 10
                break
                case "22":
                    return 3
                break
                default:
                    return null
                break      
            }
        break
        case 'civil':
            switch(unitNum) {
                case "1":
                    return 0
                break
                case "2":
                    return 15
                break
                case "3":
                    return 10
                break
                case "4":
                    return 0
                break
                case "5":
                    return 5
                break
                case "6":
                    return 5
                break
                case "7":
                    return 5
                break
                case "8":
                    return 10
                break
                case "9":
                    return 10
                break
                case "10":
                    return 5
                break
                case "11":
                    return 10
                break
                case "12":
                    return 5
                break
                case "13":
                    return 0
                break
                case "14":
                    return 27
                break
                case "15":
                    return 1
                break
                case "16":
                    return 6
                break
                case "17":
                    return 1
                break
                case "18":
                    return 5
                break
                case "19":
                    return 0
                break
                case "20":
                    return 0
                break
                case "21":
                    return 5
                break
                case "22":
                    return 19
                break
                case "23":
                    return 15
                break
                case "24":
                    return 20
                break
                case "25":
                    return 5
                break
                case "26":
                    return 1
                break
                case "27":
                    return 5
                break
                case "28":
                    return 6
                break
                case "29":
                    return 1
                break
                case "30":
                    return 10
                break
                case "31":
                    return 0
                break
                case "32":
                    return 5
                break
                case "33":
                    return 0
                break
                case "34":
                    return 12
                break
                case "35":
                    return 5
                break
                case "36":
                    return 0
                break
                case "37":
                    return 10
                break
                case "38":
                    return 0
                break
                case "39":
                    return 5
                break
                case "40":
                    return 15
                break
                case "41":
                    return 5
                break
                case "42":
                    return 5
                break
                case "43":
                    return 0
                break
                case "44":
                    return 0
                break
                case "45":
                    return 5
                break
                case "46":
                    return 10
                break
                case "47":
                    return 0
                break
                case "48":
                    return 0
                break
                case "49":
                    return 5
                break
                case "50":
                    return 5
                break
                case "51":
                    return 5
                break
                default:
                    return null
                break      
            }
        break
        case 'company':
            switch(unitNum) {
                case "1":
                    return 0
                break
                case "2":
                    return 20
                break
                case "3":
                    return 30
                break
                case "4":
                    return 75
                break
                case "5":
                    return 20
                break
                case "6":
                    return 16
                break
                case "7":
                    return 0
                break
                case "8":
                    return 0
                break
                case "9":
                    return 19
                break
                case "10":
                    return 0
                break
                case "11":
                    return 20
                break
                case "12":
                    return 20
                break
                case "13":
                    return 20
                break
                case "14":
                    return 20
                break
                case "15":
                    return 0
                break
                case "16":
                    return 30
                break
                case "17":
                    return 10
                break
                default:
                    return null
                break      
            }
        break
        default:
            return null
        break
    }
}


export default {
    searchSubject,
    searchUnit,
    searchTotalNum,
}