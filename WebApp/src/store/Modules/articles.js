export default {
    state: {
        items: []
    },
    getters:{
        getArticleById(state){
            return (id) => {
                return state.items.find(a => a._id === id)
            }
        }
    },
    mutations: {
        setArticles(state, {articles}){
            state.items = articles
        }
    },
    actions: {
        fetchArticles(state){
            fetch("http://localhost:3080/api/articles").then(result => {
                result.json().then(data => {
                    state.commit('setArticles', {articles: data})
                }).catch(error => {
                    console.log(error)
                })
            }).catch(error => {
                console.log(error)
            })
        }
    }
}