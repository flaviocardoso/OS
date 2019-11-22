<?php

session_start();
session_unset();

session_commit();
session_destroy();
//header("Location : http://labweb.cbpf.br/principal.php");
exit;
?>
