<template>
  <div class="main">
    <div class="turnplate-box">
      <turnplate :offset="offset" :wheel="wheel" @turnWheel="turnWheel" @handlePlate="handlePlate" /> 
    </div>
    <div class="prize-box">
      <div class="prize-container" v-for="(item, index) in prize" :key="index">
        <div class="prize-num">
          <span class="color-fff f16 title">{{item.title}}</span>
          <span class="color-b8 f14 button">{{item.num}}</span>
        </div>
        <p class="color-fff f13 content">{{item.content}}</p>
      </div>
    </div>

    <!-- 模态框 -->
    <div class="popLayer" v-show="dialogShow"></div>
    <div v-show="dialogShow" class="confirm-box">
      <img class="cancel-icon" @click="dialogShow=false" src="../../static/img/turnplate/cancel@2x.png" alt="">
      <img class="prize-img" v-if="prizeText!='谢谢参与'" src="../../static/img/turnplate/prize@2x.png" alt="">
      <img  class="prize-img" v-if="prizeText=='谢谢参与'" src="../../static/img/turnplate/participation@2x.png" alt="">
      <p class="color-333 f18 mt9" v-if="prizeText!='谢谢参与'">恭喜中奖</p>
      <p class="color-333 f18 mt9" v-if="prizeText=='谢谢参与'">谢谢参与</p>
      <p class="color-333 f14 mt8" v-if="prizeText!='谢谢参与'">恭喜您获得了{{prizeText}}</p>
      <p class="color-333 f14 mt8" v-if="prizeText=='谢谢参与'">谢谢您的参与</p>
      <p class="color-333 f14" v-if="onemore>0">还有{{onemore}}次抽奖机会</p>
      <div class="bottom" @click="goon">
        <span class="f18" v-if="onemore>0">继续抽奖</span>
        <span class="f18" v-if="onemore<=0">确认</span>
      </div>
    </div>
  </div>

</template>

<script>
import Turnplate from '@/components/turnplate'
import Axios from 'axios'
import qs from 'qs'
export default {
  name: 'roulette-pages',
  components: {
    Turnplate
  },
  data () {
    return {
      prize: [
        {id: 1, title: '一等奖', num: '价值1500元', content: '免费入住德尔塔酒店豪华客房一晚并含翌日 双人早餐+真味馆中餐厅双人点心任点任食。'},
        {id: 2, title: '二等奖', num: '价值600元', content: '德尔塔酒店-莲全日制餐厅双人自助晚餐'},
        {id: 3, title: '三等奖', num: '价值300元', content: '品牌保温杯'},
        {id: 4, title: '四等奖', num: '价值100元', content: '旅行收纳包13件套'},
        {id: 5, title: '五等奖', num: '价值40元', content: '精美书签一套'},
      ],
      offset:1, 
      prizeText: '',
      wheel: true,
      onemore: 0,
      dialogShow: false,
      prizes: ['五等奖','一等奖','谢谢参与','二等奖','谢谢参与','三等奖','四等奖','谢谢参与']
    }
  },
  methods: {
    // 继续抽奖
    goon() {
      this.dialogShow = false
    },
    turnWheel() {
      this.stopClick(`stopClickLogin`).then(()=>{
        console.log(`do something >>>>>>>>>`)
        this.getLuck()
      })
    },
    handlePlate() {
      this.dialogShow = true
    },
    stopClick(name=`stopClick`,time=5000,msg=`请等待5s后再次点击`){
      let that = this
       return new Promise((resolve,reject)=>{
           if(that[name]){
             console.log(`${msg} >>>>>>>>>`)
             return false
           }
           that[name]=true
           setTimeout(()=>{
               that[name]=false
           },time)
           resolve()
        })
    },
    getQuery(name) {
      var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
      var r = location.href.split("?")[1].match(reg);
      if(r!=null)return  unescape(r[2]); return null;
    },
    getLuck () {
      const params = qs.stringify({
        token: this.getQuery('token'),
        level_id: this.getQuery('level_id')
        // token: 'dc5e13d93a6b40301e550576e17e9bbc2b23c12d',
        // level_id: 9
      })
      Axios.post(`https://bsapi.suoqoo.com/index/Activity/startLucky?${params}`).then(res=>{
        if(res.data.Code==="100000") {
          // this.prizeText = '二等奖'
          this.prizeText = res.data.Data.lucky_prize
          // this.offset = 3
          this.offset = this.prizes.indexOf(res.data.Data.lucky_prize)
          console.log(this.offset)
          this.onemore = res.data.Data.award_count
        } else {
          this.wheel = false
          this.toastShow(res.data.Msg)
        }
      }).catch(err=>{
        this.wheel = false
      })
    }
  }
}

</script>
<style scoped>
.main {
  background-image: url('../../static/img/turnplate/Bitmap@2x.png');
  width: 100%;
  height: 100%;
  display: flex;
  display:-webkit-flex;
  position: relative;
  background-size: 100%;
  background-repeat: no-repeat;
  flex-direction: column;
}
.turnplate-box {
  margin: 37px auto 24px auto;
}
.f13 {
  font-size: 13px;
}
.f14 {
  font-size: 14px;
}
.f16 {
  font-size: 16px
}
.color-fff {
  color: #ffffff;
}
.color-333 {
  color: #333333;
}
.color-b8 {
  color: #B87602;
}
.prize-box {
  width: 81.3%;
  margin: 0 auto 46px auto;
}
.prize-container:nth-child(odd) {
  background-color: #FFA300;
  padding-left: 3.3%;
  padding-top: 9px;
  padding-bottom: 18px;
}
.prize-container:nth-child(even) {
  background-color: #FDBA20;
  padding-left: 3.3%;
  padding-top: 9px;
  padding-bottom: 18px;
}
.prize-container:first-child {
  border-radius: 8px 8px 0 0;
}
.prize-container:last-child {
  border-radius: 0 0 8px 8px;
}
.prize-num {
  display: flex;
  display: -webkit-flex;
  justify-content: space-between;
  -webkit-justify-content: space-between;
}
.button {
  width: 31.8%;
  height: 32px;
  line-height: 32px;
  background: linear-gradient(#FFE5B6, #FFFFFF);
  opacity: 0.853;
  text-align: center;
  border-radius: 100px 0 0 100px;
}
.title {
  margin-top: 6px;
}
.content {
  margin-top: 4px;
  margin-right: 6.6%;
}
.popLayer {
  background-color: #131313;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1100;
  -moz-opacity: 0.8;
  opacity:.80;
  filter: alpha(opacity=80)
}
.confirm-box {
  width: 270px;
  height: 242px;
  position:fixed;
  top:0;
  right:0;
  left:0;
  bottom:0;
  margin: auto;
  background-color: #FFFFFF;
  z-index: 1101;
  text-align: center;
}
.cancel-icon {
  position: absolute;
  width: 16px;
  height: 16px;
  right: 15px;
  top: 15px;
}
.prize-img {
  width: 67px;
  height: 67px;
  margin: 23px auto 0 auto;
}
.mt9 {
  margin-top: 9px;
}
.mt8 {
  margin-top: 8px;
}
.bottom {
  border-top: 1px solid #E5E5E5;
  height: 49px;
  bottom: 0;
  line-height: 49px;
  width: 100%;
  position: absolute;
  color: #4DA780;
}
</style>

