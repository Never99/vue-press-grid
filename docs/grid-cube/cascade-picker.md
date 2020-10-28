# CascadePicker(级联选择器)

::: tip
   CascadePicker组件是级联选择器，用于实现多列选择之间的级联变化。比如，在选择省市区时，当省切换到了江苏省，城市列应该变成江苏省的各个城市，同理，如果城市切换到苏州市，区列的选项也应变成苏州市的各个区，这就级联的意义。 
:::

注： 全量引入可忽略此注意事项，按需引入则必须引入该组件（如下面代码所示）

``` vue{10,11,12}
<script>
  // 按需引入组件
  import { CascadePicker } from 'cube-ui'

  export default {
    data () {
      return {
      }
    },
    components: {
      CascadePicker
    }
  }
</script>
```

* ### 基本用法（多列）
相比普通选择器，级联选择器需要传入的数据结构是不一样的。普通选择器的数据结构是一个二维数组，每一列对应一个固定的数组，而级联选择器，则需要传入的是一个树形结构，第一列数组的每个选项的children属性，对应着切换到该选项时后续列的数据，从而实现对后续列的改变。

#### 基本用法效果如图所示（正常demo可点击切换）
#### 

<img :src="$withBase('/cube-cascade-picker-init.png')" style="max-height:400px" alt="mixureSecure">

::: tip
级联选择器对应最主要的就是数据结构（也就是组装数据），正常数据格式应该为`树形结构`，接口一次性返回所有数据，但是这种涉及到大批量数据时，会导致应用卡顿，所有就有了后面的逐级请求数据,所组装的数据格式也和之前一样，更像是按需加载数据，为的是减轻了客户端、服务端的压力。
:::

