<template>
  <!-- s 地址管理 -->
  <section class="address-manage">
    <Theme :theme="theme"></Theme>
    <AddressTips :origin="origin"></AddressTips>
    <button class="manage-btn" @click="gotoPage('add-address')">
      <div>新增收货地址</div>
    </button>
  </section>
  <!-- e 地址管理 -->
</template>

<script>
import Theme from '../common/theme/theme.vue'
import AddressTips from './address-tips/address-tips.vue'
import { mapMutations } from 'vuex'
export default {
  name: 'AddressManage',
  components: {
    Theme,
    AddressTips
  },
  data () {
    return {
      theme: {
        title: '地址管理',
        goal: null
      },
      origin: null
    }
  },
  created () {
    this.origin = this.$store.state.origin2
    this.theme.goal = this.$store.state.origin2
    this.saveOrigin4('address-manage')
  },
  methods: {
    gotoPage (page) {
      this.$router.push({
        name: page
      })
    },
    ...mapMutations(['saveOrigin4'])
  }
}
</script>

<style lang="sass" scoped>
@import "./address-manage.scss";
</style>
