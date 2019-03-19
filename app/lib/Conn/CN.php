<?php

namespace lib\Conn;

class CN // namespace_class
{
	protected $link;
	protected $current_year;
	protected $last_year;
	protected $current_date;

	public function get_current_year() {
		return $this->current_year = date('Y');
	}

	public function get_last_year() {
		return $this->last_year = $this->get_current_year() - 1;
	}

	public function get_current_date() {
		return $this->current_date = date('Y-m-d');
	}

	public function __construct($host = "localhost", $dbname, $username = "flavioc41", $password = "leoncio4")
	{
		try
    	{
			$this->link = new \PDO('mysql:host=' . "{$host}" . ';dbname=' . $dbname . ';charset=utf8', "{$username}", "{$password}");
			// echo $this->get_current_date() . "\n";
			// echo $this->get_last_year();		  
    	}
    	catch (\PDOException $e)
    	{
      		print 'ERRO' . $e->getMessage() . "<br/>";
      		die();
    	}
	}

	// base - cbpf_users
	public function sessionUser($user)
	{
		$rows = array();
		$count = 0;

		try
		{
			$sql = "SELECT 
						US.id_user, 
						US.ativo, 
						GR.grupo, 
						US.user, 
						GR.S, 
						US.nome, 
						US.email, 
						US.coord, 
						GR.setor, 
						GR.area, 
						US.ala, 
						US.sala, 
						US.ramal 
					FROM users AS US 
					JOIN grupoos AS GR 
					ON US.user = GR.user 
					WHERE US.user=:user"; // adicionado setor, ala, sala, ramal
			$stmt = $this->link->prepare($sql);
			$stmt->bindParam(':user', $user, \PDO::PARAM_STR);
			$stmt->execute();
			$count = $stmt->rowCount();
			$rows = $stmt->fetch(\PDO::FETCH_ASSOC);
		}
		catch (\PDOException $e)
		{
			print 'ERRO' . $e->getMessage() . "<br/>";
		}
		//echo $count;
		return array('rows' => $rows, 'count' => $count);
	}

	public function sessionUserSol($user) {
		$rows = array();
		$count = 0;

		try 
		{
			$sql = "SELECT 
						id_user, 
						ativo, 
						user, 
						nome, 
						email, 
						coord, 
						ala, 
						sala, 
						ramal 
					FROM users 
					WHERE user=:user";
			$stmt = $this->link->prepare($sql);
			$stmt->bindParam(':user', $user, \PDO::PARAM_STR);
			$stmt->execute();
			$count = $stmt->rowCount();
			$rows = $stmt->fetch(\PDO::FETCH_ASSOC);
		}
		catch (\PDOException $e)
		{
			print 'Erro' . $e->getMessage() . '<br>';
		}
		return array('rows' => $rows, 'count' => $count);
	}

	//base - cbbf_estrutura
	public function dataCoord()
	{
		$rows = array();
		$count = 0;

		try
		{
			$sql = "SELECT coord FROM coords";
			$stmt = $this->link->prepare($sql);
			$stmt->execute();
			$count = $stmt->rowCount();
			$rows = $stmt->fetchAll(\PDO::FETCH_ASSOC);
		}
		catch (\PDOException $e)
		{
			print 'ERRO' . $e->getMessage() . "<br/>";
		}
		return array('rows' => $rows, 'count' => $count);
	}

	// base - cbpf_estrutura
	public function dataSetorByCoord($coord)
	{
		$rows = array();
		$count = 0;

		try
		{
			$sql = "SELECT 
						setor
					FROM setores 
					WHERE coord=:coord";
			$stmt = $this->link->prepare($sql);
			$stmt->bindParam(':coord', $coord, \PDO::PARAM_STR);
			$stmt->execute();
			$count = $stmt->rowCount();
			$rows = $stmt->fetchAll(\PDO::FETCH_ASSOC);
		}
		catch (\PDOException $e)
		{
			print 'ERRO' . $e->getMessage() . "<br/>";
		}
		return array('rows' => $rows, 'count' => $count);
	}

	// base - cbpf_estrutura
	public function dataAreaBySetor($setor)
	{
		$rows = array();
		$count = 0;

		if (gettype($setor) == "array") {
			$places = implode(',', array_fill(0, count($setor), '?'));
			//$places = implode(', ', $setor);
			//echo $places;
			// $params = array_merge([valor], $setor, [valor2]);
			$params = array_merge($setor);
		} else {
			$places = "?";
			$params = array_merge([$setor]);
		}		

		try
		{
			$sql = "SELECT 
						valor 
					FROM areas 
					WHERE setor IN ({$places})";			
			$stmt = $this->link->prepare($sql);
			//$stmt->bindParam(':setor', $places, \PDO::PARAM_STR);
			$stmt->execute($params);
			$count = $stmt->rowCount();
			$rows = $stmt->fetchAll(\PDO::FETCH_ASSOC);
		}
		catch (\PDOException $e)
		{
			print 'ERRO' . $e->getMessage() . "<br/>";
		}
		return array('rows' => $rows, 'count' => $count);
	}

	public function updateDateOS() { // funcão para atualização das ordens de serviços
		$count = 0;

		$data = date('Y-m-d H:i:s');

		try
		{
			$sql = "UPDATE 
						ordemservice 
					SET `data_now`=:data_now";
			$stmt = $this->link->prepare($sql);
			$stmt->bindParam(":data_now", $data, \PDO::PARAM_STR);
			$stmt->execute();
			$count = $stmt->rowCount();
		}
		catch(\PDOException $e)
		{
			print 'ERRO' . $e->getMessage() . "<br/>";
		}

		return $count;
	}

	public function updateColorOS($id, $color)
	{
		$count = 0;

		// echo "função Update\n";
		// echo "id : $id \n";
		// echo "color: $color \n";

		try
		{
			$sql = "UPDATE 
						ordemservice 
					SET cor_os=:cor_os 
					WHERE id_os=:id_os";
			$stmt = $this->link->prepare($sql);
			$stmt->bindParam(':cor_os', $color, \PDO::PARAM_STR);
			$stmt->bindParam(':id_os', $id, \PDO::PARAM_STR);
			$stmt->execute();
			$count = $stmt->rowCount();
		}
		catch (\PDOException $e)
		{
			print 'Erro' . $e->getMessage() . '<br>';
		}

		echo "id: $id \n";
		echo "color: $color \n";
		echo "count: $count \n <br>";

		return $count;
	}

	public function getOSSimplesNova()
	{
		$rows = array();
		$count = 0;

		try
		{
			$sql = "SELECT 
						`id_os`, 
						data_in, 
						`data_up` 
					FROM `ordemservice`
					WHERE `status`='NOVA'";
			$stmt = $this->link->prepare($sql);
			$stmt->execute();
			$rows = $stmt->fetchAll(\PDO::FETCH_ASSOC);
			$count = $stmt->rowCount();
		}
		catch (\PDOException $e)
		{
			print 'Erro' . $e->getMessage() . '<br>';
		}

		return array('count' => $count, 'rows' => $rows);
	}

	public function getOSSimplesAndamento()
	{
		$rows = array();
		$count = 0;

		try
		{
			$sql = "SELECT 
						`id_os`, 
						data_in, 
						`data_up` 
					FROM `ordemservice` 
					WHERE `status`='Andamento'";
			$stmt = $this->link->prepare($sql);
			$stmt->execute();
			$rows = $stmt->fetchAll(\PDO::FETCH_ASSOC);
			$count = $stmt->rowCount();
		}
		catch (\PDOException $e)
		{
			print 'Erro' . $e->getMessage() . '<br>';
		}

		return array('count' => $count, 'rows' => $rows);
	}
	// criar técnico
	public function criarUser($User) {
		$count = 0;
		$count1 = 0;
		$array = array();

		$data = date('Y-m-d');
		// arrays enter
		//$placesholders = implode(',', array_fill(0, count($setor), '?')); 
		//$params = array_merge();
		if (gettype($User->setor) == 'array') {
			$setor = implode(',', $User->setor);			
		} else {
			$setor = $User->setor;
		}

		if (gettype($User->area) == "array") {
			$area = implode(',', $User->area);
		} else {
			$area = $User->area;
		}
		// trocar posição 
		try 
		{		
			$sql1 = "INSERT INTO grupoos (id_grupo, user, S, grupo, setor, area)";
			$sql1 = $sql1 . " VALUES (NULL, :user, 0, :grupo, :setor, :area)";

			$stmt1 = $this->link->prepare($sql1);
			$stmt1->bindParam(':user', $User->user, \PDO::PARAM_STR);
			$stmt1->bindParam(':grupo', $User->grupo, \PDO::PARAM_STR);
			$stmt1->bindParam(':setor', $setor, \PDO::PARAM_STR);
			$stmt1->bindParam(':area', $area, \PDO::PARAM_STR);

			$stmt1->execute();
			$count1 = $stmt1->rowCount();			

			if ($count1 == 1) { // trocar posição começar pelo grupo primeiro
				$sql = "INSERT INTO users (id_user, ativo, user, nome, email, ramal, coord, ala, sala, data_criacao)";
				$sql = $sql . " VALUES (NULL, 1, :user, :nome, :email, :ramal, :coord, :ala, :sala, :data)";
				$stmt = $this->link->prepare($sql);
				$stmt->bindParam(':user', $User->user, \PDO::PARAM_STR);
				$stmt->bindParam(':nome', $User->nome, \PDO::PARAM_STR);
				$stmt->bindParam(':email', $User->email, \PDO::PARAM_STR);
				$stmt->bindParam(':ramal', $User->ramal, \PDO::PARAM_STR);
				$stmt->bindParam(':coord', $User->coord, \PDO::PARAM_STR);
				$stmt->bindParam(':ala', $User->ala, \PDO::PARAM_STR);
				$stmt->bindParam(':sala', $User->sala, \PDO::PARAM_STR);
				$stmt->bindParam(':data', $data, \PDO::PARAM_STR);
				$stmt->execute();
				$count = $stmt->rowCount();
			}			
		}
		catch (\PDOException $e)
		{
			print 'Erro' . $e->getMessage() . '<br>';
		}

		return $count1;
	}

	public function getUsers()
	{
		$count = 0;
		$array = array();

		try
		{
			$sql = "SELECT 
						US.ativo, 
						US.user, 
						US.nome, 
						US.email, 
						GR.grupo, 
						US.coord, 
						GR.setor, 
						GR.area, 
						US.ramal, 
						US.ala, 
						US.sala 
					FROM users AS US 
					JOIN grupoos AS GR 
					ON US.user=GR.user
					WHERE GR.S=0";
			$stmt = $this->link->prepare($sql);
			$stmt->execute();
			$count = $stmt->rowCount();
			$array = $stmt->fetchAll(\PDO::FETCH_ASSOC);
		}
		catch (\PDOExecption $e)
		{
			print 'Erro' . $e->getMessage() . "<br>";
		}

		return $array;
	}

