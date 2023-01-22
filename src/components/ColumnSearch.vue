<template>
    <div class="col s12">
        <label for="last_name">{{columnName}}</label>
          <input @keyup="setSearch" v-model="tx_pesquisa" id="last_name" type="text" class="validate">
          <i class="material-icons Tiny">close</i>
    </div>
</template>

<script>
export default {
props:{
    columnName:String,
    column:String


},
data(){
    return{
        tx_pesquisa:""
    }
},
methods:{
    setSearch: function(){
        this.$emit("search", {tx:this.tx_pesquisa, column:this.column})
    }
}
}
</script>

<style>

</style>
