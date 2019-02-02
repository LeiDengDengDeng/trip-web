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
      </div>
    </Modal>
  </div>
</template>

<script>
import {host} from '../utils/apiConfig'

export default {
  name: 'User',
  created () {
    this.$http.get(`${host}/user/all`).then(
      function (data) {
        this.list = data.body.content
      }).catch(function (response) {
      console.log(response)
    })
  },
  data () {
    return {
      modal: false,
      pictureUrl: '',
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
          sortable: true,
          width: 150
        },
        {
          title: '真实姓名',
          key: 'name',
          sortable: true,
          width: 150
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
          title: '用户状态',
          key: 'state',
          sortable: true,
          width: 120,
          render: (h, params) => {
            const stateMap = new Map([
              ['UNCHECKED', '未审核'],
              ['CHECKING', '审核中'],
              ['CHECKED', '已通过审核'],
              ['UNAPPROVED', '未通过'],
              ['CLOSED', '封号']
            ])
            return h('div', stateMap.get(params.row.state))
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
        },
        {
          title: 'Action',
          key: 'action',
          fixed: 'right',
          width: 120,
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                }
              }, '停用')
            ])
          }
        }
      ],
      list: []
    }
  }
}
</script>

<style scoped>

</style>
