<template>
  <div class="tabs">
    <el-tag
      v-for="(item,index) in tabsList"
      :key="item.name"
      :closable="item.name !== 'home'"
      :effect="$route.name === item.name ? 'dark' : 'plain'"
      @click="changeMenu(item)"
      @close="handleClose(item,index)"
      size="small"
    >
      {{ item.label }}
    </el-tag>
  </div>
</template>

<script>
import { mapState,mapMutations } from "vuex";
export default {
  name: "CommonTag",
  data() {
    return {};
  },
  computed: {
    ...mapState(["tabsList"]),
  },
  methods: {
    ...mapMutations({closeTag:'closeTag'}),
    changeMenu(item){
      this.$router.push({
        name:item.name
      })
    },
    handleClose(item,index){
      const length = this.tabsList.length - 1
      this.closeTag(item)
      if (item.name !== this.$route.name) {
        return;
      }
      if (index === length) {
        this.$router.push({
          name:this.tabsList[index - 1].name
        })
      } else {
        this.$router.push({
          name:this.tabsList[index].name
        })
      }
    },
  },
};
</script>

<style lang="less" scoped>
  .tabs{
    padding: 20px;
    .el-tag{
      margin-right: 15px;
      cursor: pointer;
    }
  }
</style>