<template>
	<div class="bg-box">
		<div class="top-box">
			<ul class="top-ul">
				<li>
					<span class="h-color"></span>
					<p>没有症状</p>
				</li>
				<li>
					<span class="b-color"></span>
					<p>有症状</p>
				</li>
				<li>
					<span class="r-color"></span>
					<p>症状严重</p>
				</li>
			</ul>
			<p class="tip-top">循环点击症状，切换症状轻重</p>
		</div>
		<div class="content-box">
			<p class="wenti-p">1.您的主观感受是怎么样的</p>
			<ul class="wenti-ul">
				<li v-for='(item,index) in data_dati' :key='index' @click='selectItem(index)'
				:class='{"two-ative":item.current == 1,"three-ative":item.current == 2}'
				>{{item.text}}{{item.current}}</li>
			</ul>
			<div class="btn-box">
				<p>上一步</p>
				<p>下一步</p>
			</div>
			<div class="loading-container" v-show="!data_dati.length">
				<!-- <loading></loading> -->
			</div>
		</div>

	</div>
</template>

<script>
	// import Loading from '../base/loading/loading.vue';

	export default {
		data() {
			return {
				data_dati:[
					{text:'容易疲劳',id:0,current:0},
					{text:'容易气短',id:1,current:0},
					{text:'说话声音低',id:2,current:1},
					{text:'体胖，感觉发沉',id:3,current:0},
					{text:'眼睛干涩',id:4,current:0},
					{text:'手脚发凉',id:5,current:0},
					{text:'比一般人怕冷',id:6,current:0},
					{text:'易患感冒',id:7,current:0},
					{text:'不感冒也鼻塞流涕',id:8,current:0},
					{text:'容易过敏',id:9,current:0},
					{text:'肢体麻或疼痛',id:10,current:0}
				]
			}
		},
		methods: {
			selectItem:function(index){
				if(this.data_dati[index].current > 2){
					this.data_dati[index].current = 0
				}else{
					this.data_dati[index].current++
				}
				console.log(this.data_dati[index].current)
			}
		},
		// components: {
		// 	Loading,
		// }
	}
</script>

<style scoped="scoped">
  .three-ative{background-color: #000000 !important;}
	.bg-box {
		width: 100%;
		min-height: 100vh;
		background-color: #4CB0FC;
		overflow: hidden;
	}

	.top-box {
		width: 90%;
		margin: 0 auto;
		padding: 25px 15px;
		box-sizing: border-box;
		background-color: #fff;
		border-radius: 15px;
		margin-top: 15px;
	}

	.top-ul {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.top-ul li {
		display: flex;
		flex-direction: row;
		align-items: center;
		margin-left: 40px;
		font-size: 14px;
	}

	.top-ul li:first-child {
		margin-left: 0px;
	}

	.top-ul li span {
		display: block;
		width: 14px;
		height: 14px;
		border-radius: 50%;
		margin-right: 5px;
	}

	.h-color {
		background-color: #F2F6FC;
	}

	.b-color {
		background-color: #4CB0FC;
	}

	.r-color {
		background-color: #FF5B54;
	}
	.tip-top{
		width: 100;
		text-align: center;
		color: #677289;
		font-size: 14px;
		margin-top: 15px;
	}

	.content-box{
		width: 90%;
		margin: 0 auto;
		margin-top: 15px;
		background-color: #fff;
		border-radius: 15px;
		box-sizing: border-box;
		padding: 15px;
	}
	.wenti-p{
		width: 100%;
		color: #1D293F;
		font-size: 16px;
		font-weight: bold;
	}
	.wenti-ul{
		width: 100%;
		overflow: hidden;
		min-height: 350px;
	}
	.wenti-ul li{
		padding: 11px 14.5px;
		border-radius: 15px;
		background-color: #F3F7FA;
		color: #999;
		float: left;
		margin-left: 15px;
		margin-top: 15px;
		font-size: 14px;
	}
	.wenti-ul li:nth-of-type(2n+1){
		margin-left: 40px;
	}
	.btn-box{
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content:center;
		margin-top: 45px;
	}
	.btn-box p:nth-of-type(1){
		width: 120px;
		border: 1px solid #4CB0FC;
		color: #4CB0FC;
		text-align: center;
		line-height: 43px;
		height: 43px;
		font-size: 16px;
		border-radius: 22px;
	}
	.btn-box p:nth-of-type(2){
		width: 120px;
		border: 1px solid #4CB0FC;
		color: #fff;
		background-color: #4CB0FC;
		margin-left: 45px;
		text-align: center;
		line-height: 43px;
		height: 43px;
		font-size: 16px;
		border-radius: 22px;
	}
	.wenti-ul .two-aitve{
		background-color: #4CB0FC !important;
		color: #fff !important;
	}
	.wenti-ul .three-aitve{
		background-color: #FF5B54 !important;
		color: #fff !important;
	}

	.loading-container {
		position: absolute;
		top: 50%;
		left: 35%;
		width: 120px;
		box-sizing: border-box;
		padding: 15px;
		color: #fff;
		font-size: 14px;
		border-radius: 15px;
		background-color: rgba(0,0,0,0.8);
	}
  .two-ative{color: #008000 !important;}
</style>
