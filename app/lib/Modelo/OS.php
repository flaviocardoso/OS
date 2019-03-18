<?php
namespace lib\Modelo;

class OS
{
	public $id_os, $n_os, $cor_os, $status, $status_tec, $nome, $nome_views, $tecnico, $user, $user_views, $user_sol, $user_tec, $user_admin, $solicitante, $sol_user, $sol_email, $coord_views, $sol_coord, $sol_setor, $sol_ala, $sol_sala, $sol_ramal, $data_in, $data_up, $data_now, $data_views, $dest_coord, $dest_setor, $dest_area, $file, $file_os, $file_laudo, $descr_topic, $descr, $laudo_topic, $laudo, $criador, $criador_email;
}

namespace lib\Modelo;

class Laudo
{
   public $id_tecnico, $id_os, $status_tec, $user_tec, $tecnico, $tec_email, $tec_coord, $tec_setor, $tec_area, $laudo, $laudo_topic, $tec_ala, $tec_sala, $tec_ramal, $tec_data;
}

?>