	// base - cbpf_os
	public function criarOS($OS)
	{
		//$row = array();
		$count = 0;
		$date = date('Y-m-d H:i:s');
		$cor = "#5cb85c";

		try
		{
			$sql = "INSERT INTO ordemservice (id_os, n_os, cor_os, status, solicitante, sol_email, sol_coord, sol_ala, sol_sala, sol_ramal, data_in,";
			$sql = $sql . " data_up, dest_coord, dest_setor, dest_area, file, descr_topic, descr, criador, criador_email)";
			$sql = $sql . " VALUES (NULL, :n_os, :cor_os, :status, :solicitante, :sol_email, :sol_coord, :sol_ala, :sol_sala, :sol_ramal,";
			$sql = $sql . " :data_in, :data_up, :dest_coord, :dest_setor, :dest_area, :file, :descr_topic, :descr, :criador, :criador_email)";
			$stmt = $this->link->prepare($sql);
			$stmt->bindParam(':n_os', $OS->n_os, \PDO::PARAM_STR);
			$stmt->bindParam(':cor_os', $cor, \PDO::PARAM_STR);
			$stmt->bindParam(':status', $OS->status, \PDO::PARAM_STR);
			$stmt->bindParam(':solicitante', $OS->solicitante, \PDO::PARAM_STR);
			$stmt->bindParam(':sol_email', $OS->sol_email, \PDO::PARAM_STR);
			$stmt->bindParam(':sol_coord', $OS->sol_coord, \PDO::PARAM_STR);
			//$stmt->bindParam(':sol_setor', $OS->sol_setor, \PDO::PARAM_STR);
			$stmt->bindParam(':sol_ala', $OS->sol_ala, \PDO::PARAM_STR);
			$stmt->bindParam(':sol_sala', $OS->sol_sala, \PDO::PARAM_STR);
			$stmt->bindParam(':sol_ramal', $OS->sol_ramal, \PDO::PARAM_STR);
			$stmt->bindParam(':data_in' , $OS->data_in, \PDO::PARAM_STR);
			$stmt->bindParam(':data_up', $OS->data_up, \PDO::PARAM_STR);
			//$stmt->bindParam(':data_now', $date, \PDO::PARAM_STR);
			$stmt->bindParam(':dest_coord', $OS->dest_coord, \PDO::PARAM_STR);
			$stmt->bindParam(':dest_setor', $OS->dest_setor, \PDO::PARAM_STR);
			$stmt->bindParam(':dest_area', $OS->dest_area, \PDO::PARAM_STR);
			$stmt->bindParam(':file', $OS->file, \PDO::PARAM_STR);
			$stmt->bindParam(':descr_topic', $OS->descr_topic, \PDO::PARAM_STR);
			$stmt->bindParam(':descr', $OS->descr, \PDO::PARAM_STR);
			$stmt->bindParam(':criador', $OS->criador, \PDO::PARAM_STR);
			$stmt->bindParam(':criador_email', $OS->criador_email, \PDO::PARAM_STR);
			$stmt->execute();
			$count = $stmt->rowCount();
			//$rows = $stmt->fetchAll(\PDO::FETCH_ASSOC);

		}
		catch (\PDOException $e)
		{
			print 'ERRO' . $e->getMessage() . "<br/>";
		}

		return array('count' => $count);
	}

	// base - cbpf_os
	public function editarOS($OS)
	{
		//$row = array();
		$count = 0;
		$date = date('Y-m-d H:i:s');
		$cor = "#5cb85c";

		try
		{ // atualizado 03/02/2019
			$sql = "UPDATE `ordemservice` SET `cor_os`=:cor_os, `data_in`=:data_in, `data_up`=:data_up,";
			$sql = $sql . " `status`='NOVA', `sol_ala`=:sol_ala, `sol_sala`=:sol_sala, `sol_ramal`=:sol_ramal, ";
			$sql = $sql . " `dest_coord`=:dest_coord, `dest_setor`=:dest_setor, `dest_area`=:dest_area, ";
			$sql = $sql . " `file`=:file, `descr_topic`=:descr_topic, `descr`=:descr WHERE `id_os`=:id_os";
			$stmt = $this->link->prepare($sql);			
			// $stmt->bindParam(':solicitante', $OS->solicitante, \PDO::PARAM_STR);
			// $stmt->bindParam(':sol_email', $OS->sol_email, \PDO::PARAM_STR);
			// $stmt->bindParam(':sol_coord', $OS->sol_coord, \PDO::PARAM_STR);
			// $stmt->bindParam(':sol_setor', $OS->sol_setor, \PDO::PARAM_STR);
			$stmt->bindParam(':cor_os', $cor, \PDO::PARAM_STR);
			$stmt->bindParam(':data_in', $date, \PDO::PARAM_STR);
			$stmt->bindParam(':data_up', $date, \PDO::PARAM_STR);
			$stmt->bindParam(':sol_ala', $OS->sol_ala, \PDO::PARAM_STR);
			$stmt->bindParam(':sol_sala', $OS->sol_sala, \PDO::PARAM_STR);
			$stmt->bindParam(':sol_ramal', $OS->sol_ramal, \PDO::PARAM_STR);			
			$stmt->bindParam(':dest_coord', $OS->dest_coord, \PDO::PARAM_STR);
			$stmt->bindParam(':dest_setor', $OS->dest_setor, \PDO::PARAM_STR);
			$stmt->bindParam(':dest_area', $OS->dest_area, \PDO::PARAM_STR);
			$stmt->bindParam(':file', $OS->file, \PDO::PARAM_STR);
			$stmt->bindParam(':descr_topic', $OS->descr_topic, \PDO::PARAM_STR);
			$stmt->bindParam(':descr', $OS->descr, \PDO::PARAM_STR);
			$stmt->bindParam(':id_os', $OS->id_os, \PDO::PARAM_STR);
			$stmt->execute();
			$count = $stmt->rowCount();
			//$rows = $stmt->fetchAll(\PDO::FETCH_ASSOC);
		}
		catch (\PDOException $e)
		{
			print 'ERRO' . $e->getMessage() . "<br/>";
		}

		return array('count' => $count);
	}

	// base - cbpf_os
	public function pegarOS($OS)
	{
		$row = array();
		$count = 0;

		try
		{
			$sql = "SELECT id_os, n_os, cor_os, status, solicitante, sol_email, sol_coord, sol_setor, sol_ala, sol_sala, sol_ramal, data_in, data_up, dest_coord, dest_setor, dest_area, file, descr_topic, descr FROM `ordemservice` WHERE dest_coord=:dest_coord";
			$stmt = $this->link->prepare($sql);
			$stmt->bindParam(':dest_coord', $OS->dest_coord, \PDO::PARAM_STR);
			$stmt->execute();
			$count = $stmt->rowCount();
			$row = $stmt->fetchAll(\PDO::FETCH_ASSOC);
		}
		catch (\PDOException $e)
		{
			print 'Erro' . $e->getMessage() . "<br/>";
		}

		return array('count' => $count, 'rows' => $row);
	}
	// entrada para pesquisa em adminstração na coordenação
	public function pegarOSnova($OS)
	{
		$row = array();
		$count = 0;
		// sem necessidade de juntar tabelas para novas ordens de serviço
		try
		{
			$sql = "SELECT id_os, n_os, cor_os, status, solicitante, sol_email, sol_coord, sol_setor, sol_ala, sol_sala, sol_ramal, data_in, data_up, dest_coord, dest_setor, dest_area, file, descr_topic, descr FROM `ordemservice` WHERE status='NOVA' AND dest_coord=:dest_coord";
			$stmt = $this->link->prepare($sql);
			$stmt->bindParam(':dest_coord', $OS->dest_coord, \PDO::PARAM_STR);
			$stmt->execute();
			$count = $stmt->rowCount();
			$row = $stmt->fetchAll(\PDO::FETCH_ASSOC);
		}
		catch (\PDOException $e)
		{
			print 'Erro' . $e->getMessage() . "<br/>";
		}

		return array('count' => $count, 'rows' => $row);
	}

	public function pegarOSnovaId($OS)
	{
		$row = array();
		$count = 0;
		// sem necessidade de juntar tabelas para novas ordens de serviço
		try
		{
			$sql = "SELECT id_os, n_os, status, solicitante, sol_email, sol_coord, sol_setor, sol_ala, sol_sala, sol_ramal, data_in, data_up, dest_coord, dest_setor, dest_area, file, descr_topic, descr FROM `ordemservice` WHERE status='NOVA' AND dest_coord=:dest_coord AND id_os=:id_os";
			$stmt = $this->link->prepare($sql);
			$stmt->bindParam(':dest_coord', $OS->dest_coord, \PDO::PARAM_STR);
			$stmt->bindParam(':id_os', $OS->id_os, \PDO::PARAM_INT);
			$stmt->execute();
			$count = $stmt->rowCount();
			$row = $stmt->fetch(\PDO::FETCH_ASSOC);
		}
		catch (\PDOException $e)
		{
			print 'Erro' . $e->getMessage() . "<br/>";
		}

		return array('count' => $count, 'row' => $row);
	}

	public function pegarOSemAnd($OS)
	{
		$row = array();
		$count = 0;
		// juntanto tabelas ordemservice e tecnico
		try
		{
			$sql = "SELECT OS.id_os, OS.n_os, OS.cor_os, OS.status, OS.solicitante, OS.sol_email, OS.sol_coord, OS.sol_setor, OS.sol_ala, OS.sol_sala, OS.sol_ramal, OS.data_in, OS.data_up, OS.dest_coord, OS.dest_setor, OS.dest_area, OS.file, OS.descr_topic, OS.descr, LA.user_tec, LA.tecnico, LA.status_tec, LA.tec_email, LA.laudo_topic, LA.laudo, LA.tec_ala, LA.tec_sala, LA.tec_ramal FROM `ordemservice` AS OS JOIN (SELECT * FROM tecnico WHERE id_tecnico in (SELECT MAX(id_tecnico) FROM tecnico WHERE status_tec='ANDAMENTO' GROUP BY id_os) ORDER BY id_tecnico) AS LA ON OS.id_os = LA.id_os WHERE OS.status='ANDAMENTO' AND OS.dest_coord=:dest_coord ORDER BY id_tecnico";
			$stmt = $this->link->prepare($sql);
			$stmt->bindParam(':dest_coord', $OS->dest_coord, \PDO::PARAM_STR);
			$stmt->execute();
			$count = $stmt->rowCount();
			$row = $stmt->fetchAll(\PDO::FETCH_ASSOC);
		}
		catch (\PDOException $e)
		{
			print 'Erro' . $e->getMessage() . "<br/>";
		}

		return array('count' => $count, 'rows' => $row);
	}

