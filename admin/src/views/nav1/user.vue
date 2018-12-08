<template>
    <section>

        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true">
                <span style="padding-top: 8px;display:inline-block;">品牌名:</span>
                <el-form-item>
                    <el-input v-model="pdlist.name" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="searchName">搜索</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button @click="clearAll">清空</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleAdd">新增</el-button>
                </el-form-item>
            </el-form>
        </el-col>
        <el-table :data="pdlist" highlight-current-row style="width: 100%,dispaly:flex">
            <el-table-column prop="name" label="品牌名称" style="flex:1">
            </el-table-column>

            <!--  <el-table-column prop="pictureUrls" label="图片" min-width="150">
                  <template slot-scope="scope">
                      <img v-for="item in scope.row.pictureUrls" :src="item" alt="" style="width: 50px;height: 50px">
                  </template>
              </el-table-column>-->

            <el-table-column prop="logoUrl" label="品牌LOGO" style="flex:1">

                <template slot-scope="scope">
                    <img v-for="" :src="scope.row.logoUrl" alt="" style="width: 50px;height: 50px">
                </template>

            </el-table-column>
            <el-table-column prop="desc" label="品牌介绍" style="flex:1">
            </el-table-column>

            <el-table-column prop="videoUrls" label="品牌视频" style="flex:1">
                <template slot-scope="scope">
                    <img v-for="item in scope.row.videoUrls" :src="item" alt="" style="width: 50px;height: 50px">
                </template>
            </el-table-column>
            <el-table-column label="操作" style="flex:1">
                <template scope="scope">
                    <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="mini" @click="handleEditVideo(scope.$index, scope.row)">品牌视频</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!--编辑界面-->
        <el-dialog
                :title="brandTitle"
                v-model="editFormVisible"
                :close-on-click-modal="false"
                id="myDialog"
                :before-close="closeDialog">
            <el-form :model="panelForm" label-width="120px" ref="editForm">
                <el-form-item label="品牌名称:" prop="name">
                    <el-input v-model="panelForm.name" auto-complete="off" :readonly="brandName"></el-input>
                </el-form-item>
                <el-form-item label="品牌LOGO:" prop="name" class="fm">
                    <el-upload
                            action="https://test1.swell.link/swell/manage/brand/uploadBrandLogo"
                            :headers="uploadHeader"
                            :multiple="false"
                            :auto-upload="true"
                            list-type="picture-card"
                            :file-list="panelForm.fileList"
                            :before-upload="beforeUpload"
                            :on-change="logofileChange"
                            :on-remove="removelogo">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="品牌介绍" prop="des" style="margin-bottom: 0">
                    <el-input type="textarea" v-model="panelForm.des"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="save" style="margin-left: 80px;">保存</el-button>
                <el-button type="default" @click="closeDialog">取消</el-button>
            </div>
        </el-dialog>

        <!-- 视频界面 -->
        <el-dialog
                title="品牌视频"
                v-model="editFormVideoVisible"
                :close-on-click-modal="false"
                id="video"
                :before-close="closeVideo"
        >
            <el-form :model="editFormVideo" label-width="150px" ref="editFormVideo">
                <!-- 视频部分 -->
                <el-form-item label="品牌公共视频名称:" prop="name" class="videoName">
                    <el-input v-model="editFormVideo.name" readonly></el-input>
                </el-form-item>

                <el-form-item label="视频封面:" prop="name" class="fm2 vdfm">
                    <el-upload
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :multiple="false"
                            :auto-upload="false"
                            list-type="picture-card"
                            :file-list="editFormVideo.fmList"
                            :on-change="fmChange"
                            :on-remove="fmRemove">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                </el-form-item>

                <el-form-item label="选择视频:" prop="name" class="fm2 vdMp4">
                    <el-upload
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :multiple="false"
                            :auto-upload="false"
                            list-type="picture-card"
                            :file-list="editFormVideo.fmList"
                            :on-change="vdChange"
                            :on-remove="vdRemove">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="savevideo">保存</el-button>
                <el-button type="default" @click="closeVideo">取消</el-button>
            </div>
        </el-dialog>

        <div class="block">
            <span class="demonstration"></span>
            <el-pagination :data="pdlist" @size-change="handleSizeChange" @current-change="handleCurrentChange"
                           :current-page="currentPage" :page-sizes="[100, 200, 300, 400]" :page-size="100"
                           layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>
    </section>

