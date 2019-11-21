<?php
$session = 'ON';

if (!isset($_SESSION)) session_start();
if (!isset($_SESSION['user'])) {
    session_destroy();
    $session = 'OFF';
}

if ($session == 'ON') {
    $user_group = $_SESSION['user_grupo'];
    echo $user_group;
} else {
    echo "";
}
?>