<template>
  <div>
    <Button type="primary" @click="addClick()" style="margin-bottom: 20px; ">
      <Icon type="ios-add-circle-outline" size="16"></Icon>
      新增景点
    </Button>
    <Table border :columns="columns" :data="list"></Table>
    <Modal
      v-model="formModalVisible"
      title="景点信息">
      <div style="width:100%;">
        <Form :model="formItem" :label-width="100" ref="form" :rules="ruleValidate">
          <FormItem label="景点名称" prop="name">
            <Input v-model="formItem.name" placeholder="请输入景点名称"></Input>
          </FormItem>
          <FormItem label="景点名称拼音" prop="pinyin">
            <Input v-model="formItem.pinyin" placeholder="请输入景点名称的拼音，例如：XUANWUHU"></Input>
          </FormItem>
          <FormItem label="景点位置" prop="address">
            <Input v-model="formItem.address" placeholder="请输入景点位置"></Input>
          </FormItem>
          <FormItem label="经度" prop="longitude">
            <InputNumber :max="180" :min="-180" :step="0.000001" v-model="formItem.longitude"
                         style="width:120px;"></InputNumber>
          </FormItem>
          <FormItem label="纬度" prop="latitude">
            <InputNumber :max="90" :min="-90" :step="0.000001" v-model="formItem.latitude"
                         style="width:120px;"></InputNumber>
          </FormItem>
          <FormItem label="景点图片">
            <div class="demo-upload-list" v-for="item in uploadList" :key="item.url">
              <template v-if="item.status === 'finished'">
                <img :src="item.url"/>
                <div class="demo-upload-list-cover">
                  <Icon type="ios-eye-outline" @click.native="handleView(item.url)"></Icon>
                  <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                </div>
              </template>
              <template v-else>
                <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
              </template>
            </div>
            <Upload
              ref="upload"
              :show-upload-list="false"
              :default-file-list="defaultList"
              :on-success="handleSuccess"
              :format="['jpg','jpeg','png']"
              :max-size="2048"
              type="drag"
              name="myfiles"
              action="http://120.77.205.70:8088/uploadfile"
              style="display: inline-block;width:78px;">
              <div style="width: 78px;height:78px;line-height: 78px;">
                <Icon type="ios-camera" size="20"></Icon>
              </div>
            </Upload>
          </FormItem>
          <FormItem label="景点介绍" prop="introduction">
            <Input v-model="formItem.introduction" type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
          </FormItem>
        </Form>
      </div>
      <div slot="footer">
        <Button v-if="isAddModal" type="success" size="large" @click="addScenic('')">新增</Button>
        <Button v-else type="success" size="large" @click="addScenic('/update')">更新</Button>
      </div>
    </Modal>
    <Modal title="图片查看" v-model="imageModalVisible">
      <img :src="imgUrl" v-if="imageModalVisible" style="width: 100%">
      <div slot="footer">
      </div>
    </Modal>
  </div>
</template>

<script>
import {host} from '../utils/apiConfig'

export default {
  name: 'Scenic',
  created () {
    this.loadList()
  },
  data () {
    return {
      defaultList: [
      ],
      imgUrl: '',
      imageModalVisible: false,
      uploadList: [],
      isAddModal: true,
      formModalVisible: false,
      formItem: {
        name: '',
        pinyin: '',
        address: '',
        latitude: 0.0,
        longitude: 0.0,
        iconUrl: '',
        introduction: ''
      },
      ruleValidate: {
        name: [
          {required: true, message: '名字不能为空', trigger: 'blur'}
        ],
        pinyin: [
          {required: true, message: '名字拼音不能为空', trigger: 'blur'}
        ],
        address: [
          {required: true, message: '位置不能为空', trigger: 'blur'}
        ],
        introduction: [
          {required: false}
        ],
        latitude: [
          {required: true, type: 'float', message: '纬度不能为空', trigger: 'blur'}
        ],
        longitude: [
          {required: true, type: 'float', message: '经度不能为空', trigger: 'blur'}
        ]
      },
      columns: [
        {
          title: 'ID',
          key: 'id',
          sortable: true,
          width: 70,
          fixed: 'left'
        },
        {
          title: '景点名称',
          key: 'name',
          sortable: true,
          width: 150,
          fixed: 'left'
        },
        {
          title: '景点名称拼音',
          key: 'pinyin',
          sortable: true,
          width: 150
        },
        {
          title: '景点介绍',
          key: 'introduction',
          sortable: true,
          width: 600
        },
        {
          title: '景点位置',
          key: 'address',
          sortable: true,
          width: 300
        },
        {
          title: '经度',
          key: 'longitude',
          sortable: true,
          width: 120
        },
        {
          title: '纬度',
          key: 'latitude',
          sortable: true,
          width: 100
        },
        {
          title: '图片路径',
          key: 'iconUrl',
          width: 200,
          render: (h, params) => {
            return h('a', {
              on: {
                click: () => {
                  this.imageModalVisible = true
                  this.imgUrl = params.row.iconUrl
                }
              }
            }, params.row.iconUrl)
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
              }, '删除'),
              h('Button', {
                props: {
                  type: 'default',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.formItem = params.row
                    this.formModalVisible = true
                    this.isAddModal = false
                    // 显示景点图片
                    const fileList = this.$refs.upload.fileList
                    this.$refs.upload.fileList.splice(0, fileList.length)
                    this.$refs.upload.fileList[0] = {name: 'default', url: params.row.iconUrl, status: 'finished'}
                  }
                }
              }, '编辑')
            ])
          }
        }
      ],
      list: []
    }
  },
  mounted () {
    this.uploadList = this.$refs.upload.fileList
  },
  methods: {
    loadList () {
      this.$http.get(`${host}/scenics`).then(
        function (data) {
          this.list = data.body.content
        }).catch(function (response) {
        console.log(response)
      })
    },
    addClick () {
      this.formModalVisible = true
      this.$refs['form'].resetFields()
    },
    handleView (url) {
      this.imgUrl = url
      this.imageModalVisible = true
    },
    handleRemove (file) {
      const fileList = this.$refs.upload.fileList
      this.$refs.upload.fileList.splice(fileList.indexOf(file), 1)
    },
    handleSuccess (res, file) {
      file.url = `${host}` + res.content
      this.formItem.iconUrl = `${host}` + res.content
    },
    addScenic (url) {
      this.$http.post(`${host}/scenic` + url, this.formItem).then(function (res) {
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
  .demo-upload-list {
    display: inline-block;
    width: 80px;
    height: 80px;
    text-align: center;
    line-height: 60px;
    border: 1px solid transparent;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    position: relative;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .2);
    margin-right: 4px;
  }

  .demo-upload-list img {
    width: 100%;
    height: 100%;
  }

  .demo-upload-list-cover {
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, .6);
  }

  .demo-upload-list:hover .demo-upload-list-cover {
    display: block;
  }

  .demo-upload-list-cover i {
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    margin: 0 2px;
  }
</style>
