

class EventData {
    // 一つのイベント
    // 複数の資料（documents）を持つ
    // Value Object(値を更新せず、操作では必ず新しいオブジェクトを返却する)
    constructor(title, date, documents, tags) {

        this.date = new Date(date);
        this.title = title;
        this.documents = documents;
        this.tags = tags;
    }

    mergeEvents(anotherEvent) {
        if (!this.isSameEvent(anotherEvent)) {
            throw new Error("Title is not same")
        }
        const uniqueTags = new Set([...this.tags, ...anotherEvent.tags]);

        let uniqueDocuments = [...this.documents]
        const diffDocs = anotherEvent.documents.filter(x => this.documents.every(y => !y.isEqual(x)))
        uniqueDocuments.push(...diffDocs);

        return new EventData(this.title, this.date, uniqueDocuments, [...uniqueTags]);
    }

    isSameEvent(anotherEvent) {
        return this.title === anotherEvent.title
    }
}

export default class FormAnswer extends EventData {
    // 一つのフォームデータ
    // Formの回答一回分を代表する。資料（document）を一つしか持たない。

    constructor(registeredDate, title, date, type, iframe, options = null, writtenTags = null) {
        // このコンストラクタの引数は（一応）現在のAPIの返却する配列をそのまま突っ込めばいいようになってる

        let tagsText = options || ""
        if (options && writtenTags) {
            tagsText += ",";
        }
        tagsText += writtenTags || ""
        const uniqueTags = new Set(tagsText.split(",").map(x => x.trim()).filter(x => x.length > 0));

        super(title, date, [new DocumentResource(type, iframe)], [...uniqueTags])
        this.registeredDate = new Date(registeredDate);
    }
}

class DocumentResource {
    // ひとつの資料
    constructor(type, iframe) {
        this.type = type;
        this.iframe = iframe;
    }
    isEqual(anotherDocument) {
        return this.iframe === anotherDocument.iframe
    }
}

// test

// var testFormData = ['2020/05/13 17:55:23', '第12回勉強会', '2016/02/11', '動画（YouTubeの埋め込みタグ）', '<iframe width="560" height="315" src="https://www.…pe; picture-in-picture" allowfullscreen></iframe>', '勉強会, AI, 機械学習, アルゴリズム, データ解析, 数学', 'ネットワーク,スポーツ']
// console.assert(new FormData(...testFormData), "FormData can be created with array of length 7")

// var testFormData2 = ["2020/05/08 19:18:20", "第12回勉強会", "2016/02/11", "動画（YouTubeの埋め込みタグ）", "<iframe width='560' height='315' src='https://www.…pe; picture-in-picture' allowfullscreen></iframe>"]
// console.assert(new FormData(...testFormData2), "FormData can be created with array of length 5")

// var testForm = new FormData(...testFormData)
// var testForm2 = new FormData(...testFormData2)
// console.assert(testForm.documents.length === 1 && testForm2.documents.length === 1, "each testForm has only 1 document")
// var mergedEvent = testForm.mergeEvents(testForm2)
// console.assert(!(mergedEvent instanceof FormData), "FormDatas can be merged into one eventData")
// console.assert(mergedEvent.documents.length === 2, "mergedEvent has 2 documents")
// console.assert(testForm.documents.length === 1 && testForm2.documents.length === 1, "each testForm has only 1 document even after merge")
