<template>
  <ion-backdrop class="z-deep" tappable="true" visible="true" @ionBackdropTap="hideKeyboard"></ion-backdrop>
  <div class="content z-deep">
    <ion-input disabled="true" placeholder="请输入该银行卡的支付密码" v-model="password" type="password"></ion-input>
    <div class="keyboard">
      <div class="left">
        <div class="row">
          <div>
            <div @click="updatePassword">1</div>
          </div>
          <div>
            <div @click="updatePassword">2</div>
          </div>
          <div>
            <div @click="updatePassword">3</div>
          </div>
        </div>
        <div class="row">
          <div>
            <div @click="updatePassword">4</div>
          </div>
          <div>
            <div @click="updatePassword">5</div>
          </div>
          <div>
            <div @click="updatePassword">6</div>
          </div>
        </div>
        <div class="row">
          <div>
            <div @click="updatePassword">7</div>
          </div>
          <div>
            <div @click="updatePassword">8</div>
          </div>
          <div>
            <div @click="updatePassword">9</div>
          </div>
        </div>
        <div class="row">
          <div class="zero">
            <div @click="updatePassword">0</div>
          </div>
          <div class="dot">
            <div>.</div>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="delete">
          <div @click="myDelete">x</div>
        </div>
        <div class="confirm">
          <div>
            <div id="con-text" @click="submit">确定</div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue';
import {IonInput, IonBackdrop} from "@ionic/vue";

export default defineComponent({
  name: 'keyBoard',
  components: {
    IonBackdrop,
    IonInput
  },
  setup() {
    const password = ref('');
    return {password};
  },
  emits: {
    submit: (password) => {
      console.log(password);
      if (password.length != 6) {
        console.error('password长度必须为6位！！！');
        return false;
      }
      return true;
    },
    hideKeyboard: () => {
      return true
    }
  }
  ,
  methods: {
    updatePassword: function (e: any) {
      if (this.password.length < 6) {
        this.password += e.target.innerText;
      }
      console.log(this.password);
    },

    myDelete: function () {
      if (this.password.length > 0) {
        console.log(this.password);
        this.password = this.password.slice(0, -1);
        console.log(this.password);
      }
    },

    submit: function () {
      this.$emit('submit', this.password);
    },

    hideKeyboard: function () {
      this.$emit('hideKeyboard');
    }
  }

});
</script>

<style scoped>
.z-deep {
  z-index: 2;
}

.content {
  position: fixed;
  top: 100%;
  width: 100%;
  transform: translateY(-100%);
  padding-top: 30px;
  text-align: center;
  background-color: #EAEAEA;
}


ion-input {
  margin: auto;
  width: 80%;
  background-color: white;
}

.keyboard {
  display: flex;
  flex-direction: row;
  padding-top: 15px;
  padding-bottom: 12px;
}

.left {
  flex: 9;
}

.right {
  flex: 3;
}

.row {
  display: flex;
  flex-direction: row;
}

.row > div {
  flex: 4;
}

.row > div > div {
  margin: 3px;
  line-height: 40px;
  background-color: white;
}

.row > .zero {
  flex: 8;
}

.row > .dot {
  flex: 4;
}

.right {
  display: flex;
  flex-direction: column;
}

.delete {
  flex: 3;
}

.delete > div {
  border-radius: 20px 0 0 20px;
  margin: 3px;
  line-height: 40px;
  background-color: white;
}

.confirm {
  flex: 9;
  display: flex;
}

.confirm > div {
  background-color: #00FF66;
  margin: 3px;
  line-height: 100%;
  width: 100%;
}

#con-text {
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}

</style>
