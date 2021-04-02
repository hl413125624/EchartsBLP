import EchartsBLP from './EchartsBLP.vue';
const Paypop = {
    install(Vue, options){
        Vue.component(EchartsBLP.name, EchartsBLP)
    }
}
if(typeof window !== 'undefined' && window.Vue) {
   window.Paypop = Paypop
   Vue.use(Paypop)
}

export default Paypop