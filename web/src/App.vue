<script setup>
import Login from './components/Login.vue'
import Roll from './components/Roll.vue'

import axios from 'axios'
import { ref } from 'vue'

const loggedIn = ref(false)
const token = ref('')
const apiHost = 'https://api.sas.thohme.de'
//const apiHost = 'http://localhost:3000'

if (localStorage.key('token')) {
  token.value = localStorage.getItem('token')
  axios.get(`${apiHost}/uexist?u=${token.value}`)
    .then((response) => {
      console.log(response.data)
      if (response.data.exists == true) {
        loggedIn.value = true
        console.log('User authenticated')
      } else {
        loggedIn.value = false
        token.value = ''
        localStorage.removeItem('token')
      }
    })
    .catch((error) => {
      console.log(error)
    })
  console.log('Token found')
}

const logout = () => {
  loggedIn.value = false
  token.value = ''
  localStorage.removeItem('token')
  console.log('User logged out')
}
</script>

<template>
  <div>
    <h1>Welcome to Chipsparadise</h1>
    <button v-show="loggedIn" @click="logout">Logout</button>
  </div>
  <Login v-show="!loggedIn" />
  <Roll v-show="loggedIn" />
</template>

<!--
<div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="Vite + Vue" />
-->

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
