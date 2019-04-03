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

    let newObj = {...obj};

    let reference = createArticleIdRef(articleArr);

    newObj['article_id'] = reference[newObj.belongs_to];

    newObj['author'] = obj['created_by'];

    delete newObj['belongs_to'];

    delete newObj['created_by'];

    newCommentData.push(newObj);
  });

  return newCommentData
};

module.exports = { timestampToDate, commentsData, createArticleIdRef };
