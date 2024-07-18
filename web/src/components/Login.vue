<script setup>
import { ref } from 'vue'
import axios from 'axios'

const token = ref('')
const errorMessage = ref('')
const apiHost = 'https://api.sas.thohme.de'
//const apiHost = 'http://localhost:3000'

const login = async () => {
  axios.get(`${apiHost}/uexist?u=${token.value}`)
    .then((response) => {
      console.log(response.data)
      if (response.data.exists == true) {
        localStorage.setItem('token', token.value)
        errorMessage.value = ''
        location.reload()
      } else {
        errorMessage.value = 'User does not exist'
      }
    })
    .catch((error) => {
      console.log(error)
    })
}
</script>

<template>
  <div class="">
    <h1>Login</h1>

    <div class="card">
      <input type="password" v-model="token" />
      <button type="button" @click="login">Login</button>
      <br />
      <strong class="error">{{ errorMessage }}</strong>
    </div>
  </div>
</template>

<style scoped>
.error {
  color: red;
}
</style>
