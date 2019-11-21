<nav class="navbar navbar-expand-lg navbar-light bg-light sticky-top" ng-hide="!(menu)">
    <div class="container-fluid">

        <button type="button" id="sidebarCollapse" class="btn btn-info">
            <i class="fas fa-align-left"></i>
            <span>Menu</span>
        </button>
        <button class="btn btn-light ml-auto" type="button" data-toggle="dropdown" data-target="#navbarSupportedContent" aria-expanded="false" aria-expanded="false">
            <i class="fas fa fa-ellipsis-v fa-2x"></i>
        </button>

        <div class="dropdown-menu dropdown-menu-right" id="navbarSupportedContent">
            <button class="dropdown-item" type="button">Action</button>
            <button class="dropdown-item" type="button">Another action</button>
            <button class="dropdown-item" type="button">Something else here</button>
            <button class="dropdown-item btn btn-danger" ng-click="logout()"><span class="glyphicon glyphicon-log-out"></span> Logout</a>            
        </div>
    </div>
</nav>