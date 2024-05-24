const statusModel = {
    namespaced: true,
    state() {
        return {
            message: "Status",
            bShow: true
        }
    },
    mutations: {
        showMessage(state, info) {
            state.message = info
            state.bShow = true
            // Hide message after 5 seconds
            setTimeout(() => {
                state.bShow = false
            }, 5000)
        }
    }
}

export default statusModel