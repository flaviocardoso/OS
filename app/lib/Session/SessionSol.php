<?php
namespace lib\Session;
class SessionSol {
    public function __construct($rows) {
		session_start();
		$_SESSION['id'] = $rows['id_user'];
		$_SESSION['user'] = $rows['user'];
		$_SESSION['user_nome'] = $rows['nome'];
		$_SESSION['user_email'] = $rows['email'];
		$_SESSION['user_coord'] = $rows['coord'];
		$_SESSION['user_ala'] = $rows['ala'];
		$_SESSION['user_sala'] = $rows['sala'];
		$_SESSION['user_ramal'] = $rows['ramal'];
		$_SESSION['user_grupo'] = "sol";
	}
}

?>