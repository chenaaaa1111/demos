import axios from 'axios';

let base = 'https://test1.swell.link/swell/manage';
// 登录接口
export const requestLogin = params => { return axios.post(`${base}/login`, params).then(res => res.data); };
// 品牌列表
export const brandList = params => {return axios.post(`${base}/brand/list`, params).then(res => res.data); };
// 品牌公共视频列表
export const commonVideoList = params => { return axios.post(`${base}/sku/commonVideoList`, params).then(res => res.data); };
// 上传品牌公共视频
export const uploadBrandCommonVideo = params => { return axios.post(`${base}/brand/uploadCommonVideo`, params).then(res => res.data); };
// 保存品牌公共视频
export const saveBrandCommonVideo = params => { return axios.post(`${base}/sku/addCommonVideo`, params).then(res => res.data); };
//获取品牌公共视频
export const getCommonVideo = params => { return axios.post(`${base}/brand/getCommonVideo`, params).then(res => res.data); };
// 上传品牌logo
export const uploadBrandLogo = params => { return axios.post(`${base}/brand/uploadBrandLogo`, params).then(res => res.data); };
// 上传品牌公共视频
export const uploadCommonVideo = params => { return axios.post(`${base}/brand/uploadCommonVideo`, params).then(res => res.data); };
// 保存品牌公共视频
export const saveCommonVideo = params => { return axios.post(`${base}/brand/saveCommonVideo`, params).then(res => res.data); };

//编辑品牌
export const saveBrand=params=>{ return axios.post(`${base}/brand/saveBrand`,params).then(res => res.data);}

//
export const getUserListPage =params=>{ return axios.post(`${base}/sku/list`,params).then(res => res.data); }

//商品列表
export const commodityList=params=>{ return axios.post(`${base}/sku/list`,params).then(res => res.data);}
export const addCommonVideo=params=>{ return axios.post(`${base}/sku/addCommonVideo`,params).then(res => res.data);}
export const categoryList=params=>{ return axios.post(`${base}/sku/getSelectCategoryList`,params).then(res => res.data);}
export const selectbrandList=params=>{ return axios.post(`${base}/sku/getSelectBrandList`,params).then(res => res.data);}

// export const addUser = params => { return axios.get(`${base}/user/add`, { params: params }); };

//上传特殊食品

export const uptevideo=params=>{return axios.post(`${base}/sku/uploadSpecialSkuImgVideo`,params).then(res=>{res.data})}
