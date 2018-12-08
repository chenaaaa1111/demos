<template>
    <section>
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="filters">
                <el-form-item>
                    <el-input v-model="filters.name" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" v-on:click="getVideos">搜索</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="" @click="handleAdd">添加</el-button>
                </el-form-item>
            </el-form>
        </el-col>
        <el-card class="box-card">

            <el-table :data="vedioList" >

                <el-table-column prop="id" label="序号" ></el-table-column>

                <el-table-column prop="name" label="视频名称" ></el-table-column>

                <el-table-column props="surfacePlotUrls" label="封面图" >
                    <template slot-scope="scope">
                        <img v-for="item in scope.row.surfacePlotUrls" :src="item" alt="" style="width: 50px;height: 50px">
                    </template>
                </el-table-column>

                <el-table-column prop="createTime" label="创建时间"></el-table-column>

            </el-table>

            <div class="block">
                <span class="demonstration"></span>
                <el-pagination
                        @size-change="sizeChange"
                        @current-change="pageChange"
                        :current-page="pageNo"
                        :page-sizes="[10, 20, 30, 40]"
                        :page-size="pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total">
                </el-pagination>
            </div>
        </el-card>
        <el-dialog
                title="上传视频" id="myDialog"
                :visible.sync="dialogVisible"
                width="30%"
                :before-close="handleClose">
            <div>

                <el-row :gutter="16">
                    <el-col class="colTitle" :span="4">视频名称</el-col>
                    <el-col class="colBody" :span="20">
                        <el-input v-model="formData.videoName"></el-input>
                    </el-col>
                </el-row>

                <el-row :gutter="16" style="margin-top: 16px;">
                    <el-col class="colTitle" :span="4">视频封面</el-col>
                    <el-col class="colBody fm" :span="20">
                        <el-upload
                                action="https://jsonplaceholder.typicode.com/posts/"
                                :multiple="false"
                                :auto-upload="false"
                                list-type="picture-card"
                                :file-list="formData.videoFm"
                                :on-change="fmfileChange"
                        >
                            <i class="el-icon-plus"></i>
                        </el-upload>
                    </el-col>
                </el-row>

                <el-row :gutter="16" style="margin-top: 16px;">
                    <el-col class="colTitle" :span="4">选择视频</el-col>
                    <el-col class="colBody fm" :span="20">
                        <el-upload
                                action="https://jsonplaceholder.typicode.com/posts/"
                                :multiple="false"
                                accept=".mp4"
                                :auto-upload="false"
                                list-type="picture-card"
                                :file-list="formData.videoMp4"
                                :on-change="mp4fileChange"
                        >
                            <i class="el-icon-plus"></i>
                        </el-upload>
                    </el-col>
                </el-row>

            </div>
            <span slot="footer" class="dialog-footer">
                <el-button class="queding" type="primary" @click="save">确 定</el-button>
                <el-button @click="handleClose">取 消</el-button>
            </span>
        </el-dialog>
    </section>

</template>
<script>
    import util from '../../common/js/util'
    import {commonVideoList,uploadBrandCommonVideo,saveBrandCommonVideo } from '../../api/api';

    export default {
        data(){
            return {
                filters: {
                    name: '',
                },
                page:1,
                total: 0,
                currentPage:1,
                vedioList:[],
                dialogVisible: false,
                fileList: [],
                dialogImageUrl: '',
                formData: {
                    videoName: '',
                    videoFm: [],
                    videoMp4: []
                },
                name: '',
                pageSize: 20,
                pageNo: 1,
                brandId: ''
            }
        },
        methods:{
            fmfileChange (file) { // 选择视频封面
                this.formData.videoFm[0] = file
                console.log(this.formData.videoFm,'封面数组')
            },
            mp4fileChange (file) { // 选择视频
                this.formData.videoMp4[0] = file
                console.log(this.formData.videoMp4,'视频数组')
            },
            save () {
                var fm = new FormData()
                var params = {
                    name: 1,
                    surfacePlotImgs: null,
                    videoFiles: null
                }
                params.name = this.formData.videoName
                if (this.formData.videoFm.length > 0) {
                    params.surfacePlotImgs = this.formData.videoFm[0].raw
                }
                if (this.formData.videoMp4.length > 0) {
                    params.videoFiles = this.formData.videoMp4[0].raw
                }
                console.log(params,'要上传的数据')
                fm.append('name',params.name)
                fm.append('surfacePlotImgs',params.surfacePlotImgs)
                fm.append('videoFiles',params.videoFiles)
                uploadBrandCommonVideo(fm).then (res => {
                   console.log(res,'保存品牌公共视频')
                });
                // this.dialogVisible = false
            },
            handleClose(done) {
                this.formData = {
                    videoName: '',
                    videoFm: [],
                    videoMp4: []
                },
                this.dialogVisible = false
            },
            getVideoLists: function () {
                var params = {}
                params.name = this.name
                params.pageNo = this.pageNo
                params.pageSize = this.pageSize
                commonVideoList(params).then(res=>{
                   console.log('resss',res);
                    this.vedioList = res.data.list;
                    this.total=res.data.totalCount;
                    this.currentPage=res.data.pageNo;
                });
            },
            pageChange:function(val){
                this.pageNo = val
                this.getVideoLists();
            },
            sizeChange:function(val){
                this.pageSize = val
                this.getVideoLists ()
            },


            handleAdd:function(){
                this.dialogVisible = true
            },


            getVideos:function(){
                var self = this;
                var name=self.filters.name;

                self.getVideoLists(name);
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            beforeRemove(file, fileList) {
                return this.$confirm(`确定移除 ${ file.name }？`);
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            }
        },
        mounted() {
            this.getVideoLists();
        }
    }
</script>
<style media="screen">
    .colTitle{line-height: 32px;text-align: right;}
    .colTitle{line-height: 32px;text-align: right;}
    #myDialog .el-dialog--small{width: 500px;}
    #myDialog .el-dialog__footer{text-align: left;}
    .queding{margin-left: 80px;}
    .fm ul.el-upload-list li{display: none;}
    .fm ul.el-upload-list li:last-child{display: inline-block;}
</style>
