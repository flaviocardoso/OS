<!DOCTYPE html>
<html ng-app="app">
  <head>
    <meta name="viewport" content="width=device-width initial-scale=1 maximum-scale=1">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="content-type" content="text/html" charset="utf-8" />
    <meta http-equiv="content-language" content="pt-br" />
    <title>AngularJS APP</title> 
    <base href="/">
    <link rel="stylesheet" href="/css/bootstrap/4.1.3/bootstrap.min.css">    
    <script src="/js/jquery/3.3.1/jquery-3.3.1.slim.min.js"></script>
    <link rel="stylesheet" type="text/css" href="/css/toaster.css">
    <link rel="stylesheet" href="/css/signin.css">
    <link rel="stylesheet" type="text/css" href="/css/menu.css">    
    <link rel="stylesheet" href="/css/ngProgress.css">    
    <script defer src="/js/fontawesome/5.0.13/solid.js"></script>
    <script defer src="/js/fontawesome/5.0.13/fontawesome.js"></script>    
    <link rel="stylesheet" href="/css/plugin/3.1.5/jquery.mCustomScrollbar.min.css">
    <script src="/js/plugin/3.1.5/jquery.mCustomScrollbar.concat.min.js"></script>    
  </head>
  <body class="bg-light">
    <ui-view></ui-view>
    <toaster-container toaster-options="{'time-out': 5000}"></toaster-container>
    <toaster-container toaster-options="{'toaster-id' : 'info-order-service', 'time-out': 10000, 'position-class': 'toast-top-full-width'}"></toaster-container>
    <script src="/js/angularjs/1.7.3/angular.js"></script>
    <script src="/js/angularjs/1.7.3/angular-animate.min.js"></script>
    <script src="/js/angularjs/1.7.3/angular-aria.min.js"></script>
    <script src="/js/angularjs/1.7.3/angular-cookies.min.js"></script>
    <script src="/js/angularjs/1.7.3/angular-loader.min.js"></script>
    <script src="/js/angularjs/1.7.3/angular-message-format.min.js"></script>
    <script src="/js/angularjs/1.7.3/angular-messages.min.js"></script>
    <script src="/js/angularjs/1.7.3/angular-resource.min.js"></script>
    <script src="/js/angularjs/1.7.3/angular-route.min.js"></script>
    <script src="/js/angularjs/1.7.3/angular-touch.min.js"></script>
    <script src="/js/angularjs/uirouter/1.0.20/angular-ui-router.min.js"></script>
    <script src="/js/angularjs/uirouter/1.0.20/resolveService.min.js"></script>
    <script src="/js/angularjs/uirouter/1.0.20/stateEvents.min.js"></script>
    <script src="/js/ngprogress.js"></script>
    <script src="/js/toaster.js"></script>
    <script src="/js/md5.js"></script>
    <script src="/js/application/0.0.1/application.js"></script>
    <script src="/js/popper/1.14.3/popper.min.js"></script>
    <script src="/js/bootstrap/4.1.3/bootstrap.min.js"></script>  
    <script src="/js/popover/0.1/popclick.js"></script>
  </body>
</html>