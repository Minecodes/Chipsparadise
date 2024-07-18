<script setup>
import { ref, reactive, watch } from 'vue'
import axios from 'axios'

const bank = reactive({
  amount: 0
})
const apiHost = 'https://api.sas.thohme.de'
const rolling = ref(false)
const payIn = ref(0)
const rimg = reactive({
  1: "/i1.png",
  2: "/i1.png",
  3: "/i1.png"
})

if (localStorage.getItem('token')) {
  axios.get(`${apiHost}/money?u=${localStorage.getItem('token')}`)
    .then((response) => {
      bank.amount = response.data.amount
    })
    .catch((error) => {
      console.log(error)
    })
}

const handleRoll = async () => {
  const pay = bank.amount * 0.15
  payIn.value = pay
  axios.get(`${apiHost}/amoney?u=${localStorage.getItem('token')}&a=-${pay}`)
    .then((response) => {
      bank.amount = response.data.amount
    })
    .catch((error) => {
      console.log(error)
    })

  while (rolling.value) {
    console.log("New Roll...")
    let ra1 = new Uint32Array(1)
    let ra2 = new Uint32Array(1)
    let ra3 = new Uint32Array(1)
    crypto.getRandomValues(ra1)
    crypto.getRandomValues(ra2)
    crypto.getRandomValues(ra3)
    rimg[1] = `/i${ra1[0] % 70 + 1}.png`
    rimg[2] = `/i${ra2[0] % 70 + 1}.png`
    rimg[3] = `/i${ra3[0] % 70 + 1}.png`
    let raDelay = new Uint32Array(1)
    crypto.getRandomValues(raDelay)
    let delay = raDelay[0] % 850 + 150


    // delay 0.25 - 2 seconds
    await new Promise(resolve => setTimeout(resolve, delay))
    //await new Promise(resolve => setTimeout(resolve, 500))
  }
}

