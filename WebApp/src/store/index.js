import { createStore } from "vuex";
import state from "@/store/state";
import getters from "@/store/getters";
import mutations from "@/store/mutations";
import actions from "@/store/actions";

import articles from "@/store/Modules/articles";

export default createStore({
    state,
    getters,
    mutations,
    actions,
    modules:{
        articles
    }
})