	public function pegarOSemAndId($OS)
	{
		$row = array();
		$count = 0;
		// juntanto tabelas ordemservice e tecnico
		try
		{
			$sql = "SELECT OS.id_os, OS.n_os, OS.status, OS.solicitante, OS.sol_email, OS.sol_coord, OS.sol_setor, OS.sol_ala, OS.sol_sala, OS.sol_ramal, OS.data_in, OS.data_up, OS.dest_coord, OS.dest_setor, OS.dest_area, OS.file, OS.descr_topic, OS.descr, LA.user_tec, LA.tecnico, LA.status_tec, LA.tec_email, LA.laudo_topic, LA.laudo, LA.tec_ala, LA.tec_sala, LA.tec_ramal FROM `ordemservice` AS OS JOIN (SELECT * FROM tecnico WHERE id_tecnico in (SELECT MAX(id_tecnico) FROM tecnico WHERE status_tec='ANDAMENTO' GROUP BY id_os) ORDER BY id_tecnico) AS LA ON OS.id_os = LA.id_os WHERE OS.status='ANDAMENTO' AND OS.dest_coord=:dest_coord AND OS.id_os=:id_os ORDER BY id_tecnico";
			$stmt = $this->link->prepare($sql);
			$stmt->bindParam(':dest_coord', $OS->dest_coord, \PDO::PARAM_STR);
			$stmt->bindParam(':id_os', $OS->id_os, \PDO::PARAM_INT);
			$stmt->execute();
			$count = $stmt->rowCount();
			$row = $stmt->fetch(\PDO::FETCH_ASSOC);
		}
		catch (\PDOException $e)
		{
			print 'Erro' . $e->getMessage() . "<br/>";
		}

		return array('count' => $count, 'row' => $row);
	}

	public function pegarOSEncerr($OS)
	{
		$row = array();
		$count = 0;
		// juntanto tabelas ordemservice e tecnico
		try
		{
			$sql = "SELECT OS.id_os, OS.n_os, OS.cor_os, OS.status, OS.solicitante, OS.sol_email, OS.sol_coord, OS.sol_setor, OS.sol_ala, OS.sol_sala, OS.sol_ramal, OS.data_in, OS.data_up, OS.dest_coord, OS.dest_setor, OS.dest_area, OS.file, OS.descr_topic, OS.descr, LA.user_tec, LA.status_tec, LA.tecnico, LA.tec_email, LA.laudo_topic, LA.laudo, LA.tec_ala, LA.tec_sala, LA.tec_ramal FROM `ordemservice` AS OS JOIN (SELECT * FROM tecnico WHERE id_tecnico in (SELECT MAX(id_tecnico) FROM tecnico WHERE status_tec='ANDAMENTO' GROUP BY id_os) ORDER BY id_tecnico) AS LA ON OS.id_os = LA.id_os WHERE OS.status='ENCERRADA' AND OS.dest_coord=:dest_coord ORDER BY id_tecnico";
			$stmt = $this->link->prepare($sql);
			$stmt->bindParam(':dest_coord', $OS->dest_coord, \PDO::PARAM_STR);
			$stmt->execute();
			$count = $stmt->rowCount();
			$row = $stmt->fetchAll(\PDO::FETCH_ASSOC);
		}
		catch (\PDOException $e)
		{
			print 'Erro' . $e->getMessage() . "<br/>";
		}

		return array('count' => $count, 'rows' => $row);
	}

	public function pegarOSEncerrId($OS)
	{
		$row = array();
		$count = 0;
		// juntanto tabelas ordemservice e tecnico
		try
		{
			$sql = "SELECT OS.id_os, OS.n_os, OS.status, OS.solicitante, OS.sol_email, OS.sol_coord, OS.sol_setor, OS.sol_ala, OS.sol_sala, OS.sol_ramal, OS.data_in, OS.data_up, OS.dest_coord, OS.dest_setor, OS.dest_area, OS.file, OS.descr_topic, OS.descr, LA.user_tec, LA.status_tec, LA.tecnico, LA.tec_email, LA.laudo_topic, LA.laudo, LA.tec_ala, LA.tec_sala, LA.tec_ramal FROM `ordemservice` AS OS JOIN (SELECT * FROM tecnico WHERE id_tecnico in (SELECT MAX(id_tecnico) FROM tecnico WHERE status_tec='ANDAMENTO' GROUP BY id_os) ORDER BY id_tecnico) AS LA ON OS.id_os = LA.id_os WHERE OS.status='ENCERRADA' AND OS.dest_coord=:dest_coord AND OS.id_os=:id_os ORDER BY id_tecnico";
			$stmt = $this->link->prepare($sql);
			$stmt->bindParam(':dest_coord', $OS->dest_coord, \PDO::PARAM_STR);
			$stmt->bindParam(':id_os', $OS->id_os, \PDO::PARAM_INT);
			$stmt->execute();
			$count = $stmt->rowCount();
			$row = $stmt->fetch(\PDO::FETCH_ASSOC);
		}
		catch (\PDOException $e)
		{
			print 'Erro' . $e->getMessage() . "<br/>";
		}

		return array('count' => $count, 'row' => $row);
	}
	// admin ordens de serviços enviadas
	public function enviadaOSnova($OS)
	{
		$row = array(); //var_dump($OS);
		$count = 0; //var_dump($OS->solic_coord);
		// sem necessidade de juntar tabelas para novas ordens de serviço
		try
		{
			$sql = "SELECT OS.id_os, (SELECT COUNT(TE.M) FROM tecnico AS TE WHERE TE.id_os=OS.id_os AND TE.M='S') AS M, OS.n_os, OS.cor_os, OS.status, OS.solicitante, OS.sol_email, OS.sol_coord, OS.sol_setor, OS.sol_ala, OS.sol_sala, OS.sol_ramal, OS.data_in, OS.data_up, OS.dest_coord, OS.dest_setor, OS.dest_area, OS.file, OS.descr_topic, OS.descr FROM ordemservice AS OS WHERE OS.status='NOVA' AND OS.sol_coord=:sol_coord";
			$stmt = $this->link->prepare($sql);
			$stmt->bindParam(':sol_coord', $OS->sol_coord, \PDO::PARAM_STR);
			$stmt->execute();
			$count = $stmt->rowCount();
			$row = $stmt->fetchAll(\PDO::FETCH_ASSOC);
		}
		catch (\PDOException $e)
		{
			print 'Erro' . $e->getMessage() . "<br/>";
		}
		//var_dump($OS->sol_coord);
		//var_dump($row);
		return array('count' => $count, 'rows' => $row);
	}
	
	public function enviadaOSandamento($OS)
	{
		$row = array();
		$count = 0;
		// sem necessidade de juntar tabelas para novas ordens de serviço
		try
		{
			$sql = "SELECT OS.id_os, (SELECT COUNT(TE.M) FROM tecnico AS TE WHERE TE.id_os=OS.id_os AND TE.M='S') AS M, OS.n_os, OS.cor_os, OS.status, OS.solicitante, OS.sol_email, OS.sol_coord, OS.sol_setor, OS.sol_ala, OS.sol_sala, OS.sol_ramal, OS.data_in, OS.data_up, OS.dest_coord, OS.dest_setor, OS.dest_area, OS.file, OS.descr_topic, OS.descr, LA.id_tecnico, LA.user_tec, LA.tecnico, LA.tec_email, LA.laudo_topic, LA.laudo, LA.tec_ala, LA.tec_sala, LA.tec_ramal FROM `ordemservice` AS OS JOIN (SELECT * FROM tecnico WHERE id_tecnico in (SELECT MAX(id_tecnico) FROM tecnico GROUP BY id_os) ORDER BY id_tecnico) AS LA ON OS.id_os = LA.id_os WHERE OS.status='ANDAMENTO' AND OS.sol_coord=:sol_coord";
			$stmt = $this->link->prepare($sql);
			$stmt->bindParam(':sol_coord', $OS->sol_coord, \PDO::PARAM_STR);
			$stmt->execute();
			$count = $stmt->rowCount();
			$row = $stmt->fetchAll(\PDO::FETCH_ASSOC);
		}
		catch (\PDOException $e)
		{
			print 'Erro' . $e->getMessage() . "<br/>";
		}

		return array('count' => $count, 'rows' => $row);
	}
	
	public function enviadaOSespera($OS)
	{
		$row = array();
		$count = 0;
		// sem necessidade de juntar tabelas para novas ordens de serviço
		try
		{
			$sql = "SELECT OS.id_os, (SELECT COUNT(TE.M) FROM tecnico AS TE WHERE TE.id_os=OS.id_os AND TE.M='S') AS M, OS.n_os, OS.cor_os, OS.status, OS.solicitante, OS.sol_email, OS.sol_coord, OS.sol_setor, OS.sol_ala, OS.sol_sala, OS.sol_ramal, OS.data_in, OS.data_up, OS.dest_coord, OS.dest_setor, OS.dest_area, OS.file, OS.descr_topic, OS.descr, LA.id_tecnico, LA.user_tec, LA.tecnico, LA.tec_email, LA.laudo_topic, LA.laudo, LA.tec_ala, LA.tec_sala, LA.tec_ramal FROM `ordemservice` AS OS JOIN (SELECT * FROM tecnico WHERE id_tecnico in (SELECT MAX(id_tecnico) FROM tecnico GROUP BY id_os) ORDER BY id_tecnico) AS LA ON OS.id_os = LA.id_os WHERE OS.status='ESPERA' AND OS.sol_coord=:sol_coord";
			$stmt = $this->link->prepare($sql);
			$stmt->bindParam(':sol_coord', $OS->sol_coord, \PDO::PARAM_STR);
			$stmt->execute();
			$count = $stmt->rowCount();
			$row = $stmt->fetchAll(\PDO::FETCH_ASSOC);
		}
		catch (\PDOException $e)
		{
			print 'Erro' . $e->getMessage() . "<br/>";
		}

		return array('count' => $count, 'rows' => $row);
	}