</template>

<script>
    import util from '../../common/js/util'
    //import NProgress from 'nprogress'
    import {brandList, commonVideoList, getCommonVideo, uploadBrandLogo, saveBrand} from '../../api/api';
    import axios from 'axios'
    import fileUpload from '../../common/js/fileUploader.js';

    export default {
        created() {
            this.getUserList()
        },
        data() {
            return {
                dialogImageUrl: '',
                dialogVisible: false,
                message: '',
                pageNo: '',
                pdlist: [],
                editFormVisible: false,//编辑界面是否显示
                currentPage: 1,
                total: 0,
                //编辑界面数据
                editForm: {
                    id: '',
                    name: '',
                    des: '',
                    fileList: [],
                },
                filters: {
                    name: ''
                },
                editFormVideoVisible: false,//新增界面是否显示
                addLoading: false,
                uploadHeader: {
                    token: localStorage.getItem('token')
                },
                auto: false,
                brandName: false,
                brandTitle: '',
                panelForm: {
                    id: '',
                    name: '',
                    des: '',
                    fileList: [],
                    logoImgUrl:''
                },
                editFormVideo: {
                    name: '',
                    fmList: [],
                    videoList: []
                },
            }
        },
        methods: {
            test(){
                console.log('ceshi')
            },
            handleAdd() { // 打开品牌添加框
                this.brandTitle = '添加品牌'
                this.brandName = false
                this.editFormVisible = true
            },
            handleEdit(index, row) { // 打开品牌编辑框
                this.brandTitle = '编辑品牌'
                this.brandName = true
                this.editFormVisible = true
                this.panelForm.name = row.name;
                this.panelForm.des = row.desc;
                this.panelForm.id = row.id;
                this.panelForm.fileList.push({url: row.logoUrl});
                this.panelForm.logoImgUrl=row.logoUrl;
                console.log(this.panelForm)
            },
            logofileChange(file, fileList) { // 选中logo图片
                this.panelForm.fileList[0] = file
                $(".fm ul.el-upload-list").css('display', 'inline-block')
            },
            removelogo() { // remove logo pic
                this.panelForm.fileList.splice(0, 1)
                $(".fm ul.el-upload-list").css('display', 'none')
            },
            save() { // 保存品牌弹出框的值
                console.log(this.panelForm, '保存时获取到表单值')

                //this.$refs.upload.submit();

                saveBrand({
                    brandId: this.panelForm.id,
                    desc: this.panelForm.des,
                    logoImgUrl: this.panelForm.logoImgUrl
                }).then((res) => {
                    console.log(res);

                    // this.brandList
                    console.log(this.pdlist);
                });
                this.editFormVisible = false
                this.panelForm = {
                    id: '',
                    name: '',
                    des: '',
                    fileList: [],
                    logoImgUrl:''
                }
                
            },
            beforeUpload: function (file) {
                //  console.log("ggg")
                console.log(file)
                //这里是重点，将文件转化为formdata数据上传
                let fd = new FormData()
                fd.append('imgFile', file)
                fd.append('brandId', this.panelForm.id);//传其他参数
                uploadBrandLogo(fd).then((res) => {
                    this.panelForm.logoImgUrl = res.data;
                    this.panelForm.fileList.push({url: res.data});

                }, (res) => {
                    console.log(res)
                });
                return false;

            },
            closeDialog() { // 关闭品牌弹窗
                this.editFormVisible = false
                this.panelForm = {
                    id: '',
                    name: '',
                    des: '',
                    fileList: [],
                }
            },

            handleEditVideo(index, row) {// 打开视频弹框
                this.editFormVideoVisible = true;
            },
            fmChange(file, fileList) { // 选择视频封面
                this.editFormVideo.fmList[0] = file
                $(".vdfm ul.el-upload-list").css('display', 'inline-block')
            },
            fmRemove() { // 移除视频封面
                this.editFormVideo.fmList.splice(0, 1)
                $(".vdfm ul.el-upload-list").css('display', 'none')
            },
            vdChange(file, fileList) { // 选择视频封面
                this.editFormVideo.videoList[0] = file
                $(".vdMp4 ul.el-upload-list").css('display', 'inline-block')
            },
            vdRemove() { // 移除视频封面
                this.editFormVideo.videoList.splice(0, 1)
                $(".vdMp4 ul.el-upload-list").css('display', 'none')
            },
            savevideo() { // 保存品牌视频
                console.log(this.editFormVideo, '保存品牌视频表单值')
                this.editFormVideoVisible = false
                this.editFormVideo = {
                    name: '',
                    fmList: [],
                    videoList: []
                }
            },
            closeVideo() { // 关闭品牌视频
                this.editFormVideoVisible = false
                this.editFormVideo = {
                    name: '',
                    fmList: [],
                    videoList: []
                }
            },

            getUserList(name = '', code = '', currentpage = 1) {
                var self = this;
                brandList({name: name, pageNo: currentpage}).then((res) => {

                    self.pdlist = res.data.list;
                    self.pdlist.forEach(function (element) {

                        getCommonVideo({brandId: element.id}).then((result) => {

                            element.videoUrls = result.data;
                        });
                    });
                    console.log(this.pdlist);
                    this.currentPage = res.data.pageNo;
                    this.total = res.data.totalCount;
                });

                commonVideoList({pageNo: currentpage}).then((res) => {
                    console.log();
                    this.pdlist.forEach(function (item) {

                        res.data.list.forEach(function (ele) {
                            if (item.id == ele.brandId) {
                                this.pdlist.videoUrls = ele.videoUrls;
                            }
                        });
                    });
                    // this.brandList
                    console.log(this.pdlist);
                });
            },

            // 分页功能
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);

                this.getUserList(this.pdlist.name, "", val);

            },
            // 搜索功能
            searchName() {
                var name = this.pdlist.name;
                this.getUserList(name, "", 1);


            },
            // 清空输入框
            clearAll() {
                // console.log('清空');
                this.pdlist.name = '';

            },
            // 上传图片
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            handleChange(file, fileList) {
                if (this.editForm.fileList.length < 1) {
                    this.editForm.fileList = fileList
                    this.file0 = true
                }
                console.log(this.fileList0, 33333)
            },
            handleUpload(e) {
                fileUpload.upload({
                    url: 'https://test1.swell.link/swell/manage/brand/uploadBrandLogo',
                    data: {
                        brandId: this.editForm.id,
                        imgFile: e.file
                    },
                    success: (e) => {
                        console.log(e);
                    },
                    error: (e) => {
                        console.log(e);
                    },
                    process: (e) => {
                        console.log(e);
                    }
                });
            },

        },
        test(){
            console.log("ceshi1")
        },
        mounted() {
            this.test()
        }
    }

</script>

<style>
    #video .el-dialog--small {
        width: 600px;
    }

    #video .el-dialog__footer {
        text-align: center;
    }

    #myDialog .el-dialog--small {
        width: 620px;
    }

    #myDialog .el-dialog__footer {
        text-align: left;
    }

    #myDialog .el-textarea__inner {
        height: 80px;
        resize: none;
    }

    .fm ul.el-upload-list li {
        display: none;
    }

    .fm ul.el-upload-list li:last-child {
        display: inline-block;
    }

    .fm2 ul.el-upload-list li {
        display: none;
    }

    .fm2 ul.el-upload-list li:last-child {
        display: inline-block;
    }

    .videoName .el-form-item__label {
        padding-top: 3px;
    }
</style>
