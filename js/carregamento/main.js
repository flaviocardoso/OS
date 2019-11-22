(function () {
    let paths = [
        "/js/application/0.0.1/application.js"
        // "/js/application/0.0.1/main.js",
        // "/js/application/0.0.1/components/components.js",
        // "/js/application/0.0.1/directives/directives.js",
        // "/js/application/0.0.1/controllers/longin-controller.js",
        // "/js/application/0.0.1/controllers/dashboard-controller.js",
        // "/js/application/0.0.1/controllers/os-controller.js",
        // "/js/application/0.0.1/controllers/criaros-controller.js",
        // "/js/application/0.0.1/controllers/criarossolic-controller.js",
        // "/js/application/0.0.1/controllers/criarosdest-controller.js",
        // "/js/application/0.0.1/controllers/criarosdescr-controller.js",
        // "/js/application/0.0.1/controllers/ver-controller.js",
        // "/js/application/0.0.1/controllers/contato-controller.js",
        // "/js/application/0.0.1/controllers/sobre-controller.js",
        // "/js/application/0.0.1/controllers/veros-controller.js",
        // "/js/application/0.0.1/controllers/editeteclista-controller.js",
        // "/js/application/0.0.1/controllers/verosid-controller.js",
        // "/js/application/0.0.1/controllers/criartec-controller.js",
        // "/js/application/0.0.1/controllers/editetec-controller.js",
        // "/js/application/0.0.1/controllers/verosedit-controller.js",
        // "/js/application/0.0.1/controllers/other-controller.js",
        // "/js/application/0.0.1/services/coord-service.js",
        // "/js/application/0.0.1/services/login-service.js",
        // "/js/application/0.0.1/services/loginsession-service.js",
        // "/js/application/0.0.1/services/logingroup-service.js",
        // "/js/application/0.0.1/services/ordem-service.js",
        // "/js/application/0.0.1/services/download-service.js",
        // "/js/application/0.0.1/services/session-service.js"
    ];

    function asyncLoader (path) {
        let d = document;
        let cr = d.getElementById('createjs');
        let script = d.createElement('script');
        //script.type = 'text/script';
        //script.async = true;
        script.src = path;
        cr.appendChild(script);
    }

    function ajaxLoader (path) {
        $.ajax({
            url: path,
            dataType: "script",
            success: () => {
                console.log('arquivo carregado');
            }
        });
    }

   

    paths.forEach(path => {
        asyncLoader(path);
        //ajaxLoader(path);
    });
})();