	public function enviadaOSencerrada($OS)
	{
		$row = array();
		$count = 0;
		$current = $this->get_current_year();
		$last = $this->get_last_year();
		// sem necessidade de juntar tabelas para novas ordens de serviço
		try
		{
			$sql = "SELECT OS.id_os, (SELECT COUNT(TE.M) FROM tecnico AS TE WHERE TE.id_os=OS.id_os AND TE.M='S') AS M, OS.n_os, OS.cor_os, OS.status, OS.solicitante, OS.sol_email, OS.sol_coord, OS.sol_setor, OS.sol_ala, OS.sol_sala, OS.sol_ramal, OS.data_in, OS.data_up, OS.dest_coord, OS.dest_setor, OS.dest_area, OS.file, OS.descr_topic, OS.descr, LA.id_tecnico, LA.user_tec, LA.tecnico, LA.tec_email, LA.laudo_topic, LA.laudo, LA.tec_ala, LA.tec_sala, LA.tec_ramal FROM `ordemservice` AS OS JOIN (SELECT * FROM tecnico WHERE id_tecnico in (SELECT MAX(id_tecnico) FROM tecnico GROUP BY id_os) ORDER BY id_tecnico) AS LA ON OS.id_os = LA.id_os WHERE OS.status='ENCERRADA' AND OS.sol_coord=:sol_coord AND YEAR(OS.data_up) IN (:current, :last)";
			$stmt = $this->link->prepare($sql);
			$stmt->bindParam(':sol_coord', $OS->sol_coord, \PDO::PARAM_STR);
			$stmt->bindParam(':current', $current, \PDO::PARAM_STR);
			$stmt->bindParam(':last', $last , \PDO::PARAM_STR);
			$stmt->execute();
			$count = $stmt->rowCount();
			$row = $stmt->fetchAll(\PDO::FETCH_ASSOC);
		}
		catch (\PDOException $e)
		{
			print 'Erro' . $e->getMessage() . "<br/>";
		}

		return array('count' => $count, 'rows' => $row);
	}
	// admin ordens de serviços recebidas
	public function recebidaOSnova($OS)
	{
		$row = array();
		$count = 0;
		// sem necessidade de juntar tabelas para novas ordens de serviço
		try
		{
			$sql = "SELECT OS.id_os, (SELECT COUNT(TE.M) FROM tecnico AS TE WHERE TE.id_os=OS.id_os AND TE.M='S') AS M, OS.n_os, OS.cor_os, OS.status, OS.solicitante, OS.sol_email, OS.sol_coord, OS.sol_setor, OS.sol_ala, OS.sol_sala, OS.sol_ramal, OS.data_in, OS.data_up, OS.dest_coord, OS.dest_setor, OS.dest_area, OS.file, OS.descr_topic, OS.descr FROM ordemservice AS OS WHERE OS.status='NOVA' AND OS.dest_coord=:dest_coord";
			$stmt = $this->link->prepare($sql);
			$stmt->bindParam(':dest_coord', $OS->dest_coord, \PDO::PARAM_STR);
			$stmt->execute();
			$count = $stmt->rowCount();
			$row = $stmt->fetchAll(\PDO::FETCH_ASSOC);
		}
		catch (\PDOException $e)
		{
			print 'Erro' . $e->getMessage() . "<br/>";
		}

		return array('count' => $count, 'rows' => $row);
	}
	
	public function recebidaOSandamento($OS)
	{
		$row = array();
		$count = 0;
		// sem necessidade de juntar tabelas para novas ordens de serviço
		try
		{
			$sql = "SELECT OS.id_os, (SELECT COUNT(TE.M) FROM tecnico AS TE WHERE TE.id_os=OS.id_os AND TE.M='S') AS M, OS.n_os, OS.cor_os, OS.status, OS.solicitante, OS.sol_email, OS.sol_coord, OS.sol_setor, OS.sol_ala, OS.sol_sala, OS.sol_ramal, OS.data_in, OS.data_up, OS.dest_coord, OS.dest_setor, OS.dest_area, OS.file, OS.descr_topic, OS.descr, LA.id_tecnico, LA.user_tec, LA.tecnico, LA.tec_email, LA.laudo_topic, LA.laudo, LA.tec_ala, LA.tec_sala, LA.tec_ramal FROM `ordemservice` AS OS JOIN (SELECT * FROM tecnico WHERE id_tecnico in (SELECT MAX(id_tecnico) FROM tecnico GROUP BY id_os) ORDER BY id_tecnico) AS LA ON OS.id_os = LA.id_os WHERE OS.status='ANDAMENTO' AND OS.dest_coord=:dest_coord";
			$stmt = $this->link->prepare($sql);
			$stmt->bindParam(':dest_coord', $OS->dest_coord, \PDO::PARAM_STR);
			$stmt->execute();
			$count = $stmt->rowCount();
			$row = $stmt->fetchAll(\PDO::FETCH_ASSOC);
		}
		catch (\PDOException $e)
		{
			print 'Erro' . $e->getMessage() . "<br/>";
		}

		return array('count' => $count, 'rows' => $row);
	}
	
	public function recebidaOSespera($OS)
	{
		$row = array();
		$count = 0;
		// sem necessidade de juntar tabelas para novas ordens de serviço
		try
		{
			$sql = "SELECT OS.id_os, (SELECT COUNT(TE.M) FROM tecnico AS TE WHERE TE.id_os=OS.id_os AND TE.M='S') AS M, OS.n_os, OS.cor_os, OS.status, OS.solicitante, OS.sol_email, OS.sol_coord, OS.sol_setor, OS.sol_ala, OS.sol_sala, OS.sol_ramal, OS.data_in, OS.data_up, OS.dest_coord, OS.dest_setor, OS.dest_area, OS.file, OS.descr_topic, OS.descr, LA.id_tecnico, LA.user_tec, LA.tecnico, LA.tec_email, LA.laudo_topic, LA.laudo, LA.tec_ala, LA.tec_sala, LA.tec_ramal FROM `ordemservice` AS OS JOIN (SELECT * FROM tecnico WHERE id_tecnico in (SELECT MAX(id_tecnico) FROM tecnico GROUP BY id_os) ORDER BY id_tecnico) AS LA ON OS.id_os = LA.id_os WHERE OS.status='ESPERA' AND OS.dest_coord=:dest_coord";
			$stmt = $this->link->prepare($sql);
			$stmt->bindParam(':dest_coord', $OS->dest_coord, \PDO::PARAM_STR);
			$stmt->execute();
			$count = $stmt->rowCount();
			$row = $stmt->fetchAll(\PDO::FETCH_ASSOC);
		}
		catch (\PDOException $e)
		{
			print 'Erro' . $e->getMessage() . "<br/>";
		}

		return array('count' => $count, 'rows' => $row);
	}

	public function recebidaOSencerrada($OS)
	{
		$row = array();
		$count = 0;
		$current = $this->get_current_year();
		$last = $this->get_last_year();
		// sem necessidade de juntar tabelas para novas ordens de serviço
		try
		{
			$sql = "SELECT OS.id_os, (SELECT COUNT(TE.M) FROM tecnico AS TE WHERE TE.id_os=OS.id_os AND TE.M='S') AS M, OS.n_os, OS.cor_os, OS.status, OS.solicitante, OS.sol_email, OS.sol_coord, OS.sol_setor, OS.sol_ala, OS.sol_sala, OS.sol_ramal, OS.data_in, OS.data_up, OS.dest_coord, OS.dest_setor, OS.dest_area, OS.file, OS.descr_topic, OS.descr, LA.id_tecnico, LA.user_tec, LA.tecnico, LA.tec_email, LA.laudo_topic, LA.laudo, LA.tec_ala, LA.tec_sala, LA.tec_ramal FROM `ordemservice` AS OS JOIN (SELECT * FROM tecnico WHERE id_tecnico in (SELECT MAX(id_tecnico) FROM tecnico GROUP BY id_os) ORDER BY id_tecnico) AS LA ON OS.id_os = LA.id_os WHERE OS.status='ENCERRADA' AND OS.dest_coord=:dest_coord AND YEAR(OS.data_up) IN (:current, :last)";
			$stmt = $this->link->prepare($sql);
			$stmt->bindParam(':dest_coord', $OS->dest_coord, \PDO::PARAM_STR);
			$stmt->bindParam(':current', $current ,\PDO::PARAM_STR);
			$stmt->bindParam(':last', $last,\PDO::PARAM_STR);
			$stmt->execute();
			$count = $stmt->rowCount();
			$row = $stmt->fetchAll(\PDO::FETCH_ASSOC);
		}
		catch (\PDOException $e)
		{
			print 'Erro' . $e->getMessage() . "<br/>";
		}

		return array('count' => $count, 'rows' => $row);
	}

	// solicitante acompanhar ordens de serviços enviadas
	public function solicOSnova($OS)
	{
		$row = array();
		$count = 0;
		//echo $OS->user;
		// sem necessidade de juntar tabelas para novas ordens de serviço
		try
		{
			$sql = "SELECT OS.id_os, (SELECT COUNT(TE.M) FROM tecnico AS TE WHERE TE.id_os=OS.id_os AND TE.M='S') AS M, OS.n_os, OS.cor_os, OS.status, OS.solicitante, OS.sol_email, OS.sol_coord, OS.sol_setor, OS.sol_ala, OS.sol_sala, OS.sol_ramal, OS.data_in, OS.data_up, OS.dest_coord, OS.dest_setor, OS.dest_area, OS.file, OS.descr_topic, OS.descr FROM ordemservice AS OS WHERE OS.status='NOVA' AND OS.sol_user=:user";
			$stmt = $this->link->prepare($sql);
			$stmt->bindParam(':user', $OS->user, \PDO::PARAM_STR);
			$stmt->execute();
			$count = $stmt->rowCount();
			$row = $stmt->fetchAll(\PDO::FETCH_ASSOC);
		}
		catch (\PDOException $e)
		{
			print 'Erro' . $e->getMessage() . "<br/>";
		}

		return array('count' => $count, 'rows' => $row);
	}
	
	public function solicOSandamento($OS)
	{
		$row = array();
		$count = 0;
		//echo $OS->user;
		// sem necessidade de juntar tabelas para novas ordens de serviço
		try
		{
			$sql="SELECT OS.id_os, (SELECT COUNT(TE.M) FROM tecnico AS TE WHERE TE.id_os=OS.id_os AND TE.M='S') AS M, OS.n_os, OS.cor_os, OS.status, OS.solicitante, OS.sol_email, OS.sol_coord, OS.sol_setor, OS.sol_ala, OS.sol_sala, OS.sol_ramal, OS.data_in, OS.data_up, OS.dest_coord, OS.dest_setor, OS.dest_area, OS.file, OS.descr_topic, OS.descr, LA.id_tecnico, LA.user_tec, LA.tecnico, LA.tec_email, LA.laudo_topic, LA.laudo, LA.tec_ala, LA.tec_sala, LA.tec_ramal FROM `ordemservice` AS OS JOIN (SELECT * FROM tecnico WHERE id_tecnico in (SELECT MAX(id_tecnico) FROM tecnico GROUP BY id_os) ORDER BY id_tecnico) AS LA ON OS.id_os = LA.id_os WHERE OS.status='ANDAMENTO' AND OS.sol_user=:user ORDER BY id_tecnico";
			$stmt = $this->link->prepare($sql);
			$stmt->bindParam(':user', $OS->user, \PDO::PARAM_STR);
			$stmt->execute();
			$count = $stmt->rowCount();
			$row = $stmt->fetchAll(\PDO::FETCH_ASSOC);
		}
		catch (\PDOException $e)
		{
			print 'Erro' . $e->getMessage() . "<br/>";
		}

		return array('count' => $count, 'rows' => $row);
	}
	
