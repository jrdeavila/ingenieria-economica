<?php

namespace App\Http\Controllers;

use App\Http\Requests\FormTasaInteres;
use App\Models\TasaTipo;

class CalcularValorTiempoController extends Controller
{
    public function valorFuturo(FormTasaInteres $request)
    {
        // Simple: F = P * (1 + i * n)
        // Compuesto: F = P * (1 + i) ^ n
        // 

        $periodo = TasaTipo::find($request->periodo_id);
        $tasa = TasaTipo::find($request->tipo_tasa_id);
        $perTiempo = $request->tiempo * $periodo->meses();
        $perTasa = $request->per_tasa / 100 / $tasa->meses();

        if ($request->tipo_tasa) {
            $valorF =  $request->capital + ($request->capital * $perTasa * $perTiempo);
        } else {
            // Compuesto
            $valorF = $request->capital * (1 + $perTasa) ** ($perTiempo);
        }

        $segmentLenght =  $perTiempo / $request->tiempo;

        return [
            "F" => $valorF,
            "P" => $request->capital,
            "i" => $perTasa,
            "t" => $perTiempo,
            "segmentos" => $this->calcularSegmente($perTasa, $perTiempo, $request->capital, $segmentLenght, $request->tipo_tasa),
        ];
    }

    public function calcularSegmente($perTasa, $perTiempo, $capital, $segmentLenght, $tipo = false)
    {

        $segments = [];
        $capitalInicial = $capital;
        for ($i = 0; $i <= $perTiempo; $i += $segmentLenght) {
            $segment = [];
            $segment["t"] = $i;
            if ($tipo) {
                $segment["P"] = $capitalInicial;
                $segment["F"] = $capitalInicial + ($capitalInicial * $perTasa * $i);
            } else {
                $segment["P"] = $capitalInicial;
                $segment["F"] = $capital * (1 + ($perTasa)) ** ($i);
                $capitalInicial = $segment["F"];
            }
            $segments[] = $segment;
        }

        return $segments;
    }

    public function valorPresente(FormTasaInteres $request)
    {
        $periodo = TasaTipo::find($request->periodo_id);
        $tasa = TasaTipo::find($request->tipo_tasa_id);
        $perTiempo = $request->tiempo * $periodo->meses();
        $perTasa = $request->per_tasa / 100 / $tasa->meses();

        if ($request->tipo_tasa) {
            $valorP =  $request->capital / (1 + $perTasa * $perTiempo);
        } else {
            // Compuesto
            $valorP = $request->capital / (1 + $perTasa) ** ($perTiempo);
        }

        $segmentLenght =  $perTiempo / $request->tiempo;

        return [
            "F" => $request->capital,
            "P" => $valorP,
            "i" => $perTasa,
            "t" => $perTiempo,
            "segmentos" => $this->calcularSegmentosP($perTasa, $perTiempo, $request->capital, $segmentLenght, $request->tipo_tasa),
        ];
    }

    public function calcularSegmentosP($perTasa, $perTiempo, $capital, $segmentLenght, $tipo = false)
    {

        $segments = [];
        $capitalInicial = $capital;
        for ($i = 0; $i <= $perTiempo; $i += $segmentLenght) {
            $segment = [];
            $segment["t"] = $i;
            if ($tipo) {
                $segment["P"] = $capitalInicial;
                $segment["F"] = $capitalInicial / (1 + $perTasa * $i);
            } else {
                $segment["P"] = $capitalInicial;
                $segment["F"] = $capital / (1 + ($perTasa)) ** ($i);
                $capitalInicial = $segment["F"];
            }
            $segments[] = $segment;
        }

        return $segments;
    }
}
