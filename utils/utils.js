const timestampToDate = arr => {

  let newArticleData = [];

  arr.forEach(obj => {
    obj['created_at'] = new Date(obj['created_at']);
    delete obj.timestamp;
    newArticleData.push(obj);
  });
  
  return newArticleData;
};

const createArticleIdRef = (articleArr) => {
  let articleRef = {};

  articleArr.forEach(article => {
    articleRef[article.title] = article.article_id;
  });

  return articleRef;
}

const commentsData = (commentsArr, articleArr) => {

  let newCommentData = [];

  commentsArr.forEach(obj => {

    let reference = createArticleIdRef(articleArr);

    obj['article_id'] = reference['belongs_to'];

    obj['author'] = obj['created_by'];

    delete obj['belongs_to'];

    delete obj['created_by'];

    newCommentData.push(obj);
  });

  return newCommentData
};

module.exports = { timestampToDate, commentsData, createArticleIdRef };
