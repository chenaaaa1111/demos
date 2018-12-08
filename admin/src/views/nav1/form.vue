
<template>
	<section>

		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.name" placeholder="商品名称"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getComputer">搜索</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="" @click="handleclear">清空</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="CommodityList" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
			<el-table-column type="selection" width="100">
			</el-table-column>
			<!--<el-table-column type="index" width="300">
			</el-table-column>-->
			<el-table-column prop="name" label="商品名称"  sortable>
			</el-table-column>
			<!--
        <el-table-column prop="sex" label="性别" width="600" :formatter="formatSex" sortable>
        </el-table-column>
        <el-table-column prop="age" label="年龄" width="100" sortable>
        </el-table-column>
        <el-table-column prop="birth" label="生日" width="120" sortable>
        </el-table-column>
        <el-table-column prop="addr" label="地址" min-width="180" sortable>
        </el-table-column>
        -->
			<!--
			<el-table-column label="操作" width="150">
				<template scope="scope">
					<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
			-->
		</el-table>
		<section id="commitdever">
			<el-button type="primary" @click="startdeal" >开始处理</el-button>
		</section>

		<!--工具条-->
		<!-- <el-col :span="24" class="toolbar">
			<el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
			</el-pagination>
		</el-col> -->

		<!--编辑界面-->
		<el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false">
			<el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
				<el-form-item label="姓名" prop="name">
					<el-input v-model="editForm.name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="性别">
					<el-radio-group v-model="editForm.sex">
						<el-radio class="radio" :label="1">男</el-radio>
						<el-radio class="radio" :label="0">女</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="年龄">
					<el-input-number v-model="editForm.age" :min="0" :max="200"></el-input-number>
				</el-form-item>
				<el-form-item label="生日">
					<el-date-picker type="date" placeholder="选择日期" v-model="editForm.birth"></el-date-picker>
				</el-form-item>
				<el-form-item label="地址">
					<el-input type="textarea" v-model="editForm.addr"></el-input>
				</el-form-item>

			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
			</div>
		</el-dialog>

		<!-- 视频界面 -->
		<el-dialog title="添加商品信息" :visible.sync="editFormVideoVisible" :close-on-click-modal="false" style="width:600,height:100%">
			<el-form :model="editFormVideo" label-width="120px" ref="editFormVideo">
				<!-- 视频部分 -->
				<el-form-item label="商品名称:" prop="name">
					<el-input v-model="editFormVideo.name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="" class="edforitem" prop="name">
					<label for="">商品普通图片:</label>
					<el-upload action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
						<i class="el-icon-plus"></i>
					</el-upload>
				</el-form-item>
				<el-form-item label="" class="edforitem"  prop="name">
					<label for="">商品普通视频封面:</label>
					<el-upload action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
						<i class="el-icon-plus"></i>
					</el-upload>
				</el-form-item>
				<el-form-item label="" class="edforitem"  prop="name">
					<label for="">商品普通视频:</label>
					<el-upload action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
						<i class="el-icon-plus"></i>
					</el-upload>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer" style="text-align:center;">
				<el-button type="primary">保存</el-button>
			</div>
		</el-dialog>
	</section>

</template>

