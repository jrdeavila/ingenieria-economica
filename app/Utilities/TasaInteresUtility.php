<?php

namespace App\Utilities;


abstract class TasaInteresUtility
{
    public static function obtenerTiempoPerTasa($tasa, $periodo, $num): int
    {
        switch ($tasa->nombre) {
            case "Mensual": {
                    return $periodo->meses() * $num;
                }
            case "Trimestral": {
                    return $periodo->trimestres() * $num;
                }
            case "Semestral": {
                    return $periodo->semestres() * $num;
                }
            case "Anual": {
                    return $periodo->anios() * $num;
                }
        }
    }



    public static function obtenerTasaPerPeriodo($periodo, $tasa, $per): float
    {
        switch ($periodo->nombre) {
            case "Mensual": {
                    return $per / $tasa->meses();
                }
            case "Trimestral": {
                    return $per / $tasa->trimestres();
                }
            case "Semestral": {
                    return $per / $tasa->semestres();
                }
            case "Anual": {
                    return $per / $tasa->anios();
                }
        }
    }
}
