<?php

namespace App\Http\Controllers;

use App\Http\Requests\FormTasaInteres;
use App\Models\TasaTipo;
use App\Utilities\TasaInteresUtility;
use Illuminate\Http\JsonResponse;

class CalcularTasaInteresController extends Controller
{

    public function __invoke(FormTasaInteres $request)
    {

        $periodo = TasaTipo::find($request->periodo_id);
        $tasa = TasaTipo::find($request->tipo_tasa_id);
        $perTiempo = TasaInteresUtility::convertirTasa($tasa, $periodo);
        $perTasa = $request->per_tasa / $perTiempo / 100;
        if ($request->tipo_tasa) {

            $intereses =  $request->capital * $perTasa * $request->tiempo;
        } else {
            // Compuesto
            $intereses = $request->capital * (1 + $perTasa) ** ($perTiempo);
            $intereses -= $request->capital;
        }
        return [
            "intereses" => $intereses,
            'per-tasa-ini' => $request->per_tasa,
            'tasa-nombre' => $tasa->nombre,
            "per-tasa-abs" => $perTasa * 100,
            "t" => $perTiempo,
            'periodo-nombre' => $periodo->nombre,
        ];
    }
}
