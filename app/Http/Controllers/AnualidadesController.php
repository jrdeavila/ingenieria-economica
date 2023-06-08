<?php

namespace App\Http\Controllers;

use App\Http\Requests\FormTasaInteres;
use App\Models\TasaTipo;
use App\Utilities\TasaInteresUtility;

class AnualidadesController extends Controller
{
    public function amortizacion(FormTasaInteres $request)
    {

        $periodo = TasaTipo::find($request->periodo_id);
        $tasa = TasaTipo::find($request->tipo_tasa_id);
        $perTiempo = $request->tiempo * $periodo->meses();
        $perTasa = $request->per_tasa / 100 / $tasa->meses();

        $tabla = $this->calcularTablaAmortizacion($request->capital, $perTasa, $perTiempo);
        return $tabla;
    }


    function calcularTablaAmortizacion($capital, $tasaInteres, $periodos)
    {
        $tasaInteresDecimal = $tasaInteres / 100; // Convertir la tasa de interés a decimal
        $pagoMensual = ($capital * $tasaInteresDecimal) / (1 - pow(1 + $tasaInteresDecimal, -$periodos));

        $tablaAmortizacion = array();

        for ($i = 1; $i <= $periodos; $i++) {
            $interes = $capital * $tasaInteresDecimal;
            $capitalPagado = $pagoMensual - $interes;
            $saldoRestante = $capital - $capitalPagado;

            $fila = array(
                'Mes' => $i,
                'SaldoInicial' => number_format($capital, 2),
                'PagoMensual' => number_format($pagoMensual, 2),
                'Interes' => number_format($interes, 2),
                'CapitalPagado' => number_format($capitalPagado, 2),
                'SaldoRestante' => number_format($saldoRestante, 2)
            );

            $tablaAmortizacion[] = $fila;

            $capital = $saldoRestante;
        }

        return $tablaAmortizacion;
    }




    // Calcular anualiadades
    public function anualidades(FormTasaInteres $request)
    {
        $periodo = TasaTipo::find($request->periodo_id);
        $tasa = TasaTipo::find($request->tipo_tasa_id);
        $perTiempo = TasaInteresUtility::obtenerTiempoPerTasa($tasa, $periodo, floatval($request->tiempo));
        $perTasa = $request->per_tasa / 100;
        if ($request->tipo_tasa) {

            $resultado = $this->calcularAnualidadVF($request->capital, $perTasa, $perTiempo);
        } else {

            $resultado = $this->calcularAnualidadVP($request->capital, $perTasa, $perTiempo);
        }
        return [
            "resultado" => $resultado,
            "t" => $perTiempo,
            "i" => $perTasa,
        ];
    }

    public function calcularAnualidadVF($capital, $tasa, $periodo): float
    {
        $anualidad = $capital / ((1 + $tasa) ** $periodo);
        return $anualidad;
    }

    public function calcularAnualidadVP($capital, $tasa, $periodo): float
    {
        $anualidad = $capital * abs((1 - ((1 + $tasa) ** -$periodo)) / $tasa);
        return $anualidad;
    }
}
