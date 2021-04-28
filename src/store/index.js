import { createStore } from "vuex";

//Load globals
import state from "@/store/global/state";
import getters from "@/store/global/getters";
import mutations from "@/store/global/mutations";
import actions from "@/store/global/actions";

//Load modules
//Nothing to load yet

export default createStore({
    state,
    getters,
    mutations,
    actions,
    modules: {

    }
});
