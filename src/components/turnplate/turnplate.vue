<template>
<div>
  <div class="turnplate">
    <div class="mask">
      <img class="plate" src="../../../static/img/turnplate/turnplate@2x.png" />
      <img class="pointer" src="../../../static/img/turnplate/turnplate-pointer@2x.png" v-turn/>
    </div>
  </div>
</div>
</template>

<script>
export default {
  props: {
    offset: Number,
    wheel: Boolean
  },
  data () {
    return {
      speed: [0.2, 0.4, 0.6, 0.8, 1, 1, 1.2, 1.4, 1.6, 1.8,
                1.8, 1.6, 1.4, 1.2, 1, 1, 0.8, 0.6, 0.4, 0.2],
      stangle: 0,
      deg: 0,
      total:0
    }
  },
  methods: {
    rotate(plate){
      this.deg = 0
      this.total = 0
      this.stangle = 18 - (0.225 * this.offset) + 0.1
      for(let i=0;i<200;i++){
        setTimeout(()=>{
          this.deg =  this.stangle * this.speed[parseInt(i/10)]
          this.total = this.total +  this.deg
          plate.style.transform=`rotate(${this.total}deg)`
          if(i==199){
            this.total = 0
            this.$emit('handlePlate')
          }
        },i*50)           
      }
    },
    stopClick(name=`stopClick`,time=5000,msg=`请等待5s后再次点击`){
      let that = this
       return new Promise((resolve,reject)=>{
         if(that[name]){
           console.log(`${msg} --------`)
           return false
         }
         that[name]=true
         setTimeout(()=>{
             that[name]=false
         },time)
         resolve()
      })
    },
    turnWheel() {
      this.stopClick(`stopClickLogin`).then(()=>{
        this.$emit('turnWheel')
        console.log('>>>>>>>>>')
        setTimeout(()=>{
          if(this.wheel) {
            const plate = document.querySelector('.plate')
            this.rotate(plate)
          }
        }, 1000)
      })
    },
   },
  directives: {
    turn(el, binding, vnodel) {   
      el.onclick = () => {
        console.log(vnodel.context.total, '++++++')
        if(vnodel.context.total>0) return 
        vnodel.context.turnWheel() 
      }
    }
  }
}
</script>

<style lang="less" scoped>
.turnplate {
  width: 330px;
  height: 330px;
  display: flex;
  display: -webkit-flex;
  position: relative;
}

.mask {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  display: -webkit-flex;
  justify-content: center;
  -webkit-justify-content: center;
  align-items: center;
  -webkit-align-items:center;
  -moz-align-items:center;
  -ms-align-items:center;
  -o-align-items:center;
}

.plate {
  width: 100%;
  // height: 360px;
}

.pointer {
  position: absolute;
  width: 39.3%;
  // height: 90px;
  cursor: pointer;
  z-index: 1000;
}
</style>