``` vue{17,18,19,20,21,22,23}
  <template>
    <cube-button @click="showCascadePicker">级联选择器</cube-button>
  </template>

  <script>

		// 省级的value 和 市级数据的 key 相对应，相当于直接将 对应key 的value值（数组，二级数据）
		// 直接组装到省级的数据里，也就是给对应省级添加children，此时的children就是二级数据，
		// 对应的三级数据逻辑也是如此。下面高亮显示的变量 addressData 就是在组装最终数据。

		var provinceList = [{"text":"北京市","value":"110000"},{"text":"天津市","value":"120000"},{"text":"河北省","value":"130000"}];

		var cityList = {"110000":[{"province":"北京市","text":"北京市","value":"110100"}],"120000":[{"province":"天津市","text":"天津市","value":"120100"}],"130000":[{"province":"河北省","text":"石家庄市","value":"130100"},{"province":"河北省","text":"唐山市","value":"130200"},{"province":"河北省","text":"秦皇岛市","value":"130300"},{"province":"河北省","text":"邯郸市","value":"130400"},{"province":"河北省","text":"邢台市","value":"130500"},{"province":"河北省","text":"保定市","value":"130600"},{"province":"河北省","text":"张家口市","value":"130700"},{"province":"河北省","text":"承德市","value":"130800"},{"province":"河北省","text":"沧州市","value":"130900"},{"province":"河北省","text":"廊坊市","value":"131000"},{"province":"河北省","text":"衡水市","value":"131100"},{"province":"河北省","text":"省直辖县级行政区划","value":"139000"}]}

		var areaList = {"110100":[{"city":"市辖区","text":"东城区","value":"110101"},{"city":"市辖区","text":"西城区","value":"110102"},{"city":"市辖区","text":"朝阳区","value":"110105"},{"city":"市辖区","text":"丰台区","value":"110106"},{"city":"市辖区","text":"石景山区","value":"110107"},{"city":"市辖区","text":"海淀区","value":"110108"},{"city":"市辖区","text":"门头沟区","value":"110109"},{"city":"市辖区","text":"房山区","value":"110111"},{"city":"市辖区","text":"通州区","value":"110112"},{"city":"市辖区","text":"顺义区","value":"110113"},{"city":"市辖区","text":"昌平区","value":"110114"},{"city":"市辖区","text":"大兴区","value":"110115"},{"city":"市辖区","text":"怀柔区","value":"110116"},{"city":"市辖区","text":"平谷区","value":"110117"},{"city":"市辖区","text":"密云区","value":"110118"},{"city":"市辖区","text":"延庆区","value":"110119"}],"120100":[{"city":"市辖区","text":"和平区","value":"120101"},{"city":"市辖区","text":"河东区","value":"120102"},{"city":"市辖区","text":"河西区","value":"120103"},{"city":"市辖区","text":"南开区","value":"120104"},{"city":"市辖区","text":"河北区","value":"120105"},{"city":"市辖区","text":"红桥区","value":"120106"},{"city":"市辖区","text":"东丽区","value":"120110"},{"city":"市辖区","text":"西青区","value":"120111"},{"city":"市辖区","text":"津南区","value":"120112"},{"city":"市辖区","text":"北辰区","value":"120113"},{"city":"市辖区","text":"武清区","value":"120114"},{"city":"市辖区","text":"宝坻区","value":"120115"},{"city":"市辖区","text":"滨海新区","value":"120116"},{"city":"市辖区","text":"宁河区","value":"120117"},{"city":"市辖区","text":"静海区","value":"120118"},{"city":"市辖区","text":"蓟州区","value":"120119"}],"130100":[{"city":"石家庄市","text":"市辖区","value":"130101"},{"city":"石家庄市","text":"长安区","value":"130102"},{"city":"石家庄市","text":"桥西区","value":"130104"},{"city":"石家庄市","text":"新华区","value":"130105"},{"city":"石家庄市","text":"井陉矿区","value":"130107"},{"city":"石家庄市","text":"裕华区","value":"130108"},{"city":"石家庄市","text":"藁城区","value":"130109"},{"city":"石家庄市","text":"鹿泉区","value":"130110"},{"city":"石家庄市","text":"栾城区","value":"130111"},{"city":"石家庄市","text":"井陉县","value":"130121"},{"city":"石家庄市","text":"正定县","value":"130123"},{"city":"石家庄市","text":"行唐县","value":"130125"},{"city":"石家庄市","text":"灵寿县","value":"130126"},{"city":"石家庄市","text":"高邑县","value":"130127"},{"city":"石家庄市","text":"深泽县","value":"130128"},{"city":"石家庄市","text":"赞皇县","value":"130129"},{"city":"石家庄市","text":"无极县","value":"130130"},{"city":"石家庄市","text":"平山县","value":"130131"},{"city":"石家庄市","text":"元氏县","value":"130132"},{"city":"石家庄市","text":"赵县","value":"130133"},{"city":"石家庄市","text":"晋州市","value":"130183"},{"city":"石家庄市","text":"新乐市","value":"130184"}],"130200":[{"city":"唐山市","text":"市辖区","value":"130201"},{"city":"唐山市","text":"路南区","value":"130202"},{"city":"唐山市","text":"路北区","value":"130203"},{"city":"唐山市","text":"古冶区","value":"130204"},{"city":"唐山市","text":"开平区","value":"130205"},{"city":"唐山市","text":"丰南区","value":"130207"},{"city":"唐山市","text":"丰润区","value":"130208"},{"city":"唐山市","text":"曹妃甸区","value":"130209"},{"city":"唐山市","text":"滦县","value":"130223"},{"city":"唐山市","text":"滦南县","value":"130224"},{"city":"唐山市","text":"乐亭县","value":"130225"},{"city":"唐山市","text":"迁西县","value":"130227"},{"city":"唐山市","text":"玉田县","value":"130229"},{"city":"唐山市","text":"遵化市","value":"130281"},{"city":"唐山市","text":"迁安市","value":"130283"}],"130300":[{"city":"秦皇岛市","text":"市辖区","value":"130301"},{"city":"秦皇岛市","text":"海港区","value":"130302"},{"city":"秦皇岛市","text":"山海关区","value":"130303"},{"city":"秦皇岛市","text":"北戴河区","value":"130304"},{"city":"秦皇岛市","text":"抚宁区","value":"130306"},{"city":"秦皇岛市","text":"青龙满族自治县","value":"130321"},{"city":"秦皇岛市","text":"昌黎县","value":"130322"},{"city":"秦皇岛市","text":"卢龙县","value":"130324"}],"130400":[{"city":"邯郸市","text":"市辖区","value":"130401"},{"city":"邯郸市","text":"邯山区","value":"130402"},{"city":"邯郸市","text":"丛台区","value":"130403"},{"city":"邯郸市","text":"复兴区","value":"130404"},{"city":"邯郸市","text":"峰峰矿区","value":"130406"},{"city":"邯郸市","text":"邯郸县","value":"130421"},{"city":"邯郸市","text":"临漳县","value":"130423"},{"city":"邯郸市","text":"成安县","value":"130424"},{"city":"邯郸市","text":"大名县","value":"130425"},{"city":"邯郸市","text":"涉县","value":"130426"},{"city":"邯郸市","text":"磁县","value":"130427"},{"city":"邯郸市","text":"肥乡县","value":"130428"},{"city":"邯郸市","text":"永年县","value":"130429"},{"city":"邯郸市","text":"邱县","value":"130430"},{"city":"邯郸市","text":"鸡泽县","value":"130431"},{"city":"邯郸市","text":"广平县","value":"130432"},{"city":"邯郸市","text":"馆陶县","value":"130433"},{"city":"邯郸市","text":"魏县","value":"130434"},{"city":"邯郸市","text":"曲周县","value":"130435"},{"city":"邯郸市","text":"武安市","value":"130481"}],"130500":[{"city":"邢台市","text":"市辖区","value":"130501"},{"city":"邢台市","text":"桥东区","value":"130502"},{"city":"邢台市","text":"桥西区","value":"130503"},{"city":"邢台市","text":"邢台县","value":"130521"},{"city":"邢台市","text":"临城县","value":"130522"},{"city":"邢台市","text":"内丘县","value":"130523"},{"city":"邢台市","text":"柏乡县","value":"130524"},{"city":"邢台市","text":"隆尧县","value":"130525"},{"city":"邢台市","text":"任县","value":"130526"},{"city":"邢台市","text":"南和县","value":"130527"},{"city":"邢台市","text":"宁晋县","value":"130528"},{"city":"邢台市","text":"巨鹿县","value":"130529"},{"city":"邢台市","text":"新河县","value":"130530"},{"city":"邢台市","text":"广宗县","value":"130531"},{"city":"邢台市","text":"平乡县","value":"130532"},{"city":"邢台市","text":"威县","value":"130533"},{"city":"邢台市","text":"清河县","value":"130534"},{"city":"邢台市","text":"临西县","value":"130535"},{"city":"邢台市","text":"南宫市","value":"130581"},{"city":"邢台市","text":"沙河市","value":"130582"}],"130600":[{"city":"保定市","text":"市辖区","value":"130601"},{"city":"保定市","text":"竞秀区","value":"130602"},{"city":"保定市","text":"莲池区","value":"130606"},{"city":"保定市","text":"满城区","value":"130607"},{"city":"保定市","text":"清苑区","value":"130608"},{"city":"保定市","text":"徐水区","value":"130609"},{"city":"保定市","text":"涞水县","value":"130623"},{"city":"保定市","text":"阜平县","value":"130624"},{"city":"保定市","text":"定兴县","value":"130626"},{"city":"保定市","text":"唐县","value":"130627"},{"city":"保定市","text":"高阳县","value":"130628"},{"city":"保定市","text":"容城县","value":"130629"},{"city":"保定市","text":"涞源县","value":"130630"},{"city":"保定市","text":"望都县","value":"130631"},{"city":"保定市","text":"安新县","value":"130632"},{"city":"保定市","text":"易县","value":"130633"},{"city":"保定市","text":"曲阳县","value":"130634"},{"city":"保定市","text":"蠡县","value":"130635"},{"city":"保定市","text":"顺平县","value":"130636"},{"city":"保定市","text":"博野县","value":"130637"},{"city":"保定市","text":"雄县","value":"130638"},{"city":"保定市","text":"涿州市","value":"130681"},{"city":"保定市","text":"安国市","value":"130683"},{"city":"保定市","text":"高碑店市","value":"130684"}],"130700":[{"city":"张家口市","text":"市辖区","value":"130701"},{"city":"张家口市","text":"桥东区","value":"130702"},{"city":"张家口市","text":"桥西区","value":"130703"},{"city":"张家口市","text":"宣化区","value":"130705"},{"city":"张家口市","text":"下花园区","value":"130706"},{"city":"张家口市","text":"万全区","value":"130708"},{"city":"张家口市","text":"崇礼区","value":"130709"},{"city":"张家口市","text":"张北县","value":"130722"},{"city":"张家口市","text":"康保县","value":"130723"},{"city":"张家口市","text":"沽源县","value":"130724"},{"city":"张家口市","text":"尚义县","value":"130725"},{"city":"张家口市","text":"蔚县","value":"130726"},{"city":"张家口市","text":"阳原县","value":"130727"},{"city":"张家口市","text":"怀安县","value":"130728"},{"city":"张家口市","text":"怀来县","value":"130730"},{"city":"张家口市","text":"涿鹿县","value":"130731"},{"city":"张家口市","text":"赤城县","value":"130732"}],"130800":[{"city":"承德市","text":"市辖区","value":"130801"},{"city":"承德市","text":"双桥区","value":"130802"},{"city":"承德市","text":"双滦区","value":"130803"},{"city":"承德市","text":"鹰手营子矿区","value":"130804"},{"city":"承德市","text":"承德县","value":"130821"},{"city":"承德市","text":"兴隆县","value":"130822"},{"city":"承德市","text":"平泉县","value":"130823"},{"city":"承德市","text":"滦平县","value":"130824"},{"city":"承德市","text":"隆化县","value":"130825"},{"city":"承德市","text":"丰宁满族自治县","value":"130826"},{"city":"承德市","text":"宽城满族自治县","value":"130827"},{"city":"承德市","text":"围场满族蒙古族自治县","value":"130828"}],"130900":[{"city":"沧州市","text":"市辖区","value":"130901"},{"city":"沧州市","text":"新华区","value":"130902"},{"city":"沧州市","text":"运河区","value":"130903"},{"city":"沧州市","text":"沧县","value":"130921"},{"city":"沧州市","text":"青县","value":"130922"},{"city":"沧州市","text":"东光县","value":"130923"},{"city":"沧州市","text":"海兴县","value":"130924"},{"city":"沧州市","text":"盐山县","value":"130925"},{"city":"沧州市","text":"肃宁县","value":"130926"},{"city":"沧州市","text":"南皮县","value":"130927"},{"city":"沧州市","text":"吴桥县","value":"130928"},{"city":"沧州市","text":"献县","value":"130929"},{"city":"沧州市","text":"孟村回族自治县","value":"130930"},{"city":"沧州市","text":"泊头市","value":"130981"},{"city":"沧州市","text":"任丘市","value":"130982"},{"city":"沧州市","text":"黄骅市","value":"130983"},{"city":"沧州市","text":"河间市","value":"130984"}],"131000":[{"city":"廊坊市","text":"市辖区","value":"131001"},{"city":"廊坊市","text":"安次区","value":"131002"},{"city":"廊坊市","text":"广阳区","value":"131003"},{"city":"廊坊市","text":"固安县","value":"131022"},{"city":"廊坊市","text":"永清县","value":"131023"},{"city":"廊坊市","text":"香河县","value":"131024"},{"city":"廊坊市","text":"大城县","value":"131025"},{"city":"廊坊市","text":"文安县","value":"131026"},{"city":"廊坊市","text":"大厂回族自治县","value":"131028"},{"city":"廊坊市","text":"霸州市","value":"131081"},{"city":"廊坊市","text":"三河市","value":"131082"}],"131100":[{"city":"衡水市","text":"市辖区","value":"131101"},{"city":"衡水市","text":"桃城区","value":"131102"},{"city":"衡水市","text":"冀州区","value":"131103"},{"city":"衡水市","text":"枣强县","value":"131121"},{"city":"衡水市","text":"武邑县","value":"131122"},{"city":"衡水市","text":"武强县","value":"131123"},{"city":"衡水市","text":"饶阳县","value":"131124"},{"city":"衡水市","text":"安平县","value":"131125"},{"city":"衡水市","text":"故城县","value":"131126"},{"city":"衡水市","text":"景县","value":"131127"},{"city":"衡水市","text":"阜城县","value":"131128"},{"city":"衡水市","text":"深州市","value":"131182"}],"139000":[{"city":"省直辖县级行政区划","text":"定州市","value":"139001"},{"city":"省直辖县级行政区划","text":"辛集市","value":"139002"}]};

		var addressData = provinceList;
		addressData.forEach(province => {
			province.children = cityList[province.value]
			province.children.forEach(city => {
				city.children = areaList[city.value]
			})
		})

    export default {
			data() {
				return {
					addressPicker: ""
				};
			},
			mounted () {
				this.addressPicker = this.$createCascadePicker({
					title: 'City Picker',
					data: addressData,
					onSelect: this.selectHandle, // 确认选择（picker弹框右上角）的点击触发事件
					// onCancel: this.cancelHandle // 关闭弹框事件，默认存在，可不写
				})
			},
			methods: {
				showAddressPicker() {
					this.addressPicker.show()
				},
				selectHandle(selectedVal, selectedIndex, selectedText) {
					// 第一个参数：对应data中的 value 字段 （数组）	[省,市,区]
					// 第二个参数：当前选择的下标	（数组）[0,1,1]
					// 第二个参数：对应data中的 text 字段	（数组）[省,市,区]
					console.log(date, selectedVal, selectedText);

					// (可在获取 value 之后做其他操作)
					// .
					// .
					// .
				},
		};
	</script>
```