	public function solicOSespera($OS)
	{
		$row = array();
		$count = 0;
		//echo $OS->user;
		// sem necessidade de juntar tabelas para novas ordens de serviço
		try
		{
			$sql="SELECT OS.id_os, (SELECT COUNT(TE.M) FROM tecnico AS TE WHERE TE.id_os=OS.id_os AND TE.M='S') AS M, OS.n_os, OS.cor_os, OS.status, OS.solicitante, OS.sol_email, OS.sol_coord, OS.sol_setor, OS.sol_ala, OS.sol_sala, OS.sol_ramal, OS.data_in, OS.data_up, OS.dest_coord, OS.dest_setor, OS.dest_area, OS.file, OS.descr_topic, OS.descr, LA.id_tecnico, LA.user_tec, LA.tecnico, LA.tec_email, LA.laudo_topic, LA.laudo, LA.tec_ala, LA.tec_sala, LA.tec_ramal FROM `ordemservice` AS OS JOIN (SELECT * FROM tecnico WHERE id_tecnico in (SELECT MAX(id_tecnico) FROM tecnico GROUP BY id_os) ORDER BY id_tecnico) AS LA ON OS.id_os = LA.id_os WHERE OS.status='ESPERA' AND OS.sol_user=:user ORDER BY id_tecnico";
			$stmt = $this->link->prepare($sql);
			$stmt->bindParam(':user', $OS->user, \PDO::PARAM_STR);
			$stmt->execute();
			$count = $stmt->rowCount();
			$row = $stmt->fetchAll(\PDO::FETCH_ASSOC);
		}
		catch (\PDOException $e)
		{
			print 'Erro' . $e->getMessage() . "<br/>";
		}

		return array('count' => $count, 'rows' => $row);
	}

	public function solicOSencerrada($OS)
	{
		$row = array();
		$count = 0;
		// juntanto tabelas ordemservice e tecnico
		try
		{
			$sql="SELECT OS.id_os, (SELECT COUNT(TE.M) FROM tecnico AS TE WHERE TE.id_os=OS.id_os AND TE.M='S') AS M, OS.n_os, OS.cor_os, OS.status, OS.solicitante, OS.sol_email, OS.sol_coord, OS.sol_setor, OS.sol_ala, OS.sol_sala, OS.sol_ramal, OS.data_in, OS.data_up, OS.dest_coord, OS.dest_setor, OS.dest_area, OS.file, OS.descr_topic, OS.descr, LA.id_tecnico, LA.user_tec, LA.tecnico, LA.tec_email, LA.laudo_topic, LA.laudo, LA.tec_ala, LA.tec_sala, LA.tec_ramal FROM `ordemservice` AS OS JOIN (SELECT * FROM tecnico WHERE id_tecnico in (SELECT MAX(id_tecnico) FROM tecnico GROUP BY id_os) ORDER BY id_tecnico) AS LA ON OS.id_os = LA.id_os WHERE OS.status='ENCERRADA' AND OS.sol_user=:user ORDER BY id_tecnico";
			$stmt = $this->link->prepare($sql);
			$stmt->bindParam(':user', $OS->user, \PDO::PARAM_STR);
			$stmt->execute();
			$count = $stmt->rowCount();
			$row = $stmt->fetchAll(\PDO::FETCH_ASSOC);
		}
		catch (\PDOException $e)
		{
			print 'Erro' . $e->getMessage() . "<br/>";
		}

		return array('count' => $count, 'rows' => $row);
	}
	// laudo editado pelo admin
	public function editadaOSlaudonova($OS)
	{
		$row = array();
		$count = 0;
		// juntanto tabelas ordemservice e tecnico
		try
		{
			$sql="SELECT OS.id_os, (SELECT COUNT(TE.M) FROM tecnico AS TE WHERE TE.id_os=OS.id_os AND TE.M='S') AS M, OS.n_os, OS.cor_os, OS.status, OS.solicitante, OS.sol_email, OS.sol_coord, OS.sol_setor, OS.sol_ala, OS.sol_sala, OS.sol_ramal, OS.data_in, OS.data_up, OS.dest_coord, OS.dest_setor, OS.dest_area, OS.file, OS.descr_topic, OS.descr, LA.id_tecnico, LA.user_tec, LA.tecnico, LA.tec_email, LA.laudo_topic, LA.laudo, LA.tec_ala, LA.tec_sala, LA.tec_ramal FROM `ordemservice` AS OS JOIN (SELECT * FROM tecnico WHERE id_tecnico in (SELECT MAX(id_tecnico) FROM tecnico GROUP BY id_os) ORDER BY id_tecnico) AS LA ON OS.id_os = LA.id_os WHERE OS.status='NOVA' AND LA.user_tec=:user_tec ORDER BY id_tecnico";
			$stmt = $this->link->prepare($sql);
			$stmt->bindParam(':user_tec', $OS->user, \PDO::PARAM_STR);
			$stmt->execute();
			$count = $stmt->rowCount();
			$row = $stmt->fetchAll(\PDO::FETCH_ASSOC);
		}
		catch (\PDOException $e)
		{
			print 'Erro' . $e->getMessage() . "<br/>";
		}

		return array('count' => $count, 'rows' => $row);
	}

	public function editadaOSlaudoandamento($OS)
	{
		$row = array();
		$count = 0;
		// juntanto tabelas ordemservice e tecnico
		try
		{
			$sql="SELECT OS.id_os, (SELECT COUNT(TE.M) FROM tecnico AS TE WHERE TE.id_os=OS.id_os AND TE.M='S') AS M, OS.n_os, OS.cor_os, OS.status, OS.solicitante, OS.sol_email, OS.sol_coord, OS.sol_setor, OS.sol_ala, OS.sol_sala, OS.sol_ramal, OS.data_in, OS.data_up, OS.dest_coord, OS.dest_setor, OS.dest_area, OS.file, OS.descr_topic, OS.descr, LA.id_tecnico, LA.user_tec, LA.tecnico, LA.tec_email, LA.laudo_topic, LA.laudo, LA.tec_ala, LA.tec_sala, LA.tec_ramal FROM `ordemservice` AS OS JOIN (SELECT * FROM tecnico WHERE id_tecnico in (SELECT MAX(id_tecnico) FROM tecnico GROUP BY id_os) ORDER BY id_tecnico) AS LA ON OS.id_os = LA.id_os WHERE OS.status='ANDAMENTO' AND LA.user_tec=:user_tec ORDER BY id_tecnico";
			$stmt = $this->link->prepare($sql);
			$stmt->bindParam(':user_tec', $OS->user, \PDO::PARAM_STR);
			$stmt->execute();
			$count = $stmt->rowCount();
			$row = $stmt->fetchAll(\PDO::FETCH_ASSOC);
		}
		catch (\PDOException $e)
		{
			print 'Erro' . $e->getMessage() . "<br/>";
		}

		return array('count' => $count, 'rows' => $row);
	}

	public function editadaOSlaudoespera($OS)
	{
		$row = array();
		$count = 0;
		// juntanto tabelas ordemservice e tecnico
		try
		{
			$sql="SELECT OS.id_os, (SELECT COUNT(TE.M) FROM tecnico AS TE WHERE TE.id_os=OS.id_os AND TE.M='S') AS M, OS.n_os, OS.cor_os, OS.status, OS.solicitante, OS.sol_email, OS.sol_coord, OS.sol_setor, OS.sol_ala, OS.sol_sala, OS.sol_ramal, OS.data_in, OS.data_up, OS.dest_coord, OS.dest_setor, OS.dest_area, OS.file, OS.descr_topic, OS.descr, LA.id_tecnico, LA.user_tec,  LA.tecnico, LA.tec_email, LA.laudo_topic, LA.laudo, LA.tec_ala, LA.tec_sala, LA.tec_ramal FROM `ordemservice` AS OS JOIN (SELECT * FROM tecnico WHERE id_tecnico in (SELECT MAX(id_tecnico) FROM tecnico GROUP BY id_os) ORDER BY id_tecnico) AS LA ON OS.id_os = LA.id_os WHERE OS.status='ESPERA' AND LA.user_tec=:user_tec ORDER BY id_tecnico";
			$stmt = $this->link->prepare($sql);
			$stmt->bindParam(':user_tec', $OS->user, \PDO::PARAM_STR);
			$stmt->execute();
			$count = $stmt->rowCount();
			$row = $stmt->fetchAll(\PDO::FETCH_ASSOC);
		}
		catch (\PDOException $e)
		{
			print 'Erro' . $e->getMessage() . "<br/>";
		}

		return array('count' => $count, 'rows' => $row);
	}

	public function editadaOSlaudoencerrada($OS)
	{
		$row = array();
		$count = 0;
		// juntanto tabelas ordemservice e tecnico
		try
		{
			$sql="SELECT OS.id_os, (SELECT COUNT(TE.M) FROM tecnico AS TE WHERE TE.id_os=OS.id_os AND TE.M='S') AS M, OS.n_os, OS.cor_os, OS.status, OS.solicitante, OS.sol_email, OS.sol_coord, OS.sol_setor, OS.sol_ala, OS.sol_sala, OS.sol_ramal, OS.data_in, OS.data_up, OS.dest_coord, OS.dest_setor, OS.dest_area, OS.file, OS.descr_topic, OS.descr, LA.id_tecnico, LA.user_tec, LA.tecnico, LA.tec_email, LA.laudo_topic, LA.laudo, LA.tec_ala, LA.tec_sala, LA.tec_ramal FROM `ordemservice` AS OS JOIN (SELECT * FROM tecnico WHERE id_tecnico in (SELECT MAX(id_tecnico) FROM tecnico GROUP BY id_os) ORDER BY id_tecnico) AS LA ON OS.id_os = LA.id_os WHERE OS.status='ENCERRADA' AND LA.user_tec=:user_tec ORDER BY id_tecnico";
			$stmt = $this->link->prepare($sql);
			$stmt->bindParam(':user_tec', $OS->user, \PDO::PARAM_STR);
			$stmt->execute();
			$count = $stmt->rowCount();
			$row = $stmt->fetchAll(\PDO::FETCH_ASSOC);
		}
		catch (\PDOException $e)
		{
			print 'Erro' . $e->getMessage() . "<br/>";
		}

		return array('count' => $count, 'rows' => $row);
	}
	// Ordens de Serviços recebidas pelo técnico # definir a clausula "IN" para setor e area do técnico, assim com a do responsável. Ex: para duas funções exercidas setor IN (setor, setor) and area IN (area, area)
	public function recebidaOSnovaTecnico($OS)
	{
		$row = array();
		$count = 0;
		// sem necessidade de juntar tabelas para novas ordens de serviço
		// pegar dest_coord, dest_setor e dest_area
		try
		{
			$sql = "SELECT id_os, (SELECT COUNT(TE.M) FROM tecnico AS TE WHERE TE.id_os=id_os AND TE.M='S') AS M, n_os, cor_os, status, solicitante, sol_email, sol_coord, sol_setor, sol_ala, sol_sala, sol_ramal, data_in, data_up, dest_coord, dest_setor, dest_area, file, descr_topic, descr FROM `ordemservice` WHERE status='NOVA' AND dest_coord=:dest_coord AND dest_setor=:dest_setor";
			$stmt = $this->link->prepare($sql);
			$stmt->bindParam(':dest_coord', $OS->dest_coord, \PDO::PARAM_STR);
			$stmt->bindParam(':dest_setor', $OS->dest_setor, \PDO::PARAM_STR);
			$stmt->execute();
			$count = $stmt->rowCount();
			$row = $stmt->fetchAll(\PDO::FETCH_ASSOC);
		}
		catch (\PDOException $e)
		{
			print 'Erro' . $e->getMessage() . "<br/>";
		}

		return array('count' => $count, 'rows' => $row);
	}

