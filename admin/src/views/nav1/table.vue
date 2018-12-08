<template>
    <section>
        <el-row class="first">
            <el-col :span="24">
                <el-card class="box-card">
                    <el-row :gutter="20">
                        <el-col :span="3">

                            <template>
                                <el-select id="shopName" style="border:none" v-model="filters.name" placeholder="商品名称">
                                    <el-option
                                            v-for="item in options"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </template>
                        </el-col>
                        <el-col :span="4">
                            <el-input v-model="filters.keyname" placeholder="请输入搜索关键词"></el-input>
                        </el-col>
                        <el-col :span="2">
                            <span class="spanword">选择品类:</span>
                        </el-col>
                        <el-col :span="4">

                            <el-select v-model="filters.category" placeholder="请选择">
                                <el-option
                                        v-for="item in options2"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="2">
                            <span class="spanword">品牌名:</span>
                        </el-col>
                        <el-col :span="4">
                            <el-select v-model="filters.brand" placeholder="请选择">
                                <el-option
                                        v-for="item in options3"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="2">
                            <span class="spanword">特殊商品:</span>
                        </el-col>
                        <el-col :span="2">
                            <el-select v-model="filters.hasSpecial" placeholder="请选择">
                                <el-option
                                        v-for="item in options4"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-col>

                        <!-- <el-col :span="4" style="text-align: right">
                            <el-button type="primary" icon="el-icon-search">添加商品</el-button>
                        </el-col> -->
                    </el-row>
                    <br/>
                    <el-row :gutter="20">


                        <el-col :span="23"  style="text-align: right">
                            <el-button type="primary" @click="search">搜索</el-button>
                            <el-button type="default" @click="resetsearch">重置</el-button>
                        </el-col>
                        <!-- <el-col :span="4" style="text-align: right">
                            <el-button type="primary" icon="el-icon-search">添加商品</el-button>
                        </el-col> -->
                    </el-row>

                </el-card>
            </el-col>
            <el-col :span="24">
                <!--<ul>-->
                <!--<li class="pdname">-->
                <!--<el-dropdown>-->
                <!--<span class="el-dropdown-link">-->
                <!--商品名<i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>-->
                <!--</span>-->
                <!--<el-dropdown-menu slot="dropdown">-->
                <!--<el-dropdown-item>商品名</el-dropdown-item>-->
                <!--<el-dropdown-item>商品ID</el-dropdown-item>-->
                <!--<el-dropdown-item>条码</el-dropdown-item>-->
                <!--</el-dropdown-menu>-->
                <!--</el-dropdown>-->
                <!--<el-input v-model="input" placeholder="请输入内容" class="search"></el-input>-->
                <!--</li>-->
                <!--<li>-->
                <!--<span>特殊商品:</span>-->
                <!--<el-dropdown>-->
                <!--<el-button>-->
                <!--请选择<i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>-->
                <!--</el-button>-->
                <!--<el-dropdown-menu slot="dropdown">-->
                <!--<el-dropdown-item>黄金糕</el-dropdown-item>-->
                <!--</el-dropdown-menu>-->
                <!--</el-dropdown>-->
                <!--</li>-->
                <!--<li>-->
                <!--<span>品牌名:</span>-->
                <!--<el-dropdown>-->
                <!--<el-button>-->
                <!--请选择<i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>-->
                <!--</el-button>-->
                <!--<el-dropdown-menu slot="dropdown">-->
                <!--<el-dropdown-item>黄金糕</el-dropdown-item>-->
                <!--</el-dropdown-menu>-->
                <!--</el-dropdown>-->
                <!--</li>-->
                <!--<li>-->
                <!--<span>选择品类:</span>-->
                <!--<el-dropdown>-->
                <!--<el-button>-->
                <!--请选择<i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>-->
                <!--</el-button>-->
                <!--<el-dropdown-menu slot="dropdown">-->
                <!--<el-dropdown-item>黄金糕</el-dropdown-item>-->
                <!--</el-dropdown-menu>-->
                <!--</el-dropdown>-->
                <!--</li>-->
                <!--</ul>-->
            </el-col>
        </el-row>
        <el-card class="box-card">
            <!--<el-row class="second">-->
            <!--<el-button type="primary" icon="el-icon-search">添加商品</el-button>-->
            <!--</el-row>-->
            <el-table :data="brandList" style="width: 100%;">
                <el-table-column prop="id" label="商品ID" width="80">
                </el-table-column>
                <el-table-column prop="name" label="商品名" width="300" class="zdytd">
                </el-table-column>
                <el-table-column prop="category" label="分类" width="100">
                </el-table-column>
                <el-table-column prop="brand" label="品牌" width="300">
                </el-table-column>
                <el-table-column prop="color" label="颜色" width="100">
                </el-table-column>
                <el-table-column prop="pictureUrls" label="图片" min-width="150">
                    <template slot-scope="scope">
                        <img v-for="item in scope.row.pictureUrls" :src="item" alt="" style="width: 50px;height: 50px">
                    </template>
                </el-table-column>
                <el-table-column prop="hasSpecial" label="特殊商品" min-width="100">
                </el-table-column>
                <el-table-column prop="randomRatio" label="随机商品比例" min-width="100">
                </el-table-column>
                <el-table-column label="操作" width="220" :style="{'textAlign':'center'}">
                    <template scope="scope" prop="id" style="text-align: center;">
                        <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button type="default" @click="editvideo(scope.row.id,scope.row)" size="small">特殊视频</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="block">
                <span class="demonstration"></span>
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                        :page-sizes="[100, 200, 300, 400]"
                        :page-size="100"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total">
                </el-pagination>
            </div>
        </el-card>

        <el-dialog title="编辑商品信息" :visible.sync="dialogFormVisible">
            <div class="dbody" style="margin-top: 0;">
                <el-row :gutter="16">

                    <el-col :span="4" class="colTitle">商品名称</el-col>
                    <el-col :span="8" class="colBody">
                        <el-input placeholder="商品名称"  :value="edidItem.name" clearable readonly></el-input>
                    </el-col>

                    <el-col :span="4" class="colTitle" :value="edidItem.id">商品ID</el-col>
                    <el-col :span="8">
                        <el-input placeholder="商品ID" clearable readonly></el-input>
                    </el-col>

                </el-row>
                <el-row :gutter="16">

                    <el-col :span="4" class="colTitle" :value="edidItem.brand">品牌</el-col>
                    <el-col :span="8">
                        <el-input placeholder="品牌" clearable readonly></el-input>
                    </el-col>

                    <el-col :span="4" class="colTitle" >分类</el-col>
                    <el-col :span="8">
                        <el-input placeholder="分类" :value="edidItem.category" clearable readonly></el-input>
                    </el-col>

                </el-row>
                <el-row :gutter="16">

                    <el-col :span="4" class="colTitle">颜色</el-col>
                    <el-col :span="8">
                        <!-- <el-color-picker color-format="" v-model="color4"  size="small" @active-change="colorchange"
                                         @change="colorchange" :disabled="colorDisabled"></el-color-picker> -->
                                           <el-input placeholder="分类" :value="edidItem.color" clearable readonly></el-input>
                    </el-col>

                    <el-col :span="4" class="colTitle">尺寸</el-col>
                    <el-col :span="8">
                        <el-input placeholder="尺寸" :value="edidItem.size" clearable readonly></el-input>
                    </el-col>

                </el-row>
            </div>
            <div class="dbody">
                <el-row :gutter="16" style="padding-bottom: 10px;">

                    <el-col :span="4" class="colTitle">商品普通图片</el-col>
                    <el-col :span="20">
                        <el-upload
                                action="https://jsonplaceholder.typicode.com/posts/"
                                list-type="picture-card"
                                :on-preview="handlePictureCardPreview"
                                :on-remove="handleRemove">
                            <i class="el-icon-plus"></i>
                        </el-upload>
                        <el-dialog :visible.sync="dialogVisible">
                            <img width="100%" :src="dialogImageUrl" alt="">
                        </el-dialog>
                    </el-col>

                </el-row>
            </div>
            <div class="dbody" >
                <el-row :gutter="16" style="padding-bottom: 10px;">

                    <el-col :span="4" class="colTitle">普通视频封面</el-col>
                    <el-col :span="20">
                        <el-upload
                                action="https://jsonplaceholder.typicode.com/posts/"
                                list-type="picture-card"
                                :on-preview="handlePictureCardPreview"
                                :on-remove="handleRemove">
                            <i class="el-icon-plus"></i>
                        </el-upload>
                        <el-dialog :visible.sync="dialogVisible">
                            <img width="100%" :src="dialogImageUrl" alt="">
                        </el-dialog>
                    </el-col>

                    <el-col :span="4" class="colTitle" style="margin-top: 10px;">
                        商品普通视频
                        <p class="yun"><a @click="yundia = true">云视频</a></p>
                    </el-col>
                    <el-col :span="20" style="margin-top: 10px;">
                        <el-upload
                                action="https://jsonplaceholder.typicode.com/posts/"
                                list-type="picture-card"
                                :on-preview="handlePictureCardPreview"
                                :on-remove="handleRemove">
                            <i class="el-icon-plus"></i>
                        </el-upload>
                        <el-dialog :visible.sync="dialogVisible">
                            <img width="100%" :src="dialogImageUrl" alt="">
                        </el-dialog>
                    </el-col>

                </el-row>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="commitEdite">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog :visible.sync="yundia" title="公共视频列表">
            <el-row :gutter="16">
                <el-col :span="6" style="text-align: center;">
                    <img src="" alt="" class="videoPic"/>
                    <el-checkbox-group>
                        <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
                    </el-checkbox-group>
                </el-col>
                <el-col :span="6" style="text-align: center;">
                    <img src="" alt="" class="videoPic"/>
                    <el-checkbox-group>
                        <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
                    </el-checkbox-group>
                </el-col>
                <el-col :span="6" style="text-align: center;">
                    <img src="" alt="" class="videoPic"/>
                    <el-checkbox-group>
                        <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
                    </el-checkbox-group>
                </el-col>
                <el-col :span="6" style="text-align: center;">
                    <img src="" alt="" class="videoPic"/>
                    <el-checkbox-group>
                        <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
                    </el-checkbox-group>
                </el-col>
                <el-col :span="6" style="text-align: center;">
                    <img src="" alt="" class="videoPic"/>
                    <el-checkbox-group>
                        <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
                    </el-checkbox-group>
                </el-col>
                <el-col :span="6" style="text-align: center;">
                    <img src="" alt="" class="videoPic"/>
                    <el-checkbox-group>
                        <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
                    </el-checkbox-group>
                </el-col>
                <el-col :span="6" style="text-align: center;">
                    <img src="" alt="" class="videoPic"/>
                    <el-checkbox-group>
                        <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
                    </el-checkbox-group>
                </el-col>
                <el-col :span="6" style="text-align: center;">
                    <img src="" alt="" class="videoPic"/>
                    <el-checkbox-group>
                        <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
                    </el-checkbox-group>
                </el-col>

            </el-row>
        </el-dialog>

        <el-dialog :visible.sync="tesable" title="编辑商品信息">
            <div class="dbody" style="margin-top: 0;">
                <el-row :gutter="16">

                    <el-col :span="4" class="colTitle">商品名称</el-col>
                    <el-col :span="8" class="colBody">
                        <el-input placeholder="商品名称" v-model="edidItem.name" :value="edidItem.name" readonly></el-input>
                    </el-col>

                    <el-col :span="4" class="colTitle"    readonly>商品ID</el-col>
                    <el-col :span="8">
                        <el-input placeholder="商品ID"  v-model="edidItem.id"  :value="edidItem.id" readonly></el-input>
                    </el-col>

                </el-row>
                <el-row :gutter="16">

                    <el-col :span="4" class="colTitle"  >品牌</el-col>
                    <el-col :span="8">
                        <el-input placeholder="品牌" :value="edidItem.brand" readonly></el-input>
                    </el-col>

                    <el-col :span="4" class="colTitle" >分类</el-col>
                    <el-col :span="8">
                        <el-input placeholder="分类" readonly :value="edidItem.category"  v-model="edidItem.category" ></el-input>
                    </el-col>

                </el-row>
                <el-row :gutter="16">

                    <el-col :span="4" class="colTitle">颜色</el-col>
                    <el-col :span="8">
                        <!-- <el-color-picker v-model="color4" size="small"  @active-change="colorchange"
                                         @change="colorchange" disabled="colorDisabled"></el-color-picker> -->
                          <el-input placeholder="分类" :value="edidItem.color" readonly  v-model="edidItem.color" ></el-input>
                    </el-col>

                    <el-col :span="4" class="colTitle" >尺寸</el-col>
                    <el-col :span="8">
                        <el-input placeholder="尺寸" :value="edidItem.size" v-model="edidItem.size" readonly></el-input>
                    </el-col>

                </el-row>
            </div>
            <div class="dbody">
                <el-row :gutter="16" style="padding-bottom: 10px;">

                    <el-col :span="4" class="colTitle">商品特殊图片</el-col>
                    <el-col :span="20">
                        <el-upload
                                ref="noc1"
                                :show-file-list="true"
                                :file-list="pictureUrls"
                                :on-change="handleChange"
                                action="https://test1.swell.link/swell/manage/sku/uploadSpecialSkuImgVideo"
                                list-type="picture-card"
                                :auto-upload="false"
                                :on-preview="handlePictureCardPreview"
                                :on-remove="handleRemove">
                            <i class="el-icon-plus"></i>
                        </el-upload>
                        <el-dialog :visible.sync="dialogVisible">
                            <img width="100%" :src="dialogImageUrl" alt="">
                        </el-dialog>
                    </el-col>

                </el-row>
            </div>
            <div class="dbody">
                <el-row :gutter="16" style="padding-bottom: 10px;">

                    <el-col :span="4" class="colTitle">特殊视频封面</el-col>
                    <el-col :span="20">
                        <el-upload
                                :show-file-list="true"
                                ref="noc2"
                                :auto-upload="false"
                                :on-change="handleChange1"
                                action="https://test1.swell.link/swell/manage/sku/uploadSpecialSkuImgVideo"
                                list-type="picture-card"
                                :on-preview="handlePictureCardPreview"
                                :on-remove="handleRemove">
                            <i class="el-icon-plus"></i>
                        </el-upload>
                        <el-dialog :visible.sync="dialogVisible">
                            <img width="100%" :src="dialogImageUrl" alt="">
                        </el-dialog>
                    </el-col>

                    <el-col :span="4" class="colTitle" style="margin-top: 10px;">
                        商品特殊视频
                        <p class="yun"><a @click="yundia = true">云视频</a></p>
                    </el-col>
                    <el-col :span="20" style="margin-top: 10px;">
                        <el-upload
                                 ref="noc3"
                                 :on-change="handleChange2"
                                action="https://test1.swell.link/swell/manage/sku/uploadSpecialSkuImgVideo"
                                list-type="picture-card"
                                :on-preview="handlePictureCardPreview"
                                :auto-upload="false"
                                :on-remove="handleRemove">
                            <i class="el-icon-plus"></i>
                        </el-upload>
                        <el-dialog :visible.sync="dialogVisible">
                            <img width="100%" :src="dialogImageUrl" alt="">
                        </el-dialog>
                    </el-col>

                </el-row>
                <el-row :gutter="16">
                    <el-col :span="4" class="colTitle" style="margin-top: 10px;">
                        随机商品比例
                    </el-col>
                    <el-col :span="8" style="margin-top: 10px;">
                        <el-input placeholder="请输入尺寸" clearable></el-input>
                    </el-col>
                    <el-col :span="1" class="colTitle" style="margin-top: 10px;">%</el-col>
                </el-row>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="tesable = false">取 消</el-button>
                <el-button type="primary" @click="savenooften">确 定</el-button>
            </div>
        </el-dialog>
    </section>