<script>
    import util from '../../common/js/util'
    //import NProgress from 'nprogress'
    import { getUserListPage,commonVideoList,commodityList, removeUser, batchRemoveUser, editUser, addUser } from '../../api/api';

    export default {
        data() {
            return {
                filters: {
                    name: ''
                },
                seachName:"",//搜索名称
                editForm:[],
                editFormVideo:{},
                CommodityList:[],
                users: [],
                total: 0,
                page: 1,
                listLoading: false,
                sels: [],//列表选中列
                editFormVideoVisible:false,
                editFormVisible: false,//编辑界面是否显示
                editLoading: false,
                editFormRules: {
                    name: [
                        { required: true, message: '请输入姓名', trigger: 'blur' }
                    ]
                },
                //编辑界面数据
                editForm: {
                    id: 0,
                    name: '',
                    sex: -1,
                    age: 0,
                    birth: '',
                    addr: ''
                },

                addFormVisible: false,//新增界面是否显示
                addLoading: false,
                addFormRules: {
                    name: [
                        { required: true, message: '请输入姓名', trigger: 'blur' }
                    ]
                },
                //新增界面数据
                addForm: {
                    name: '',
                    sex: -1,
                    age: 0,
                    birth: '',
                    addr: ''
                }

            }
        },
        methods: {
            getComputer:function(name){//搜索
                this.page=1;
                console.log(123);
                let para = {
                    pageNo: this.page,
                    productName: this.filters.name
                };
                this.listLoading = true;
                commodityList(para).then(res=>{
                    this.total = res.data.total;
                    this.CommodityList = res.data.list;
                    this.listLoading = false;
                })
            },
            //性别显示转换
            formatSex: function (row, column) {
                return row.sex == 1 ? '男' : row.sex == 0 ? '女' : '未知';
            },
            handlePictureCardPreview:function(){

            },
            startdeal:function(){
                this.editFormVideoVisible=true;
            },
            handleRemove:function(){

            },
            handleCurrentChange(val) {
                this.page = val;
                //this.getUsers();
                this.getCommodityList();
                //获取商品列表
            },
            //获取用户列表
            getUsers() {
                let para = {
                    page: this.page,
                    name: this.filters.name
                };
                this.listLoading = true;
                //NProgress.start();
                getUserListPage(para).then((res) => {
                    this.total = res.data.total;
                    this.users = res.data.users;
                    this.listLoading = false;
                    //NProgress.done();
                });
            },
            getCommodityList:function(){
                var self=this;
                commodityList({pageNo: self.page,pageSize:this.pageSize}).then(res=>{
                    console.log('res',res);
                    self.CommodityList=res.data.list;
                })
            },
            //删除
            handleDel: function (index, row) {
                this.$confirm('确认删除该记录吗?', '提示', {
                    type: 'warning'
                }).then(() => {
                    this.listLoading = true;
                    //NProgress.start();
                    let para = { id: row.id };
                    removeUser(para).then((res) => {
                        this.listLoading = false;
                        //NProgress.done();
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        this.getUsers();
                    });
                }).catch(() => {

                });
            },
            //显示编辑界面
            handleEdit: function (index, row) {
                this.editFormVisible = true;
                this.editForm = Object.assign({}, row);
            },
            handleclear:function(e){
                this.filters.name="";
            },
            //显示新增界面
            handleAdd: function () {
                this.addFormVisible = true;
                this.addForm = {
                    name: '',
                    sex: -1,
                    age: 0,
                    birth: '',
                    addr: ''
                };
            },
            //编辑
            editSubmit: function () {
                this.$refs.editForm.validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            this.editLoading = true;
                            //NProgress.start();
                            let para = Object.assign({}, this.editForm);
                            para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
                            editUser(para).then((res) => {
                                this.editLoading = false;
                                //NProgress.done();
                                this.$message({
                                    message: '提交成功',
                                    type: 'success'
                                });
                                this.$refs['editForm'].resetFields();
                                this.editFormVisible = false;
                                this.getUsers();
                            });
                        });
                    }
                });
            },
            //新增
            addSubmit: function () {
                this.$refs.addForm.validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            this.addLoading = true;
                            //NProgress.start();
                            let para = Object.assign({}, this.addForm);
                            para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
                            addUser(para).then((res) => {
                                this.addLoading = false;
                                //NProgress.done();
                                this.$message({
                                    message: '提交成功',
                                    type: 'success'
                                });
                                this.$refs['addForm'].resetFields();
                                this.addFormVisible = false;
                                this.getUsers();
                            });
                        });
                    }
                });
            },
            selsChange: function (sels) {
                this.sels = sels;
            },
            //批量删除
            batchRemove: function () {
                var ids = this.sels.map(item => item.id).toString();
                this.$confirm('确认删除选中记录吗？', '提示', {
                    type: 'warning'
                }).then(() => {
                    this.listLoading = true;
                    //NProgress.start();
                    let para = { ids: ids };
                    batchRemoveUser(para).then((res) => {
                        this.listLoading = false;
                        //NProgress.done();
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        this.getUsers();
                    });
                }).catch(() => {

                });
            }
        },
        mounted() {
            this.getCommodityList();
        }
    }

</script>

<style scoped>

</style>
<style>
	#commitdever{
		text-align:center;
		padding-top: 50px;
	}
	.el-form-item__label{
		width:200px;

	}
	.edforitem {
		display: flex;
	}
	.edforitem .el-form-item__content{
		display: flex;
	}
	.edforitem label {
		margin-right:30px;
		width: 117px;
	}
	.el-table .cell{
		text-align:left;
	}
	.el-upload-list--picture-card .el-upload-list__item-status-label{
		display: none;
	}
</style>
