<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TasaTipo extends Model
{
    use HasFactory;

    protected $table = "tasa_tipos";

    protected $fillable = [
        "nombre",
        "valor",
    ];

    public $timestamps = false;


    public function meses(): int
    {
        return ceil($this->valor * 12);
    }

    public function trimestres(): int
    {
        return $this->valor * 4;
    }

    public function semestres(): int
    {
        return $this->valor * 2;
    }

    public function anios(): int
    {
        return $this->valor;
    }
}