	public function recebidaOSnovaTecnicoId($OS)
	{
		$row = array();
		$count = 0;
		// sem necessidade de juntar tabelas para novas ordens de serviço
		// pegar dest_coord, dest_setor e dest_area
		try
		{
			$sql = "SELECT id_os, (SELECT COUNT(TE.M) FROM tecnico AS TE WHERE TE.id_os=id_os AND TE.M='S') AS M, n_os, status, solicitante, sol_email, sol_coord, sol_setor, sol_ala, sol_sala, sol_ramal, data_in, data_up, dest_coord, dest_setor, dest_area, file, descr_topic, descr FROM `ordemservice` WHERE status='NOVA' AND dest_coord=:dest_coord AND dest_setor=:dest_setor AND id_os=:id_os";
			$stmt = $this->link->prepare($sql);
			$stmt->bindParam(':dest_coord', $OS->dest_coord, \PDO::PARAM_STR);
			$stmt->bindParam(':dest_setor', $OS->dest_setor, \PDO::PARAM_STR);
			$stmt->bindParam(':id_os', $OS->id_os, \PDO::PARAM_INT);
			$stmt->execute();
			$count = $stmt->rowCount();
			$row = $stmt->fetch(\PDO::FETCH_ASSOC);
		}
		catch (\PDOException $e)
		{
			print 'Erro' . $e->getMessage() . "<br/>";
		}

		return array('count' => $count, 'row' => $row);
	}

	public function recebidaOSandamentoTecnico($OS)
	{
		$row = array();
		$count = 0;
		$count_and = 0;
		// juntanto tabelas ordemservice e tecnico
		// verifivar se o id está em andamento, se não está ficar em loop	

		try
		{
			$sql="SELECT OS.id_os, (SELECT COUNT(TE.M) FROM tecnico AS TE WHERE TE.id_os=OS.id_os AND TE.M='S') AS M, OS.n_os, OS.cor_os, OS.status, OS.solicitante, OS.sol_email, OS.sol_coord, OS.sol_setor, OS.sol_ala, OS.sol_sala, OS.sol_ramal, OS.data_in, OS.data_up, OS.dest_coord, OS.dest_setor, OS.dest_area, OS.file, OS.descr_topic, OS.descr, LA.user_tec, LA.status_tec, LA.tecnico, LA.tec_email, LA.laudo_topic, LA.laudo, LA.tec_ala, LA.tec_sala, LA.tec_ramal FROM `ordemservice` AS OS JOIN (SELECT * FROM tecnico WHERE id_tecnico in (SELECT MAX(id_tecnico) FROM tecnico WHERE status_tec='ANDAMENTO' GROUP BY id_os) ORDER BY id_tecnico) AS LA ON OS.id_os = LA.id_os WHERE OS.status='ANDAMENTO' AND OS.dest_coord=:dest_coord AND OS.dest_setor=:dest_setor ORDER BY id_tecnico";
			/*$sql = "SELECT id_os, n_os, status, solicitante, sol_email, sol_coord, sol_setor, sol_ala, sol_sala, sol_ramal, data_in, data_up, dest_coord, dest_setor, dest_area, file, descr_topic, descr, id_tecnico, id_os, user_tec, tecnico, tec_email, laudo_topic, laudo, tec_ala, tec_sala, tec_ramal FROM `ordemservice` JOIN (SELECT id_os, id_tecnico, status_tec, user_tec, tecnico, tec_email, tec_coord, tec_coord, tec_setor, tec_area, laudo_topic, laudo, tec_ala, tec_sala, tec_ramal, tec_data ORDER BY id_os LIMIT 1) USING(id_os) WHERE status='ANDAMENTO' AND dest_coord=:dest_coord AND dest_setor=:dest_setor"; */
			$stmt = $this->link->prepare($sql);
			$stmt->bindParam(':dest_coord', $OS->dest_coord, \PDO::PARAM_STR);
			$stmt->bindParam(':dest_setor', $OS->dest_setor, \PDO::PARAM_STR);
			$stmt->execute();
			$count = $stmt->rowCount();
			$row = $stmt->fetchAll(\PDO::FETCH_ASSOC);
		}
		catch (\PDOException $e)
		{
			print 'Erro' . $e->getMessage() . "<br/>";
		}


		return array('count' => $count, 'rows' => $row);
	}

	public function recebidaOSandamentoTecnicoId($OS) {
		$row = "";
		$count = 0;

		do {
			try 
			{
				$sql="SELECT OS.id_os, (SELECT COUNT(TE.M) FROM tecnico AS TE WHERE TE.id_os=OS.id_os AND TE.M='S') AS M, OS.n_os, OS.status, OS.solicitante, OS.sol_email, OS.sol_coord, OS.sol_setor, OS.sol_ala, OS.sol_sala, OS.sol_ramal, OS.data_in, OS.data_up, OS.dest_coord, OS.dest_setor, OS.dest_area, OS.file, OS.descr_topic, OS.descr, LA.id_tecnico, LA.user_tec, LA.status_tec, LA.tecnico, LA.tec_email, LA.laudo_topic, LA.laudo, LA.tec_ala, LA.tec_sala, LA.tec_ramal FROM `ordemservice` AS OS JOIN (SELECT * FROM tecnico WHERE id_tecnico in (SELECT MAX(id_tecnico) FROM tecnico WHERE status_tec='ANDAMENTO' GROUP BY id_os) ORDER BY id_tecnico) AS LA ON OS.id_os = LA.id_os WHERE status='ANDAMENTO' AND dest_coord=:dest_coord AND dest_setor=:dest_setor AND OS.id_os=:id_os ORDER BY id_tecnico";
				$stmt = $this->link->prepare($sql);
				$stmt->bindParam(':dest_coord', $OS->dest_coord, \PDO::PARAM_STR);
				$stmt->bindParam(':dest_setor', $OS->dest_setor, \PDO::PARAM_STR);
				$stmt->bindParam(':id_os', $OS->id_os, \PDO::PARAM_INT);
				$stmt->execute();
				$row = $stmt->fetch(\PDO::FETCH_ASSOC);
				$count = $stmt->rowCount();
			}
			catch (\PDOException $e)
			{
				print 'Erro' . $e->getMessage() . "<br/>";
			}
		} while ($count == 0);

		return array('row' => $row);
	}

	public function recebidaOSencerradaTecnico($OS)
	{
		$row = array();
		$count = 0;
		// juntanto tabelas ordemservice e tecnico
		try
		{
			$sql="SELECT OS.id_os, (SELECT COUNT(TE.M) FROM tecnico AS TE WHERE TE.id_os=OS.id_os AND TE.M='S') AS M, OS.n_os, OS.cor_os, OS.status, OS.solicitante, OS.sol_email, OS.sol_coord, OS.sol_setor, OS.sol_ala, OS.sol_sala, OS.sol_ramal, OS.data_in, OS.data_up, OS.dest_coord, OS.dest_setor, OS.dest_area, OS.file, OS.descr_topic, OS.descr, LA.id_tecnico, LA.user_tec, LA.status_tec, LA.tecnico, LA.tec_email, LA.laudo_topic, LA.laudo, LA.tec_ala, LA.tec_sala, LA.tec_ramal FROM `ordemservice` AS OS JOIN (SELECT * FROM tecnico WHERE id_tecnico in (SELECT MAX(id_tecnico) FROM tecnico WHERE status_tec='ANDAMENTO' GROUP BY id_os) ORDER BY id_tecnico) AS LA ON OS.id_os = LA.id_os WHERE OS.status='ENCERRADA' AND OS.dest_coord=:dest_coord AND OS.dest_setor=:dest_setor ORDER BY id_tecnico";
			$stmt = $this->link->prepare($sql);
			$stmt->bindParam(':dest_coord', $OS->dest_coord, \PDO::PARAM_STR);
			$stmt->bindParam(':dest_setor', $OS->dest_setor, \PDO::PARAM_STR);
			$stmt->execute();
			$count = $stmt->rowCount();
			$row = $stmt->fetchAll(\PDO::FETCH_ASSOC);
		}
		catch (\PDOException $e)
		{
			print 'Erro' . $e->getMessage() . "<br/>";
		}

		return array('count' => $count, 'rows' => $row);
	}

	public function recebidaOSencerradaTecnicoId($OS)
	{
		$row = array();
		$count = 0;
		// juntanto tabelas ordemservice e tecnico
		try
		{
			$sql="SELECT OS.id_os, (SELECT COUNT(TE.M) FROM tecnico AS TE WHERE TE.id_os=OS.id_os AND TE.M='S') AS M, OS.n_os, OS.status, OS.solicitante, OS.sol_email, OS.sol_coord, OS.sol_setor, OS.sol_ala, OS.sol_sala, OS.sol_ramal, OS.data_in, OS.data_up, OS.dest_coord, OS.dest_setor, OS.dest_area, OS.file, OS.descr_topic, OS.descr, LA.id_tecnico, LA.user_tec, LA.status_tec, LA.tecnico, LA.tec_email, LA.laudo_topic, LA.laudo, LA.tec_ala, LA.tec_sala, LA.tec_ramal FROM `ordemservice` AS OS JOIN (SELECT * FROM tecnico WHERE id_tecnico in (SELECT MAX(id_tecnico) FROM tecnico WHERE status_tec='ANDAMENTO' GROUP BY id_os) ORDER BY id_tecnico) AS LA ON OS.id_os = LA.id_os WHERE OS.status='ENCERRADA' AND OS.dest_coord=:dest_coord AND OS.dest_setor=:dest_setor AND OS.id_os=:id_os ORDER BY id_tecnico";
			$stmt = $this->link->prepare($sql);
			$stmt->bindParam(':dest_coord', $OS->dest_coord, \PDO::PARAM_STR);
			$stmt->bindParam(':dest_setor', $OS->dest_setor, \PDO::PARAM_STR);
			$stmt->bindParam(':id_os', $OS->id_os, \PDO::PARAM_INT);
			$stmt->execute();
			$count = $stmt->rowCount();
			$row = $stmt->fetch(\PDO::FETCH_ASSOC);
		}
		catch (\PDOException $e)
		{
			print 'Erro' . $e->getMessage() . "<br/>";
		}

		return array('count' => $count, 'row' => $row);
	}

