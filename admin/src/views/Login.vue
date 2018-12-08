<template>
  <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px" class="demo-ruleForm login-container">
    <h2 class="title">Swell Partner</h2>
    <el-form-item prop="account">
      <el-input type="text" v-model="ruleForm2.account" auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="pwd">
      <el-input type="password" v-model="ruleForm2.pwd" auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <!-- <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox> -->
    <el-form-item style="width:100%;">
      <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit2" :loading="logining">登录</el-button>
      <!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
    </el-form-item>
    <!-- <el-footer>
    <div class="copyright">copyright © 2018 Swell技术团队</div>
    </el-footer> -->
  </el-form>
</template>




<script>
import { requestLogin } from '../api/api';
//import NProgress from 'nprogress'
export default {
  data () {
    return {
      logining: false,
      ruleForm2: {
        account: "innersect",
        pwd: "123456789"
      },
      rules2: {
        account: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          //{ validator: validaePass }
        ],
        pwd: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          //{ validator: validaePass2 }
        ]
      },
      checked: true
    };
  },
  methods: {
    handleReset2 () {
      this.$refs.ruleForm2.resetFields();
    },
    handleSubmit2 () {
      var loginParams = { account: this.ruleForm2.account, pwd: this.ruleForm2.pwd };
      
      var _this = this;
      this.$refs.ruleForm2.validate((valid) => {
        if (valid) {
          //_this.$router.replace('/table');
          this.logining = true;
          //NProgress.start();

          var loginParams = { account: this.ruleForm2.account, pwd: this.ruleForm2.pwd };
          requestLogin(loginParams).then(data => {  
            // this.logining = false;
            // //NProgress.done();
            console.log(data);
            let { msg, code } = data;
            if (code !== 200) {
              this.$message({
                message: msg,
                type: 'error'
              });
            } else {
              localStorage.setItem('token', data.data.token);
              // console.log(data.data.token);
              this.$router.push({ path: '/table' });
            }
            // console.log(data.data.token)
              // window.localStorage["token"]=token;
          });
          
          // axios.post(`https://test1.swell.link/swell/manage/login`, loginParams).then(res => console.log(res.data))
          
        } else {
          console.log('error submit!!');
          return false;
        }
      });
      
    }
  }
}

</script>

<style lang="scss" scoped>
.login-container {
  /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  margin: 180px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
  .title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
  .remember {
    margin: 0px 0px 35px 0px;
  }
}
// .copyright{
//   position: absolute;
//   bottom: 0;
//   text-align: center;
//   padding-left:70px;
// }
</style>