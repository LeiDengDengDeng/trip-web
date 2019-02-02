<template>
  <div>
    <Table border :columns="columns" :data="list"></Table>
    <Modal
      v-model="modal"
      title="用户认证照片">
      <div style="display: flex;justify-content: center;">
        <img :src="pictureUrl"/>
      </div>
      <div slot="footer">
        <Button type="error" size="large" @click="examine('UNAPPROVED')">不通过</Button>
        <Button type="success" size="large" @click="examine('CHECKED')">审批通过</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import {host} from '../utils/apiConfig'

export default {
  name: 'examine',
  created () {
    this.loadList()
  },
  data () {
    return {
      formModalVisible: false,
      current: '',
      pictureUrl: '',
      modal: false,
      columns: [
        {
          title: 'ID',
          key: 'id',
          sortable: true,
          width: 70
        },
        {
          title: '微信ID',
          key: 'username',
          sortable: true,
          width: 150
        },
        {
          title: '微信名',
          key: 'nickname',
          sortable: true
        },
        {
          title: '真实姓名',
          key: 'name',
          sortable: true
        },
        {
          title: '性别',
          key: 'gender',
          sortable: true,
          width: 100,
          render: (h, params) => {
            return h('div', params.row.gender === 0 ? '女' : '男')
          }
        },
        {
          title: '认证照片',
          key: 'pictureUrl',
          width: 600,
          render: (h, params) => {
            return h('a', {
              on: {
                click: () => {
                  this.modal = true
                  this.pictureUrl = params.row.pictureUrl
                  this.current = params.row._index
                }
              }
            }, params.row.pictureUrl)
          }
        }
      ],
      list: []
    }
  },
  methods: {
    loadList () {
      this.$http.get(`${host}/user/state/CHECKING`).then(
        function (data) {
          this.list = data.body.content
        }).catch(function (response) {
        console.log(response)
      })
    },
    examine (state) {
      this.list[this.current].state = state
      console.log(this.list[this.current])
      this.$http.post(`${host}/user/update`, this.list[this.current]).then(function (res) {
        this.formModalVisible = false
        this.loadList()
      }, function () {
        alert('fail')
      })
    }
  }
}
</script>

<style scoped>

</style>
