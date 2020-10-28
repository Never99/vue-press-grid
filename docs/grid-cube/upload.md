# Upload(图片上传公共组件)

:::tip
网格项目-图片上传公共组件，直接引入该组件，按最后调用方式使用即可！（注意：上传图片的操作是在公共组件中进行的）
:::

```vue
	<template>
		<div>
			<el-form-item label="上传图片" v-if="!isDetail">
				<el-upload
					:action="this.$api.grid_upload_url.ploadImage"
					list-type="picture-card"
					:file-list="files"
					:before-upload="fileLimit"
					:on-change="handleChange"
					:on-success="success"
					:on-preview="handlePictureCardPreview"
					:on-remove="handleRemove"
					:on-exceed="handleExceed"
					:accept="uploadfile.accept!=undefined&&uploadfile.accept!=null ? uploadfile.accept.join(','): '.jpg,.jpeg,.png,.gif'"
					:limit="uploadfile.max!=undefined &&uploadfile.max!=null ? parseInt(uploadfile.max):9">
					<i class="el-icon-plus"></i>
					<div slot="tip" class="el-upload__tip" style="color: red">
						<template>
							<span v-if="uploadfile.ischeck">{{uploadfile.tip}}</span>
						</template>
					</div>
				</el-upload>
				<el-dialog :visible.sync="dialogVisible">
					<img width="100%" :src="dialogImageUrl" alt="">
				</el-dialog>
			</el-form-item>

			<!--  详情展示 start -->
			<el-form-item label="上传图片" v-if="isDetail">
				<div class="demo-image">
					<!--      v-if="img.uploadType == 'upload-img'"-->
					<div class="" style="display: flex; width: 360px; flex-wrap: wrap;">
							<div v-for="(img, index) in files" :key="index">
								<el-image
									style="width: 100px;height: 100px;margin:0 10px"
									:preview-src-list="getSrcList(index)"
									:src="showImg+'?fileId='+img.fileId + '&fileName='+img.name"></el-image>
							</div>
					</div>
				</div>
			</el-form-item>
		</div>
	</template>

	<script>
		export default {
				name: "infoTemplateUploadImage",
			props: {
				isDetail: {
					type: Boolean,
					default: false
				},
				uploadfile: {
					type: Object,
					default: {}
				},
				fileList:{
					type:Array,
					default:[]
				},
				order:{
					type:Number,
					default:1
				},
			},
			data () {
				return {
					dialogImageUrl: '',
					dialogVisible:false,
					files:[],
					showImg:this.$api.grid_upload_url.downloadFile,
					srcList:[]
				}
			},
			methods: {
				handleExceed () {
					this.$message.warning(`最多可上传${parseInt(this.uploadfile.max)}个图片！`)
				},
				fileLimit(file) {
					const isLt2M = file.size / 1024 / 1024 > 10
					if (isLt2M) {
						this.$message({
							message: `上传图片大小不能超过10M!`,
							type: 'warning'
						});
						for (let i = 0; i < this.files.length; i++) {
							if (this.files[i].uid == file.uid) {
								this.files.remove(this.files[i])
								break
							}
						}
						return false
					}
				},
				/**
					* 处理图片预览,只预览当前图片
					* @param index
					*/
				getSrcList(index){
					return this.srcList.slice(index).concat(this.srcList.slice(0,index))
				},
				handlePictureCardPreview(file) {
					this.dialogImageUrl = file.url;
					this.dialogVisible = true;
				},

				handleChange(file, fileList) {
					// this.files = fileList.slice(-3);
				},
				/**
					* 执行删除
					*/
				handleRemove(file, fileList) {
					this.$emit("handleRemove", file);
				},
				/**
					* 上传成功回调函数
					* @param response
					* @param file
					* @param fileList
					*/
				success(response, file, fileList){
					let tempFile = {
						attachName:file.name,
						attachType:file.name.split('.')[1],
						fileId:response.obj,
						uploadtype:'uploadImage',
						uploadorder:this.order,
						url: this.$api.grid_upload_url.downloadFile + '?fileId=' + response.obj + '&fileName=' + file.name
					}
					this.$emit('uploadImage',tempFile)
				},

				/**
					* 文件下载
					*/
				// downloadFile(val) {
				//   window.open(this.$api.grid_upload_url.downloadFile + "?fileId=" + val);
				// },
			},
			created(){
				if(this.fileList != undefined&&this.fileList.length > 0 ){
					for(let i=0;i<this.fileList.length;i++){
						if(this.fileList[i].uploadtype == 'uploadImage'){
							let obj = {};
							obj.name = this.fileList[i].attachName;
							obj.fileId = this.fileList[i].fileId;
							obj.url = this.$api.grid_upload_url.downloadFile+"?fileId="+this.fileList[i].fileId+"&fileName="+this.fileList[i].attachName
							this.files.push(obj);
							this.srcList.push(obj.url);
						}
					}
				}
			},
		}
	</script>
```

### 上传图片公共组件的调用

```vue
<template>
	<div>
		<info-template-upload-image
			:fileList="imageList"
			:isDetail="isDetail"
			:order="order"
			:uploadfile="uploadfile"
			@handleRemove="onRemoveImage"
			@uploadImage="uploadImage">
		</info-template-upload-image>
	</div>
</template>


<script>
	import infoTemplateUploadImage from '@/components/infoTemplate/infoTemplateUploadImage'// 引入上面公共组件

	export default {
		name: "infoTemplateUploadImage",
		props: {
			formItem: {
        type: Object,
        default: {}
      },
			isDetail: {
				type: Boolean,
				default: false
			},
			uploadfile: {
				type: Object,
				default: {}
			},
			order:{
				type:Number,
				default:1
			},
			imageList: {
				type: Array,
				default: () => {
				[]
			}
		},
		data () {
			return {
				dialogImageUrl: '',
				dialogVisible:false,
				files:[],
				showImg:this.$api.grid_upload_url.downloadFile,
				srcList:[]
			}
		},
		methods: {
			/**
			 * 接收上传图片组件传过来的值，上传图片是在公共组件中进行的
			 */
			uploadImage(data) {
				this.imageList.push(data);
				this.formItem.templateList.forEach(item => {
					if (item.showType == 'upload-image') {
						item.fileList = this.imageList
					}
				})
			},
			/**
			 * 移除上传图片
			 */
			onRemoveImage(data) {
				for (let i = 0; i < this.imageList.length; i++) {
					if (data.fileId == this.imageList[i].fileId) {
						this.imageList.remove(this.imageList[i]);
						this.formItem.templateList.forEach(item => {
							if (item.showType == 'upload-image') {
							item.fileList = this.imageList
						}
					})
					}
				}
			},
		}
	}
</script>
```

::: warning
  注意：若此文档看着不清晰，可去公司Gitlab官网查看详细代码！  
	工程名：https://gitlab.asiainfo.com/coms-chnl-grid/coms-chnl-grid-web  
	分支：develop-tj  
	[去看看](https://gitlab.asiainfo.com/coms-chnl-grid/coms-chnl-grid-web "官网") 
:::