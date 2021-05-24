<template>
  <div>
    <h1>Trinity College Old Library</h1>
    <h3>Ingrese los datos para registrar el libro</h3>
    <br>
        <form @submit.prevent="estatusEditar ? updateBook() : addBook()">
            <p>
              <label for="">Nombre  </label>
              <input type="text" v-model="name">
              
            </p>  
            <p>
              <br>
              <label for="">ID  </label>
              <input type="number" v-model="num">
              
            </p>
              <br>
              <p>
              <label for="">Autor  </label>
              <input type="text" v-model="author">
              
            </p>
            <p>
              <br>
              <button v-if="estatusEditar" @click="estatusEditar= false, name='', num='',author='' ">Cancelar</button>
              <button type="submit">{{ estatusEditar ? "Editar": "Agregar" }}</button>
            </p>
        </form>
        <img src="https://pa1.narvii.com/6707/510b0daee67fbc091f14b9d8ef40aeb6c0d4dc7d_hq.gif" v-if="cargando">
        <!--{{estatusEditar}}-->
        <ul>
          <li v-for="book in books" :key="book.id">
                {{book.name}} - {{book.author}} - {{book.num}} -
                  <button @click="deleteBook(book)">Eliminar</button>
                  <button @click="selectBook(book)">Editar</button>
          </li>
        </ul>
    </div>
</template>

<script>

import {db} from './firebase'

export default {
  name: 'App',
  data(){
    return {
      books: [],
      num: "",
      name: "",
      author: "",
      cargando: false,
      estatusEditar: false
    }
  },
   created() {
    this.listarBooks();
  },
  methods: {
    async listarBooks(){

          this.cargando = true;
          const data = await db.collection("books").get();
          this.books = data.docs.map(doc => ({
            id: doc.id, ...doc.data()
          }))
          this.cargando = false;
          console.log(this.books);

    },
    async addBook() {
        await db.collection('books').add(
          {
            name:  this.name,
            num: this.num,
            author: this.author
          }
        )
        this.name = "";
        this.num = "";
        this.author ="";
        this.listarBooks();
    },
    async deleteBook(book){

      if(confirm(`Estas seguro que deseas eliminar ${book.name} de ${book.author}`)){
        await db.collection('books').doc(book.id).delete();
        this.name = "";
        this.num = "";
        this.author ="";
        this.listarBooks();
      }

    },
    selectBook(book){
      this.estatusEditar = true;
      this.id = book.id;
      this.num = book.num;
      this.name = book.name;
      this.author = book.author;
    },
    async updateBook(){
      await db.collection('books').doc(this.id).set(
        {
          name: this.name,
          num: this.num,
          autor: this.author
        }
      )

      this.estatusEditar = false;
      this.num = "";
      this.name = "";
      this.author = ""; 
      this.listarBooks();
      
    }
  },  

}
</script>

<style>
#app {
  font-family: monospace;
  font-weight: bold;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #232d36;
  margin-top: 60px;
}

label{
   color: rgb(38, 38, 155);
   font-weight: bold;
}

button{
  border-radius: 8px ;
  color: rgb(38, 38, 155);
  font-weight: bold;
}

input{
  border-radius: 12px ;
}
h1{
  font-weight: bold;
}
h3{
  font-weight: bold;
}
</style>

