export const useLanguageStore= defineStore({
    id: 'language',
    state:()=>{
        return{
            langIcon: '',langLangauge: 'en',isActive:false
        }
    },
    getters:{
        langIcon1: (state)=>{ return state.langIcon},
        langLangauge1:(state)=>{return state.langLangauge}
      },
      actions:{
        changeLang ( payload) {
            if(process.client)
            localStorage.setItem('currentLanguage', payload.code);
            localStorage.setItem('currentLanguageIcon', payload.icon);
            this.langIcon = payload.icon || 'flag-icon-us'
            this.langLangauge = payload.code || 'en'
          },
          change(state){
            this.isActive = !state.isActive
          }
      }
})