* ### 项目中用法（单列）`引自：天津网格 物料 新增`



#### 基本用法效果如图所示（正常demo可点击切换）
#### 

<img :src="$withBase('/cube-cascade-picker-xm.png')" style="max-height:400px" alt="mixureSecure">

::: tip
项目中考虑到使用多列，数据量太大，客户端会卡顿，所以采用单列的方法，相当于，不管怎么切换选择，列表的数据只有当前选择的这一级的数据，每次切换都会重新发起请求查询。下面代码高亮部分是接口请求，下图是接口返回的数据。代码区域的代码可直接粘贴复用（如有问题，请参考官网，或邮件联系：[yangyd5@asiainfo.com]()）
:::

<img :src="$withBase('/data-response.png')" style="max-height:400px" alt="mixureSecure">


```vue{70,71,72}
<template>
	<div>
		<van-cell @click.stop="showPopup = true" title="物料分类" :value="formInfo.materialsType" required is-link readonly></van-cell>

		<van-popup v-model="showPopup" position="bottom"  @closed="busiRegPickerClosed()" closeable close-icon="success">
			<van-tabs color="#409eff" style="width:90%;" v-model="busiRegTypeIndex" @click="clickBusiRegTab">
				<van-tab :title="selectLevel.levelOneName"></van-tab>
				<van-tab :title="selectLevel.levelTwoName"></van-tab>
				<van-tab :title="selectLevel.levelThreeName"></van-tab>
				<van-tab :title="selectLevel.levelFourName"></van-tab>
			</van-tabs>
			<van-picker @change="onChange" :loading="loading" :columns="columns" />
		</van-popup>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				showPopup: false,
				formInfo: {
					materialsType: ""
				},
				selectLevel: {
					levelOneVal: "",
					levelTwoVal: "",
					levelThreeVal: "",
					levelFourVal: "",
					levelOneName: "",
					levelTwoName: "",
					levelThreeName: "",
					levelFourName: ""
				},
				valArr: ["levelOneVal", "levelTwoVal", "levelThreeVal", "levelFourVal"],
				nameArr: ["levelOneName", "levelTwoName", "levelThreeName", "levelFourName"],
				loading: false,
				busiRegTypeIndex: 0,
				curSortLevel: 1,
				columns: []
			};
		},
		methods: {
			// 确定）或者遮罩关闭选择
			busiRegPickerClosed() {
				this.showPopup = false;
				
				let arr = this.valArr;
				let names = this.nameArr;
				this.formInfo.materialsType = "";

				let ind = this.busiRegTypeIndex;
				
				this.formInfo.meterialsSortId = this.selectLevel[arr[ind]];
				this.formInfo.meterialsSortName = this.selectLevel[names[ind]];
						
				names.forEach((val, ind) => {
					if (this.busiRegTypeIndex >= ind && this.formInfo.materialsType) {
							this.formInfo.materialsType += "-" + this.selectLevel[val];
					} else if (this.busiRegTypeIndex >= ind && !this.formInfo.materialsType) {
							this.formInfo.materialsType = this.selectLevel[val];
					}
				})
			},
			// 获取物料层级
			getTypeLevel(pid) {
				this.loading = true;
				setTimeout(() => {
					this.columns = [{code:"",name:"请选择",text:"请选择"}];
					this.$fetch(this.$api.url.materials.getLevelList,{ // 换成你所需要的接口及入参
						parentId: pid ? pid : 0
					}).then(res => {
						this.loading = false;
						if (res.resultCode == "000000" && res.result && res.result.length) {
							let data = res.result;
							data.forEach((val, ind) => {
								val.text = val.sortName;
								val.value = val.sortId;
								this.columns.push(val);
							})
						}
					})
				}, 1200)
			},
			// 切换选择
			onChange(picker, value, ind) {
				if (!value) {
					return false;
				}
				let sortLevel = Number(value.sortLevel);
				this.curSortLevel = sortLevel;
				this.busiRegTypeIndex = sortLevel - 1;
				let curInd = this.busiRegTypeIndex;
				let arr = ["levelOneVal", "levelTwoVal", "levelThreeVal", "levelFourVal"];
				let names = ["levelOneName", "levelTwoName", "levelThreeName", "levelFourName"];
				this.selectLevel[arr[curInd]] = value.sortId;
				this.selectLevel[names[curInd]] = value.sortName;

				if (this.busiRegTypeIndex >= 3 || (value.sortLevel && value.sortLevel == 4)) {
					return false;
				}
				this.getTypeLevel(value.sortId);	
			},
			// 已选择按钮点击
			clickBusiRegTab(value, name) {
				if (this.curSortLevel - 1 == value) {
					return false;
				}
				this.busiRegTypeIndex = value;
				this.curSortLevel = value + 1;
				let arr = this.valArr;
				let names = this.nameArr;
				
				let parentId = value ? this.selectLevel[arr[value - 1]] : 0;
				this.getTypeLevel(parentId);
				// 重新选择清空其他所有
				arr.forEach((val, ind) => {
					if (ind >= value){
						this.selectLevel[arr[ind]] = "";
						this.selectLevel[names[ind]] = "";
					}
				})
			}
		}
	};
</script>
```

::: warning
  注意：若此配置不满足需求，可去官网查看更详细配置！ [去看看](https://didi.github.io/cube-ui/#/zh-CN/docs/cascade-picker "cube-picker组件") 
:::
