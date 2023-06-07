<?php

namespace App\Utilities;


abstract class TasaInteresUtility
{
    public static function convertirTasa($periodo, $tasa): float
    {
        switch ($periodo->nombre) {
            case "Mensual":
                return $tasa->meses();
            case "Trimestral":
                return $tasa->trimestres();
            case "Semestral":
                return $tasa->semestres();
            case "Anual":
                return $tasa->anios();
            default:
                return 0;
        }
    }
}
