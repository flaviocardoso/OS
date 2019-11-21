<!-- "Sistema antigo de verificação de erro para o usuário"
<div class="alert alert-danger text-center" role="alert" ng-show="errorLogin">
  <button type="button" class="close" ng-click="clearMsg()"><span aria-hidden="true">&times;</span></button>
  {{ errorMsg }}
</div>
-->
<!-- <div class="form">
 <form class="form-signin" name="userForm">
 	<h1 class="h3 mb-3 font-weight-normal">Login</h1>
 	<label for="inputText" class="sr-only text-center">User</label>
 	<input type="text" id="inputText" class="form-control" ng-model="user.username" placeholder="Usuário" required autofocus />
 	<label for="inputPassword" class="sr-only text-center">Senha</label>
 	<input type="password" id="inputPassword" class="form-control" ng-model="user.password" placeholder="Senha" required />
 	<button class="btn btn-lg btn-success btn-block" type="submit" ng-click="login(user)" ng-disabled="userForm.$invalid">Login</button>
 	<p class="mt-5 mb-3 text-muted text-center">© CBPF 2018</p>
 </form>
</div>
<pre>
	{{ user }}
</pre> -->

<div class="box">
  <div id="header">
    <div id="cont-lock"><div class="lock"><i class="fa fa-sign-in">lock</i></div></div>
    <div id="bottom-head"><h1 id="logintoregister">Login</h1></div>
  </div>
  
   <form name="userForm">
    <div class="loft group">      
      <input class="inputMaterial" type="text" ng-model="user.username" autofocus required>
      <span class="highlight"></span>
      <span class="bar"></span>
      <label class="label">Usuário</label>
    </div>
	    <div class="loft group">      
      <input class="inputMaterial" type="password" ng-model="user.password" required>
      <span class="highlight"></span>
      <span class="bar"></span>
      <label class="label">Senha</label>
    </div>
	<button id="buttonlogintoregister" type="submit" ng-click="login(user)" ng-disabled="userForm.$invalid">Login</button>
	<div id="footer-box"><p class="footer-text">© CBPF 2018</p></div>
  	</form>
   
</div>