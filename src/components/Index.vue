<template>
  <div class="layout">
    <Layout>
      <Header>
        <Menu mode="horizontal" theme="dark" active-name="1">
          <div class="row">
            <div class="layout-logo">大学生出游管理</div>
            <div class="layout-nav">
              <Dropdown>
                <Button type="primary">
                  <Icon type="ios-contact" size="18"></Icon>
                  admin
                  <Icon type="ios-arrow-down"></Icon>
                </Button>
                <DropdownMenu slot="list">
                  <DropdownItem>个人信息</DropdownItem>
                  <DropdownItem>登出</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
        </Menu>
      </Header>
      <Layout>
        <Sider hide-trigger :style="{background: '#fff'}">
          <Menu :active-name="activeName" theme="light" width="auto" :open-names="['2']">
            <MenuItem name="1-1" to="/index/home">
              <Icon type="ios-navigate"></Icon>
              <span>首页</span>
            </MenuItem>
            <Submenu name="2">
              <template slot="title">
                <Icon type="ios-contacts"></Icon>
                用户管理
              </template>
              <MenuItem name="2-1" to="/index/examine">用户审批</MenuItem>
              <MenuItem name="2-2" to="/index/user">用户详情</MenuItem>
            </Submenu>
            <MenuItem name="3-1" to="/index/scenic">
              <Icon type="ios-images"></Icon>
              <span>景点详情</span>
            </MenuItem>
          </Menu>
        </Sider>
        <Layout :style="{padding: '0 24px 24px'}">
          <Breadcrumb :style="{margin: '24px 0'}">
            <BreadcrumbItem v-for="item in breadcrumbItems" :key="item">{{item}}</BreadcrumbItem>
          </Breadcrumb>
          <Content :style="{padding: '24px', minHeight: '630px', background: '#fff'}">
            <router-view/>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      breadcrumbItems: ['主页', '概要'],
      activeName: '1-1'
    }
  },
  created () {
    this.fetchData()
  },
  watch: {
    '$route': 'fetchData'
  },
  methods: {
    fetchData () {
      switch (this.$route.name) {
        case 'index':
          this.activeName = '1-1'
          this.breadcrumbItems = ['主页', '概要']
          break
        case 'examine':
          this.activeName = '2-1'
          this.breadcrumbItems = ['主页', '用户管理', '用户审批']
          break
        case 'user':
          this.activeName = '2-2'
          this.breadcrumbItems = ['主页', '用户管理', '用户详情']
          break
        case 'scenic':
          this.activeName = '3-1'
          this.breadcrumbItems = ['主页', '景点详情']
          break
      }
    }
  }
}
</script>

<style scoped>
  .row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
  }

  .layout {
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
  }

  .layout-logo {
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-size: 14pt;
    height: 30px;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
  }
</style>
