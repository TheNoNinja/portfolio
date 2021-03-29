const neo4j = require('neo4j-driver');
require('dotenv/config');

const driver = neo4j.driver(process.env.DB_CONNECTION_URL, neo4j.auth.basic(process.env.DB_USERNAME, process.env.DB_PASSWORD));

exports.GetArticles = async (callback) => {
    let session = driver.session();
    await session.run('MATCH (n:Article) RETURN n',{
    }).then(data =>{
        callback({IsSuccess: true, result: data.records});
    }).catch(error =>{
        callback({IsSuccess: false, error: error});
    });

    session.close();
};

exports.GetArticle = async (articleId, callback) => {
    let session = driver.session();
    await session.run(`MATCH (n:Article) WHERE id(n) = $id RETURN n`,{
        id: Number(articleId),
    }).then(data =>{
        if (data.records.length != 0){
            callback({IsSuccess: true, result: data.records});
        }
        else {
            callback({IsSuccess: false, error: {message: `No articles with id ${articleId} found!`}});
        }
    }).catch(error =>{
        callback({IsSuccess: false, error: error});
    });

    session.close();
};

exports.CreateArticle = async (article, callback) => {
    let session = driver.session();
    
    await session.run('CREATE (n:Article {title: $title, blurb: $blurb, date: $date, thumbnail: $thumbnail, content: $content}) RETURN n', {
        title: article.title,
        blurb: article.blurb,
        date: article.date,
        thumbnail: article.thumbnail,
        content: article.content
    }).then(data => {
        callback({IsSuccess: true, result: data.records});
    }).catch(error => {
        callback({IsSuccess: false, error: error});
    });

    session.close();
};

exports.DeleteArticle = async (articleId, callback) => {
    let session = driver.session();
    await session.run(`MATCH (n:Article) WHERE ID(n) = ${articleId} DELETE n`,{
    }).then(data =>{
        if (data.summary.counters._stats.nodesDeleted == 1){
            callback({IsSuccess: true, data: data});
        }
        else {
            callback({IsSuccess: false, error: {message: `No articles with id ${articleId} to delete!`}});
        }
    }).catch(error =>{
        callback({IsSuccess: false, error: error});
    });

    session.close();
};

exports.UpdateArticle = async (article, callback) => {
    let session = driver.session();
    await session.run(`MATCH (n:Article) WHERE id(n) = $id SET n = $article RETURN n`,{
        id: Number(article.id),
        article: article
    }).then(data =>{
        callback({IsSuccess: true, result: data.records});
    }).catch(error =>{
        callback({IsSuccess: false, error: error});
    });

    session.close();
};