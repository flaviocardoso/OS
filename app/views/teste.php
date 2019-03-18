<div class="form-group">
	<label for="downloadfile">Download File</label>
	<input type="text" id="downloadfile" ng-model="downloadfile" class="form-control"/>
	<button ng-click="download(downloadfile)">Download</button>
	<a ng-href="/app/data/downloadFile.php?file={{downloadfile}}" download={{downloadfile}} >Downlad arquivo </a>
	<a file-download="downloadfile">teste link</a>
</div>
<div class="form-group">
	<label for="fileToUpload">Selecine o arquivo</label>
	<input type="file" id="fileToUpload" class="form-control"/>
</div>
<!-- <div id="dropbox" class="form-group dropbox" ng-class="dropClass"><span class="text-center">{{dropText}}</span></div> --> 
<div ng-show="files.length" class="" class="form-group">
	<span>{{files[0].name}}</span>
	(
		<span ng-switch="files[0].size > 1024*1024">
			<span ng-switch-when="true">{{files[0].size / 1024 / 1024 | number:2}} MB</span>
			<span ng-switch-default>{{files[0].size / 1024 | number:2}} KB</span>
		</span>
	)
	<input type="button" ng-click="uploadFile()" value="Upload" />
</div>
<div ng-show="progressVisible" class="form-group">
	<label for="percent">Carregamento :</label>
	<div class="percent">{{progress}}%</div>
	<div class="progress-bar">
		<div class="uploaded" ng-style="{'width': progress + '%'}"></div>
	</div>
</div>

<!--
<form>
	nome : <input type="text" ng-model="nome" />
	file : <input type="file" file-model="file" name="arquivo" id="inputfile">
	<input type="submit" value="enviar" ng-click="enviar(file, nome)">
</form>
-->