	public function postLaudoTecnico($OSLaudo)
	{
		$row0 = array();
		$row1 = array();

		//$topico = "Iniciando a Ordem de Serviço";
		$data = date('Y-m-d H:i:s');
		$cor = "#0275d8";

		$count0 = 0;
		$count1 = 0;

		try {
			$sql0 = "INSERT INTO `tecnico` VALUES (NULL, :id_os, 'S', :user_tec, :tecnico, :tec_email, :tec_coord, :tec_setor, :tec_area, :grupo, :laudo_topic, :laudo, :tec_ala, :tec_sala, :tec_ramal, :tec_data)";
			$sql1 = "UPDATE `ordemservice` SET `cor_os`=:cor_os, `status`='ANDAMENTO', `data_up`=:data_up WHERE `id_os`=:id_os";

			$stmt0 = $this->link->prepare($sql0);
			$stmt0->bindParam(':id_os', $OSLaudo->id_os, \PDO::PARAM_INT);
			//$stmt0->bindParam(':status_tec', $OSLaudo->status_tec, \PDO::PARAM_STR);
			$stmt0->bindParam(':user_tec', $OSLaudo->user_tec, \PDO::PARAM_STR);
			$stmt0->bindParam(':tecnico', $OSLaudo->tecnico, \PDO::PARAM_STR);
			$stmt0->bindParam(':tec_email', $OSLaudo->tec_email, \PDO::PARAM_STR);
			$stmt0->bindParam(':tec_coord', $OSLaudo->tec_coord, \PDO::PARAM_STR);
			$stmt0->bindParam(':tec_setor', $OSLaudo->tec_setor, \PDO::PARAM_STR);
			$stmt0->bindParam(':tec_area', $OSLaudo->tec_area, \PDO::PARAM_STR);
			$stmt0->bindParam(':grupo', $OSLaudo->grupo, \PDO::PARAM_STR);
			$stmt0->bindParam(':laudo_topic', $OSLaudo->laudo_topic, \PDO::PARAM_STR);
			$stmt0->bindParam(':laudo', $OSLaudo->laudo, \PDO::PARAM_STR);
			$stmt0->bindParam(':tec_ala', $OSLaudo->tec_ala, \PDO::PARAM_STR);
			$stmt0->bindParam(':tec_sala', $OSLaudo->tec_sala, \PDO::PARAM_STR);
			$stmt0->bindParam(':tec_ramal', $OSLaudo->tec_ramal, \PDO::PARAM_STR);
			$stmt0->bindParam(':tec_data', $OSLaudo->tec_data, \PDO::PARAM_STR);

			$stmt0->execute();
			$count0 = $stmt0->rowCount();
			//echo $count0;
			if ($count0 > 0) {
				$stmt1 = $this->link->prepare($sql1);
				$stmt1->bindParam(':cor_os', $cor, \PDO::PARAM_STR);
				//$stmt1->bindParam(':status', 'ANDAMENTO', \PDO::PARAM_STR);
				$stmt1->bindParam(':data_up', $data, \PDO::PARAM_STR);
				$stmt1->bindParam(':id_os', $OSLaudo->id_os, \PDO::PARAM_STR);

				$stmt1->execute();
				$count1 = $stmt1->rowCount();
			}
		}
		catch (\PDOException $e)
		{
			print 'Erro' . $e->getMessage() . "<br/>";
		}		

		return array('count' => $count1);
	}

	public function mudarPrimeiroLaudoEmBranco($OSLaudo) {
		//mudar ordem de serviço do primeiro laudo

		$row = array();
		$count = 0;

		try {
			$sql = "UPDATE `tecnico` SET `laudo_topic`=:laudo_topic, `laudo`=:laudo WHERE `laudo_topic`='' AND `laudo`='' AND `user_tec`=:user_tec AND `id_tecnico`=:id_tecnico AND `id_os`=:id_os";

			$stmt = $this->link->prepare($sql);
			$stmt->bindParam(':laudo_topic', $OSLaudo->laudo_topic, \PDO::PARAM_STR);
			$stmt->bindParam(':laudo', $OSLaudo->laudo, \PDO::PARAM_STR);
			$stmt->bindParam(':user_tec', $OSLaudo->user_tec, \PDO::PARAM_STR);
			$stmt->bindParam(':id_tecnico', $OSLaudo->id_tecnico, \PDO::PARAM_INT);
			$stmt->bindParam(':id_os', $OSLaudo->id_os, \PDO::PARAM_INT);

			$stmt->execute();
			$count = $stmt->rowCount();
		} catch (\PDOException $e) {
			print 'Erro' . $e->getMessage() . "<br/>";
		}

		return array('count' => $count);

	}

	public function pegarLaudoPorId($id)
	{
		$row = array();
		$count = 0;

		try {
			$sql = "SELECT id_tecnico, M, tecnico, tec_email, tec_coord, tec_setor, tec_area, grupo, laudo_topic, laudo, tec_ramal, tec_data FROM tecnico WHERE id_os=:id_os ORDER BY id_tecnico DESC";
			$stmt = $this->link->prepare($sql);

			$stmt->bindParam(':id_os', $id, \PDO::PARAM_INT);
			$stmt->execute();

			$row = $stmt->fetchAll(\PDO::FETCH_ASSOC);
			$count = $stmt->rowCount();
		}
		catch (\PDOException $e)
		{
			print 'ERRO' . $e->getMessage() . "<br/>";
		}

		return array('row' => $row, 'count' => $count);
	}

	public function mudarOrdemDestino($OSLaudo, $setor, $area)
	{
		$count = 0;
		$count0 = 0;

		$data = date('Y-m-d H:i:s');
		$cor = "#5cb85c";

		try
		{
			$sql0 = "INSERT INTO `tecnico` VALUES (NULL, :id_os, 'S', :user_tec, :tecnico, :tec_email, :tec_coord, :tec_setor, :tec_area, :grupo, :laudo_topic, :laudo, :tec_ala, :tec_sala, :tec_ramal, :tec_data)";

			$stmt0 = $this->link->prepare($sql0);
			$stmt0->bindParam(':id_os', $OSLaudo->id_os, \PDO::PARAM_INT);
			//$stmt0->bindParam(':status_tec', $OSLaudo->status_tec, \PDO::PARAM_STR);
			$stmt0->bindParam(':user_tec', $OSLaudo->user_tec, \PDO::PARAM_STR);
			$stmt0->bindParam(':tecnico', $OSLaudo->tecnico, \PDO::PARAM_STR);
			$stmt0->bindParam(':tec_email', $OSLaudo->tec_email, \PDO::PARAM_STR);
			$stmt0->bindParam(':tec_coord', $OSLaudo->tec_coord, \PDO::PARAM_STR);
			$stmt0->bindParam(':tec_setor', $OSLaudo->tec_setor, \PDO::PARAM_STR);
			$stmt0->bindParam(':tec_area', $OSLaudo->tec_area, \PDO::PARAM_STR);
			$stmt0->bindParam(':grupo', $OSLaudo->grupo, \PDO::PARAM_STR);
			$stmt0->bindParam(':laudo_topic', $OSLaudo->laudo_topic, \PDO::PARAM_STR);
			$stmt0->bindParam(':laudo', $OSLaudo->laudo, \PDO::PARAM_STR);
			$stmt0->bindParam(':tec_ala', $OSLaudo->tec_ala, \PDO::PARAM_STR);
			$stmt0->bindParam(':tec_sala', $OSLaudo->tec_sala, \PDO::PARAM_STR);
			$stmt0->bindParam(':tec_ramal', $OSLaudo->tec_ramal, \PDO::PARAM_STR);
			$stmt0->bindParam(':tec_data', $data, \PDO::PARAM_STR);

			$stmt0->execute();
			$count0 = $stmt0->rowCount();			

			if ($count0 > 0) { // muda para uma nova ordem de serviço
				$sql = "UPDATE ordemservice SET cor_os=:cor_os, status='NOVA', dest_setor=:dest_setor, dest_area=:dest_area, data_up=:data_up WHERE id_os=:id_os";
				$stmt = $this->link->prepare($sql);
				$stmt->bindParam(':cor_os', $cor, \PDO::PARAM_STR);
				$stmt->bindParam(':dest_setor', $setor, \PDO::PARAM_STR);
				$stmt->bindParam(':dest_area', $area, \PDO::PARAM_STR);
				$stmt->bindParam(':data_up', $data, \PDO::PARAM_STR);
				$stmt->bindParam(':id_os', $OSLaudo->id_os, \PDO::PARAM_INT);
				$stmt->execute();

				$count = $stmt->rowCount();
			}

			
		}
		catch (\PDOException $e) {
			print 'Erro' . $e->getMessage() . "<br/>";
		}

		return $count;
	}

	public function encerraOrdem($OSLaudo)
	{
		$count = 0;
		$count0 = 0;

		$cor = "#292b2c";

		$data = date('Y-m-d H:i:s');

		try {
			$sql0 = "INSERT INTO `tecnico` VALUES (NULL, :id_os, 'S', :user_tec, :tecnico, :tec_email, :tec_coord, :tec_setor, :tec_area, :grupo, :laudo_topic, :laudo, :tec_ala, :tec_sala, :tec_ramal, :tec_data)";

			$stmt0 = $this->link->prepare($sql0);
			$stmt0->bindParam(':id_os', $OSLaudo->id_os, \PDO::PARAM_INT);
			//$stmt0->bindParam(':status_tec', $OSLaudo->status_tec, \PDO::PARAM_STR);
			$stmt0->bindParam(':user_tec', $OSLaudo->user_tec, \PDO::PARAM_STR);
			$stmt0->bindParam(':tecnico', $OSLaudo->tecnico, \PDO::PARAM_STR);
			$stmt0->bindParam(':tec_email', $OSLaudo->tec_email, \PDO::PARAM_STR);
			$stmt0->bindParam(':tec_coord', $OSLaudo->tec_coord, \PDO::PARAM_STR);
			$stmt0->bindParam(':tec_setor', $OSLaudo->tec_setor, \PDO::PARAM_STR);
			$stmt0->bindParam(':tec_area', $OSLaudo->tec_area, \PDO::PARAM_STR);
			$stmt0->bindParam(':grupo', $OSLaudo->grupo, \PDO::PARAM_STR);
			$stmt0->bindParam(':laudo_topic', $OSLaudo->laudo_topic, \PDO::PARAM_STR);
			$stmt0->bindParam(':laudo', $OSLaudo->laudo, \PDO::PARAM_STR);
			$stmt0->bindParam(':tec_ala', $OSLaudo->tec_ala, \PDO::PARAM_STR);
			$stmt0->bindParam(':tec_sala', $OSLaudo->tec_sala, \PDO::PARAM_STR);
			$stmt0->bindParam(':tec_ramal', $OSLaudo->tec_ramal, \PDO::PARAM_STR);
			$stmt0->bindParam(':tec_data', $data, \PDO::PARAM_STR);

			$stmt0->execute();
			$count0 = $stmt0->rowCount();					

			if ($count0 > 0) { // encerra a ordem de serviço em andamento
				$sql = "UPDATE ordemservice SET cor_os=:cor_os, status='ENCERRADA', data_up=:data_up WHERE id_os=:id_os";
				$stmt = $this->link->prepare($sql);
				$stmt->bindParam(':cor_os', $cor, \PDO::PARAM_STR);
				$stmt->bindParam(':data_up', $data, \PDO::PARAM_STR);
				$stmt->bindParam(':id_os', $OSLaudo->id_os, \PDO::PARAM_INT);
				$stmt->execute();

				$count = $stmt->rowCount();
			}
			
		}
		catch (\PDOException $e)
		{
			print 'Erro' . $e->getMessage() . '<br/>';
		}

		return $count;
	}

