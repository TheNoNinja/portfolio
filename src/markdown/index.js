const highlightJS= require('highlight.js');

const md = require('markdown-it')({
    html: true,
    xhtmlOut: true,
    breaks: true,
    langPrefix: 'lang-',
    linkify: true,
    typographer: true,
    highlight: (str, lang) => {
        if (lang && highlightJS.getLanguage(lang)){
            try {
                return '<pre class="hljs"><code>' + highlightJS.highlight(str, { language: lang, ignoreIllegals: true }).value +'</code></pre>';
            }
            catch (error){ console.log(error)}
        }
        return '';
    }
});

md.linkify.set({ fuzzyEmail: false });

export default md;