const handleStop = () => {
  if (!rolling.value) {
    let r1 = 1
    let r2 = 1
    let r3 = 1

    let i1 = Number(rimg[1].replace("/i", "").replace(".png", ""))
    let i2 = Number(rimg[2].replace("/i", "").replace(".png", ""))
    let i3 = Number(rimg[3].replace("/i", "").replace(".png", ""))
    i1 <= 30 ? r2 = 1 : null
    i1 <= 48 && 31 <= i1 ? r2 = 2 : null
    i1 <= 60 && 49 <= i1 ? r2 = 3 : null
    i1 <= 66 && 61 <= i1 ? r2 = 4 : null
    i1 <= 70 && 67 <= i1 ? r2 = 5 : null

    i2 <= 30 ? r2 = 1 : null
    i2 <= 48 && 31 <= i2 ? r2 = 2 : null
    i2 <= 60 && 49 <= i2 ? r2 = 3 : null
    i2 <= 66 && 61 <= i2 ? r2 = 4 : null
    i2 <= 70 && 67 <= i2 ? r2 = 5 : null

    i3 <= 30 ? r2 = 1 : null
    i3 <= 48 && 31 <= i3 ? r2 = 2 : null
    i3 <= 60 && 49 <= i3 ? r2 = 3 : null
    i3 <= 66 && 61 <= i3 ? r2 = 4 : null
    i3 <= 70 && 67 <= i3 ? r2 = 5 : null

    if (r1 === r2 && r2 === r3 && r1 === r3) {
      axios.get(`${apiHost}/croll?u=${localStorage.getItem('token')}&a=${r1}&b=${r2}&c=${r3}&p=${payIn.value}`)
        .then((response) => {
          bank.amount = response.data.amount
          alert(`Jackpot! Du hast besitzt ${Math.round(response.data.amount)} Lapis!`)
        })
        .catch((error) => {
          console.log(error)
        })
    } else if ((r1 === r2 && r2 !== r3 && r1 !== r3) || (r1 === r3 && r1 !== r2 && r3 !== r2) || (r2 === r3 && r2 !== r1 && r3 !== r1)) {
      axios.get(`${apiHost}/croll?u=${localStorage.getItem('token')}&a=${r1}&a=${r2}&b=${r3}&c=${r1}&p=${payIn.value}`)
        .then((response) => {
          bank.amount = response.data.amount
          alert(`You win! Du hast besitzt ${Math.round(response.data.amount)} Lapis!`)
        })
        .catch((error) => {
          console.log(error)
        })
    } else {
      axios.get(`${apiHost}/croll?u=${localStorage.getItem('token')}&a=${r1}&a=${r2}&b=${r3}&c=${r1}&p=0`)
        .then((response) => {
          bank.amount = response.data.amount
          alert(`Schade... Du besitzt nun ${Math.round(response.data.amount)} Lapis!`)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}

const roll = () => {
  console.log('Rolling...')
  axios.get(`${apiHost}/money?u=${localStorage.getItem('token')}`)
    .then((response) => {
      bank.amount = response.data.amount
    })
    .catch((error) => {
      console.log(error)
    })
  if (bank.amount > 1 && !rolling.value) {
    rolling.value = !rolling.value
    handleRoll()
  } else if (bank.amount <= 1 && !rolling.value) {
    alert('Not enough money! Please top up first.')
  } else {
    rolling.value = !rolling.value
    handleStop()
  }
}

const getImg = (i) => {
  return rimg[i]
}
</script>

<template>
  <div>
    <p>Bank: {{ bank.amount }}</p>
    <p>Pay in: {{ payIn }}</p>
    <img :src="getImg(1)" class="roll" alt="Roll 1" />
    <img :src="getImg(2)" class="roll" alt="Roll 2" />
    <img :src="getImg(3)" class="roll" alt="Roll 3" />
    <!--<div v-for="i in iarr">
      <img :src="i" class="roll" alt="Roll" />
    </div>-->
    <br />
    <button @click="roll">Roll</button>
    <div v-show="true">
      <img src="/i1.png" height="1px" rel="preload" />
      <img src="/i2.png" height="1px" rel="preload" />
      <img src="/i3.png" height="1px" rel="preload" />
      <img src="/i4.png" height="1px" rel="preload" />
      <img src="/i5.png" height="1px" rel="preload" />
      <img src="/i6.png" height="1px" rel="preload" />
      <img src="/i7.png" height="1px" rel="preload" />
      <img src="/i8.png" height="1px" rel="preload" />
      <img src="/i9.png" height="1px" rel="preload" />
      <img src="/i10.png" height="1px" rel="preload" />
      <img src="/i11.png" height="1px" rel="preload" />
      <img src="/i12.png" height="1px" rel="preload" />
      <img src="/i13.png" height="1px" rel="preload" />
      <img src="/i14.png" height="1px" rel="preload" />
      <img src="/i15.png" height="1px" rel="preload" />
      <img src="/i16.png" height="1px" rel="preload" />
      <img src="/i17.png" height="1px" rel="preload" />
      <img src="/i18.png" height="1px" rel="preload" />
      <img src="/i19.png" height="1px" rel="preload" />
      <img src="/i20.png" height="1px" rel="preload" />
      <img src="/i21.png" height="1px" rel="preload" />
      <img src="/i22.png" height="1px" rel="preload" />
      <img src="/i23.png" height="1px" rel="preload" />
      <img src="/i24.png" height="1px" rel="preload" />
      <img src="/i25.png" height="1px" rel="preload" />
      <img src="/i26.png" height="1px" rel="preload" />
      <img src="/i27.png" height="1px" rel="preload" />
      <img src="/i28.png" height="1px" rel="preload" />
      <img src="/i29.png" height="1px" rel="preload" />
      <img src="/i30.png" height="1px" rel="preload" />
      <img src="/i31.png" height="1px" rel="preload" />
      <img src="/i32.png" height="1px" rel="preload" />
      <img src="/i33.png" height="1px" rel="preload" />
      <img src="/i34.png" height="1px" rel="preload" />
      <img src="/i35.png" height="1px" rel="preload" />
      <img src="/i36.png" height="1px" rel="preload" />
      <img src="/i37.png" height="1px" rel="preload" />
      <img src="/i38.png" height="1px" rel="preload" />
      <img src="/i39.png" height="1px" rel="preload" />
      <img src="/i40.png" height="1px" rel="preload" />
      <img src="/i41.png" height="1px" rel="preload" />
      <img src="/i42.png" height="1px" rel="preload" />
      <img src="/i43.png" height="1px" rel="preload" />
      <img src="/i44.png" height="1px" rel="preload" />
      <img src="/i45.png" height="1px" rel="preload" />
      <img src="/i46.png" height="1px" rel="preload" />
      <img src="/i47.png" height="1px" rel="preload" />
      <img src="/i48.png" height="1px" rel="preload" />
      <img src="/i49.png" height="1px" rel="preload" />
      <img src="/i50.png" height="1px" rel="preload" />
      <img src="/i51.png" height="1px" rel="preload" />
      <img src="/i52.png" height="1px" rel="preload" />
      <img src="/i53.png" height="1px" rel="preload" />
      <img src="/i54.png" height="1px" rel="preload" />
      <img src="/i55.png" height="1px" rel="preload" />
      <img src="/i56.png" height="1px" rel="preload" />
      <img src="/i57.png" height="1px" rel="preload" />
      <img src="/i58.png" height="1px" rel="preload" />
      <img src="/i59.png" height="1px" rel="preload" />
      <img src="/i60.png" height="1px" rel="preload" />
      <img src="/i61.png" height="1px" rel="preload" />
      <img src="/i62.png" height="1px" rel="preload" />
      <img src="/i63.png" height="1px" rel="preload" />
      <img src="/i64.png" height="1px" rel="preload" />
      <img src="/i65.png" height="1px" rel="preload" />
      <img src="/i66.png" height="1px" rel="preload" />
      <img src="/i67.png" height="1px" rel="preload" />
      <img src="/i68.png" height="1px" rel="preload" />
      <img src="/i69.png" height="1px" rel="preload" />
      <img src="/i70.png" height="1px" rel="preload" />
      <p v-show="false">{{ rimg[1] }}</p>
      <p v-show="false">{{ rimg[2] }}</p>
      <p v-show="false">{{ rimg[3] }}</p>
    </div>
  </div>
</template>

<!--<script>
export default {
  data() {
    return {
      imageUrl1: "1.png",
      imageUrl2: "1.png",
      imageUrl3: "1.png",
      imageUrls: ["1.png", "2.png", "3.png", "4.png", "5.png"],
      intervalId: null,
      rolling: false,
    };
  },
  methods: {
    toggleSpin() {
      console.log("Rolling...");
      this.rolling = !this.rolling;
      if (this.rolling) {
        this.intervalId = setInterval(this.updateImages, 250);
      } else {
        clearInterval(this.intervalId);
        this.intervalId = null;
      }
    },
    updateImages() {
      console.log("New Roll...")
      console.log(this.imageUrl1, this.imageUrl2, this.imageUrl3)
      const ra1 = new Uint32Array(1)
      const ra2 = new Uint32Array(1)
      const ra3 = new Uint32Array(1)
      crypto.getRandomValues(ra1)
      crypto.getRandomValues(ra2)
      crypto.getRandomValues(ra3)
      const r1 = ra1[0] % 70 + 1
      const r2 = ra2[0] % 70 + 1
      const r3 = ra3[0] % 70 + 1
      //const r1 = Math.floor(Math.random() * 70) + 1
      //const r2 = Math.floor(Math.random() * 70) + 1
      //const r3 = Math.floor(Math.random() * 70) + 1
      const delay = Math.floor(Math.random() * 1000) + 250
      console.log(r1, r2, r3)

      if (r1 <= 7) {
        this.imageUrl1 = "/1.png"
        console.log("Image 1 changed to " + this.imageUrl1)
      } else if (8 <= r1 <= 15) {
        this.imageUrl1 = "/2.png"
        console.log("Image 1 changed to " + this.imageUrl1)
      } else if (16 <= r1 <= 27) {
        this.imageUrl1 = "/3.png"
        console.log("Image 1 changed to " + this.imageUrl1)
      } else if (28 <= r1 <= 45) {
        this.imageUrl1 = "/4.png"
        console.log("Image 1 changed to " + this.imageUrl1)
      } else if (46 <= r1 <= 70) {
        this.imageUrl1 = "/5.png"
        console.log("Image 1 changed to " + this.imageUrl1)
      }

      if (r2 <= 7) {
        this.imageUrl2 = "/1.png"
        console.log("Image 2 changed to " + this.imageUrl2)
      } else if (7 < r2 <= 15) {
        this.imageUrl2 = "/2.png"
        console.log("Image 2 changed to " + this.imageUrl2)
      } else if (15 < r2 <= 27) {
        this.imageUrl2 = "/3.png"
        console.log("Image 2 changed to " + this.imageUrl2)
      } else if (27 < r2 <= 45) {
        this.imageUrl2 = "/4.png"
        console.log("Image 2 changed to " + this.imageUrl2)
      } else if (45 < r2 <= 70) {
        this.imageUrl2 = "/5.png"
        console.log("Image 2 changed to " + this.imageUrl2)
      }

      if (r3 <= 7) {
        this.imageUrl3 = "/1.png"
        console.log("Image 3 changed to " + this.imageUrl3)
      } else if (7 < r3 <= 15) {
        this.imageUrl3 = "/2.png"
        console.log("Image 3 changed to " + this.imageUrl3)
      } else if (15 < r3 <= 27) {
        this.imageUrl3 = "/3.png"
        console.log("Image 3 changed to " + this.imageUrl3)
      } else if (27 < r3 <= 45) {
        this.imageUrl3 = "/4.png"
        console.log("Image 3 changed to " + this.imageUrl3)
      } else if (45 < r3 <= 70) {
        this.imageUrl3 = "/5.png"
        console.log("Image 3 changed to " + this.imageUrl3)
      }

      clearInterval(this.intervalId)
      this.intervalId = setInterval(this.updateImages, delay)
    },
    destroyed() {
      if (this.intervalId) {
        clearInterval(this.intervalId);
      }
    },
  }
}
</script>-->

<style scoped>
.read-the-docs {
  color: #888;
}

.roll {
  height: 100px;
  padding: 1.5em;
}
</style>