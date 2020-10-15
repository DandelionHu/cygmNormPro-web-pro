<template>
  <div>
    测试页面
    <avatar-list size="default">
      <avatar-list-item
        v-for="(member, i) in members"
        :key="`${member.id}-avatar-${i}`"
        :src="member.avatar"
        :tips="member.name"
      />
    </avatar-list>
  </div>
</template>
<script>
  import { AvatarList } from '@/components'
  const AvatarListItem = AvatarList.AvatarItem
  export default {
    data () {
      return {
        members: [
          {
            id: 1,
            avatar: '22',
            name: '名称'
          }
        ]
      }
    },
    components: {
      AvatarList,
      AvatarListItem
    },
    computed: {
    },
    mounted() {
    },
    methods: {
    }
  }
</script>
<style lang="less" scoped>
</style>
