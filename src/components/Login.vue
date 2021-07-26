<template>
  <div class="header">
    <div class="login-box">
      <!-- 头像 -->
      <div class="logo">
        <img src="../assets/1.png" />
      </div>
      <!-- 登录表单 -->
      <el-form ref="loginFormRef" :model="login_form" :rules="loginFormRules" label-width="0px" class="login_from">
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input v-model="login_form.username" prefix-icon="iconfont icon-user"></el-input>
        </el-form-item>

        <!--  密码-->
        <el-form-item prop="password">
          <el-input v-model="login_form.password" prefix-icon="iconfont icon-3702mima" type="password"></el-input>
        </el-form-item>

        <!-- 按钮 -->
        <el-form-item class="btn">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="restLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //登录表单的数据绑定对象
      login_form: {
        username: 'admin',
        password: '123456'
      },
      //表单验证
      loginFormRules: {
        //用户名
        username: [
          { required: true, message: '请输入用户昵称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        //密码
        password: [
          { required: true, message: '请输入登录密码', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    //点击重置按钮，重置数据
    restLoginForm() {
      // console.log(this) 查看loginFormRef的实例对象
      this.$refs.loginFormRef.resetFields();
    },
    login() {
      this.$refs.loginFormRef.validate(async valid => {
        // console.log(valid);
        if (!valid) return;
        const { data: res } = await this.$http.post('login', this.login_form);
        if (res.meta.status !== 200) return this.$message.error('登录失败');
        this.$message.success('登录成功');
        // 1.将登录成功之后的token,保存到客户端的 sessionStorage 中
        //      1.1项目中除了登录之外的其他API接口，必须在登录之后才能访问
        //      1.2 token 只能在当前网站打开期间生效，所以将token 保存在 sessionStorage 中
        window.sessionStorage.setItem('token', res.data.token);
        // 2.通过编程样式导航跳转到后台主页，路由地址是 /home
        this.$router.push('/home');
      });
    }
  }
};
</script>

<style lang="less" scoped>
//代表支持less语法, scoped代表当前页面生效
.header {
  background-color: #2b4b6b;
  height: 100%;
}
.login-box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.login-box .logo {
  width: 130px;
  height: 130px;
  border: 1px;
  border-radius: 50%;
  padding: 10px;
  box-shadow: 0 0 10px #ddd;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
}
.login-box .logo > img {
  height: 100%;
  width: 100%;
  border-radius: 50%;
  background-color: #eee;
}
.login_from {
  position: absolute;
  bottom: 0px;
  width: 100%;
  box-sizing: border-box;
  padding: 0 20px;
}
.btn {
  display: flex;
  justify-content: flex-end;
}
</style>