	public function renovarOrdem($OSLaudo) {
		$count = 0;
		$count0 = 0;

		$topico = "Ordem de Serviço Renovada!";
		$data = date('Y-m-d H:i:s');

		$cor = "#5cb85c";

		try {
			$sql0 = "INSERT INTO `tecnico` VALUES (NULL, :id_os, 'S', :user_tec, :tecnico, :tec_email, :tec_coord, :tec_setor, :tec_area, :grupo, :laudo_topic, :laudo, :tec_ala, :tec_sala, :tec_ramal, :tec_data)";

			$stmt0 = $this->link->prepare($sql0);
			$stmt0->bindParam(':id_os', $OSLaudo->id_os, \PDO::PARAM_INT);
			//$stmt0->bindParam(':status_tec', $OSLaudo->status_tec, \PDO::PARAM_STR);
			$stmt0->bindParam(':user_tec', $OSLaudo->user_tec, \PDO::PARAM_STR);
			$stmt0->bindParam(':tecnico', $OSLaudo->tecnico, \PDO::PARAM_STR);
			$stmt0->bindParam(':tec_email', $OSLaudo->tec_email, \PDO::PARAM_STR);
			$stmt0->bindParam(':tec_coord', $OSLaudo->tec_coord, \PDO::PARAM_STR);
			$stmt0->bindParam(':tec_setor', $OSLaudo->tec_setor, \PDO::PARAM_STR);
			$stmt0->bindParam(':tec_area', $OSLaudo->tec_area, \PDO::PARAM_STR);
			$stmt0->bindParam(':grupo', $OSLaudo->grupo, \PDO::PARAM_STR);
			$stmt0->bindParam(':laudo_topic', $topico, \PDO::PARAM_STR);
			$stmt0->bindParam(':laudo', $OSLaudo->laudo, \PDO::PARAM_STR);
			$stmt0->bindParam(':tec_ala', $OSLaudo->tec_ala, \PDO::PARAM_STR);
			$stmt0->bindParam(':tec_sala', $OSLaudo->tec_sala, \PDO::PARAM_STR);
			$stmt0->bindParam(':tec_ramal', $OSLaudo->tec_ramal, \PDO::PARAM_STR);
			$stmt0->bindParam(':tec_data', $data, \PDO::PARAM_STR);

			$stmt0->execute();
			$count0 = $stmt0->rowCount();

			if ($count0 > 0) { // muda para nova a ordem de serviço
				$sql = "UPDATE ordemservice SET cor_os=:cor_os, status='NOVA', data_up=:data_up WHERE id_os=:id_os";
				$stmt = $this->link->prepare($sql);
				$stmt->bindParam(':cor_os', $cor, \PDO::PARAM_STR);
				$stmt->bindParam(':data_up', $data, \PDO::PARAM_STR);
				$stmt->bindParam(':id_os', $OSLaudo->id_os, \PDO::PARAM_INT);

				$stmt->execute();
				$count = $stmt->rowCount();
			}
		}
		catch (\PDOException $e)
		{
			print 'Erro' . $e->getMessage() . '<br/>';
		}

		return $count;
	}

	public function ativarOrdem($OSLaudo) {
		$count = 0;
		$count0 = 0;

		$topico = "Ordem de Serviço Ativada!";
		$data = date('Y-m-d H:i:s');

		$cor = "#0275d8";

		try {
			$sql0 = "INSERT INTO `tecnico` VALUES (NULL, :id_os, 'S', :user_tec, :tecnico, :tec_email, :tec_coord, :tec_setor, :tec_area, :grupo, :laudo_topic, :laudo, :tec_ala, :tec_sala, :tec_ramal, :tec_data)";

			$stmt0 = $this->link->prepare($sql0);
			$stmt0->bindParam(':id_os', $OSLaudo->id_os, \PDO::PARAM_INT);
			$stmt0->bindParam(':user_tec', $OSLaudo->user_tec, \PDO::PARAM_STR);
			$stmt0->bindParam(':tecnico', $OSLaudo->tecnico, \PDO::PARAM_STR);
			$stmt0->bindParam(':tec_email', $OSLaudo->tec_email, \PDO::PARAM_STR);
			$stmt0->bindParam(':tec_coord', $OSLaudo->tec_coord, \PDO::PARAM_STR);
			$stmt0->bindParam(':tec_setor', $OSLaudo->tec_setor, \PDO::PARAM_STR);
			$stmt0->bindParam(':tec_area', $OSLaudo->tec_area, \PDO::PARAM_STR);
			$stmt0->bindParam(':grupo', $OSLaudo->grupo, \PDO::PARAM_STR);
			$stmt0->bindParam(':laudo_topic', $topico, \PDO::PARAM_STR);
			$stmt0->bindParam(':laudo', $OSLaudo->laudo, \PDO::PARAM_STR);
			$stmt0->bindParam(':tec_ala', $OSLaudo->tec_ala, \PDO::PARAM_STR);
			$stmt0->bindParam(':tec_sala', $OSLaudo->tec_sala, \PDO::PARAM_STR);
			$stmt0->bindParam(':tec_ramal', $OSLaudo->tec_ramal, \PDO::PARAM_STR);
			$stmt0->bindParam(':tec_data', $data, \PDO::PARAM_STR);

			$stmt0->execute();
			$count0 = $stmt0->rowCount();

			if ($count0 > 0) { // muda para nova a ordem de serviço
				$sql = "UPDATE ordemservice SET cor_os=:cor_os, status='ANDAMENTO', data_up=:data_up WHERE id_os=:id_os";
				$stmt = $this->link->prepare($sql);
				$stmt->bindParam(':cor_os', $cor, \PDO::PARAM_STR);				
				$stmt->bindParam(':data_up', $data, \PDO::PARAM_STR);
				$stmt->bindParam(':id_os', $OSLaudo->id_os, \PDO::PARAM_INT);

				$stmt->execute();
				$count = $stmt->rowCount();
			}
		}
		catch (\PDOException $e)
		{
			print 'Erro' . $e->getMessage() . '<br/>';
		}

		return $count;
	}

	public function esperaOrdem($OSLaudo) {
		$count = 0;
		$count0 = 0;

		$topico = "Ordem de Serviço em Espera!";
		$data = date('Y-m-d H:i:s');

		$cor = "#800080";

		try {
			$sql0 = "INSERT INTO `tecnico` VALUES (NULL, :id_os, 'S', :user_tec, :tecnico, :tec_email, :tec_coord, :tec_setor, :tec_area,:grupo, :laudo_topic, :laudo, :tec_ala, :tec_sala, :tec_ramal, :tec_data)";

			$stmt0 = $this->link->prepare($sql0);
			$stmt0->bindParam(':id_os', $OSLaudo->id_os, \PDO::PARAM_INT);
			$stmt0->bindParam(':user_tec', $OSLaudo->user_tec, \PDO::PARAM_STR);
			$stmt0->bindParam(':tecnico', $OSLaudo->tecnico, \PDO::PARAM_STR);
			$stmt0->bindParam(':tec_email', $OSLaudo->tec_email, \PDO::PARAM_STR);
			$stmt0->bindParam(':tec_coord', $OSLaudo->tec_coord, \PDO::PARAM_STR);
			$stmt0->bindParam(':tec_setor', $OSLaudo->tec_setor, \PDO::PARAM_STR);
			$stmt0->bindParam(':tec_area', $OSLaudo->tec_area, \PDO::PARAM_STR);
			$stmt0->bindParam(':grupo', $OSLaudo->grupo, \PDO::PARAM_STR);
			$stmt0->bindParam(':laudo_topic', $topico, \PDO::PARAM_STR);
			$stmt0->bindParam(':laudo', $OSLaudo->laudo, \PDO::PARAM_STR);
			$stmt0->bindParam(':tec_ala', $OSLaudo->tec_ala, \PDO::PARAM_STR);
			$stmt0->bindParam(':tec_sala', $OSLaudo->tec_sala, \PDO::PARAM_STR);
			$stmt0->bindParam(':tec_ramal', $OSLaudo->tec_ramal, \PDO::PARAM_STR);
			$stmt0->bindParam(':tec_data', $data, \PDO::PARAM_STR);

			$stmt0->execute();
			$count0 = $stmt0->rowCount();

			if ($count0 > 0) { // muda para nova a ordem de serviço
				$sql = "UPDATE ordemservice SET cor_os=:cor_os, status='ESPERA', data_up=:data_up WHERE id_os=:id_os";
				$stmt = $this->link->prepare($sql);
				$stmt->bindParam(':cor_os', $cor, \PDO::PARAM_STR);				
				$stmt->bindParam(':data_up', $data, \PDO::PARAM_STR);
				$stmt->bindParam(':id_os', $OSLaudo->id_os, \PDO::PARAM_INT);

				$stmt->execute();
				$count = $stmt->rowCount();
			}
		}
		catch (\PDOException $e)
		{
			print 'Erro' . $e->getMessage() . '<br/>';
		}

		return $count;
	}
	// Ok funcionado
	public function tirarNotifica($id) {
		$count = 0;		

		try {
			$sql = "UPDATE tecnico SET M='N' WHERE id_os=:id_os AND M='S'";
			$stmt = $this->link->prepare($sql);
			$stmt->bindParam(':id_os', $id, \PDO::PARAM_INT);
			$stmt->execute();
			$count = $stmt->rowCount();			
		}
		catch (\PDOException $e)
		{
			print 'Erro' . $e->getMessage() . '<br/>';
		}

		return $count;
	}

	public function registroViews($OS) {
		$data = date('Y-m-d H:i:s');
		$count = 0;

		// $id_os = (string) $OS->id_os;
		// $n_os = (int) $OS->n_os;
		// $user_views = (string) $OS->user_views;
		// $nome_views = (string) $OS->nome_views;
		// $coord_views = (string) $OS->coord_views;
		// $data_views = (string) $data;

		try
		{
			$sql = "INSERT INTO `viewsordem` VALUES (NULL, :id_os, :n_os , :user_views, :nome_views, :coord_views, :setor_views, :area_views, :data_views)";
			$stmt = $this->link->prepare($sql);
			$stmt->bindParam(':id_os', $OS->id_os, \PDO::PARAM_INT);
			$stmt->bindParam(':n_os', $OS->n_os, \PDO::PARAM_STR);
			$stmt->bindParam(':user_views', $OS->user_views, \PDO::PARAM_STR);
			$stmt->bindParam(':nome_views', $OS->nome_views, \PDO::PARAM_STR);
			$stmt->bindParam(':coord_views', $OS->coord_views, \PDO::PARAM_STR);
			$stmt->bindParam(':setor_views', $OS->setor_views, \PDO::PARAM_STR);
			$stmt->bindParam(':area_views', $OS->area_views, \PDO::PARAM_STR);
			$stmt->bindParam(':data_views', $data, \PDO::PARAM_STR);

			$stmt->execute();
			$count = $stmt->rowCount();
		}
		catch (\PDOException $e)
		{
			print 'Erro' . $e->getMessage() . '<br>';
		}

		return $count;
	}

}
?>