</template>

<script>
    import util from '../../common/js/util'
    //import NProgress from 'nprogress'
    import {commodityList,categoryList,selectbrandList,uptevideo} from '../../api/api';
    import {lt} from 'semver';

    export default {
        created() {
            // console.log('axios: ', this.$http === axios)
            // 发送请求，获取数据
            this.getUserList()
        },
        data() {
            return {
                pictureUrls:[{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
                edidItem:{name:"tian"},
                chooseId:'',
                colorDisabled: true,
                filters: {
                    name:'',
                    category:'',
                    brand:'',
                    hasSpecial:'',
                    keyname:''
                },
                yundia: false,
                fileList1:[],
                color4: '#409EFF',
                value: '商品名称',
                searchName: "商品名称",
                options1: [
                    {
                        value: '选项1',
                        label: '黄金糕'
                    }, {
                        value: '选项2',
                        label: '双皮奶'
                    }
                ],
                options2: [{
                    value: '选项1',
                    label: '黄金糕'
                }, {
                    value: '选项2',
                    label: '双皮奶'
                }],
                options3: [
                    {
                        value: '选项1',
                        label: '黄金糕'
                    }, {
                        value: '选项2',
                        label: '双皮奶'
                    }
                ],
                options4: [
                    {
                        value: '',
                        label: '全部'
                    },
                    {
                        value: 'true',
                        label: '是'
                    }, {
                        value: 'false',
                        label: '否'
                    }
                ],
                options: [
                    {
                        value: '选项1',
                        label: '黄金糕'
                    }, {
                        value: '选项2',
                        label: '双皮奶'
                    }, {
                        value: '选项3',
                        label: '蚵仔煎'
                    }, {
                        value: '选项4',
                        label: '龙须面'
                    }, {
                        value: '选项5',
                        label: '北京烤鸭'
                    }
                ],
                fileList: [],
                input: '',
                value4: '',
                brandList: [],
                code: '',
                pageSize: 10,
                total: 0,
                page: 1,
                listLoading: false,
                dialogFormVisible: false,
                tesable: false,
                dialog: false,
                sels: [],//列表选中列
                currentPage: 1,
                /* currentPage1: 5,
                *currentPage2: 5,
                 currentPage3: 5,
                 currentPage4: 4,*/
                shopType: '',

                options: [{
                    value: '1',
                    label: '商品名称'
                }, {
                    value: '2',
                    label: '商品id'
                }, {
                    value: '3',
                    label: '条码'
                }],
                form: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                },
                formLabelWidth: '120px',
                dialogImageUrl: '',
                dialogVisible: false
            }
        },
        methods: {
            handleChange(file,fileList){
                console.log('fileList',fileList)
                this.fileList1=fileList;
            },
            handleChange1:function(file,fileList){
                console.log('fileList',fileList)
                this.fileList2=fileList;
            },
            handleChange2:function(file,fileList){
                console.log('fileList',fileList)
                this.fileList3=fileList;
            },
            commitEdite(){

            },
            savenooften(){
                 var self=this;
                 var tefile1=[];
                 var tefile2=[];
                 var tefile3=[];
                 var para=new FormData();
                 var pajson={};
                 console.log(this.fileList1,"00000")
                  this.fileList1.forEach(item=>{
                      console.log('raw',item.raw);
                      para.append('skuImgs',item.raw);
                  });
                     this.fileList2.forEach(item=>{
                      console.log('raw',item.raw);
                      para.append('surfacePlotImgs',item.raw);
                  });
                 this.fileList3.forEach(item=>{
                      console.log('raw',item.raw);
                      para.append('videoFiles',item.raw)  
                  });
                  console.log('pajson',"chooseId",this.chooseId)
                   para.append('id',this.chooseId);
                   para.append('skuImgs',tefile1)
                   para.append('surfacePlotImgs',tefile2)
                   para.append('videoFiles',tefile3)      
                  uptevideo(para).then(res=>{
                      console.log('123');
                      self.tesable=false;
                  })
            },
            colorchange() {
                this.color4 = '#409EFF'

            },
            handleEdit(index,item) {
                console.log('index',index,item)
                this.edidItem=item;
                this.dialogFormVisible = true
            },
            beforeUpnormal:function(){
                return false;
            },
            editvideo(id,item) {

                this.chooseId=id;
                this.edidItem=item;
                console.log("item",item)
                this.tesable = true;
            },
            chooseNameseach(item) {
                console.log(item)
            },
            search()
            {

                console.log("search");
                var self = this;
                self.page=1;
                let para={};


                if(self.filters.name==1)
                {
                    para['productName']=self.filters.keyname;
                }
                else if(self.filters.name==2)
                {
                    para['skuId']=self.filters.keyname;
                }
                else if(self.filters.name==3)
                {
                    para['upc']=self.filters.keyname;
                }
                else {
                    para['productName']=self.filters.keyname;
                }
                para['categoryCode']=self.filters.category;
                para['brandCode']=self.filters.brand;
                para['hasSpecial']=self.filters.hasSpecial;
                para['pageNo']=self.page;

                console.log(para);
                commodityList(para).then((res) => {
                    res.data.list.forEach(function (element) {
                        if (element.name.length > 30) {
                            element.name = element.name.substr(0, 30) + "...";
                        }

                        if (element.brand.length > 30) {
                            element.brand = element.brand.substr(0, 30) + "...";
                        }
                        if (element.pictureUrls!=null&&element.pictureUrls.length > 2) {
                            element.pictureUrls = element.pictureUrls.slice(0,2);
                        }
                        if(element.hasSpecial)
                        {
                            element.hasSpecial='是';
                        }
                        else
                        {
                            element.hasSpecial='否';
                        }
                        /* console.log("count"+element.pictureUrls.length);*/
                    });
                    console.log(res.data);
                    this.currentPage=res.data.pageNo;
                    this.total=res.data.totalCount;
                    self.brandList = res.data.list;
                    // this.brandList
                    console.log(res);
                });
            },
            resetsearch()
            {
                console.log("resetsearch");
                this.filters={
                    name:'',
                    category:'',
                    brand:'',
                    hasSpecial:'',
                    keyname:''
                };
            },
            getUserList() {

                var self = this;

                //获得品名下拉列表数据
                categoryList().then((res)=>{
                    self.options2=[];
                    var list=res.data;

                  /*  self.options2.push({
                        value: '',
                        label: '全部'
                    });*/
                    list.forEach(function (element)
                    {
                        self.options2.push({
                            label:element.name,
                            value: element.code
                        })

                    });
                });
                //获得品牌名下拉列表数据
                selectbrandList().then((res)=>{
                    self.options3=[];

                    var list=res.data;

                    /*self.options3.push({
                        value: '',
                        label: '全部'
                    });*/
                    list.forEach(function (element)
                    {
                        self.options3.push({
                            label:element.name,
                            value: element.code
                        })

                    });
                });

                commodityList({pageNo: self.page}).then((res) => {
                    res.data.list.forEach(function (element) {
                        if (element.name.length > 30) {
                            element.name = element.name.substr(0, 30) + "...";
                        }

                        if (element.brand.length > 30) {
                            element.brand = element.brand.substr(0, 30) + "...";
                        }
                        if (element.pictureUrls!=null&&element.pictureUrls.length > 2) {
                            element.pictureUrls = element.pictureUrls.slice(0,2);
                        }
                        if(element.hasSpecial)
                        {
                            element.hasSpecial='是';
                        }
                        else
                        {
                            element.hasSpecial='否';
                        }
                        /* console.log("count"+element.pictureUrls.length);*/
                    });
                    //console.log(res.data);
                    this.currentPage=res.data.pageNo;
                    this.total=res.data.totalCount;
                    self.brandList = res.data.list;
                    // this.brandList
                    //console.log(res);
                });

            },
            handleSizeChange(val) {

            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.page=val;
                this.getUserList();

            },
            submitUpload() {
                console.log('thislist',this.$refs.upload.fileList)
                this.$refs.upload.submit();
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            }
        },
        mounted() {

        }
    }

</script>

<style scoped>
    section {
        width: 100%;
        height: 100px;
        margin-top: 10px;
    }

    section .first ul {
        list-style: none;
    }

    section .first ul li {
        float: right;
        margin-left: 30px;

    }

    section .first ul .pdname {
        float: left;
    }

    section .second {
        margin-bottom: 20px;
        float: right;
    }

    .search {
        width: 300px;
    }

    .el-dropdown {
        vertical-align: top;
    }

    .el-dropdown + .el-dropdown {
        margin-left: 15px;
    }

    .el-icon-arrow-down {
        font-size: 12px;
    }

    .block {
        margin-top: 16px;
    }

    .dbody {
        border-bottom: 1px solid #ECECEC;
        margin-top: 20px;
    }

    .colTitle {
        line-height: 32px;
        text-align: right;
        margin-bottom: 20px;
    }

    .colBody {
        margin-bottom: 20px;
    }

    .yun a {
        color: #1890FF;
        cursor: pointer;
    }

    .videoPic {
        display: block;
        height: 100px;
        width: 100px;
        margin: 10px auto;
        border: 1px solid #ccc;
    }
</style>
<style>
    .el-table_1_column_9 {
        text-alige: center
    }

    table .el-table .cell {
        white-space: normal;
        word-break: break-all;
        line-height: 24px;
        text-align: center;
    }

    .el-table th {
        white-space: nowrap;
        overflow: hidden;
        background-color: #eef1f6;
        text-align: center;
    }

    .el-table .cell {
        text-align: center;
    }

    #shopName input.el-input__inner {
        border: none;
    }

    .box-card .el-select {
        width: 100%;
    }

    .el-upload-list--picture-card .el-upload-list__item {
        width: 100px;
        height: 100px;
    }

    .el-upload--picture-card {
        width: 100px;
        height: 100px;
        line-height: 100px;
    }

    .el-table_1_column_2 .cell, .el-table_1_column_4 .cell {
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }
    .el-card__body .spanword{
        padding-top: 8px;
        display: block;
    }
</style>
